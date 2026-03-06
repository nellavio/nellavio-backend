import "dotenv/config";

import compress from "@fastify/compress";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { fromNodeHeaders } from "better-auth/node";
import Fastify from "fastify";
import { readFileSync } from "fs";
import mercurius from "mercurius";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { auth } from "./auth.js";
import { validateEnv } from "./config.js";
import { prisma } from "./db.js";
import schema from "./graphql/schema.js";

/**
 * Extend MercuriusContext with Better Auth session data
 * Allows accessing session in GraphQL resolvers and hooks
 */
type BetterAuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

declare module "mercurius" {
  interface MercuriusContext {
    session: BetterAuthSession;
  }
}

/** Get package.json for version info (used in health endpoint) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), "utf-8"),
);

/** Validate environment variables before starting */
validateEnv();

const fastify = Fastify({
  logger: {
    level: "info",
  },
});

/**
 * Security: Helmet headers (XSS, clickjacking protection)
 * CSP disabled in dev for GraphiQL, enabled in production
 */
await fastify.register(helmet, {
  contentSecurityPolicy: process.env.NODE_ENV === "production",
  global: true,
});

/** Performance: Response compression (gzip/deflate) */
await fastify.register(compress, {
  global: true,
  encodings: ["gzip", "deflate"],
});

/** Security: Rate limiting to prevent DOS attacks */
await fastify.register(rateLimit, {
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // 100 req/min in prod
  timeWindow: "1 minute",
  errorResponseBuilder: (req, context) => ({
    statusCode: 429,
    error: "Too Many Requests",
    message: `Rate limit exceeded. Try again in ${context.after}`,
  }),
});

/** CORS configuration — dynamic origins in production, localhost in dev */
await fastify.register(cors, {
  origin:
    process.env.NODE_ENV === "production"
      ? (process.env.ALLOWED_ORIGINS || "")
          .split(",")
          .filter((o) => o.trim().length > 0)
      : [
          "http://localhost:3000",
          "http://localhost:4000",
          "http://localhost:5004",
        ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  maxAge: 86400, // Cache preflight requests for 24 hours
});

/**
 * Better Auth endpoint
 * Converts Fastify request to Fetch API Request (required by Better Auth)
 */
fastify.all("/api/auth/*", async (request, reply) => {
  try {
    // Construct full URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Convert Fastify headers to standard Headers object
    const headers = new Headers();
    Object.entries(request.headers).forEach(([key, value]) => {
      if (value) headers.append(key, value.toString());
    });

    // Create Fetch API-compatible request
    const req = new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
    });

    // Process authentication request
    const response = await auth.handler(req);

    // Forward response to client
    reply.status(response.status);
    response.headers.forEach((value, key) => reply.header(key, value));
    return reply.send(response.body ? await response.text() : null);
  } catch (error) {
    fastify.log.error({ err: error }, "Better Auth Error");
    return reply.status(500).send({
      error: "Internal authentication error",
      code: "AUTH_FAILURE",
    });
  }
});

/** GraphQL API powered by Mercurius */
await fastify.register(mercurius, {
  schema,
  graphiql: process.env.NODE_ENV !== "production", // ✅ Disable in production
  path: "/graphql",

  // Security: Query complexity limits
  queryDepth: 12, // Prevent deeply nested queries

  // Context function — extract Better Auth session for auth checks
  context: async (request, reply) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });
      return { request, reply, session };
    } catch (error) {
      fastify.log.error({ err: error }, "Session extraction failed");
      return { request, reply, session: null };
    }
  },

  // Error handling — sanitize errors in production, full details in dev
  errorFormatter: (execution) => {
    fastify.log.error({ err: execution.errors }, "[GraphQL Error]");
    const isProduction = process.env.NODE_ENV === "production";
    return {
      statusCode: 200,
      response: {
        data: execution.data || null,
        errors: isProduction
          ? [{ message: "Internal server error" }]
          : execution.errors || [{ message: "Internal server error" }],
      },
    };
  },
});

/** Security: Require authentication for all GraphQL queries */
fastify.graphql.addHook("preExecution", async (_schema, _document, context) => {
  if (!context.session) {
    return {
      errors: [
        new mercurius.ErrorWithProps(
          "Not authenticated",
          { code: "UNAUTHENTICATED" },
          401,
        ),
      ],
    };
  }
});

/**
 * Health check endpoint
 * Returns full diagnostics in dev, minimal status in production
 */
fastify.get("/health", async (request, reply) => {
  const startTime = Date.now();

  // Check database connection
  let dbStatus = "healthy";
  let dbResponseTime = 0;
  let dbError = null;
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbResponseTime = Date.now() - dbStart;
  } catch (error) {
    dbStatus = "unhealthy";
    dbError = error instanceof Error ? error.message : "Unknown error";
    fastify.log.error({ err: error }, "Database health check failed");
  }

  // Calculate uptime
  const uptime = process.uptime();

  // Memory usage with percentage
  const memoryUsage = process.memoryUsage();
  const heapUsedPercent = Math.round(
    (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100,
  );
  const memoryUsageMB = {
    rss: Math.round(memoryUsage.rss / 1024 / 1024),
    heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    heapUsedPercent: `${heapUsedPercent}%`,
    external: Math.round(memoryUsage.external / 1024 / 1024),
    arrayBuffers: Math.round(memoryUsage.arrayBuffers / 1024 / 1024),
  };

  // CPU usage (in microseconds)
  const cpuUsage = process.cpuUsage();
  const cpuUsageMs = {
    user: Math.round(cpuUsage.user / 1000), // Convert to milliseconds
    system: Math.round(cpuUsage.system / 1000),
    total: Math.round((cpuUsage.user + cpuUsage.system) / 1000),
  };

  const totalResponseTime = Date.now() - startTime;
  const isHealthy = dbStatus === "healthy";
  const isReady = isHealthy; // Ready to serve traffic only if DB is healthy

  const healthData = {
    status: isHealthy ? "healthy" : "degraded",
    ready: isReady,
    alive: true, // Process is alive since it's responding
    timestamp: new Date().toISOString(),

    version: {
      api: packageJson.version,
      name: packageJson.name,
      node: process.version,
    },

    uptime: {
      seconds: Math.round(uptime),
      human: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`,
    },

    database: {
      status: dbStatus,
      responseTime: `${dbResponseTime}ms`,
      ...(dbError && { error: dbError }),
    },

    memory: {
      usage: memoryUsageMB,
      unit: "MB",
    },

    cpu: {
      usage: cpuUsageMs,
      unit: "milliseconds",
    },

    process: {
      pid: process.pid,
      platform: process.platform,
      arch: process.arch,
      environment: process.env.NODE_ENV || "development",
    },

    endpoints: {
      graphql: "/graphql",
      auth: "/api/auth/*",
      health: "/health",
    },

    responseTime: `${totalResponseTime}ms`,
  };

  const statusCode = isHealthy ? 200 : 503;

  // Production: minimal response for load balancers (no internals exposed)
  if (process.env.NODE_ENV === "production") {
    return reply.status(statusCode).send({
      status: isHealthy ? "healthy" : "degraded",
      ready: isReady,
    });
  }

  // Development: full diagnostics
  return reply.status(statusCode).send(healthData);
});

/** Graceful shutdown on SIGINT/SIGTERM */
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, async () => {
    fastify.log.info(`Received ${signal}, closing server...`);
    await fastify.close();
    process.exit(0);
  });
});

/** Start server */
const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "0.0.0.0";

try {
  await fastify.listen({ port: PORT, host: HOST });
  console.log("🚀 Spireflow Backend (Fastify) started");
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`🔐 Better Auth endpoint: http://localhost:${PORT}/api/auth/*`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

import { FastifyInstance } from "fastify";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { createTestApp } from "./helpers/buildTestApp.js";
import { mockPrisma } from "./helpers/mockPrisma.js";

describe("Server - CORS", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("CORS headers present for allowed origin", async () => {
    const response = await app.inject({
      method: "OPTIONS",
      url: "/health",
      headers: {
        origin: "http://localhost:3000",
        "access-control-request-method": "GET",
      },
    });

    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:3000",
    );
    expect(response.headers["access-control-allow-credentials"]).toBe("true");
  });

  it("CORS blocks disallowed origin", async () => {
    const response = await app.inject({
      method: "OPTIONS",
      url: "/health",
      headers: {
        origin: "https://evil-site.com",
        "access-control-request-method": "GET",
      },
    });

    expect(response.headers["access-control-allow-origin"]).not.toBe(
      "https://evil-site.com",
    );
  });

  it("CORS accepts all configured local origins", async () => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5004",
    ];

    for (const origin of allowedOrigins) {
      const response = await app.inject({
        method: "OPTIONS",
        url: "/health",
        headers: {
          origin,
          "access-control-request-method": "GET",
        },
      });

      expect(response.headers["access-control-allow-origin"]).toBe(origin);
    }
  });
});

describe("Server - Security headers", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Helmet adds X-Content-Type-Options: nosniff", async () => {
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("Helmet adds X-Frame-Options", async () => {
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.headers["x-frame-options"]).toBeDefined();
  });
});

describe("Server - Rate limiting", () => {
  it("returns 429 after exceeding request limit (production: 100 req/min)", async () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const prodApp = await createTestApp();
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const limit = 100;
    const batchSize = 25;

    for (let i = 0; i < limit; i += batchSize) {
      const batch = Array.from({ length: batchSize }, () =>
        prodApp.inject({ method: "GET", url: "/health" }),
      );
      await Promise.all(batch);
    }

    const overLimitResponse = await prodApp.inject({
      method: "GET",
      url: "/health",
    });

    expect(overLimitResponse.statusCode).toBe(429);
    const body = overLimitResponse.json();
    expect(body.statusCode).toBe(429);
    expect(body.error).toBe("Too Many Requests");
    expect(body.message).toContain("Rate limit exceeded");

    await prodApp.close();
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("returns correct response before reaching the limit", async () => {
    const app = await createTestApp();
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    await app.close();
  });
});

describe("Server - GraphiQL", () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("GraphiQL is disabled in production", async () => {
    process.env.NODE_ENV = "production";
    const prodApp = await createTestApp();

    const response = await prodApp.inject({
      method: "GET",
      url: "/graphql",
      headers: {
        accept: "text/html",
      },
    });

    const body = response.body;
    expect(body).not.toContain("graphiql");
    expect(body).not.toContain("GraphiQL");

    await prodApp.close();
  });
});

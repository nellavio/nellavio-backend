import { FastifyInstance } from "fastify";

import { buildApp } from "../../server.js";

/**
 * Create a configured Fastify instance for testing.
 * Uses inject() - no real HTTP server is started.
 *
 * Usage:
 *   let app: FastifyInstance;
 *   beforeAll(async () => { app = await createTestApp(); });
 *   afterAll(async () => { await app.close(); });
 */
export const createTestApp = async (): Promise<FastifyInstance> => {
  const app = await buildApp();
  await app.ready();
  return app;
};

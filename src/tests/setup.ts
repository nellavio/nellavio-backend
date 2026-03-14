import { vi } from "vitest";

/** Set test environment variables before any module loads */
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/testdb";
process.env.BETTER_AUTH_SECRET = "test-secret-key-for-vitest-minimum-length";
process.env.BETTER_AUTH_URL = "http://localhost:4000/api/auth";
process.env.NODE_ENV = "test";

/**
 * Mock Prisma Client
 * All prisma methods return empty arrays by default.
 * Override in individual tests via mockPrisma.
 */
vi.mock("../db.js", async () => {
  const { mockDeep } = await import("vitest-mock-extended");
  return {
    prisma: mockDeep(),
  };
});

/**
 * Mock Better Auth
 * Prevents real auth initialization (which requires DB connection).
 * Individual tests can override auth.handler and auth.api.getSession.
 */
vi.mock("../auth.js", () => ({
  auth: {
    handler: vi.fn(),
    api: {
      getSession: vi.fn().mockResolvedValue(null),
    },
  },
}));

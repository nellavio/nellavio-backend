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

describe("Health endpoint", () => {
  let app: FastifyInstance;
  let originalNodeEnv: string | undefined;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("GET /health returns 200 when DB is healthy", async () => {
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
  });

  it("GET /health returns 503 when DB is unhealthy", async () => {
    mockPrisma.$queryRaw.mockRejectedValue(new Error("connection refused"));

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(503);
  });

  it("response contains required fields (status, ready, alive, version)", async () => {
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await app.inject({ method: "GET", url: "/health" });
    const body = response.json();

    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("ready");
    expect(body).toHaveProperty("alive");
    expect(body).toHaveProperty("version");
  });

  it("in production mode returns minimal response", async () => {
    process.env.NODE_ENV = "production";
    const prodApp = await createTestApp();
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await prodApp.inject({ method: "GET", url: "/health" });
    const body = response.json();

    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("ready");
    expect(body).not.toHaveProperty("version");
    expect(body).not.toHaveProperty("memory");

    await prodApp.close();
  });

  it("version.api field matches the version from package.json", async () => {
    mockPrisma.$queryRaw.mockResolvedValue([1]);

    const response = await app.inject({ method: "GET", url: "/health" });
    const body = response.json();

    expect(body.version.api).toBe("2.0.0");
  });

  it("ready=false when DB is unhealthy", async () => {
    mockPrisma.$queryRaw.mockRejectedValue(new Error("DB down"));

    const response = await app.inject({ method: "GET", url: "/health" });
    const body = response.json();

    expect(body.ready).toBe(false);
  });
});

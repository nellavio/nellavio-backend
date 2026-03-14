import { FastifyInstance } from "fastify";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { auth } from "../auth.js";
import { mockAuthenticatedSession } from "./helpers/authHelpers.js";
import { createTestApp } from "./helpers/buildTestApp.js";
import { mockPrisma } from "./helpers/mockPrisma.js";

interface MockAuth {
  handler: ReturnType<typeof vi.fn>;
  api: {
    getSession: ReturnType<typeof vi.fn>;
  };
}

const mockAuth = auth as unknown as MockAuth;

const sendGraphQL = (app: FastifyInstance, query: string) =>
  app.inject({
    method: "POST",
    url: "/graphql",
    headers: { "content-type": "application/json" },
    payload: JSON.stringify({ query }),
  });

describe("Error handling - errorFormatter", () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("in production sanitizes errors to 'Internal server error'", async () => {
    process.env.NODE_ENV = "production";
    const prodApp = await createTestApp();

    mockAuthenticatedSession();
    mockPrisma.product.findMany.mockRejectedValue(
      new Error("Sensitive DB connection string leaked"),
    );

    const response = await sendGraphQL(prodApp, "{ products { id name } }");
    const body = JSON.parse(response.body);

    expect(body.errors).toBeDefined();
    expect(body.errors[0].message).toBe("Internal server error");
    expect(JSON.stringify(body)).not.toContain(
      "Sensitive DB connection string leaked",
    );

    await prodApp.close();
  });

  it("in dev returns original error details", async () => {
    process.env.NODE_ENV = "test";
    const devApp = await createTestApp();

    mockAuthenticatedSession();
    mockPrisma.product.findMany.mockRejectedValue(
      new Error("Detailed error info"),
    );

    const response = await sendGraphQL(devApp, "{ products { id name } }");
    const body = JSON.parse(response.body);

    expect(body.errors).toBeDefined();
    expect(body.errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(body.errors)).toContain("Detailed error info");

    await devApp.close();
  });
});

describe("Error handling - Session extraction failure", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("when getSession throws, request is treated as unauthorized (graceful degradation)", async () => {
    mockAuth.api.getSession.mockRejectedValue(
      new Error("Session service down"),
    );

    const response = await sendGraphQL(app, "{ products { id } }");
    const body = JSON.parse(response.body);

    expect(body.errors).toBeDefined();
    expect(body.errors[0].message).toBe("Not authenticated");
    expect(body.errors[0].extensions.code).toBe("UNAUTHENTICATED");
  });

  it("when getSession throws, server does not crash and subsequent requests work", async () => {
    mockAuth.api.getSession.mockRejectedValueOnce(
      new Error("Temporary failure"),
    );

    const failedResponse = await sendGraphQL(app, "{ products { id } }");
    const failedBody = JSON.parse(failedResponse.body);
    expect(failedBody.errors).toBeDefined();

    mockAuthenticatedSession();
    mockPrisma.product.findMany.mockResolvedValue([]);

    const successResponse = await sendGraphQL(app, "{ products { id } }");
    const successBody = JSON.parse(successResponse.body);
    expect(successBody.errors).toBeUndefined();
    expect(successBody.data.products).toEqual([]);
  });
});

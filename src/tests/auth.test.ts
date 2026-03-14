import { FastifyInstance } from "fastify";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { auth } from "../auth.js";
import { mockAuthHandler } from "./helpers/authHelpers.js";
import { createTestApp } from "./helpers/buildTestApp.js";

interface MockAuth {
  handler: ReturnType<typeof vi.fn>;
  api: {
    getSession: ReturnType<typeof vi.fn>;
  };
}

const mockAuth = auth as unknown as MockAuth;

describe("Auth endpoints", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    mockAuth.handler.mockReset();
  });

  it("POST /api/auth/sign-in forwards request to Better Auth with correct URL, body and method", async () => {
    mockAuthHandler(200, '{"ok":true}');

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.statusCode).toBe(200);
    expect(mockAuth.handler).toHaveBeenCalled();

    const calledRequest = mockAuth.handler.mock.calls[0][0] as Request;
    expect(calledRequest).toBeInstanceOf(Request);
    expect(calledRequest.url).toContain("/api/auth/sign-in");
    expect(calledRequest.method).toBe("POST");

    const body = await calledRequest.text();
    const parsed = JSON.parse(body);
    expect(parsed.email).toBe("test@example.com");
    expect(parsed.password).toBe("password123");
  });

  it("GET /api/auth/session forwards request to Better Auth", async () => {
    mockAuthHandler(200, '{"session":null}');

    const response = await app.inject({
      method: "GET",
      url: "/api/auth/session",
    });

    expect(response.statusCode).toBe(200);
    expect(mockAuth.handler).toHaveBeenCalled();
  });

  it("Wildcard catches unknown sub-routes", async () => {
    mockAuthHandler(200, '{"ok":true}');

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/some-unknown-endpoint",
      payload: {},
    });

    expect(response.statusCode).toBe(200);
    expect(mockAuth.handler).toHaveBeenCalled();
  });

  it("Auth error returns 500 with AUTH_FAILURE code", async () => {
    mockAuth.handler.mockRejectedValue(new Error("Auth service down"));

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.statusCode).toBe(500);
    const body = response.json();
    expect(body.code).toBe("AUTH_FAILURE");
    expect(body.error).toBe("Internal authentication error");
  });

  it("Auth response headers are forwarded to the client", async () => {
    mockAuthHandler(200, '{"ok":true}', { "x-custom-header": "test-value" });

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.headers["x-custom-header"]).toBe("test-value");
  });

  it("Multiple headers are forwarded correctly", async () => {
    mockAuthHandler(200, '{"ok":true}', {
      "x-header-one": "value-one",
      "x-header-two": "value-two",
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.headers["x-header-one"]).toBe("value-one");
    expect(response.headers["x-header-two"]).toBe("value-two");
  });

  it("Auth responses have Cache-Control: no-store", async () => {
    mockAuthHandler(200, '{"ok":true}');

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.headers["cache-control"]).toContain("no-store");
  });

  it("Auth responses have Pragma: no-cache", async () => {
    mockAuthHandler(200, '{"ok":true}');

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.headers["pragma"]).toBe("no-cache");
  });

  it("Auth handler status code is forwarded", async () => {
    mockAuthHandler(401, '{"error":"unauthorized"}');

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "wrong" },
    });

    expect(response.statusCode).toBe(401);
  });

  it("Auth handler with null body returns empty response", async () => {
    mockAuthHandler(204, null);

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in",
      payload: { email: "test@example.com", password: "password123" },
    });

    expect(response.statusCode).toBe(204);
  });
});

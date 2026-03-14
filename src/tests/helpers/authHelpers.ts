import { vi } from "vitest";

import { auth } from "../../auth.js";

interface MockAuth {
  handler: ReturnType<typeof vi.fn>;
  api: {
    getSession: ReturnType<typeof vi.fn>;
  };
}

const mockAuth = auth as unknown as MockAuth;

/**
 * Mock an authenticated session for GraphQL tests.
 * Call this in beforeEach to make GraphQL queries pass the auth guard.
 */
export const mockAuthenticatedSession = () => {
  mockAuth.api.getSession.mockResolvedValue({
    session: {
      id: "test-session-id",
      userId: "test-user-id",
      token: "test-token",
      expiresAt: new Date(Date.now() + 86400000),
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: "127.0.0.1",
      userAgent: "vitest",
    },
    user: {
      id: "test-user-id",
      name: "Test User",
      email: "test@example.com",
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

/**
 * Mock an unauthenticated session (no session found).
 * This is also the default from setup.ts.
 */
export const mockUnauthenticatedSession = () => {
  mockAuth.api.getSession.mockResolvedValue(null);
};

/**
 * Mock the auth.handler response for auth endpoint tests.
 */
export const mockAuthHandler = (
  status: number,
  body: string | null,
  headers?: Record<string, string>,
) => {
  const responseHeaders = new Headers(headers);
  mockAuth.handler.mockResolvedValue(
    new Response(body, { status, headers: responseHeaders }),
  );
};

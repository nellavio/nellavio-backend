import { FastifyInstance } from "fastify";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import {
  mockAuthenticatedSession,
  mockUnauthenticatedSession,
} from "./helpers/authHelpers.js";
import { createTestApp } from "./helpers/buildTestApp.js";
import { mockPrisma } from "./helpers/mockPrisma.js";

describe("GraphQL Authentication", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    mockUnauthenticatedSession();
  });

  it("Query without session returns UNAUTHENTICATED error", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      payload: { query: "{ products { id } }" },
    });

    const body = response.json();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].message).toBe("Not authenticated");
  });

  it("Query with valid session passes", async () => {
    mockAuthenticatedSession();
    mockPrisma.product.findMany.mockResolvedValue([]);

    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      payload: { query: "{ products { id } }" },
    });

    const body = response.json();
    expect(body.errors).toBeUndefined();
    expect(body.data.products).toEqual([]);
  });

  it("Error contains UNAUTHENTICATED code in extensions", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      payload: { query: "{ products { id } }" },
    });

    const body = response.json();
    expect(body.errors[0].extensions.code).toBe("UNAUTHENTICATED");
  });

  it("Multiple queries without session - all blocked", async () => {
    const queries = [
      "{ products { id } }",
      "{ orders { id } }",
      "{ customers { id } }",
    ];

    for (const query of queries) {
      const response = await app.inject({
        method: "POST",
        url: "/graphql",
        payload: { query },
      });

      const body = response.json();
      expect(body.errors).toBeDefined();
      expect(body.errors[0].message).toBe("Not authenticated");
    }
  });
});

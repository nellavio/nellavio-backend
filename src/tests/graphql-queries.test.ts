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

import { mockAuthenticatedSession } from "./helpers/authHelpers.js";
import { createTestApp } from "./helpers/buildTestApp.js";
import { mockPrisma } from "./helpers/mockPrisma.js";

const sendGraphQL = (app: FastifyInstance, query: string) =>
  app.inject({
    method: "POST",
    url: "/graphql",
    headers: { "content-type": "application/json" },
    payload: JSON.stringify({ query }),
  });

describe("GraphQL Queries", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthenticatedSession();
  });

  it("when Prisma throws an error, response contains error", async () => {
    mockPrisma.product.findMany.mockRejectedValue(new Error("DB error"));

    const response = await sendGraphQL(app, "{ products { id name } }");
    const body = JSON.parse(response.body);

    expect(body.errors).toBeDefined();
    expect(body.errors.length).toBeGreaterThan(0);
  });

  it("query with depth within limit (queryDepth: 12) passes correctly", async () => {
    mockPrisma.asset.findMany.mockResolvedValue([]);
    mockPrisma.revenueTrend.findMany.mockResolvedValue([]);
    mockPrisma.todaySales.findMany.mockResolvedValue([]);
    mockPrisma.totalProfitProduct.findMany.mockResolvedValue([]);
    mockPrisma.totalProfitMonth.findMany.mockResolvedValue([]);
    mockPrisma.yearOverview.findMany.mockResolvedValue([]);
    mockPrisma.marketMetrics.findMany.mockResolvedValue([]);
    mockPrisma.revenueDistribution.findMany.mockResolvedValue([]);

    // depth 3: analytics → assets → id/name/industry/sales/delta/deltaType/status
    const response = await sendGraphQL(
      app,
      "{ analytics { assets { id name industry sales delta deltaType status } revenueTrends { id month sales profit } } }",
    );
    const body = JSON.parse(response.body);

    expect(body.errors).toBeUndefined();
    expect(body.data.analytics).toBeDefined();
  });
});

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

/** Helper: mock all 8 analytics sub-resolvers with empty arrays */
const mockAllAnalytics = () => {
  mockPrisma.asset.findMany.mockResolvedValue([]);
  mockPrisma.revenueTrend.findMany.mockResolvedValue([]);
  mockPrisma.todaySales.findMany.mockResolvedValue([]);
  mockPrisma.totalProfitProduct.findMany.mockResolvedValue([]);
  mockPrisma.totalProfitMonth.findMany.mockResolvedValue([]);
  mockPrisma.yearOverview.findMany.mockResolvedValue([]);
  mockPrisma.marketMetrics.findMany.mockResolvedValue([]);
  mockPrisma.revenueDistribution.findMany.mockResolvedValue([]);
};

/** Helper: mock all 8 homepage sub-resolvers with empty arrays */
const mockAllHomepage = () => {
  mockPrisma.bestSellingProduct.findMany.mockResolvedValue([]);
  mockPrisma.customerSatisfaction.findMany.mockResolvedValue([]);
  mockPrisma.threeSmallCard.findMany.mockResolvedValue([]);
  mockPrisma.fourSmallCard.findMany.mockResolvedValue([]);
  mockPrisma.revenueOverTime.findMany.mockResolvedValue([]);
  mockPrisma.revenuePerCountry.findMany.mockResolvedValue([]);
  mockPrisma.weeklyPerformance.findMany.mockResolvedValue([]);
  mockPrisma.weeklyActivity.findMany.mockResolvedValue([]);
};

describe("Composite queries - analytics", () => {
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

  it("returns nested data from multiple tables", async () => {
    mockAllAnalytics();
    mockPrisma.asset.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Asset A",
        industry: "Tech",
        sales: 100,
        delta: 5.2,
        deltaType: "up",
        status: "active",
      },
    ]);
    mockPrisma.revenueTrend.findMany.mockResolvedValue([
      { id: "1", month: "Jan", sales: 1000, profit: 500 },
    ]);

    const response = await sendGraphQL(
      app,
      "{ analytics { assets { id name } revenueTrends { id month } } }",
    );
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data.analytics.assets).toEqual([{ id: "1", name: "Asset A" }]);
    expect(body.data.analytics.revenueTrends).toEqual([
      { id: "1", month: "Jan" },
    ]);
  });

  it("one failing sub-resolver causes error in entire analytics (Promise.all)", async () => {
    mockAllAnalytics();
    mockPrisma.asset.findMany.mockRejectedValue(
      new Error("Assets table corrupted"),
    );

    const response = await sendGraphQL(
      app,
      "{ analytics { assets { id } revenueTrends { id } } }",
    );
    const body = JSON.parse(response.body);

    expect(body.errors).toBeDefined();
    expect(body.errors.length).toBeGreaterThan(0);
  });

  it("returns empty arrays when no data in all sub-resolvers", async () => {
    mockAllAnalytics();

    const response = await sendGraphQL(
      app,
      "{ analytics { assets { id } revenueTrends { id } todaySales { id } } }",
    );
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data.analytics.assets).toEqual([]);
    expect(body.data.analytics.revenueTrends).toEqual([]);
    expect(body.data.analytics.todaySales).toEqual([]);
  });
});

describe("Composite queries - homepage", () => {
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

  it("returns nested data from multiple tables", async () => {
    mockAllHomepage();
    mockPrisma.bestSellingProduct.findMany.mockResolvedValue([
      { id: "1", name: "Phone", sales: 500, profit: 200 },
    ]);
    mockPrisma.weeklyActivity.findMany.mockResolvedValue([
      {
        id: 1,
        user: "Admin",
        action: "login",
        time: "10:00",
        icon: "user",
        color: "blue",
      },
    ]);

    const response = await sendGraphQL(
      app,
      "{ homepage { bestSellingProducts { id name } weeklyActivities { id } } }",
    );
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data.homepage.bestSellingProducts).toEqual([
      { id: "1", name: "Phone" },
    ]);
    expect(body.data.homepage.weeklyActivities).toEqual([{ id: 1 }]);
  });

  it("one failing sub-resolver causes error in entire homepage (Promise.all)", async () => {
    mockAllHomepage();
    mockPrisma.bestSellingProduct.findMany.mockRejectedValue(
      new Error("Best selling table down"),
    );

    const response = await sendGraphQL(
      app,
      "{ homepage { bestSellingProducts { id } weeklyActivities { id } } }",
    );
    const body = JSON.parse(response.body);

    expect(body.errors).toBeDefined();
    expect(body.errors.length).toBeGreaterThan(0);
  });

  it("returns empty arrays when no data in all sub-resolvers", async () => {
    mockAllHomepage();

    const response = await sendGraphQL(
      app,
      "{ homepage { bestSellingProducts { id } weeklyActivities { id } threeSmallCards { id } } }",
    );
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data.homepage.bestSellingProducts).toEqual([]);
    expect(body.data.homepage.weeklyActivities).toEqual([]);
    expect(body.data.homepage.threeSmallCards).toEqual([]);
  });
});

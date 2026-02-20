import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

import { assetPerformanceData } from "../src/data/analytics/assetPerformance.js";
import { bestSellingProductsData } from "../src/data/homepage/bestSellingProducts.js";
import { customerSatisfactionData } from "../src/data/homepage/customerSatisfaction.js";
import { customersData } from "../src/data/customers.js";
import { eventsData } from "../src/data/events.js";
import { threeSmallCardsData } from "../src/data/homepage/threeSmallCards.js";
import { fourSmallCardsData } from "../src/data/homepage/fourSmallCards.js";
import { revenueTrendsData } from "../src/data/analytics/revenueTrends.js";
import { ordersData } from "../src/data/orders.js";
import { productsData } from "../src/data/products.js";
import { revenueOverTimeData } from "../src/data/homepage/revenueOverTime.js";
import { revenuePerCountryData } from "../src/data/homepage/revenuePerCountry.js";
import { todaySalesData } from "../src/data/analytics/todaySales.js";
import { totalProfitMonthsData } from "../src/data/analytics/totalProfitMonths.js";
import { totalProfitProductsData } from "../src/data/analytics/totalProfitProducts.js";
import { yearOverviewData } from "../src/data/analytics/yearOverview.js";
import { marketMetricsData } from "../src/data/analytics/marketMetrics.js";
import { revenueDistributionData } from "../src/data/analytics/revenueDistribution.js";
import { weeklyPerformanceData } from "../src/data/homepage/weeklyPerformance.js";
import { weeklyActivitiesData } from "../src/data/homepage/weeklyActivities.js";
import { notificationsData } from "../src/data/notifications.js";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data first
  await prisma.asset.deleteMany();
  await prisma.bestSellingProduct.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.customerSatisfaction.deleteMany();
  await prisma.event.deleteMany();
  await prisma.threeSmallCard.deleteMany();
  await prisma.fourSmallCard.deleteMany();
  await prisma.revenueTrend.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.revenuePerCountry.deleteMany();
  await prisma.revenueOverTime.deleteMany();
  await prisma.todaySales.deleteMany();
  await prisma.totalProfitMonth.deleteMany();
  await prisma.totalProfitProduct.deleteMany();

  await prisma.yearOverview.deleteMany();
  await prisma.marketMetrics.deleteMany();
  await prisma.revenueDistribution.deleteMany();
  await prisma.weeklyPerformance.deleteMany();
  await prisma.weeklyActivity.deleteMany();
  await prisma.notification.deleteMany();

  // Seed for Assets
  for (const item of assetPerformanceData) {
    await prisma.asset.create({ data: item });
  }

  // Seed for Best Selling Products
  for (const item of bestSellingProductsData) {
    await prisma.bestSellingProduct.create({ data: item });
  }

  // Seed for Customers
  for (const item of customersData) {
    await prisma.customer.create({ data: item });
  }

  // Seed for Customer Satisfaction
  for (const item of customerSatisfactionData) {
    await prisma.customerSatisfaction.create({ data: item });
  }

  // Seed for Events
  for (const item of eventsData) {
    await prisma.event.create({ data: item });
  }

  // Seed for Three Small Cards (3 cards for Homepage V1)
  for (const item of threeSmallCardsData) {
    await prisma.threeSmallCard.create({ data: item });
  }

  // Seed for Four Small Cards (4 cards for Homepage V2)
  for (const item of fourSmallCardsData) {
    await prisma.fourSmallCard.create({ data: item });
  }

  // Seed for Revenue Trends
  for (const item of revenueTrendsData) {
    await prisma.revenueTrend.create({ data: item });
  }

  // Seed for Orders
  for (const item of ordersData) {
    await prisma.order.create({ data: item });
  }

  // Seed for Products
  for (const item of productsData) {
    await prisma.product.create({ data: item });
  }

  // Seed for Revenue Per Country
  for (const item of revenuePerCountryData) {
    await prisma.revenuePerCountry.create({ data: item });
  }

  // Seed for Revenue Over Time
  for (const item of revenueOverTimeData) {
    await prisma.revenueOverTime.create({ data: item });
  }

  // Seed for Today Sales
  for (const item of todaySalesData) {
    await prisma.todaySales.create({ data: item });
  }

  // Seed for Total Profit Month
  for (const item of totalProfitMonthsData) {
    await prisma.totalProfitMonth.create({ data: item });
  }

  // Seed for Total Profit Products
  for (const item of totalProfitProductsData) {
    await prisma.totalProfitProduct.create({ data: item });
  }

  // Seed for Year Overview
  for (const item of yearOverviewData) {
    await prisma.yearOverview.create({ data: item });
  }

  // Seed for Market Metrics
  for (const item of marketMetricsData) {
    await prisma.marketMetrics.create({ data: item });
  }

  // Seed for Revenue Distribution
  for (const item of revenueDistributionData) {
    await prisma.revenueDistribution.create({ data: item });
  }

  // Seed for Weekly Performance
  for (const item of weeklyPerformanceData) {
    await prisma.weeklyPerformance.create({ data: item });
  }

  // Seed for Weekly Activities
  for (const item of weeklyActivitiesData) {
    await prisma.weeklyActivity.create({ data: item });
  }

  // Seed for Notifications
  for (const item of notificationsData) {
    await prisma.notification.create({ data: item });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

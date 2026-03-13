import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";

import { prisma } from "../db.js";
import {
  AnalyticsType,
  AssetType,
  BestSellingProductType,
  CustomerSatisfactionType,
  CustomerType,
  EventType,
  FourSmallCardType,
  HomepageType,
  MarketMetricsType,
  NotificationType,
  OrderType,
  ProductType,
  RevenueDistributionType,
  RevenueOverTimeType,
  RevenuePerCountryType,
  RevenueTrendType,
  ThreeSmallCardType,
  TodaySalesType,
  TotalProfitMonthType,
  TotalProfitProductsType,
  WeeklyActivityType,
  WeeklyPerformanceType,
  YearOverviewType,
} from "./types.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    assets: {
      type: new GraphQLList(AssetType),
      resolve() {
        return prisma.asset.findMany();
      },
    },
    bestSellingProducts: {
      type: new GraphQLList(BestSellingProductType),
      resolve() {
        return prisma.bestSellingProduct.findMany();
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return prisma.customer.findMany();
      },
    },
    customerSatisfaction: {
      type: new GraphQLList(CustomerSatisfactionType),
      resolve() {
        return prisma.customerSatisfaction.findMany();
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return prisma.event.findMany();
      },
    },
    threeSmallCards: {
      type: new GraphQLList(ThreeSmallCardType),
      resolve() {
        return prisma.threeSmallCard.findMany();
      },
    },
    fourSmallCards: {
      type: new GraphQLList(FourSmallCardType),
      resolve() {
        return prisma.fourSmallCard.findMany();
      },
    },
    revenueTrends: {
      type: new GraphQLList(RevenueTrendType),
      resolve() {
        return prisma.revenueTrend.findMany();
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve() {
        return prisma.order.findMany();
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return prisma.product.findMany();
      },
    },
    revenuePerCountry: {
      type: new GraphQLList(RevenuePerCountryType),
      resolve() {
        return prisma.revenuePerCountry.findMany();
      },
    },
    revenueOverTime: {
      type: new GraphQLList(RevenueOverTimeType),
      resolve() {
        return prisma.revenueOverTime.findMany();
      },
    },
    todaySales: {
      type: new GraphQLList(TodaySalesType),
      resolve() {
        return prisma.todaySales.findMany();
      },
    },
    totalProfitMonths: {
      type: new GraphQLList(TotalProfitMonthType),
      resolve() {
        return prisma.totalProfitMonth.findMany();
      },
    },
    totalProfitProducts: {
      type: new GraphQLList(TotalProfitProductsType),
      resolve() {
        return prisma.totalProfitProduct.findMany();
      },
    },

    yearOverview: {
      type: new GraphQLList(YearOverviewType),
      resolve() {
        return prisma.yearOverview.findMany();
      },
    },
    marketMetrics: {
      type: new GraphQLList(MarketMetricsType),
      resolve() {
        return prisma.marketMetrics.findMany();
      },
    },
    revenueDistribution: {
      type: new GraphQLList(RevenueDistributionType),
      resolve() {
        return prisma.revenueDistribution.findMany();
      },
    },
    weeklyPerformance: {
      type: new GraphQLList(WeeklyPerformanceType),
      resolve() {
        return prisma.weeklyPerformance.findMany();
      },
    },
    weeklyActivities: {
      type: new GraphQLList(WeeklyActivityType),
      resolve() {
        return prisma.weeklyActivity.findMany();
      },
    },
    notifications: {
      type: new GraphQLList(NotificationType),
      resolve() {
        return prisma.notification.findMany();
      },
    },
    analytics: {
      type: AnalyticsType,
      resolve() {
        return Promise.all([
          prisma.asset.findMany(),
          prisma.revenueTrend.findMany(),
          prisma.todaySales.findMany(),
          prisma.totalProfitProduct.findMany(),
          prisma.totalProfitMonth.findMany(),
          prisma.yearOverview.findMany(),
          prisma.marketMetrics.findMany(),
          prisma.revenueDistribution.findMany(),
        ]).then(
          ([
            assets,
            revenueTrends,
            todaySales,
            totalProfitProducts,
            totalProfitMonths,
            yearOverview,
            marketMetrics,
            revenueDistribution,
          ]) => ({
            assets,
            revenueTrends,
            todaySales,
            totalProfitProducts,
            totalProfitMonths,
            yearOverview,
            marketMetrics,
            revenueDistribution,
          }),
        );
      },
    },
    homepage: {
      type: HomepageType,
      resolve() {
        return Promise.all([
          prisma.bestSellingProduct.findMany(),
          prisma.customerSatisfaction.findMany(),
          prisma.threeSmallCard.findMany(),
          prisma.fourSmallCard.findMany(),
          prisma.revenueOverTime.findMany(),
          prisma.revenuePerCountry.findMany(),
          prisma.weeklyPerformance.findMany(),
          prisma.weeklyActivity.findMany(),
        ]).then(
          ([
            bestSellingProducts,
            customerSatisfaction,
            threeSmallCards,
            fourSmallCards,
            revenueOverTime,
            revenuePerCountry,
            weeklyPerformance,
            weeklyActivities,
          ]) => ({
            bestSellingProducts,
            customerSatisfaction,
            threeSmallCards,
            fourSmallCards,
            revenueOverTime,
            revenuePerCountry,
            weeklyPerformance,
            weeklyActivities,
          }),
        );
      },
    },
  },
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  types: [
    AssetType,
    BestSellingProductType,
    CustomerType,
    CustomerSatisfactionType,
    EventType,
    ThreeSmallCardType,
    FourSmallCardType,
    RevenueTrendType,
    NotificationType,
    OrderType,
    ProductType,
    RevenueDistributionType,
    RevenueOverTimeType,
    RevenuePerCountryType,
    TodaySalesType,
    TotalProfitMonthType,
    TotalProfitProductsType,
    YearOverviewType,
    MarketMetricsType,
    WeeklyPerformanceType,
    WeeklyActivityType,
    AnalyticsType,
    HomepageType,
  ],
});

export default schema;

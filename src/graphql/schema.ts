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
        return prisma.asset.findMany({ take: 200 });
      },
    },
    bestSellingProducts: {
      type: new GraphQLList(BestSellingProductType),
      resolve() {
        return prisma.bestSellingProduct.findMany({ take: 200 });
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return prisma.customer.findMany({ take: 200 });
      },
    },
    customerSatisfaction: {
      type: new GraphQLList(CustomerSatisfactionType),
      resolve() {
        return prisma.customerSatisfaction.findMany({ take: 200 });
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return prisma.event.findMany({ take: 200 });
      },
    },
    threeSmallCards: {
      type: new GraphQLList(ThreeSmallCardType),
      resolve() {
        return prisma.threeSmallCard.findMany({ take: 200 });
      },
    },
    fourSmallCards: {
      type: new GraphQLList(FourSmallCardType),
      resolve() {
        return prisma.fourSmallCard.findMany({ take: 200 });
      },
    },
    revenueTrends: {
      type: new GraphQLList(RevenueTrendType),
      resolve() {
        return prisma.revenueTrend.findMany({ take: 200 });
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve() {
        return prisma.order.findMany({ take: 200 });
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return prisma.product.findMany({ take: 200 });
      },
    },
    revenuePerCountry: {
      type: new GraphQLList(RevenuePerCountryType),
      resolve() {
        return prisma.revenuePerCountry.findMany({ take: 200 });
      },
    },
    revenueOverTime: {
      type: new GraphQLList(RevenueOverTimeType),
      resolve() {
        return prisma.revenueOverTime.findMany({ take: 200 });
      },
    },
    todaySales: {
      type: new GraphQLList(TodaySalesType),
      resolve() {
        return prisma.todaySales.findMany({ take: 200 });
      },
    },
    totalProfitMonths: {
      type: new GraphQLList(TotalProfitMonthType),
      resolve() {
        return prisma.totalProfitMonth.findMany({ take: 200 });
      },
    },
    totalProfitProducts: {
      type: new GraphQLList(TotalProfitProductsType),
      resolve() {
        return prisma.totalProfitProduct.findMany({ take: 200 });
      },
    },
    yearOverview: {
      type: new GraphQLList(YearOverviewType),
      resolve() {
        return prisma.yearOverview.findMany({ take: 200 });
      },
    },
    marketMetrics: {
      type: new GraphQLList(MarketMetricsType),
      resolve() {
        return prisma.marketMetrics.findMany({ take: 200 });
      },
    },
    revenueDistribution: {
      type: new GraphQLList(RevenueDistributionType),
      resolve() {
        return prisma.revenueDistribution.findMany({ take: 200 });
      },
    },
    weeklyPerformance: {
      type: new GraphQLList(WeeklyPerformanceType),
      resolve() {
        return prisma.weeklyPerformance.findMany({ take: 200 });
      },
    },
    weeklyActivities: {
      type: new GraphQLList(WeeklyActivityType),
      resolve() {
        return prisma.weeklyActivity.findMany({ take: 200 });
      },
    },
    notifications: {
      type: new GraphQLList(NotificationType),
      resolve() {
        return prisma.notification.findMany({ take: 200 });
      },
    },
    analytics: {
      type: AnalyticsType,
      resolve() {
        return Promise.all([
          prisma.asset.findMany({ take: 200 }),
          prisma.revenueTrend.findMany({ take: 200 }),
          prisma.todaySales.findMany({ take: 200 }),
          prisma.totalProfitProduct.findMany({ take: 200 }),
          prisma.totalProfitMonth.findMany({ take: 200 }),
          prisma.yearOverview.findMany({ take: 200 }),
          prisma.marketMetrics.findMany({ take: 200 }),
          prisma.revenueDistribution.findMany({ take: 200 }),
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
          prisma.bestSellingProduct.findMany({ take: 200 }),
          prisma.customerSatisfaction.findMany({ take: 200 }),
          prisma.threeSmallCard.findMany({ take: 200 }),
          prisma.fourSmallCard.findMany({ take: 200 }),
          prisma.revenueOverTime.findMany({ take: 200 }),
          prisma.revenuePerCountry.findMany({ take: 200 }),
          prisma.weeklyPerformance.findMany({ take: 200 }),
          prisma.weeklyActivity.findMany({ take: 200 }),
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

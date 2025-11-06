import { GraphQLObjectType, GraphQLSchema, GraphQLList } from "graphql";
import { prisma } from "../db.js";

import {
  AnalyticsType,
  AssetType,
  BestSellingProductType,
  CustomerSatisfactionType,
  CustomerType,
  EventType,
  HomeSmallCardType,
  HomeSmallCard2Type,
  HomepageType,
  Homepage2Type,
  MarketMetricsType,
  MonthPerformanceType,
  NotificationType,
  OrderType,
  ProductType,
  RegionType,
  RevenueDistributionType,
  RevenueOverTimeType,
  RevenuePerCountryType,
  TodaySalesType,
  TotalProfitMonthType,
  TotalProfitProductsType,
  YearOverviewType,
  WeeklyPerformanceType,
  WeeklyActivityType,
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
    homeSmallCards: {
      type: new GraphQLList(HomeSmallCardType),
      resolve() {
        return prisma.homeSmallCard.findMany();
      },
    },
    homeSmallCards2: {
      type: new GraphQLList(HomeSmallCard2Type),
      resolve() {
        return prisma.homeSmallCard2.findMany();
      },
    },
    monthPerformance: {
      type: new GraphQLList(MonthPerformanceType),
      resolve() {
        return prisma.monthPerformance.findMany();
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
    regions: {
      type: new GraphQLList(RegionType),
      resolve() {
        return prisma.region.findMany();
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
          prisma.monthPerformance.findMany(),
          prisma.todaySales.findMany(),
          prisma.totalProfitProduct.findMany(),
          prisma.totalProfitMonth.findMany(),
          prisma.yearOverview.findMany(),
          prisma.marketMetrics.findMany(),
          prisma.revenueDistribution.findMany(),
        ]).then(
          ([
            assets,
            performance,
            todaySales,
            totalProfitProducts,
            totalProfitSales,
            yearOverview,
            marketMetrics,
            revenueDistribution,
          ]) => ({
            assetPerformance: assets,
            performance,
            todaySales,
            totalProfitProducts,
            totalProfitSales,
            yearOverview,
            marketMetrics,
            revenueDistribution,
          })
        );
      },
    },
    homepage: {
      type: HomepageType,
      resolve() {
        return Promise.all([
          prisma.bestSellingProduct.findMany(),
          prisma.customerSatisfaction.findMany(),
          prisma.homeSmallCard.findMany(),
          prisma.revenueOverTime.findMany(),
          prisma.revenuePerCountry.findMany(),
          prisma.weeklyPerformance.findMany(),
          prisma.weeklyActivity.findMany(),
        ]).then(
          ([
            bestSellingProducts,
            customerSatisfaction,
            homeSmallCards,
            revenueOverTime,
            revenuePerCountry,
            weeklyPerformance,
            weeklyActivities,
          ]) => ({
            bestSellingProducts,
            customerSatisfaction,
            homeSmallCards,
            revenueOverTime,
            revenuePerCountry,
            weeklyPerformance,
            weeklyActivities,
          })
        );
      },
    },
    homepage2: {
      type: Homepage2Type,
      resolve() {
        return Promise.all([
          prisma.bestSellingProduct.findMany(),
          prisma.customerSatisfaction.findMany(),
          prisma.homeSmallCard2.findMany(),
          prisma.region.findMany(),
          prisma.revenueOverTime.findMany(),
          prisma.revenuePerCountry.findMany(),
        ]).then(
          ([
            bestSellingProducts,
            customerSatisfaction,
            homeSmallCards,
            regions,
            revenueOverTime,
            revenuePerCountry,
          ]) => ({
            bestSellingProducts,
            customerSatisfaction,
            homeSmallCards,
            regions,
            revenueOverTime,
            revenuePerCountry,
          })
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
    HomeSmallCardType,
    HomeSmallCard2Type,
    MonthPerformanceType,
    NotificationType,
    OrderType,
    ProductType,
    RegionType,
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
    Homepage2Type,
  ],
});

export default schema;

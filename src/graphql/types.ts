import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
} from "graphql";
import { GraphQLJSON } from "graphql-type-json";

// Asset Type
export const AssetType = new GraphQLObjectType({
  name: "Asset",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    industry: { type: GraphQLString },
    sales: { type: GraphQLInt },
    delta: { type: GraphQLFloat },
    deltaType: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// BestSellingProduct Type
export const BestSellingProductType = new GraphQLObjectType({
  name: "BestSellingProduct",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    profit: { type: GraphQLFloat },
    revenue: { type: GraphQLFloat },
  }),
});

// Customer Type
export const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    photo: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    phone: { type: GraphQLString },
    totalBuys: { type: GraphQLInt },
  }),
});

// CustomerSatisfaction Type
export const CustomerSatisfactionType = new GraphQLObjectType({
  name: "CustomerSatisfaction",
  fields: () => ({
    id: { type: GraphQLString },
    brandName: { type: GraphQLString },
    customerSatisfaction: { type: GraphQLFloat },
    totalSales: { type: GraphQLInt },
    numberOfOrders: { type: GraphQLInt },
  }),
});

// Event Type
export const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    eventId: { type: GraphQLInt },
    title: { type: GraphQLString },
  }),
});

// HomeSmallCard Type
export const HomeSmallCardType = new GraphQLObjectType({
  name: "HomeSmallCard",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    metric: { type: GraphQLString },
    metricPrev: { type: GraphQLString },
    delta: { type: GraphQLString },
    deltaType: { type: GraphQLString },
    color: { type: GraphQLString },
    increased: { type: GraphQLBoolean },
    changeValue: { type: GraphQLFloat },
    changeText: { type: GraphQLString },
    chartData: { type: GraphQLJSON },
  }),
});

// HomeSmallCard2 Type (for Homepage 2)
export const HomeSmallCard2Type = new GraphQLObjectType({
  name: "HomeSmallCard2",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    metric: { type: GraphQLString },
    metricPrev: { type: GraphQLString },
    delta: { type: GraphQLString },
    deltaType: { type: GraphQLString },
    color: { type: GraphQLString },
    increased: { type: GraphQLBoolean },
    changeValue: { type: GraphQLFloat },
    changeText: { type: GraphQLString },
    chartData: { type: GraphQLJSON },
  }),
});

// WeeklyPerformance Type
export const WeeklyPerformanceType = new GraphQLObjectType({
  name: "WeeklyPerformance",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    revenue: { type: GraphQLFloat },
    profit: { type: GraphQLFloat },
  }),
});

// WeeklyActivity Type
export const WeeklyActivityType = new GraphQLObjectType({
  name: "WeeklyActivity",
  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: GraphQLString },
    action: { type: GraphQLString },
    time: { type: GraphQLString },
    icon: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});

// Notification Type
export const NotificationType = new GraphQLObjectType({
  name: "Notification",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    time: { type: GraphQLString },
    icon: { type: GraphQLString },
    isNew: { type: GraphQLBoolean },
  }),
});

// MonthPerformance Type
export const MonthPerformanceType = new GraphQLObjectType({
  name: "MonthPerformance",
  fields: () => ({
    id: { type: GraphQLString },
    month: { type: GraphQLString },
    sales: { type: GraphQLFloat },
    profit: { type: GraphQLFloat },
  }),
});

// Order Type
export const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLString },
    orderId: { type: GraphQLInt },
    productName: { type: GraphQLString },
    user: { type: GraphQLString },
    price: { type: GraphQLFloat },
    deliveryType: { type: GraphQLString },
    date: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// Product Type
export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLString },
    productId: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    type: { type: GraphQLString },
    image: { type: GraphQLString },
    parameters: { type: GraphQLJSON },
    metrics: { type: GraphQLJSON },
  }),
});

// RevenuePerCountry Type
export const RevenuePerCountryType = new GraphQLObjectType({
  name: "RevenuePerCountry",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }),
});

// Region Type
export const RegionType = new GraphQLObjectType({
  name: "Region",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    region: { type: GraphQLString },
    sales: { type: GraphQLInt },
    delta: { type: GraphQLString },
    deltaType: { type: GraphQLString },
  }),
});

// RevenueOverTime Type
export const RevenueOverTimeType = new GraphQLObjectType({
  name: "RevenueOverTime",
  fields: () => ({
    id: { type: GraphQLString },
    date: { type: GraphQLString },
    websiteSales: { type: GraphQLInt },
    inStoreSales: { type: GraphQLInt },
  }),
});

// TodaySales Type
export const TodaySalesType = new GraphQLObjectType({
  name: "TodaySales",
  fields: () => ({
    id: { type: GraphQLString },
    hour: { type: GraphQLString },
    today: { type: GraphQLInt },
    average: { type: GraphQLInt },
    yesterday: { type: GraphQLInt },
  }),
});

// TotalProfitMonth Type
export const TotalProfitMonthType = new GraphQLObjectType({
  name: "TotalProfitMonth",
  fields: () => ({
    id: { type: GraphQLString },
    month: { type: GraphQLString },
    sales: { type: GraphQLFloat },
  }),
});

// TotalProfitProducts Type
export const TotalProfitProductsType = new GraphQLObjectType({
  name: "TotalProfitProducts",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    value: { type: GraphQLFloat },
    metric: { type: GraphQLString },
  }),
});

// YearOverview Type
export const YearOverviewType = new GraphQLObjectType({
  name: "YearOverview",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    phones: { type: GraphQLInt },
    tablets: { type: GraphQLInt },
    laptops: { type: GraphQLInt },
  }),
});

// MarketMetrics Type
export const MarketMetricsType = new GraphQLObjectType({
  name: "MarketMetrics",
  fields: () => ({
    id: { type: GraphQLString },
    metric: { type: GraphQLString },
    phones: { type: GraphQLInt },
    maxValue: { type: GraphQLInt },
    laptops: { type: GraphQLInt },
  }),
});

// RevenueDistribution Type
export const RevenueDistributionType = new GraphQLObjectType({
  name: "RevenueDistribution",
  fields: () => ({
    id: { type: GraphQLString },
    category: { type: GraphQLString },
    inStore: { type: GraphQLInt },
    online: { type: GraphQLInt },
  }),
});

export const AnalyticsType = new GraphQLObjectType({
  name: "Analytics",
  fields: () => ({
    assetPerformance: { type: new GraphQLList(AssetType) },
    performance: { type: new GraphQLList(MonthPerformanceType) },
    todaySales: { type: new GraphQLList(TodaySalesType) },
    totalProfitProducts: { type: new GraphQLList(TotalProfitProductsType) },
    totalProfitSales: { type: new GraphQLList(TotalProfitMonthType) },
    yearOverview: { type: new GraphQLList(YearOverviewType) },
    marketMetrics: { type: new GraphQLList(MarketMetricsType) },
    revenueDistribution: { type: new GraphQLList(RevenueDistributionType) },
  }),
});

export const HomepageType = new GraphQLObjectType({
  name: "Homepage",
  fields: () => ({
    bestSellingProducts: { type: new GraphQLList(BestSellingProductType) },
    customerSatisfaction: { type: new GraphQLList(CustomerSatisfactionType) },
    homeSmallCards: { type: new GraphQLList(HomeSmallCardType) },
    revenueOverTime: { type: new GraphQLList(RevenueOverTimeType) },
    revenuePerCountry: { type: new GraphQLList(RevenuePerCountryType) },
    weeklyPerformance: { type: new GraphQLList(WeeklyPerformanceType) },
    weeklyActivities: { type: new GraphQLList(WeeklyActivityType) },
  }),
});

export const Homepage2Type = new GraphQLObjectType({
  name: "Homepage2",
  fields: () => ({
    bestSellingProducts: { type: new GraphQLList(BestSellingProductType) },
    customerSatisfaction: { type: new GraphQLList(CustomerSatisfactionType) },
    homeSmallCards: { type: new GraphQLList(HomeSmallCard2Type) },
    regions: { type: new GraphQLList(RegionType) },
    revenueOverTime: { type: new GraphQLList(RevenueOverTimeType) },
    revenuePerCountry: { type: new GraphQLList(RevenuePerCountryType) },
  }),
});

type HomeSmallCardChartData = {
  date: string;
  metric: number;
};

type HomeSmallCard = {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: string;
  color: string;
  increased: boolean;
  changeValue: number;
  changeText: string;
  chartData: HomeSmallCardChartData[];
};

export const homeSmallCardsData: HomeSmallCard[] = [
  {
    title: "Sales",
    metric: "$12,699",
    metricPrev: "$ 9,456",
    delta: "34.3%",
    deltaType: "moderateIncrease",
    color: "purple",
    increased: true,
    changeValue: 12.5,
    changeText: "Last 3 weeks",
    chartData: [
      { date: "08.10.23", metric: 445 },
      { date: "11.10.23", metric: 743 },
      { date: "14.10.23", metric: 488 },
      { date: "17.10.23", metric: 788 },
      { date: "20.10.23", metric: 1488 },
      { date: "23.10.23", metric: 2088 },
      { date: "26.10.23", metric: 1188 },
      { date: "29.10.23", metric: 420 },
      { date: "01.11.23", metric: 650 },
    ],
  },
  {
    title: "Profit",
    metric: "$40,598",
    metricPrev: "$ 45,564",
    delta: "10.9%",
    deltaType: "moderateDecrease",
    color: "cyan",
    increased: true,
    changeValue: 36.5,
    changeText: "Last month",
    chartData: [
      { date: "02.10.23", metric: 2850 },
      { date: "06.10.23", metric: 4150 },
      { date: "10.10.23", metric: 2350 },
      { date: "14.10.23", metric: 1950 },
      { date: "18.10.23", metric: 3150 },
      { date: "22.10.23", metric: 2550 },
      { date: "26.10.23", metric: 4350 },
      { date: "30.10.23", metric: 3450 },
      { date: "01.11.23", metric: 4850 },
    ],
  },
  {
    title: "Traffic",
    metric: "12072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
    color: "purple",
    increased: false,
    changeValue: 5.4,
    changeText: "Yesterday",
    chartData: [
      { date: "26.10.23 00:00", metric: 3100 },
      { date: "26.10.23 03:00", metric: 3900 },
      { date: "26.10.23 06:00", metric: 2700 },
      { date: "26.10.23 09:00", metric: 4300 },
      { date: "26.10.23 12:00", metric: 4500 },
      { date: "26.10.23 15:00", metric: 1800 },
      { date: "26.10.23 18:00", metric: 2600 },
      { date: "26.10.23 21:00", metric: 3200 },
      { date: "26.10.23 23:59", metric: 2300 },
    ],
  },
  {
    title: "Customers",
    metric: "1042",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
    color: "cyan",
    increased: true,
    changeValue: 22.7,
    changeText: "Last week",
    chartData: [
      { date: "02.10.23", metric: 1050 },
      { date: "06.10.23", metric: 1780 },
      { date: "10.10.23", metric: 890 },
      { date: "14.10.23", metric: 1520 },
      { date: "18.10.23", metric: 980 },
      { date: "22.10.23", metric: 1210 },
      { date: "26.10.23", metric: 440 },
      { date: "30.10.23", metric: 730 },
      { date: "01.11.23", metric: 1390 },
    ],
  },
];

type Asset = {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: string;
  status: string;
};

export const assetPerformanceData: Asset[] = [
  {
    name: "Quantum Edge Systems",
    industry: "tech",
    sales: 984888,
    delta: 61.3,
    deltaType: "increase",
    status: "emerald",
  },
  {
    name: "Ferron Steel AG",
    industry: "health",
    sales: 456700,
    delta: 32.8,
    deltaType: "moderateDecrease",
    status: "emerald",
  },
  {
    name: "Nexora Analytics Inc.",
    industry: "Tech",
    sales: 390800,
    delta: -18.3,
    deltaType: "moderateDecrease",
    status: "rose",
  },
  {
    name: "Velora Holding",
    industry: "manufacturing",
    sales: 240000,
    delta: 19.4,
    deltaType: "moderateIncrease",
    status: "emerald",
  },
  {
    name: "Opal Bridge Holding",
    industry: "health",
    sales: 190800,
    delta: -19.4,
    deltaType: "moderateIncrease",
    status: "rose",
  },
  {
    name: "Syntera Technologies Ltd.",
    industry: "tech",
    sales: 164400,
    delta: -32.8,
    deltaType: "decrease",
    status: "rose",
  },
  {
    name: "Ironpeak Industries Inc.",
    industry: "manufacturing",
    sales: 139800,
    delta: -40.1,
    deltaType: "moderateIncrease",
    status: "rose",
  },
  {
    name: "Creston Holding",
    industry: "health",
    sales: 456700,
    delta: 32.8,
    deltaType: "moderateDecrease",
    status: "emerald",
  },
];

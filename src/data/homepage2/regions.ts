type Region = {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: string;
};

export const regionsData: Region[] = [
  {
    name: "North America",
    region: "us",
    sales: 875000,
    delta: "5.7%",
    deltaType: "increase",
  },
  {
    name: "Europe",
    region: "europe",
    sales: 560000,
    delta: "2.8%",
    deltaType: "moderateDecrease",
  },
];

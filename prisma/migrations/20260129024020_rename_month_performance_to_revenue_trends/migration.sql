/*
  Warnings:

  - You are about to drop the `month_performance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "month_performance";

-- CreateTable
CREATE TABLE "revenue_trends" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "sales" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "revenue_trends_pkey" PRIMARY KEY ("id")
);

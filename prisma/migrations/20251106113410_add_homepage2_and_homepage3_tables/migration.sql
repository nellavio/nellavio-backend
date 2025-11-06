/*
  Warnings:

  - You are about to drop the `old_home_small_cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."old_home_small_cards";

-- CreateTable
CREATE TABLE "home_small_cards_2" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "metricPrev" TEXT NOT NULL,
    "delta" TEXT NOT NULL,
    "deltaType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "increased" BOOLEAN NOT NULL,
    "changeValue" DOUBLE PRECISION NOT NULL,
    "changeText" TEXT NOT NULL,
    "chartData" JSONB NOT NULL,

    CONSTRAINT "home_small_cards_2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_small_cards_3" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "metricPrev" TEXT NOT NULL,
    "delta" TEXT NOT NULL,
    "deltaType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "increased" BOOLEAN NOT NULL,
    "changeValue" DOUBLE PRECISION NOT NULL,
    "changeText" TEXT NOT NULL,
    "chartData" JSONB NOT NULL,

    CONSTRAINT "home_small_cards_3_pkey" PRIMARY KEY ("id")
);

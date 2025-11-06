-- Step 1: Rename old_home_small_cards to home_small_cards_2
ALTER TABLE IF EXISTS "old_home_small_cards" RENAME TO "home_small_cards_2";

-- Step 2: Create home_small_cards_3 table (copy of structure)
CREATE TABLE IF NOT EXISTS "home_small_cards_3" (
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

-- Step 3: Copy data from home_small_cards to home_small_cards_3
INSERT INTO "home_small_cards_3" 
SELECT * FROM "home_small_cards"
ON CONFLICT DO NOTHING;

/*
  Warnings:

  - You are about to drop the column `revenue` on the `best_selling_products` table. All the data in the column will be lost.
  - Added the required column `sales` to the `best_selling_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "best_selling_products" RENAME COLUMN "revenue" TO "sales";

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "assets_status_idx" ON "assets"("status");

-- CreateIndex
CREATE INDEX "customers_country_idx" ON "customers"("country");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_orderId_idx" ON "orders"("orderId");

-- CreateIndex
CREATE INDEX "products_type_idx" ON "products"("type");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

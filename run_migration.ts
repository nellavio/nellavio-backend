import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function runMigration() {
  try {
    console.log("🔄 Reading migration SQL...");
    const sql = fs.readFileSync(
      path.join(process.cwd(), "manual_migration.sql"),
      "utf-8"
    );

    console.log("🔄 Executing migration...");
    await prisma.$executeRawUnsafe(sql);

    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();

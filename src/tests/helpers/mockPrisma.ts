import { DeepMockProxy } from "vitest-mock-extended";

import { prisma } from "../../db.js";
import { PrismaClient } from "../../generated/prisma/client.js";

/**
 * Type-safe deep mock of PrismaClient
 * Use in tests to control what Prisma returns:
 *
 * mockPrisma.product.findMany.mockResolvedValue([{ id: "1", ... }])
 */
export const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

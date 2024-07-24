import { PrismaClient } from "@prisma/client";
import { IS_PROD } from "~/common/constants";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (!IS_PROD) globalForPrisma.prisma = db;

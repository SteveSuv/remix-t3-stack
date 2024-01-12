import { PrismaClient } from "@prisma/client";
import { isProd } from "~/utils/constant";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (!isProd) globalForPrisma.prisma = db;

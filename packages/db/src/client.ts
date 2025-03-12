import { PrismaClient } from '@prisma/client';
import { isProd } from '@ultra-reporter/utils/constants';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (!isProd) {
  globalForPrisma.prisma = db;
}

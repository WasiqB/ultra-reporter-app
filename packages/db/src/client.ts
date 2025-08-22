import { PrismaClient } from '@prisma/client';
import { isDev } from '@ultra-reporter/utils/constants';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (isDev) global.prisma = db;

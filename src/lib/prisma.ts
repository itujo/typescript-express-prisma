import { PrismaClient } from '@prisma/client';

const prisma =
  process.env.NODE_ENV === 'development'
    ? new PrismaClient({
        log: ['info', 'warn', 'error', 'query'],
      })
    : new PrismaClient();

export { prisma };

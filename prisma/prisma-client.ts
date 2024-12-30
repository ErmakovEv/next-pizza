import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  interface Global {
    prismaGlobal?: PrismaClient;
  }
}

export const prisma =
  (global as typeof global & { prismaGlobal?: PrismaClient }).prismaGlobal ??
  prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  (global as typeof global & { prismaGlobal?: PrismaClient }).prismaGlobal =
    prisma;
}

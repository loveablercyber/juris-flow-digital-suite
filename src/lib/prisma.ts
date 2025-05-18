import { PrismaClient } from '@prisma/client';

// Declaração do tipo global para o cliente Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Criação do cliente Prisma como singleton
export const prisma = global.prisma || new PrismaClient();

// Em desenvolvimento, mantém a instância global
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma; 
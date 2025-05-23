// Importando o Prisma Client de forma compatível com ES Modules
import { PrismaClient } from '@prisma/client';

// Verifica se estamos no ambiente do navegador
const isBrowser = typeof window !== 'undefined';

// Criação do cliente Prisma como singleton
// No navegador, não criamos uma instância do Prisma
// No servidor, criamos uma instância única
const prisma = isBrowser 
  ? null 
  : new PrismaClient();

export default prisma; 
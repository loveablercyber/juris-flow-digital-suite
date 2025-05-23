// Importando o cliente Prisma do arquivo compatível com ES Modules
import prismaClient from './prisma-client.js';

// Declaração do tipo global para o cliente Prisma
declare global {
  var prisma: typeof prismaClient | undefined;
  
  // Definindo o tipo ModelName manualmente
  namespace Prisma {
    type ModelName = 
      | 'User'
      | 'Profile'
      | 'Process'
      | 'Document'
      | 'Appointment'
      | 'Payment'
      | 'Task'
      | 'Note'
      | 'Message'
      | 'Attendance'
      | 'Notification';
  }
}

// Verifica se estamos no ambiente do navegador
const isBrowser = typeof window !== 'undefined';

// Criação do cliente Prisma como singleton
// No navegador, não criamos uma instância do Prisma
// No servidor, criamos uma instância única
export const prisma = isBrowser 
  ? null 
  : (global.prisma || prismaClient);

// Em desenvolvimento no servidor, mantém a instância global
if (!isBrowser && process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma; 
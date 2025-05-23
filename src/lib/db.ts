import { PrismaClient } from '@prisma/client';
import { Process, Client, Document, Payment, Task, Note, Appointment } from '@/types/database';

const prisma = new PrismaClient();

// Verifica se estamos no ambiente do navegador
const isBrowser = typeof window !== 'undefined';

// Função para verificar se o Prisma está disponível
const checkPrisma = () => {
  if (isBrowser) {
    throw new Error('Prisma não pode ser usado no navegador. Use a API em vez disso.');
  }
  return prisma;
};

// Serviço para gerenciar usuários
export const userService = {
  // Criar um novo usuário
  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role: 'ADMIN' | 'ADVOGADO' | 'CLIENTE';
  }) {
    const db = checkPrisma();
    return db.user.create({
      data: {
        ...data,
        profile: {
          create: {}
        }
      },
      include: {
        profile: true
      }
    });
  },

  // Buscar usuário por email
  async findByEmail(email: string) {
    const db = checkPrisma();
    return db.user.findUnique({
      where: { email },
      include: {
        profile: true
      }
    });
  },

  // Buscar usuário por ID
  async findById(id: string) {
    const db = checkPrisma();
    return db.user.findUnique({
      where: { id },
      include: {
        profile: true
      }
    });
  },

  // Atualizar usuário
  async updateUser(id: string, data: any) {
    const db = checkPrisma();
    return db.user.update({
      where: { id },
      data,
      include: {
        profile: true
      }
    });
  },

  // Buscar advogados online (limitado a N)
  async findOnlineLawyers(limit: number) {
    const db = checkPrisma();
    return db.user.findMany({
      where: {
        role: 'ADVOGADO',
        isOnline: true
      },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        whatsappNumber: true,
        isOnline: true
      }
    });
  }
};

// Serviço para gerenciar clientes
export const clientService = {
  async listByUser(userId: string): Promise<Client[]> {
    const db = checkPrisma();
    return db.client.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findById(id: string): Promise<Client | null> {
    const db = checkPrisma();
    return db.client.findUnique({
      where: { id }
    });
  },

  async createClient(data: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    status: 'active' | 'inactive';
    userId: string;
  }): Promise<Client> {
    const db = checkPrisma();
    return db.client.create({
      data: {
        ...data,
        user: {
          connect: { id: data.userId }
        }
      }
    });
  },

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    const db = checkPrisma();
    return db.client.update({
      where: { id },
      data,
      include: {
        user: true
      }
    });
  },

  async deleteClient(id: string): Promise<void> {
    const db = checkPrisma();
    await db.client.delete({
      where: { id }
    });
  }
};

// Serviço para gerenciar processos
export const processService = {
  async listByUser(userId: string): Promise<Process[]> {
    const db = checkPrisma();
    return db.process.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findById(id: string): Promise<Process | null> {
    const db = checkPrisma();
    return db.process.findUnique({
      where: { id }
    });
  },

  async createProcess(data: {
    number: string;
    title: string;
    description?: string;
    type: string;
    area: string;
    status?: 'AGUARDANDO' | 'EM_ANDAMENTO' | 'ARQUIVADO' | 'CONCLUIDO';
    court?: string;
    judge?: string;
    instance?: string;
    priority?: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
    emergency?: boolean;
    startDate: Date;
    nextHearing?: Date;
    distributionDate?: Date;
    userId: string;
    clientId?: string;
  }): Promise<Process> {
    const db = checkPrisma();
    return db.process.create({
      data: {
        ...data,
        status: data.status || 'AGUARDANDO',
        priority: data.priority || 'MEDIA',
        emergency: data.emergency || false
      }
    });
  },

  async updateProcess(id: string, data: Partial<Process>): Promise<Process> {
    const db = checkPrisma();
    return db.process.update({
      where: { id },
      data
    });
  }
};

// Serviço para gerenciar documentos
export const documentService = {
  async listByProcess(processId: string): Promise<Document[]> {
    const db = checkPrisma();
    return db.document.findMany({
      where: { processId },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findById(id: string): Promise<Document | null> {
    const db = checkPrisma();
    return db.document.findUnique({
      where: { id }
    });
  },

  async createDocument(data: {
    name: string;
    type: string;
    description?: string;
    fileUrl: string;
    tags: string[];
    userId: string;
    processId?: string;
  }): Promise<Document> {
    const db = checkPrisma();
    return db.document.create({
      data
    });
  }
};

// Serviço para gerenciar pagamentos
export const paymentService = {
  async listByProcess(processId: string): Promise<Payment[]> {
    const db = checkPrisma();
    return db.payment.findMany({
      where: { processId },
      orderBy: { dueDate: 'asc' }
    });
  },

  async findById(id: string): Promise<Payment | null> {
    const db = checkPrisma();
    return db.payment.findUnique({
      where: { id }
    });
  },

  async createPayment(data: {
    amount: number;
    description: string;
    type: 'HONORARIOS' | 'CUSTAS' | 'CONSULTA';
    status?: 'PENDENTE' | 'PAGO' | 'ATRASADO' | 'CANCELADO';
    dueDate: Date;
    paymentDate?: Date;
    paymentMethod?: string;
    processId: string;
  }): Promise<Payment> {
    const db = checkPrisma();
    return db.payment.create({
      data: {
        ...data,
        status: data.status || 'PENDENTE'
      }
    });
  }
};

// Serviço para gerenciar tarefas
export const taskService = {
  async findByProcess(processId: string): Promise<Task[]> {
    const db = checkPrisma();
    return db.task.findMany({
      where: { processId },
      orderBy: { dueDate: 'asc' }
    });
  },

  async findById(id: string): Promise<Task | null> {
    const db = checkPrisma();
    return db.task.findUnique({
      where: { id }
    });
  },

  async create(data: {
    title: string;
    description: string;
    status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
    dueDate: Date;
    processId: string;
  }): Promise<Task> {
    const db = checkPrisma();
    return db.task.create({
      data
    });
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const db = checkPrisma();
    return db.task.update({
      where: { id },
      data
    });
  },

  async delete(id: string): Promise<void> {
    const db = checkPrisma();
    await db.task.delete({
      where: { id }
    });
  }
};

// Serviço para gerenciar notas
export const noteService = {
  async findByProcess(processId: string): Promise<Note[]> {
    const db = checkPrisma();
    return db.note.findMany({
      where: { processId },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findById(id: string): Promise<Note | null> {
    const db = checkPrisma();
    return db.note.findUnique({
      where: { id }
    });
  },

  async create(data: {
    content: string;
    processId: string;
    userId: string;
  }): Promise<Note> {
    const db = checkPrisma();
    return db.note.create({
      data
    });
  },

  async update(id: string, data: Partial<Note>): Promise<Note> {
    const db = checkPrisma();
    return db.note.update({
      where: { id },
      data
    });
  },

  async delete(id: string): Promise<void> {
    const db = checkPrisma();
    await db.note.delete({
      where: { id }
    });
  }
};

// Serviço para gerenciar compromissos
export const appointmentService = {
  async findByUser(userId: string): Promise<Appointment[]> {
    const db = checkPrisma();
    return db.appointment.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' }
    });
  },

  async findById(id: string): Promise<Appointment | null> {
    const db = checkPrisma();
    return db.appointment.findUnique({
      where: { id }
    });
  },

  async create(data: {
    title: string;
    description: string;
    type: 'AUDIENCIA' | 'REUNIAO' | 'CONSULTA';
    status: 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'REALIZADO';
    startDate: Date;
    endDate: Date;
    location?: string;
    processId?: string;
    userId: string;
  }): Promise<Appointment> {
    const db = checkPrisma();
    return db.appointment.create({
      data
    });
  },

  async update(id: string, data: Partial<Appointment>): Promise<Appointment> {
    const db = checkPrisma();
    return db.appointment.update({
      where: { id },
      data
    });
  },

  async delete(id: string): Promise<void> {
    const db = checkPrisma();
    await db.appointment.delete({
      where: { id }
    });
  }
};

/**
 * Serviço para gerenciar mensagens
 */
export const messageService = {
  /**
   * Busca todas as mensagens de um processo
   * @param processId ID do processo
   * @returns Lista de mensagens
   */
  async findByProcess(processId: string) {
    const db = checkPrisma();
    return db.message.findMany({
      where: { processId }
    });
  },

  /**
   * Busca uma mensagem pelo ID
   * @param id ID da mensagem
   * @returns Mensagem encontrada ou null
   */
  async findById(id: string) {
    const db = checkPrisma();
    return db.message.findUnique({
      where: { id }
    });
  },

  /**
   * Cria uma nova mensagem
   * @param data Dados da mensagem
   * @returns Mensagem criada
   */
  async create(data: {
    content: string;
    processId: string;
    senderId: string;
    receiverId: string;
  }) {
    const db = checkPrisma();
    return db.message.create({
      data
    });
  },

  /**
   * Atualiza uma mensagem
   * @param id ID da mensagem
   * @param data Dados da mensagem
   * @returns Mensagem atualizada
   */
  async update(id: string, data: any) {
    const db = checkPrisma();
    return db.message.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui uma mensagem
   * @param id ID da mensagem
   */
  async delete(id: string) {
    const db = checkPrisma();
    await db.message.delete({
      where: { id }
    });
  }
};

/**
 * Serviço para gerenciar atendimentos
 */
export const attendanceService = {
  /**
   * Busca todos os atendimentos de um processo
   * @param processId ID do processo
   * @returns Lista de atendimentos
   */
  async findByProcess(processId: string) {
    const db = checkPrisma();
    return db.attendance.findMany({
      where: { processId }
    });
  },

  /**
   * Busca um atendimento pelo ID
   * @param id ID do atendimento
   * @returns Atendimento encontrado ou null
   */
  async findById(id: string) {
    const db = checkPrisma();
    return db.attendance.findUnique({
      where: { id }
    });
  },

  /**
   * Cria um novo atendimento
   * @param data Dados do atendimento
   * @returns Atendimento criado
   */
  async create(data: {
    description: string;
    processId: string;
    userId: string;
  }) {
    const db = checkPrisma();
    return db.attendance.create({
      data
    });
  },

  /**
   * Atualiza um atendimento
   * @param id ID do atendimento
   * @param data Dados do atendimento
   * @returns Atendimento atualizado
   */
  async update(id: string, data: any) {
    const db = checkPrisma();
    return db.attendance.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui um atendimento
   * @param id ID do atendimento
   */
  async delete(id: string) {
    const db = checkPrisma();
    await db.attendance.delete({
      where: { id }
    });
  }
};

/**
 * Serviço para gerenciar notificações
 */
export const notificationService = {
  /**
   * Busca todas as notificações de um usuário
   * @param userId ID do usuário
   * @returns Lista de notificações
   */
  async findByUser(userId: string) {
    const db = checkPrisma();
    return db.notification.findMany({
      where: { userId }
    });
  },

  /**
   * Busca uma notificação pelo ID
   * @param id ID da notificação
   * @returns Notificação encontrada ou null
   */
  async findById(id: string) {
    const db = checkPrisma();
    return db.notification.findUnique({
      where: { id }
    });
  },

  /**
   * Cria uma nova notificação
   * @param data Dados da notificação
   * @returns Notificação criada
   */
  async create(data: {
    title: string;
    message: string;
    userId: string;
    processId?: string;
  }) {
    const db = checkPrisma();
    return db.notification.create({
      data
    });
  },

  /**
   * Atualiza uma notificação
   * @param id ID da notificação
   * @param data Dados da notificação
   * @returns Notificação atualizada
   */
  async update(id: string, data: any) {
    const db = checkPrisma();
    return db.notification.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui uma notificação
   * @param id ID da notificação
   */
  async delete(id: string) {
    const db = checkPrisma();
    await db.notification.delete({
      where: { id }
    });
  }
}; 
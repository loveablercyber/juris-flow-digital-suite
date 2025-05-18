import prisma from './prisma';

// Serviço para gerenciar usuários
export const userService = {
  // Criar um novo usuário
  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role: 'ADMIN' | 'ADVOGADO' | 'CLIENTE';
  }) {
    return prisma.user.create({
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
    return prisma.user.findUnique({
      where: { email },
      include: {
        profile: true
      }
    });
  },

  // Buscar usuário por ID
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: true
      }
    });
  },

  // Atualizar usuário
  async updateUser(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        profile: true
      }
    });
  }
};

// Serviço para gerenciar processos
export const processService = {
  // Criar um novo processo
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
  }) {
    return prisma.process.create({
      data: {
        ...data,
        users: {
          connect: { id: data.userId }
        }
      },
      include: {
        users: true,
        documents: true,
        appointments: true,
        payments: true,
        tasks: true,
        notes: true
      }
    });
  },

  // Buscar processo por ID
  async findById(id: string) {
    return prisma.process.findUnique({
      where: { id },
      include: {
        users: true,
        documents: true,
        appointments: true,
        payments: true,
        tasks: true,
        notes: true
      }
    });
  },

  // Listar processos de um usuário
  async listByUser(userId: string) {
    return prisma.process.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        users: true,
        documents: true,
        appointments: true,
        payments: true,
        tasks: true,
        notes: true
      }
    });
  },

  // Atualizar processo
  async updateProcess(id: string, data: any) {
    return prisma.process.update({
      where: { id },
      data,
      include: {
        users: true,
        documents: true,
        appointments: true,
        payments: true,
        tasks: true,
        notes: true
      }
    });
  }
};

// Serviço para gerenciar documentos
export const documentService = {
  // Criar um novo documento
  async createDocument(data: {
    name: string;
    type: string;
    description?: string;
    fileUrl: string;
    tags: string[];
    userId: string;
    processId?: string;
  }) {
    return prisma.document.create({
      data,
      include: {
        user: true,
        process: true
      }
    });
  },

  // Buscar documento por ID
  async findById(id: string) {
    return prisma.document.findUnique({
      where: { id },
      include: {
        user: true,
        process: true
      }
    });
  },

  // Listar documentos de um processo
  async listByProcess(processId: string) {
    return prisma.document.findMany({
      where: { processId },
      include: {
        user: true,
        process: true
      }
    });
  }
};

// Serviço para gerenciar agendamentos
export const appointmentService = {
  // Criar um novo agendamento
  async createAppointment(data: {
    title: string;
    description?: string;
    type: 'PRESENCIAL' | 'VIDEO' | 'TELEFONE';
    status?: 'AGENDADO' | 'CONCLUIDO' | 'CANCELADO' | 'REMARCADO';
    startTime: Date;
    endTime: Date;
    location?: string;
    link?: string;
    userId: string;
    processId?: string;
  }) {
    return prisma.appointment.create({
      data,
      include: {
        user: true,
        process: true
      }
    });
  },

  // Buscar agendamento por ID
  async findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
        process: true
      }
    });
  },

  // Listar agendamentos de um usuário
  async listByUser(userId: string) {
    return prisma.appointment.findMany({
      where: { userId },
      include: {
        user: true,
        process: true
      }
    });
  }
};

// Serviço para gerenciar pagamentos
export const paymentService = {
  // Criar um novo pagamento
  async createPayment(data: {
    amount: number;
    description: string;
    type: 'HONORARIOS' | 'CUSTAS' | 'CONSULTA';
    status?: 'PENDENTE' | 'PAGO' | 'ATRASADO' | 'CANCELADO';
    dueDate: Date;
    paymentDate?: Date;
    paymentMethod?: string;
    processId: string;
  }) {
    return prisma.payment.create({
      data,
      include: {
        process: true
      }
    });
  },

  // Buscar pagamento por ID
  async findById(id: string) {
    return prisma.payment.findUnique({
      where: { id },
      include: {
        process: true
      }
    });
  },

  // Listar pagamentos de um processo
  async listByProcess(processId: string) {
    return prisma.payment.findMany({
      where: { processId },
      include: {
        process: true
      }
    });
  }
};

/**
 * Serviço para gerenciar tarefas
 */
export const taskService = {
  /**
   * Busca todas as tarefas de um processo
   * @param processId ID do processo
   * @returns Lista de tarefas
   */
  async findByProcess(processId: string) {
    return await prisma.task.findMany({
      where: { processId }
    });
  },

  /**
   * Busca uma tarefa pelo ID
   * @param id ID da tarefa
   * @returns Tarefa encontrada ou null
   */
  async findById(id: string) {
    return await prisma.task.findUnique({
      where: { id }
    });
  },

  /**
   * Cria uma nova tarefa
   * @param data Dados da tarefa
   * @returns Tarefa criada
   */
  async create(data: {
    title: string;
    description: string;
    status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
    dueDate: Date;
    processId: string;
  }) {
    return await prisma.task.create({
      data
    });
  },

  /**
   * Atualiza uma tarefa
   * @param id ID da tarefa
   * @param data Dados da tarefa
   * @returns Tarefa atualizada
   */
  async update(id: string, data: any) {
    return await prisma.task.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui uma tarefa
   * @param id ID da tarefa
   */
  async delete(id: string) {
    await prisma.task.delete({
      where: { id }
    });
  }
};

/**
 * Serviço para gerenciar notas
 */
export const noteService = {
  /**
   * Busca todas as notas de um processo
   * @param processId ID do processo
   * @returns Lista de notas
   */
  async findByProcess(processId: string) {
    return await prisma.note.findMany({
      where: { processId }
    });
  },

  /**
   * Busca uma nota pelo ID
   * @param id ID da nota
   * @returns Nota encontrada ou null
   */
  async findById(id: string) {
    return await prisma.note.findUnique({
      where: { id }
    });
  },

  /**
   * Cria uma nova nota
   * @param data Dados da nota
   * @returns Nota criada
   */
  async create(data: {
    content: string;
    processId: string;
    userId: string;
  }) {
    return await prisma.note.create({
      data
    });
  },

  /**
   * Atualiza uma nota
   * @param id ID da nota
   * @param data Dados da nota
   * @returns Nota atualizada
   */
  async update(id: string, data: any) {
    return await prisma.note.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui uma nota
   * @param id ID da nota
   */
  async delete(id: string) {
    await prisma.note.delete({
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
    return await prisma.message.findMany({
      where: { processId }
    });
  },

  /**
   * Busca uma mensagem pelo ID
   * @param id ID da mensagem
   * @returns Mensagem encontrada ou null
   */
  async findById(id: string) {
    return await prisma.message.findUnique({
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
    return await prisma.message.create({
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
    return await prisma.message.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui uma mensagem
   * @param id ID da mensagem
   */
  async delete(id: string) {
    await prisma.message.delete({
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
    return await prisma.attendance.findMany({
      where: { processId }
    });
  },

  /**
   * Busca um atendimento pelo ID
   * @param id ID do atendimento
   * @returns Atendimento encontrado ou null
   */
  async findById(id: string) {
    return await prisma.attendance.findUnique({
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
    return await prisma.attendance.create({
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
    return await prisma.attendance.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui um atendimento
   * @param id ID do atendimento
   */
  async delete(id: string) {
    await prisma.attendance.delete({
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
    return await prisma.notification.findMany({
      where: { userId }
    });
  },

  /**
   * Busca uma notificação pelo ID
   * @param id ID da notificação
   * @returns Notificação encontrada ou null
   */
  async findById(id: string) {
    return await prisma.notification.findUnique({
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
    return await prisma.notification.create({
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
    return await prisma.notification.update({
      where: { id },
      data
    });
  },

  /**
   * Exclui uma notificação
   * @param id ID da notificação
   */
  async delete(id: string) {
    await prisma.notification.delete({
      where: { id }
    });
  }
}; 
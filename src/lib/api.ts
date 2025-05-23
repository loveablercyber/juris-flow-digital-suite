import { processService, clientService, appointmentService, documentService, paymentService, taskService, noteService } from './db';
import { Process, Client, Appointment, Document, Payment, Task, Note } from '@/types/database';

/**
 * API para gerenciar processos
 */
export const processApi = {
  /**
   * Busca todos os processos de um usuário
   * @param userId ID do usuário
   * @returns Lista de processos
   */
  async getAllByUser(userId: string): Promise<Process[]> {
    try {
      return await processService.listByUser(userId);
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
      throw new Error('Não foi possível buscar os processos');
    }
  },

  /**
   * Busca um processo pelo ID
   * @param id ID do processo
   * @returns Processo encontrado ou null
   */
  async getById(id: string): Promise<Process | null> {
    try {
      return await processService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar processo:', error);
      throw new Error('Não foi possível buscar o processo');
    }
  },

  /**
   * Cria um novo processo
   * @param data Dados do processo
   * @returns Processo criado
   */
  async create(data: {
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
  }): Promise<Process> {
    try {
      return await processService.createProcess(data);
    } catch (error) {
      console.error('Erro ao criar processo:', error);
      throw new Error('Não foi possível criar o processo');
    }
  },

  /**
   * Atualiza um processo
   * @param id ID do processo
   * @param data Dados do processo
   * @returns Processo atualizado
   */
  async update(id: string, data: Partial<Process>): Promise<Process> {
    try {
      return await processService.updateProcess(id, data);
    } catch (error) {
      console.error('Erro ao atualizar processo:', error);
      throw new Error('Não foi possível atualizar o processo');
    }
  }
};

/**
 * API para gerenciar clientes
 */
export const clientApi = {
  /**
   * Busca todos os clientes de um usuário
   * @param userId ID do usuário
   * @returns Lista de clientes
   */
  async getAllByUser(userId: string): Promise<Client[]> {
    try {
      return await clientService.listByUser(userId);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw new Error('Não foi possível buscar os clientes');
    }
  },

  /**
   * Busca um cliente pelo ID
   * @param id ID do cliente
   * @returns Cliente encontrado ou null
   */
  async getById(id: string): Promise<Client | null> {
    try {
      return await clientService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw new Error('Não foi possível buscar o cliente');
    }
  },

  /**
   * Cria um novo cliente
   * @param data Dados do cliente
   * @returns Cliente criado
   */
  async create(data: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    status: 'active' | 'inactive';
    userId: string;
  }): Promise<Client> {
    try {
      return await clientService.createClient(data);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw new Error('Não foi possível criar o cliente');
    }
  },

  /**
   * Atualiza um cliente
   * @param id ID do cliente
   * @param data Dados do cliente
   * @returns Cliente atualizado
   */
  async update(id: string, data: Partial<Client>): Promise<Client> {
    try {
      return await clientService.updateClient(id, data);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw new Error('Não foi possível atualizar o cliente');
    }
  },

  /**
   * Exclui um cliente
   * @param id ID do cliente
   * @returns true se o cliente foi excluído
   */
  async delete(id: string): Promise<boolean> {
    try {
      await clientService.deleteClient(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      throw new Error('Não foi possível excluir o cliente');
    }
  }
};

/**
 * API para gerenciar documentos
 */
export const documentApi = {
  /**
   * Busca todos os documentos de um processo
   * @param processId ID do processo
   * @returns Lista de documentos
   */
  async getAllByProcess(processId: string): Promise<Document[]> {
    try {
      return await documentService.listByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw new Error('Não foi possível buscar os documentos');
    }
  },

  /**
   * Busca um documento pelo ID
   * @param id ID do documento
   * @returns Documento encontrado ou null
   */
  async getById(id: string): Promise<Document | null> {
    try {
      return await documentService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
      throw new Error('Não foi possível buscar o documento');
    }
  },

  /**
   * Cria um novo documento
   * @param data Dados do documento
   * @returns Documento criado
   */
  async create(data: {
    name: string;
    type: string;
    description?: string;
    fileUrl: string;
    tags: string[];
    userId: string;
    processId?: string;
  }): Promise<Document> {
    try {
      return await documentService.createDocument(data);
    } catch (error) {
      console.error('Erro ao criar documento:', error);
      throw new Error('Não foi possível criar o documento');
    }
  }
};

/**
 * API para gerenciar pagamentos
 */
export const paymentApi = {
  /**
   * Busca todos os pagamentos de um processo
   * @param processId ID do processo
   * @returns Lista de pagamentos
   */
  async getAllByProcess(processId: string): Promise<Payment[]> {
    try {
      return await paymentService.listByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      throw new Error('Não foi possível buscar os pagamentos');
    }
  },

  /**
   * Busca um pagamento pelo ID
   * @param id ID do pagamento
   * @returns Pagamento encontrado ou null
   */
  async getById(id: string): Promise<Payment | null> {
    try {
      return await paymentService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar pagamento:', error);
      throw new Error('Não foi possível buscar o pagamento');
    }
  },

  /**
   * Cria um novo pagamento
   * @param data Dados do pagamento
   * @returns Pagamento criado
   */
  async create(data: {
    amount: number;
    description: string;
    type: 'HONORARIOS' | 'CUSTAS' | 'CONSULTA';
    status?: 'PENDENTE' | 'PAGO' | 'ATRASADO' | 'CANCELADO';
    dueDate: Date;
    paymentDate?: Date;
    paymentMethod?: string;
    processId: string;
  }): Promise<Payment> {
    try {
      return await paymentService.createPayment(data);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      throw new Error('Não foi possível criar o pagamento');
    }
  }
};

/**
 * API para gerenciar tarefas
 */
export const taskApi = {
  /**
   * Busca todas as tarefas de um processo
   * @param processId ID do processo
   * @returns Lista de tarefas
   */
  async getAllByProcess(processId: string): Promise<Task[]> {
    try {
      return await taskService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw new Error('Não foi possível buscar as tarefas');
    }
  },

  /**
   * Busca uma tarefa pelo ID
   * @param id ID da tarefa
   * @returns Tarefa encontrada ou null
   */
  async getById(id: string): Promise<Task | null> {
    try {
      return await taskService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      throw new Error('Não foi possível buscar a tarefa');
    }
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
  }): Promise<Task> {
    try {
      return await taskService.create(data);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw new Error('Não foi possível criar a tarefa');
    }
  },

  /**
   * Atualiza uma tarefa
   * @param id ID da tarefa
   * @param data Dados da tarefa
   * @returns Tarefa atualizada
   */
  async update(id: string, data: Partial<Task>): Promise<Task> {
    try {
      return await taskService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw new Error('Não foi possível atualizar a tarefa');
    }
  },

  /**
   * Exclui uma tarefa
   * @param id ID da tarefa
   * @returns true se a tarefa foi excluída
   */
  async delete(id: string): Promise<boolean> {
    try {
      await taskService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw new Error('Não foi possível excluir a tarefa');
    }
  }
};

/**
 * API para gerenciar notas
 */
export const noteApi = {
  /**
   * Busca todas as notas de um processo
   * @param processId ID do processo
   * @returns Lista de notas
   */
  async getAllByProcess(processId: string): Promise<Note[]> {
    try {
      return await noteService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      throw new Error('Não foi possível buscar as notas');
    }
  },

  /**
   * Busca uma nota pelo ID
   * @param id ID da nota
   * @returns Nota encontrada ou null
   */
  async getById(id: string): Promise<Note | null> {
    try {
      return await noteService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar nota:', error);
      throw new Error('Não foi possível buscar a nota');
    }
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
  }): Promise<Note> {
    try {
      return await noteService.create(data);
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      throw new Error('Não foi possível criar a nota');
    }
  },

  /**
   * Atualiza uma nota
   * @param id ID da nota
   * @param data Dados da nota
   * @returns Nota atualizada
   */
  async update(id: string, data: Partial<Note>): Promise<Note> {
    try {
      return await noteService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      throw new Error('Não foi possível atualizar a nota');
    }
  },

  /**
   * Exclui uma nota
   * @param id ID da nota
   * @returns true se a nota foi excluída
   */
  async delete(id: string): Promise<boolean> {
    try {
      await noteService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
      throw new Error('Não foi possível excluir a nota');
    }
  }
};

// Exportando os serviços para uso direto
export { processService, clientService, appointmentService, documentService, paymentService, taskService, noteService }; 
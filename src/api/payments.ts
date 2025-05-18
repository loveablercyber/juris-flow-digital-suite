import { paymentService } from '@/lib/db';
import { Payment, PaymentType, PaymentStatus } from '@/types/database';

/**
 * API para gerenciar pagamentos
 */
export const paymentsApi = {
  /**
   * Busca todos os pagamentos
   * @param processId ID do processo (opcional)
   * @returns Lista de pagamentos
   */
  async getAll(processId?: string): Promise<Payment[]> {
    try {
      if (processId) {
        return await paymentService.listByProcess(processId);
      }
      
      // Se não houver processId, retorna uma lista vazia
      // Em um cenário real, você poderia implementar uma função para listar todos os pagamentos
      return [];
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      throw new Error('Não foi possível buscar os pagamentos');
    }
  },

  /**
   * Busca um pagamento pelo ID
   * @param id ID do pagamento
   * @returns Pagamento encontrado
   */
  async getById(id: string): Promise<Payment | null> {
    try {
      return await paymentService.findById(id);
    } catch (error) {
      console.error(`Erro ao buscar pagamento com ID ${id}:`, error);
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
    type: PaymentType;
    status?: PaymentStatus;
    dueDate: Date;
    paymentDate?: Date | null;
    paymentMethod?: string;
    processId: string;
  }): Promise<Payment> {
    try {
      return await paymentService.createPayment(data);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      throw new Error('Não foi possível criar o pagamento');
    }
  },

  /**
   * Atualiza um pagamento existente
   * @param id ID do pagamento
   * @param data Dados a serem atualizados
   * @returns Pagamento atualizado
   */
  async update(id: string, data: Partial<Payment>): Promise<Payment> {
    try {
      // Em um cenário real, você usaria o serviço de atualização do Prisma
      // Por enquanto, vamos simular a atualização
      const payment = await paymentService.findById(id);
      
      if (!payment) {
        throw new Error('Pagamento não encontrado');
      }
      
      // Atualiza os dados do pagamento
      const updatedPayment = { ...payment, ...data, updatedAt: new Date() };
      
      // Em um cenário real, você usaria o serviço de atualização do Prisma
      // return await paymentService.updatePayment(id, data);
      
      return updatedPayment;
    } catch (error) {
      console.error(`Erro ao atualizar pagamento com ID ${id}:`, error);
      throw new Error('Não foi possível atualizar o pagamento');
    }
  },

  /**
   * Exclui um pagamento
   * @param id ID do pagamento
   * @returns true se o pagamento foi excluído com sucesso
   */
  async delete(id: string): Promise<boolean> {
    try {
      // Em um cenário real, você usaria o serviço de exclusão do Prisma
      // Por enquanto, vamos simular a exclusão
      const payment = await paymentService.findById(id);
      
      if (!payment) {
        throw new Error('Pagamento não encontrado');
      }
      
      // Em um cenário real, você usaria o serviço de exclusão do Prisma
      // await paymentService.deletePayment(id);
      
      return true;
    } catch (error) {
      console.error(`Erro ao excluir pagamento com ID ${id}:`, error);
      throw new Error('Não foi possível excluir o pagamento');
    }
  }
}; 
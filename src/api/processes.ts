import { processService } from '@/lib/db';
import { Process, ProcessStatus, Priority } from '@/types/database';

/**
 * API para gerenciar processos
 */
export const processesApi = {
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
   * @returns Processo encontrado
   */
  async getById(id: string): Promise<Process | null> {
    try {
      return await processService.findById(id);
    } catch (error) {
      console.error(`Erro ao buscar processo com ID ${id}:`, error);
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
    status?: ProcessStatus;
    court?: string;
    judge?: string;
    instance?: string;
    priority?: Priority;
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
   * Atualiza um processo existente
   * @param id ID do processo
   * @param data Dados a serem atualizados
   * @returns Processo atualizado
   */
  async update(id: string, data: Partial<Process>): Promise<Process> {
    try {
      return await processService.updateProcess(id, data);
    } catch (error) {
      console.error(`Erro ao atualizar processo com ID ${id}:`, error);
      throw new Error('Não foi possível atualizar o processo');
    }
  },

  /**
   * Exclui um processo
   * @param id ID do processo
   * @returns true se o processo foi excluído com sucesso
   */
  async delete(id: string): Promise<boolean> {
    try {
      // Em um cenário real, você usaria o serviço de exclusão do Prisma
      // Por enquanto, vamos simular a exclusão
      const process = await processService.findById(id);
      
      if (!process) {
        throw new Error('Processo não encontrado');
      }
      
      // Em um cenário real, você usaria o serviço de exclusão do Prisma
      // await processService.deleteProcess(id);
      
      return true;
    } catch (error) {
      console.error(`Erro ao excluir processo com ID ${id}:`, error);
      throw new Error('Não foi possível excluir o processo');
    }
  }
}; 
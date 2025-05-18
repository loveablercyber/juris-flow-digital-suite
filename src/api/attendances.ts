import { attendanceService } from '@/lib/db';
import { Attendance } from '@/types/database';

/**
 * API para gerenciar atendimentos
 */
export const attendancesApi = {
  /**
   * Busca todos os atendimentos de um processo
   * @param processId ID do processo
   * @returns Lista de atendimentos
   */
  async getAllByProcess(processId: string): Promise<Attendance[]> {
    try {
      return await attendanceService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
      throw new Error('Não foi possível buscar os atendimentos');
    }
  },

  /**
   * Busca um atendimento pelo ID
   * @param id ID do atendimento
   * @returns Atendimento encontrado ou null
   */
  async getById(id: string): Promise<Attendance | null> {
    try {
      return await attendanceService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar atendimento:', error);
      throw new Error('Não foi possível buscar o atendimento');
    }
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
  }): Promise<Attendance> {
    try {
      return await attendanceService.create(data);
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
      throw new Error('Não foi possível criar o atendimento');
    }
  },

  /**
   * Atualiza um atendimento
   * @param id ID do atendimento
   * @param data Dados do atendimento
   * @returns Atendimento atualizado
   */
  async update(id: string, data: Partial<Attendance>): Promise<Attendance> {
    try {
      const attendance = await attendanceService.findById(id);
      
      if (!attendance) {
        throw new Error('Atendimento não encontrado');
      }
      
      return await attendanceService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar atendimento:', error);
      throw new Error('Não foi possível atualizar o atendimento');
    }
  },

  /**
   * Exclui um atendimento
   * @param id ID do atendimento
   * @returns true se o atendimento foi excluído
   */
  async delete(id: string): Promise<boolean> {
    try {
      const attendance = await attendanceService.findById(id);
      
      if (!attendance) {
        throw new Error('Atendimento não encontrado');
      }
      
      await attendanceService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir atendimento:', error);
      throw new Error('Não foi possível excluir o atendimento');
    }
  }
}; 
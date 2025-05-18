import { appointmentService } from '@/lib/db';
import { Appointment, AppointmentType, AppointmentStatus } from '@/types/database';

/**
 * API para gerenciar compromissos
 */
export const appointmentsApi = {
  /**
   * Busca todos os compromissos de um usuário
   * @param userId ID do usuário
   * @returns Lista de compromissos
   */
  async getAllByUser(userId: string): Promise<Appointment[]> {
    try {
      return await appointmentService.findByUser(userId);
    } catch (error) {
      console.error('Erro ao buscar compromissos:', error);
      throw new Error('Não foi possível buscar os compromissos');
    }
  },

  /**
   * Busca todos os compromissos de um processo
   * @param processId ID do processo
   * @returns Lista de compromissos
   */
  async getAllByProcess(processId: string): Promise<Appointment[]> {
    try {
      return await appointmentService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar compromissos:', error);
      throw new Error('Não foi possível buscar os compromissos');
    }
  },

  /**
   * Busca um compromisso pelo ID
   * @param id ID do compromisso
   * @returns Compromisso encontrado ou null
   */
  async getById(id: string): Promise<Appointment | null> {
    try {
      return await appointmentService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar compromisso:', error);
      throw new Error('Não foi possível buscar o compromisso');
    }
  },

  /**
   * Cria um novo compromisso
   * @param data Dados do compromisso
   * @returns Compromisso criado
   */
  async create(data: {
    title: string;
    description: string;
    type: AppointmentType;
    status: AppointmentStatus;
    startDate: Date;
    endDate: Date;
    location?: string;
    userId: string;
    processId?: string;
  }): Promise<Appointment> {
    try {
      return await appointmentService.create(data);
    } catch (error) {
      console.error('Erro ao criar compromisso:', error);
      throw new Error('Não foi possível criar o compromisso');
    }
  },

  /**
   * Atualiza um compromisso
   * @param id ID do compromisso
   * @param data Dados do compromisso
   * @returns Compromisso atualizado
   */
  async update(id: string, data: Partial<Appointment>): Promise<Appointment> {
    try {
      const appointment = await appointmentService.findById(id);
      
      if (!appointment) {
        throw new Error('Compromisso não encontrado');
      }
      
      return await appointmentService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar compromisso:', error);
      throw new Error('Não foi possível atualizar o compromisso');
    }
  },

  /**
   * Exclui um compromisso
   * @param id ID do compromisso
   * @returns true se o compromisso foi excluído
   */
  async delete(id: string): Promise<boolean> {
    try {
      const appointment = await appointmentService.findById(id);
      
      if (!appointment) {
        throw new Error('Compromisso não encontrado');
      }
      
      await appointmentService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir compromisso:', error);
      throw new Error('Não foi possível excluir o compromisso');
    }
  }
}; 
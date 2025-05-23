import { appointmentService } from '@/lib/db';
import { Appointment, AppointmentType, AppointmentStatus } from '@/types/database';

// Definindo o tipo do serviço de compromissos
type AppointmentService = {
  createAppointment(data: {
    title: string;
    description?: string;
    type: 'PRESENCIAL' | 'VIDEO' | 'TELEFONE';
    status?: 'AGENDADO' | 'CANCELADO' | 'CONCLUIDO' | 'REMARCADO';
    startTime: Date;
    endTime: Date;
    location?: string;
    link?: string;
    userId: string;
    processId?: string;
  }): Promise<Appointment>;
  findById(id: string): Promise<Appointment | null>;
  listByUser(userId: string): Promise<Appointment[]>;
  delete(id: string): Promise<void>;
};

// Convertendo o serviço para o tipo correto
const service = appointmentService as AppointmentService;

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
      return await service.listByUser(userId);
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
      // Como não existe listByProcess, vamos buscar todos os compromissos do usuário
      // e filtrar pelo processId
      const appointments = await service.listByUser(processId);
      return appointments.filter((appointment: Appointment) => appointment.processId === processId);
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
      return await service.findById(id);
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
      // Convertendo os campos para o formato esperado pelo serviço
      const appointmentData = {
        title: data.title,
        description: data.description,
        type: data.type as 'PRESENCIAL' | 'VIDEO' | 'TELEFONE',
        status: data.status as 'AGENDADO' | 'CANCELADO' | 'CONCLUIDO' | 'REMARCADO',
        startTime: data.startDate,
        endTime: data.endDate,
        location: data.location,
        userId: data.userId,
        processId: data.processId
      };
      
      return await service.createAppointment(appointmentData);
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
      const appointment = await service.findById(id);
      
      if (!appointment) {
        throw new Error('Compromisso não encontrado');
      }
      
      // Convertendo os campos para o formato esperado pelo serviço
      const updateData = {
        ...data,
        startTime: data.startDate,
        endTime: data.endDate,
        type: data.type as 'PRESENCIAL' | 'VIDEO' | 'TELEFONE',
        status: data.status as 'AGENDADO' | 'CANCELADO' | 'CONCLUIDO' | 'REMARCADO'
      };
      
      // Como não existe updateAppointment, vamos criar um novo e excluir o antigo
      const newAppointment = await service.createAppointment({
        ...appointment,
        ...updateData
      });
      
      await service.delete(id);
      
      return newAppointment;
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
      const appointment = await service.findById(id);
      
      if (!appointment) {
        throw new Error('Compromisso não encontrado');
      }
      
      await service.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir compromisso:', error);
      throw new Error('Não foi possível excluir o compromisso');
    }
  }
}; 
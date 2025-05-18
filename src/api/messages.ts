import { messageService } from '@/lib/db';
import { Message } from '@/types/database';

/**
 * API para gerenciar mensagens
 */
export const messagesApi = {
  /**
   * Busca todas as mensagens de um processo
   * @param processId ID do processo
   * @returns Lista de mensagens
   */
  async getAllByProcess(processId: string): Promise<Message[]> {
    try {
      return await messageService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      throw new Error('Não foi possível buscar as mensagens');
    }
  },

  /**
   * Busca uma mensagem pelo ID
   * @param id ID da mensagem
   * @returns Mensagem encontrada ou null
   */
  async getById(id: string): Promise<Message | null> {
    try {
      return await messageService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar mensagem:', error);
      throw new Error('Não foi possível buscar a mensagem');
    }
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
  }): Promise<Message> {
    try {
      return await messageService.create(data);
    } catch (error) {
      console.error('Erro ao criar mensagem:', error);
      throw new Error('Não foi possível criar a mensagem');
    }
  },

  /**
   * Atualiza uma mensagem
   * @param id ID da mensagem
   * @param data Dados da mensagem
   * @returns Mensagem atualizada
   */
  async update(id: string, data: Partial<Message>): Promise<Message> {
    try {
      const message = await messageService.findById(id);
      
      if (!message) {
        throw new Error('Mensagem não encontrada');
      }
      
      return await messageService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar mensagem:', error);
      throw new Error('Não foi possível atualizar a mensagem');
    }
  },

  /**
   * Exclui uma mensagem
   * @param id ID da mensagem
   * @returns true se a mensagem foi excluída
   */
  async delete(id: string): Promise<boolean> {
    try {
      const message = await messageService.findById(id);
      
      if (!message) {
        throw new Error('Mensagem não encontrada');
      }
      
      await messageService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error);
      throw new Error('Não foi possível excluir a mensagem');
    }
  }
}; 
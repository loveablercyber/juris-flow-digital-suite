import { notificationService } from '@/lib/db';
import { Notification } from '@/types/database';

/**
 * API para gerenciar notificações
 */
export const notificationsApi = {
  /**
   * Busca todas as notificações de um usuário
   * @param userId ID do usuário
   * @returns Lista de notificações
   */
  async getAllByUser(userId: string): Promise<Notification[]> {
    try {
      return await notificationService.findByUser(userId);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw new Error('Não foi possível buscar as notificações');
    }
  },

  /**
   * Busca uma notificação pelo ID
   * @param id ID da notificação
   * @returns Notificação encontrada ou null
   */
  async getById(id: string): Promise<Notification | null> {
    try {
      return await notificationService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar notificação:', error);
      throw new Error('Não foi possível buscar a notificação');
    }
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
  }): Promise<Notification> {
    try {
      return await notificationService.create(data);
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      throw new Error('Não foi possível criar a notificação');
    }
  },

  /**
   * Atualiza uma notificação
   * @param id ID da notificação
   * @param data Dados da notificação
   * @returns Notificação atualizada
   */
  async update(id: string, data: Partial<Notification>): Promise<Notification> {
    try {
      const notification = await notificationService.findById(id);
      
      if (!notification) {
        throw new Error('Notificação não encontrada');
      }
      
      return await notificationService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar notificação:', error);
      throw new Error('Não foi possível atualizar a notificação');
    }
  },

  /**
   * Exclui uma notificação
   * @param id ID da notificação
   * @returns true se a notificação foi excluída
   */
  async delete(id: string): Promise<boolean> {
    try {
      const notification = await notificationService.findById(id);
      
      if (!notification) {
        throw new Error('Notificação não encontrada');
      }
      
      await notificationService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir notificação:', error);
      throw new Error('Não foi possível excluir a notificação');
    }
  }
}; 
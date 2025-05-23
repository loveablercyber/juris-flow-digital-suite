import client from './client';
import { User, UserRole } from '@/types/database';

/**
 * API para gerenciar usuários
 */
export const usersApi = {
  /**
   * Busca um usuário pelo email
   * @param email Email do usuário
   * @returns Usuário encontrado
   */
  async getByEmail(email: string): Promise<User | null> {
    try {
      const response = await client.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário com email ${email}:`, error);
      throw new Error('Não foi possível buscar o usuário');
    }
  },

  /**
   * Busca um usuário pelo ID
   * @param id ID do usuário
   * @returns Usuário encontrado
   */
  async getById(id: string): Promise<User | null> {
    try {
      const response = await client.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      throw new Error('Não foi possível buscar o usuário');
    }
  },

  /**
   * Cria um novo usuário
   * @param data Dados do usuário
   * @returns Usuário criado
   */
  async create(data: {
    email: string;
    name: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    try {
      const response = await client.post('/users', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Não foi possível criar o usuário');
    }
  },

  /**
   * Atualiza um usuário existente
   * @param id ID do usuário
   * @param data Dados a serem atualizados
   * @returns Usuário atualizado
   */
  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const response = await client.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      throw new Error('Não foi possível atualizar o usuário');
    }
  },

  /**
   * Exclui um usuário
   * @param id ID do usuário
   * @returns true se o usuário foi excluído com sucesso
   */
  async delete(id: string): Promise<boolean> {
    try {
      await client.delete(`/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao excluir usuário com ID ${id}:`, error);
      throw new Error('Não foi possível excluir o usuário');
    }
  }
}; 
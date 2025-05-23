import client from './client';
import { User } from '@/types/database';

/**
 * API para gerenciar autenticação
 */
export const authApi = {
  /**
   * Registra um novo usuário
   * @param data Dados do usuário
   * @returns Token de autenticação e usuário
   */
  async register(data: {
    email: string;
    name: string;
    password: string;
    role: 'ADMIN' | 'ADVOGADO' | 'CLIENTE';
  }): Promise<{ token: string; user: User }> {
    try {
      const response = await client.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw new Error('Não foi possível registrar o usuário');
    }
  },

  /**
   * Autentica um usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Token de autenticação e usuário
   */
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    try {
      const response = await client.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      throw new Error('Não foi possível autenticar o usuário');
    }
  },

  /**
   * Verifica se um token é válido
   * @param token Token de autenticação
   * @returns Dados do usuário
   */
  async verifyToken(token: string): Promise<{ id: string; email: string; role: string }> {
    try {
      const response = await client.post('/auth/verify', { token });
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      throw new Error('Token inválido');
    }
  }
}; 
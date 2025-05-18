import { usersApi } from './users';
import { User } from '@/types/database';
import { env } from '@/config/env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
      // Verifica se o usuário já existe
      const existingUser = await usersApi.getByEmail(data.email);
      
      if (existingUser) {
        throw new Error('Usuário já existe');
      }
      
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      // Cria o usuário
      const user = await usersApi.create({
        ...data,
        password: hashedPassword
      });
      
      // Gera o token de autenticação
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
      );
      
      return { token, user };
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
      // Busca o usuário pelo email
      const user = await usersApi.getByEmail(email);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Verifica a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new Error('Senha inválida');
      }
      
      // Gera o token de autenticação
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
      );
      
      return { token, user };
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
      // Verifica o token
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; role: string };
      
      // Busca o usuário pelo ID
      const user = await usersApi.getById(decoded.id);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      return decoded;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      throw new Error('Token inválido');
    }
  }
}; 
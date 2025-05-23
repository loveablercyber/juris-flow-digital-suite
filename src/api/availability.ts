import { User } from '@/types/database';

const API_URL = 'http://localhost:3001/api';

/**
 * API para gerenciar disponibilidade dos advogados
 */
export const availabilityApi = {
  /**
   * Lista até N advogados online
   */
  async getOnlineLawyers(limit: number = 3): Promise<Partial<User>[]> {
    try {
      const response = await fetch(`${API_URL}/availability/online-lawyers?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar advogados online: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API de disponibilidade:', error);
      throw error;
    }
  },

  /**
   * Atualiza o status de disponibilidade de um advogado
   */
  async setAvailability(userId: string, isOnline: boolean): Promise<Partial<User>> {
    try {
      const response = await fetch(`${API_URL}/availability/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOnline }),
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar disponibilidade: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API de disponibilidade:', error);
      throw error;
    }
  },
}; 
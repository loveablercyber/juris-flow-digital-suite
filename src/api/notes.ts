import { noteService } from '@/lib/db';
import { Note } from '@/types/database';

/**
 * API para gerenciar notas
 */
export const notesApi = {
  /**
   * Busca todas as notas de um processo
   * @param processId ID do processo
   * @returns Lista de notas
   */
  async getAllByProcess(processId: string): Promise<Note[]> {
    try {
      return await noteService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      throw new Error('Não foi possível buscar as notas');
    }
  },

  /**
   * Busca uma nota pelo ID
   * @param id ID da nota
   * @returns Nota encontrada ou null
   */
  async getById(id: string): Promise<Note | null> {
    try {
      return await noteService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar nota:', error);
      throw new Error('Não foi possível buscar a nota');
    }
  },

  /**
   * Cria uma nova nota
   * @param data Dados da nota
   * @returns Nota criada
   */
  async create(data: {
    content: string;
    processId: string;
    userId: string;
  }): Promise<Note> {
    try {
      return await noteService.create(data);
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      throw new Error('Não foi possível criar a nota');
    }
  },

  /**
   * Atualiza uma nota
   * @param id ID da nota
   * @param data Dados da nota
   * @returns Nota atualizada
   */
  async update(id: string, data: Partial<Note>): Promise<Note> {
    try {
      const note = await noteService.findById(id);
      
      if (!note) {
        throw new Error('Nota não encontrada');
      }
      
      return await noteService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      throw new Error('Não foi possível atualizar a nota');
    }
  },

  /**
   * Exclui uma nota
   * @param id ID da nota
   * @returns true se a nota foi excluída
   */
  async delete(id: string): Promise<boolean> {
    try {
      const note = await noteService.findById(id);
      
      if (!note) {
        throw new Error('Nota não encontrada');
      }
      
      await noteService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
      throw new Error('Não foi possível excluir a nota');
    }
  }
}; 
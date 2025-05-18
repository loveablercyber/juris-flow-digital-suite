import { taskService } from '@/lib/db';
import { Task, TaskStatus } from '@/types/database';

/**
 * API para gerenciar tarefas
 */
export const tasksApi = {
  /**
   * Busca todas as tarefas de um processo
   * @param processId ID do processo
   * @returns Lista de tarefas
   */
  async getAllByProcess(processId: string): Promise<Task[]> {
    try {
      return await taskService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw new Error('Não foi possível buscar as tarefas');
    }
  },

  /**
   * Busca uma tarefa pelo ID
   * @param id ID da tarefa
   * @returns Tarefa encontrada ou null
   */
  async getById(id: string): Promise<Task | null> {
    try {
      return await taskService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      throw new Error('Não foi possível buscar a tarefa');
    }
  },

  /**
   * Cria uma nova tarefa
   * @param data Dados da tarefa
   * @returns Tarefa criada
   */
  async create(data: {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    processId: string;
  }): Promise<Task> {
    try {
      return await taskService.create(data);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw new Error('Não foi possível criar a tarefa');
    }
  },

  /**
   * Atualiza uma tarefa
   * @param id ID da tarefa
   * @param data Dados da tarefa
   * @returns Tarefa atualizada
   */
  async update(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const task = await taskService.findById(id);
      
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      
      return await taskService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw new Error('Não foi possível atualizar a tarefa');
    }
  },

  /**
   * Exclui uma tarefa
   * @param id ID da tarefa
   * @returns true se a tarefa foi excluída
   */
  async delete(id: string): Promise<boolean> {
    try {
      const task = await taskService.findById(id);
      
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      
      await taskService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw new Error('Não foi possível excluir a tarefa');
    }
  }
}; 
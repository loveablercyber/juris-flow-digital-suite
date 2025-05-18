import { documentService } from '@/lib/db';
import { Document, DocumentType } from '@/types/database';

/**
 * API para gerenciar documentos
 */
export const documentsApi = {
  /**
   * Busca todos os documentos de um processo
   * @param processId ID do processo
   * @returns Lista de documentos
   */
  async getAllByProcess(processId: string): Promise<Document[]> {
    try {
      return await documentService.findByProcess(processId);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw new Error('Não foi possível buscar os documentos');
    }
  },

  /**
   * Busca um documento pelo ID
   * @param id ID do documento
   * @returns Documento encontrado ou null
   */
  async getById(id: string): Promise<Document | null> {
    try {
      return await documentService.findById(id);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
      throw new Error('Não foi possível buscar o documento');
    }
  },

  /**
   * Cria um novo documento
   * @param data Dados do documento
   * @returns Documento criado
   */
  async create(data: {
    title: string;
    description: string;
    type: DocumentType;
    fileUrl: string;
    processId: string;
  }): Promise<Document> {
    try {
      return await documentService.create(data);
    } catch (error) {
      console.error('Erro ao criar documento:', error);
      throw new Error('Não foi possível criar o documento');
    }
  },

  /**
   * Atualiza um documento
   * @param id ID do documento
   * @param data Dados do documento
   * @returns Documento atualizado
   */
  async update(id: string, data: Partial<Document>): Promise<Document> {
    try {
      const document = await documentService.findById(id);
      
      if (!document) {
        throw new Error('Documento não encontrado');
      }
      
      return await documentService.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
      throw new Error('Não foi possível atualizar o documento');
    }
  },

  /**
   * Exclui um documento
   * @param id ID do documento
   * @returns true se o documento foi excluído
   */
  async delete(id: string): Promise<boolean> {
    try {
      const document = await documentService.findById(id);
      
      if (!document) {
        throw new Error('Documento não encontrado');
      }
      
      await documentService.delete(id);
      return true;
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
      throw new Error('Não foi possível excluir o documento');
    }
  }
}; 
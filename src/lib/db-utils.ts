import { Prisma } from '@prisma/client';
import prisma from './prisma';

/**
 * Função para executar uma transação no banco de dados
 * @param callback Função que será executada dentro da transação
 * @returns Resultado da transação
 */
export async function transaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(callback);
}

/**
 * Função para executar uma consulta com paginação
 * @param model Modelo do Prisma
 * @param options Opções de paginação e filtros
 * @returns Resultado da consulta com informações de paginação
 */
export async function paginate<T, A>(
  model: Prisma.ModelName,
  options: {
    page?: number;
    limit?: number;
    where?: Prisma.Args<T, 'findMany'>['where'];
    orderBy?: Prisma.Args<T, 'findMany'>['orderBy'];
    include?: Prisma.Args<T, 'findMany'>['include'];
    select?: Prisma.Args<T, 'findMany'>['select'];
  }
) {
  const { page = 1, limit = 10, where, orderBy, include, select } = options;
  const skip = (page - 1) * limit;

  // Executa a consulta com paginação
  const [data, total] = await Promise.all([
    (prisma[model] as any).findMany({
      skip,
      take: limit,
      where,
      orderBy,
      include,
      select,
    }),
    (prisma[model] as any).count({ where }),
  ]);

  // Calcula o total de páginas
  const totalPages = Math.ceil(total / limit);

  // Retorna o resultado com informações de paginação
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Função para criar um registro com relacionamentos
 * @param model Modelo do Prisma
 * @param data Dados do registro
 * @param relations Relacionamentos a serem incluídos
 * @returns Registro criado
 */
export async function createWithRelations<T, A>(
  model: Prisma.ModelName,
  data: A,
  relations?: Prisma.Args<T, 'create'>['include']
) {
  return (prisma[model] as any).create({
    data,
    include: relations,
  });
}

/**
 * Função para atualizar um registro com relacionamentos
 * @param model Modelo do Prisma
 * @param id ID do registro
 * @param data Dados a serem atualizados
 * @param relations Relacionamentos a serem incluídos
 * @returns Registro atualizado
 */
export async function updateWithRelations<T, A>(
  model: Prisma.ModelName,
  id: string,
  data: A,
  relations?: Prisma.Args<T, 'update'>['include']
) {
  return (prisma[model] as any).update({
    where: { id },
    data,
    include: relations,
  });
}

/**
 * Função para buscar um registro por ID com relacionamentos
 * @param model Modelo do Prisma
 * @param id ID do registro
 * @param relations Relacionamentos a serem incluídos
 * @returns Registro encontrado
 */
export async function findByIdWithRelations<T>(
  model: Prisma.ModelName,
  id: string,
  relations?: Prisma.Args<T, 'findUnique'>['include']
) {
  return (prisma[model] as any).findUnique({
    where: { id },
    include: relations,
  });
}

/**
 * Função para buscar registros com filtros e relacionamentos
 * @param model Modelo do Prisma
 * @param where Condições de filtro
 * @param relations Relacionamentos a serem incluídos
 * @returns Registros encontrados
 */
export async function findManyWithRelations<T>(
  model: Prisma.ModelName,
  where?: Prisma.Args<T, 'findMany'>['where'],
  relations?: Prisma.Args<T, 'findMany'>['include']
) {
  return (prisma[model] as any).findMany({
    where,
    include: relations,
  });
}

/**
 * Função para excluir um registro
 * @param model Modelo do Prisma
 * @param id ID do registro
 * @returns Registro excluído
 */
export async function deleteById<T>(model: Prisma.ModelName, id: string) {
  return (prisma[model] as any).delete({
    where: { id },
  });
}

/**
 * Função para excluir vários registros
 * @param model Modelo do Prisma
 * @param where Condições de filtro
 * @returns Número de registros excluídos
 */
export async function deleteMany<T>(
  model: Prisma.ModelName,
  where: Prisma.Args<T, 'deleteMany'>['where']
) {
  return (prisma[model] as any).deleteMany({
    where,
  });
} 
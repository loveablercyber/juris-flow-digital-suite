import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const clientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  status: z.enum(['ATIVO', 'INATIVO', 'PENDENTE']),
});

export const processSchema = z.object({
  number: z.string().min(1, 'Número do processo é obrigatório'),
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  type: z.string().min(1, 'Tipo é obrigatório'),
  area: z.string().min(1, 'Área é obrigatória'),
  status: z.enum(['ATIVO', 'ARQUIVADO', 'PENDENTE']),
  court: z.string().optional(),
  judge: z.string().optional(),
  instance: z.string().optional(),
  priority: z.enum(['BAIXA', 'MÉDIA', 'ALTA', 'URGENTE']).optional(),
  emergency: z.boolean().default(false),
  startDate: z.string().transform(str => new Date(str)),
  nextHearing: z.string().transform(str => new Date(str)).optional(),
  distributionDate: z.string().transform(str => new Date(str)).optional(),
});

export const documentSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  fileUrl: z.string().url('URL inválida'),
  processId: z.string().uuid('ID do processo inválido'),
});

export const appointmentSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  status: z.enum(['AGENDADO', 'CONCLUÍDO', 'CANCELADO']),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  location: z.string().optional(),
  processId: z.string().uuid('ID do processo inválido').optional(),
}); 
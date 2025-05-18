// Tipos para pagamentos
export type PaymentType = 'HONORARIOS' | 'CUSTAS' | 'CONSULTA';
export type PaymentStatus = 'PENDENTE' | 'PAGO' | 'ATRASADO' | 'CANCELADO';

export interface Payment {
  id: string;
  amount: number;
  description: string;
  type: PaymentType;
  status: PaymentStatus;
  dueDate: Date;
  paymentDate?: Date | null;
  paymentMethod?: string;
  processId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para usuários
export type UserRole = 'ADMIN' | 'ADVOGADO' | 'CLIENTE';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para documentos
export type DocumentType = 'PETICAO' | 'CONTRATO' | 'SENTENCA' | 'OUTRO';

export interface Document {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  fileUrl: string;
  processId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para compromissos
export type AppointmentType = 'AUDIENCIA' | 'REUNIAO' | 'PRAZO' | 'OUTRO';
export type AppointmentStatus = 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'REALIZADO';

export interface Appointment {
  id: string;
  title: string;
  description: string;
  type: AppointmentType;
  status: AppointmentStatus;
  startDate: Date;
  endDate: Date;
  location?: string;
  userId: string;
  processId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para tarefas
export type TaskStatus = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  processId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para notas
export interface Note {
  id: string;
  content: string;
  processId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para mensagens
export interface Message {
  id: string;
  content: string;
  processId: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para atendimentos
export interface Attendance {
  id: string;
  description: string;
  processId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para notificações
export interface Notification {
  id: string;
  title: string;
  message: string;
  userId: string;
  processId?: string;
  createdAt: Date;
  updatedAt: Date;
} 
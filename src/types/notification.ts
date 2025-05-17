
export type NotificationPriority = "alta" | "media" | "baixa";
export type NotificationUserType = "advogado" | "cliente" | "todos";

export interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  tipoUsuario: NotificationUserType;
  destinatarioId?: string; // opcional
  prioridade: NotificationPriority;
  lida: boolean;
  criadaEm: Date;
  expiraEm?: Date; // opcional
  excluida: boolean;
}

export interface NotificationCount {
  total: number;
  naoLidas: number;
}

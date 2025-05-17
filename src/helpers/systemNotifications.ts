
import { notificationService } from "@/services/notificationService";

// Helper function to create system notifications for demo purposes
export const createSystemNotifications = () => {
  // Check if system notifications were already created
  const notificationsCreated = localStorage.getItem('systemNotificationsCreated');
  
  if (notificationsCreated) {
    return;
  }
  
  // Create sample notifications
  const notifications = [
    {
      titulo: "Bem-vindo ao Sistema de Notificações",
      mensagem: "Este é o novo sistema de notificações do Painel Jurídico. <br><br>Aqui você receberá avisos importantes sobre processos, audiências e comunicados administrativos.",
      tipoUsuario: "advogado" as const,
      prioridade: "media" as const,
      criadaEm: new Date(new Date().setDate(new Date().getDate() - 1))
    },
    {
      titulo: "Audiência Agendada - Processo 2023.987.54321",
      mensagem: "Uma nova audiência foi agendada para o processo 2023.987.54321 para o dia 15/06/2025 às 14:30h.<br><br>Local: Fórum Central - Sala 302<br><br>Cliente: Maria Silva Santos<br><br>Por favor, confirme presença até 48h antes.",
      tipoUsuario: "advogado" as const,
      prioridade: "alta" as const,
      criadaEm: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    {
      titulo: "Novo documento disponível para análise",
      mensagem: "Um novo documento foi compartilhado para sua análise no processo 2024.123.76543.<br><br>Título: Laudo Pericial<br>Prazo para análise: 5 dias úteis",
      tipoUsuario: "advogado" as const, 
      prioridade: "media" as const,
      criadaEm: new Date()
    }
  ];
  
  // Add each notification
  notifications.forEach(notification => {
    notificationService.createNotification(notification);
  });
  
  // Mark that system notifications were created
  localStorage.setItem('systemNotificationsCreated', 'true');
};

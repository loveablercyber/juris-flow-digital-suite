import { Notification, NotificationCount, NotificationPriority, NotificationUserType } from "@/types/notification";

// Simulating API calls with local storage for demo purposes
// This would be replaced with actual API calls in a real implementation

const STORAGE_KEY = 'notificacoes';

export const notificationService = {
  getNotifications: (userType: NotificationUserType, userId: string): Notification[] => {
    const storedNotifications = localStorage.getItem(STORAGE_KEY);
    if (!storedNotifications) return [];
    
    const allNotifications: Notification[] = JSON.parse(storedNotifications);
    
    return allNotifications.filter(notification => 
      !notification.excluida && 
      (notification.tipoUsuario === userType || notification.tipoUsuario === 'todos') &&
      (!notification.destinatarioId || notification.destinatarioId === userId) &&
      (!notification.expiraEm || new Date(notification.expiraEm) > new Date())
    );
  },
  
  getNotificationCount: (userType: NotificationUserType, userId: string): NotificationCount => {
    try {
      const notifications = this.getNotifications(userType, userId) || [];
      // Fix: Add null check with optional chaining or a default empty array
      const naoLidas = notifications.filter(n => !n.lida).length;
      
      return {
        total: notifications.length,
        naoLidas
      };
    } catch (error) {
      console.error("Error in getNotificationCount:", error);
      return {
        total: 0,
        naoLidas: 0
      };
    }
  },
  
  markAsRead: (id: string): void => {
    const storedNotifications = localStorage.getItem(STORAGE_KEY);
    if (!storedNotifications) return;
    
    const allNotifications: Notification[] = JSON.parse(storedNotifications);
    const updatedNotifications = allNotifications.map(notification => 
      notification.id === id ? { ...notification, lida: true } : notification
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
  },
  
  deleteNotification: (id: string): void => {
    const storedNotifications = localStorage.getItem(STORAGE_KEY);
    if (!storedNotifications) return;
    
    const allNotifications: Notification[] = JSON.parse(storedNotifications);
    const updatedNotifications = allNotifications.map(notification => 
      notification.id === id ? { ...notification, excluida: true } : notification
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
  },
  
  createNotification: (notification: Omit<Notification, 'id' | 'lida' | 'criadaEm' | 'excluida'>): void => {
    const storedNotifications = localStorage.getItem(STORAGE_KEY);
    const allNotifications: Notification[] = storedNotifications ? JSON.parse(storedNotifications) : [];
    
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      lida: false,
      criadaEm: new Date(),
      excluida: false
    };
    
    allNotifications.push(newNotification);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotifications));
  }
};

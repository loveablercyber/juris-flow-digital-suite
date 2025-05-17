
import React, { useEffect, useState } from "react";
import { notificationService } from "@/services/notificationService";
import { Notification } from "@/types/notification";
import { toast } from "@/hooks/use-toast";
import NotificationItem from "@/components/common/NotificationItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notificacoes = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"todas" | "lidas" | "nao-lidas">("todas");
  
  const userId = localStorage.getItem('advogadoUser') 
    ? JSON.parse(localStorage.getItem('advogadoUser') || '{}').id || '' 
    : '';

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  const loadNotifications = () => {
    const allNotifications = notificationService.getNotifications("advogado", userId);
    
    let filteredNotifications = allNotifications;
    
    if (filter === "lidas") {
      filteredNotifications = allNotifications.filter(n => n.lida);
    } else if (filter === "nao-lidas") {
      filteredNotifications = allNotifications.filter(n => !n.lida);
    }
    
    setNotifications(filteredNotifications);
  };

  const handleMarkAsRead = (id: string) => {
    notificationService.markAsRead(id);
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi atualizada com sucesso."
    });
    loadNotifications();
  };

  const handleDelete = (id: string) => {
    notificationService.deleteNotification(id);
    toast({
      title: "Notificação excluída",
      description: "A notificação foi removida com sucesso."
    });
    loadNotifications();
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Notificações</h1>
      
      <Tabs value={filter} onValueChange={(value) => setFilter(value as "todas" | "lidas" | "nao-lidas")} className="mb-6">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="nao-lidas">Não Lidas</TabsTrigger>
          <TabsTrigger value="lidas">Lidas</TabsTrigger>
        </TabsList>
      </Tabs>

      {notifications.length > 0 ? (
        notifications.map(notification => (
          <NotificationItem 
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="text-center py-10 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">Nenhuma notificação encontrada.</p>
        </div>
      )}
    </div>
  );
};

export default Notificacoes;

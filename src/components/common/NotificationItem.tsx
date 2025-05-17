
import React, { useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CheckCircle, Trash2, AlertCircle, Bell } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notification";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
  const [expanded, setExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-500";
      case "media":
        return "bg-amber-500";
      case "baixa":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "alta":
        return "Alta";
      case "media":
        return "Média";
      case "baixa":
        return "Baixa";
      default:
        return "Normal";
    }
  };

  const handleMarkAsRead = () => {
    if (!notification.lida) {
      onMarkAsRead(notification.id);
    }
  };

  const handleDelete = () => {
    onDelete(notification.id);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded && !notification.lida) {
      handleMarkAsRead();
    }
  };

  const formattedDate = format(new Date(notification.criadaEm), "dd/MM/yyyy 'às' HH:mm", { locale: pt });

  return (
    <Card className={`mb-4 ${!notification.lida ? "bg-muted/30" : ""}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <CardTitle className="text-lg font-semibold">
              {notification.titulo}
            </CardTitle>
            {!notification.lida && (
              <Badge variant="outline" className="ml-2 bg-blue-500 text-white">
                Nova
              </Badge>
            )}
          </div>
          <Badge className={`${getPriorityColor(notification.prioridade)} text-white`}>
            {getPriorityText(notification.prioridade)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {formattedDate}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 cursor-pointer" onClick={toggleExpand}>
        {expanded ? (
          <div dangerouslySetInnerHTML={{ __html: notification.mensagem }} />
        ) : (
          <div className="line-clamp-2 text-muted-foreground">
            {notification.mensagem.replace(/<[^>]*>?/gm, '')}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-2 flex justify-end gap-2">
        {!notification.lida && (
          <Button variant="ghost" size="sm" onClick={handleMarkAsRead}>
            <CheckCircle className="mr-1 h-4 w-4" />
            Marcar como lida
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-1 h-4 w-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationItem;

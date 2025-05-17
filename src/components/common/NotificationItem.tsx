
import React, { useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Check, Trash2, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Notification, NotificationPriority } from "@/types/notification";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "alta": return "destructive";
      case "media": return "default";
      case "baixa": return "secondary";
      default: return "default";
    }
  };

  const getPriorityIcon = (priority: NotificationPriority) => {
    switch (priority) {
      case "alta": return <AlertTriangle className="h-4 w-4 mr-1" />;
      case "media": return <AlertCircle className="h-4 w-4 mr-1" />;
      case "baixa": return <Bell className="h-4 w-4 mr-1" />;
      default: return <Bell className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Card className={`mb-4 ${!notification.lida ? 'border-l-4 border-l-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{notification.titulo}</CardTitle>
          <Badge 
            variant={getPriorityColor(notification.prioridade) as "default" | "destructive" | "secondary"}
            className="flex items-center"
          >
            {getPriorityIcon(notification.prioridade)}
            {notification.prioridade.charAt(0).toUpperCase() + notification.prioridade.slice(1)}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {format(new Date(notification.criadaEm), "PPp", { locale: pt })}
        </p>
      </CardHeader>
      <CardContent>
        <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: notification.mensagem }} />
          ) : (
            <>
              <p className="line-clamp-2">{notification.mensagem.replace(/<[^>]*>?/gm, '')}</p>
              <div className="flex items-center text-sm text-primary mt-1">
                Ver completo {expanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {!notification.lida && (
          <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)}>
            <Check className="h-4 w-4 mr-1" /> Marcar como lida
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => onDelete(notification.id)}>
          <Trash2 className="h-4 w-4 mr-1" /> Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationItem;

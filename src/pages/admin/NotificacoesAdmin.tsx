
import React, { useState } from "react";
import { z } from "zod";
import { notificationService } from "@/services/notificationService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import NotificationForm from "@/components/admin/notifications/NotificationForm";
import NotificationInstructions from "@/components/admin/notifications/NotificationInstructions";
import NotificationPreview from "@/components/admin/notifications/NotificationPreview";

// Schema definition for form validation
const notificationSchema = z.object({
  titulo: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  mensagem: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
  tipoUsuario: z.enum(["advogado", "cliente", "todos"]),
  destinatarioId: z.string().optional(),
  prioridade: z.enum(["alta", "media", "baixa"]),
  expiraEm: z.date().optional()
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

const NotificacoesAdmin = () => {
  const [previewData, setPreviewData] = useState({
    title: "",
    message: ""
  });

  const handleSubmit = (data: NotificationFormValues) => {
    try {
      // Create the notification with all required fields
      notificationService.createNotification({
        titulo: data.titulo,
        mensagem: data.mensagem,
        tipoUsuario: data.tipoUsuario,
        destinatarioId: data.destinatarioId,
        prioridade: data.prioridade,
        expiraEm: data.expiraEm
      });
      
      toast({
        title: "Notificação enviada",
        description: "A notificação foi enviada com sucesso aos destinatários."
      });
      
      // Reset preview
      setPreviewData({ title: "", message: "" });
    } catch (error) {
      console.error("Error creating notification:", error);
      toast({
        title: "Erro ao enviar notificação",
        description: "Ocorreu um erro ao enviar a notificação. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Watch form values for preview
  const handleFormChange = (title: string, message: string) => {
    setPreviewData({
      title,
      message
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Avisos & Notificações</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enviar Nova Notificação</CardTitle>
            <CardDescription>
              Crie e envie notificações para usuários do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationForm 
              onSubmit={handleSubmit} 
              notificationData={previewData}
            />
          </CardContent>
        </Card>
        
        <div>
          <NotificationInstructions />
          <NotificationPreview title={previewData.title} message={previewData.message} />
        </div>
      </div>
    </div>
  );
};

export default NotificacoesAdmin;

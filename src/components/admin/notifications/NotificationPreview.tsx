
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationPreviewProps {
  title: string;
  message: string;
}

const NotificationPreview: React.FC<NotificationPreviewProps> = ({ title, message }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prévia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4 bg-background/50">
          {title ? (
            <>
              <h3 className="font-bold text-lg">{title}</h3>
              <div className="text-sm text-muted-foreground mt-1 mb-3">
                {new Date().toLocaleDateString('pt-BR')}
              </div>
              <div 
                className="prose prose-sm prose-headings:text-foreground" 
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              A prévia da notificação aparecerá aqui
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreview;

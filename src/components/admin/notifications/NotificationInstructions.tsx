
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotificationInstructions: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Instruções</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Preencha todos os campos obrigatórios</li>
          <li>O título deve ser claro e objetivo</li>
          <li>Use HTML básico para formatar sua mensagem</li>
          <li>Selecione o tipo de usuário adequado</li>
          <li>Prioridades altas aparecem com destaque vermelho</li>
          <li>A data de expiração é opcional</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default NotificationInstructions;

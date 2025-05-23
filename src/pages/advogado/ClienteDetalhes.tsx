import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClienteDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState("processos");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Detalhes do Cliente #{id}
      </h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Informações Pessoais
              </h2>
              {/* Adicionar informações pessoais aqui */}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Contato
              </h2>
              {/* Adicionar informações de contato aqui */}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="processos">Processos</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="processos">
                <p>Lista de processos do cliente</p>
              </TabsContent>
              <TabsContent value="documentos">
                <p>Documentos do cliente</p>
              </TabsContent>
              <TabsContent value="agendamentos">
                <p>Agendamentos do cliente</p>
              </TabsContent>
              <TabsContent value="historico">
                <p>Histórico de interações</p>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteDetalhes; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { processService } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Process {
  id: string;
  number: string;
  title: string;
  description?: string;
  type: string;
  area: string;
  status: string;
  court?: string;
  judge?: string;
  instance?: string;
  priority?: string;
  emergency: boolean;
  startDate: Date;
  nextHearing?: Date;
  distributionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProcessoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [process, setProcess] = useState<Process | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const loadProcess = async () => {
      try {
        if (!id) return;
        const data = await processService.getById(id);
        setProcess(data);
      } catch (error) {
        console.error('Erro ao carregar processo:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do processo.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProcess();
  }, [id, toast]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!process) {
    return <div>Processo não encontrado</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalhes do Processo</h1>
        <Button onClick={() => navigate('/advogado/processos')}>
          Voltar
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Número do Processo</p>
              <p>{process.number}</p>
            </div>
            <div>
              <p className="font-semibold">Título</p>
              <p>{process.title}</p>
            </div>
            <div>
              <p className="font-semibold">Tipo</p>
              <p>{process.type}</p>
            </div>
            <div>
              <p className="font-semibold">Área</p>
              <p>{process.area}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p>{process.status}</p>
            </div>
            <div>
              <p className="font-semibold">Prioridade</p>
              <p>{process.priority || 'Não definida'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="appointments">Compromissos</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="notes">Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informações Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Tribunal</p>
                  <p>{process.court || 'Não informado'}</p>
                </div>
                <div>
                  <p className="font-semibold">Juiz</p>
                  <p>{process.judge || 'Não informado'}</p>
                </div>
                <div>
                  <p className="font-semibold">Instância</p>
                  <p>{process.instance || 'Não informado'}</p>
                </div>
                <div>
                  <p className="font-semibold">Data de Início</p>
                  <p>{new Date(process.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Próxima Audiência</p>
                  <p>{process.nextHearing ? new Date(process.nextHearing).toLocaleDateString() : 'Não agendada'}</p>
                </div>
                <div>
                  <p className="font-semibold">Data de Distribuição</p>
                  <p>{process.distributionDate ? new Date(process.distributionDate).toLocaleDateString() : 'Não informada'}</p>
                </div>
              </div>
              {process.description && (
                <div className="mt-4">
                  <p className="font-semibold">Descrição</p>
                  <p>{process.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de documentos será implementada aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Compromissos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de compromissos será implementada aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de pagamentos será implementada aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de tarefas será implementada aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de notas será implementada aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessoDetalhes; 
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Clock, User, Building, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface Processo {
  id: number;
  numero: string;
  tipo: string;
  status: string;
  dataInicio: string;
  ultimaAtualizacao: string;
  cliente: string;
  advogado: string;
  tribunal: string;
  vara: string;
  valor: number;
  descricao: string;
  documentos: Array<{
    id: number;
    nome: string;
    tipo: string;
    data: string;
    status: string;
  }>;
  audiencias: Array<{
    id: number;
    data: string;
    tipo: string;
    status: string;
    local: string;
  }>;
  movimentacoes: Array<{
    id: number;
    data: string;
    descricao: string;
    tipo: string;
  }>;
}

const ProcessoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const [processo, setProcesso] = useState<Processo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const mockProcesso: Processo = {
      id: Number(id),
      numero: "0001234-56.2024.8.26.0100",
      tipo: "Cível",
      status: "Em andamento",
      dataInicio: "15/03/2024",
      ultimaAtualizacao: "20/03/2024",
      cliente: "João Silva",
      advogado: "Dra. Maria Santos",
      tribunal: "TJSP",
      vara: "2ª Vara Cível",
      valor: 50000,
      descricao: "Ação de indenização por danos morais e materiais decorrentes de acidente de trânsito.",
      documentos: [
        {
          id: 1,
          nome: "Petição Inicial",
          tipo: "Petição",
          data: "15/03/2024",
          status: "Enviado"
        },
        {
          id: 2,
          nome: "Documentos de Identidade",
          tipo: "Documento",
          data: "15/03/2024",
          status: "Enviado"
        }
      ],
      audiencias: [
        {
          id: 1,
          data: "15/04/2024",
          tipo: "Audiência Preliminar",
          status: "Agendada",
          local: "Fórum Central"
        }
      ],
      movimentacoes: [
        {
          id: 1,
          data: "15/03/2024",
          descricao: "Processo distribuído",
          tipo: "Distribuição"
        },
        {
          id: 2,
          data: "20/03/2024",
          descricao: "Audiência designada",
          tipo: "Audiência"
        }
      ]
    };

    setTimeout(() => {
      setProcesso(mockProcesso);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-500"></div>
      </div>
    );
  }

  if (!processo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Processo não encontrado</h1>
        <Button asChild>
          <Link to="/cliente/processos">Voltar para Processos</Link>
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "em andamento":
        return "bg-blue-500";
      case "concluído":
        return "bg-green-500";
      case "arquivado":
        return "bg-gray-500";
      case "aguardando":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalhes do Processo</h1>
        <Button asChild variant="outline">
          <Link to="/cliente/processos">Voltar</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Número do Processo</p>
                <p className="font-medium">{processo.numero}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">{processo.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className={getStatusColor(processo.status)}>
                  {processo.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Data de Início</p>
                <p className="font-medium">{processo.dataInicio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última Atualização</p>
                <p className="font-medium">{processo.ultimaAtualizacao}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Partes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="font-medium">{processo.cliente}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Advogado</p>
                <p className="font-medium">{processo.advogado}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documentos" className="w-full">
        <TabsList>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="audiencias">Audiências</TabsTrigger>
          <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {processo.documentos.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-navy-500" />
                      <div>
                        <p className="font-medium">{doc.nome}</p>
                        <p className="text-sm text-gray-500">{doc.tipo} • {doc.data}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{doc.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audiencias">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {processo.audiencias.map((aud) => (
                  <div key={aud.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-8 w-8 text-navy-500" />
                      <div>
                        <p className="font-medium">{aud.tipo}</p>
                        <p className="text-sm text-gray-500">{aud.data} • {aud.local}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{aud.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimentacoes">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {processo.movimentacoes.map((mov) => (
                  <div key={mov.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-8 w-8 text-navy-500" />
                      <div>
                        <p className="font-medium">{mov.descricao}</p>
                        <p className="text-sm text-gray-500">{mov.data} • {mov.tipo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessoDetalhes; 
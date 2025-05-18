import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Calendar, FileText, User, AlertCircle } from "lucide-react";

// Interface para a cobrança
interface Cobranca {
  id: number;
  cliente: string;
  processo?: string;
  valor: number;
  dataVencimento: string;
  status: string;
  tipo: string;
  descricao: string;
}

// Dados mockados para Cobranças
const mockCobrancas: Cobranca[] = [
  {
    id: 1,
    cliente: "João Silva",
    processo: "0001234-56.2024.8.26.0100",
    valor: 5000,
    dataVencimento: "15/04/2024",
    status: "Pendente",
    tipo: "Honorários",
    descricao: "Honorários iniciais"
  },
  {
    id: 2,
    cliente: "Maria Santos",
    valor: 2000,
    dataVencimento: "20/04/2024",
    status: "Pago",
    tipo: "Consulta",
    descricao: "Consulta jurídica"
  },
  {
    id: 3,
    cliente: "Pedro Oliveira",
    processo: "0005678-90.2024.8.26.0100",
    valor: 3000,
    dataVencimento: "25/04/2024",
    status: "Atrasado",
    tipo: "Honorários",
    descricao: "Honorários mensais"
  }
];

const CobrancaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cobranca, setCobranca] = useState<Cobranca | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando uma chamada de API para buscar os detalhes da cobrança
    const fetchCobranca = () => {
      setLoading(true);
      // Encontrar a cobrança pelo ID
      const cobrancaEncontrada = mockCobrancas.find(c => c.id === Number(id));
      
      if (cobrancaEncontrada) {
        setCobranca(cobrancaEncontrada);
      }
      
      setLoading(false);
    };

    fetchCobranca();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pago":
        return "bg-green-500";
      case "pendente":
        return "bg-yellow-500";
      case "atrasado":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cobranca) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Cobrança não encontrada</h2>
        <p className="text-gray-500 mb-4">A cobrança que você está procurando não existe ou foi removida.</p>
        <Button onClick={() => navigate("/advogado/pagamentos")}>
          Voltar para Cobranças
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate("/advogado/pagamentos")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Detalhes da Cobrança</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações da Cobrança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{cobranca.cliente}</p>
                </div>
              </div>
              
              {cobranca.processo && (
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Processo</p>
                    <p className="font-medium">{cobranca.processo}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Valor</p>
                  <p className="font-medium">{formatCurrency(cobranca.valor)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Data de Vencimento</p>
                  <p className="font-medium">{cobranca.dataVencimento}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <Badge className={getStatusColor(cobranca.status)}>
                  {cobranca.status}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Tipo</p>
                <p className="font-medium">{cobranca.tipo}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Descrição</p>
                <p className="font-medium">{cobranca.descricao}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                Registrar Pagamento
              </Button>
              
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Recibo
              </Button>
              
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Alterar Vencimento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CobrancaDetalhes; 
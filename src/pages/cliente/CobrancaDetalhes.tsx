import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, FileText, CreditCard, Landmark, QrCode } from "lucide-react";

interface Cobranca {
  id: number;
  cliente: string;
  processo?: string;
  valor: number;
  dataVencimento: string;
  status: string;
  tipo: string;
  descricao: string;
  dataCriacao: string;
  formaPagamento?: string;
  comprovante?: string;
}

const CobrancaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const [cobranca, setCobranca] = useState<Cobranca>({
    id: Number(id),
    cliente: "João Silva",
    processo: "0001234-56.2024.8.26.0100",
    valor: 5000,
    dataVencimento: "15/04/2024",
    status: "Pendente",
    tipo: "Honorários",
    descricao: "Honorários iniciais",
    dataCriacao: "15/03/2024"
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalhes da Cobrança</h1>
        <Button asChild variant="outline">
          <Link to="/cliente/pagamentos">Voltar</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-navy-500">
              {formatCurrency(cobranca.valor)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={`${getStatusColor(cobranca.status)} text-white`}>
              {cobranca.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vencimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{cobranca.dataVencimento}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações da Cobrança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium">{cobranca.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Descrição</p>
                  <p className="font-medium">{cobranca.descricao}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Processo</p>
                  <p className="font-medium">{cobranca.processo || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Criação</p>
                  <p className="font-medium">{cobranca.dataCriacao}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {cobranca.status === "Pendente" && (
            <Card>
              <CardHeader>
                <CardTitle>Formas de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cartao" className="w-full">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="cartao">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Cartão
                    </TabsTrigger>
                    <TabsTrigger value="boleto">
                      <Landmark className="h-4 w-4 mr-2" />
                      Boleto
                    </TabsTrigger>
                    <TabsTrigger value="pix">
                      <QrCode className="h-4 w-4 mr-2" />
                      PIX
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cartao">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Pagamento via cartão de crédito ou débito
                      </p>
                      <Button className="w-full">
                        Pagar com Cartão
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="boleto">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Gere um boleto bancário para pagamento
                      </p>
                      <Button className="w-full">
                        Gerar Boleto
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="pix">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Pague instantaneamente via PIX
                      </p>
                      <Button className="w-full">
                        Gerar PIX
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              {cobranca.status === "Pago" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pagamento Realizado</p>
                      <p className="text-sm text-gray-500">
                        {cobranca.formaPagamento} • {cobranca.dataCriacao}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Comprovante
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Nenhum pagamento realizado ainda.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CobrancaDetalhes; 
import { useState } from "react";
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Share2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Pagamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");

  // Dados simulados para os pagamentos
  const pagamentos = [
    {
      id: 1,
      numero: "FAT-2023-001",
      data: "2023-06-01",
      vencimento: "2023-06-15",
      valor: 2500.00,
      status: "pago",
      tipo: "honorarios",
      descricao: "Honorários advocatícios - Divórcio Consensual",
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      formaPagamento: "Cartão de Crédito",
      dataPagamento: "2023-06-10"
    },
    {
      id: 2,
      numero: "FAT-2023-002",
      data: "2023-06-05",
      vencimento: "2023-06-20",
      valor: 1500.00,
      status: "pendente",
      tipo: "custas",
      descricao: "Custas processuais - Inventário",
      processo: {
        id: 2,
        numero: "PROC-2023-002",
        titulo: "Inventário"
      },
      formaPagamento: null,
      dataPagamento: null
    },
    {
      id: 3,
      numero: "FAT-2023-003",
      data: "2023-05-15",
      vencimento: "2023-05-30",
      valor: 3000.00,
      status: "pago",
      tipo: "honorarios",
      descricao: "Honorários advocatícios - Inventário",
      processo: {
        id: 2,
        numero: "PROC-2023-002",
        titulo: "Inventário"
      },
      formaPagamento: "Transferência Bancária",
      dataPagamento: "2023-05-25"
    },
    {
      id: 4,
      numero: "FAT-2023-004",
      data: "2023-06-10",
      vencimento: "2023-06-25",
      valor: 800.00,
      status: "atrasado",
      tipo: "custas",
      descricao: "Custas processuais - Divórcio Consensual",
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      formaPagamento: null,
      dataPagamento: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-500">Pago</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "atrasado":
        return <Badge className="bg-red-500">Atrasado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Filtrar pagamentos
  const filteredPagamentos = pagamentos
    .filter(pagamento => {
      // Filtrar por termo de busca
      const searchMatch = 
        pagamento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pagamento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pagamento.processo.numero.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por status
      const statusMatch = statusFilter === "todos" || pagamento.status === statusFilter;
      
      // Filtrar por tipo
      const tipoMatch = tipoFilter === "todos" || pagamento.tipo === tipoFilter;
      
      return searchMatch && statusMatch && tipoMatch;
    })
    .sort((a, b) => {
      // Ordenar por data de vencimento
      return new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime();
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Meus Pagamentos</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pagamentos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="honorarios">Honorários</SelectItem>
                <SelectItem value="custas">Custas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarValor(5500.00)}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarValor(2300.00)}</div>
            <p className="text-xs text-muted-foreground">
              2 faturas pendentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Atrasado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarValor(800.00)}</div>
            <p className="text-xs text-muted-foreground">
              1 fatura atrasada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarValor(1500.00)}</div>
            <p className="text-xs text-muted-foreground">
              Vence em 5 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Processo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPagamentos.map((pagamento) => (
              <TableRow key={pagamento.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{pagamento.numero}</div>
                    <div className="text-sm text-muted-foreground">
                      {pagamento.descricao}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatarData(pagamento.data)}</TableCell>
                <TableCell>{formatarData(pagamento.vencimento)}</TableCell>
                <TableCell>{formatarValor(pagamento.valor)}</TableCell>
                <TableCell>{getStatusBadge(pagamento.status)}</TableCell>
                <TableCell>
                  {pagamento.tipo === "honorarios" ? "Honorários" : "Custas"}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {pagamento.processo.numero}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Baixar PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="h-4 w-4 mr-2" />
                          Imprimir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Compartilhar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredPagamentos.length === 0 && (
        <div className="text-center py-10">
          <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum pagamento encontrado</h3>
          <p className="text-muted-foreground mt-2">
            Tente ajustar seus filtros ou entre em contato com seu advogado.
          </p>
        </div>
      )}
    </div>
  );
};

export default Pagamentos; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  FileEdit,
  Eye,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign
} from "lucide-react";
import { paymentService } from "@/lib/db";
import { Payment, PaymentType, PaymentStatus } from "@/types/database";

const Pagamentos = () => {
  const navigate = useNavigate();
  const [pagamentos, setPagamentos] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "TODOS">("TODOS");
  const [typeFilter, setTypeFilter] = useState<PaymentType | "TODOS">("TODOS");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<Partial<Payment>>({
    amount: 0,
    description: "",
    type: "HONORARIOS",
    status: "PENDENTE",
    dueDate: new Date(),
    paymentDate: null,
    paymentMethod: "",
    processId: "",
  });

  // Carregar pagamentos ao iniciar o componente
  useEffect(() => {
    loadPagamentos();
  }, []);

  // Função para carregar os pagamentos
  const loadPagamentos = async () => {
    try {
      setLoading(true);
      // Aqui você usaria o serviço real para buscar os pagamentos
      // const processId = "process-id"; // Obter o ID do processo selecionado
      // const data = await paymentService.listByProcess(processId);
      // setPagamentos(data);
      
      // Por enquanto, vamos usar dados mockados
      const mockPagamentos: Payment[] = [
        {
          id: "1",
          amount: 5000.00,
          description: "Honorários iniciais",
          type: "HONORARIOS",
          status: "PAGO",
          dueDate: new Date("2023-01-15"),
          paymentDate: new Date("2023-01-10"),
          paymentMethod: "Transferência Bancária",
          processId: "1",
          createdAt: new Date("2023-01-05"),
          updatedAt: new Date("2023-01-10"),
        },
        {
          id: "2",
          amount: 1200.00,
          description: "Custas processuais",
          type: "CUSTAS",
          status: "PENDENTE",
          dueDate: new Date("2023-04-20"),
          paymentDate: null,
          paymentMethod: "",
          processId: "1",
          createdAt: new Date("2023-03-15"),
          updatedAt: new Date("2023-03-15"),
        },
        {
          id: "3",
          amount: 300.00,
          description: "Consulta jurídica",
          type: "CONSULTA",
          status: "PAGO",
          dueDate: new Date("2023-02-05"),
          paymentDate: new Date("2023-02-05"),
          paymentMethod: "Dinheiro",
          processId: "2",
          createdAt: new Date("2023-02-01"),
          updatedAt: new Date("2023-02-05"),
        },
        {
          id: "4",
          amount: 8000.00,
          description: "Honorários de sucumbência",
          type: "HONORARIOS",
          status: "ATRASADO",
          dueDate: new Date("2023-03-10"),
          paymentDate: null,
          paymentMethod: "",
          processId: "3",
          createdAt: new Date("2023-02-20"),
          updatedAt: new Date("2023-03-11"),
        },
        {
          id: "5",
          amount: 500.00,
          description: "Custas de cartório",
          type: "CUSTAS",
          status: "CANCELADO",
          dueDate: new Date("2023-03-25"),
          paymentDate: null,
          paymentMethod: "",
          processId: "4",
          createdAt: new Date("2023-03-10"),
          updatedAt: new Date("2023-03-22"),
        }
      ];
      
      setPagamentos(mockPagamentos);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
      toast({
        title: "Erro ao carregar pagamentos",
        description: "Não foi possível carregar a lista de pagamentos. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar pagamentos com base nos critérios de busca
  const filteredPagamentos = pagamentos.filter(pagamento => {
    const matchesSearch = 
      pagamento.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pagamento.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "TODOS" || pagamento.status === statusFilter;
    const matchesType = typeFilter === "TODOS" || pagamento.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Abrir diálogo para criar/editar pagamento
  const handleOpenDialog = (pagamento?: Payment) => {
    if (pagamento) {
      setCurrentPayment(pagamento);
      setIsViewMode(false);
    } else {
      setCurrentPayment({
        amount: 0,
        description: "",
        type: "HONORARIOS",
        status: "PENDENTE",
        dueDate: new Date(),
        paymentDate: null,
        paymentMethod: "",
        processId: "1", // ID do processo selecionado
      });
      setIsViewMode(false);
    }
    setIsDialogOpen(true);
  };

  // Abrir diálogo para visualizar pagamento
  const handleViewPayment = (pagamento: Payment) => {
    setCurrentPayment(pagamento);
    setIsViewMode(true);
    setIsDialogOpen(true);
  };

  // Salvar pagamento (criar ou atualizar)
  const handleSavePayment = async () => {
    try {
      if (!currentPayment.description || !currentPayment.amount || !currentPayment.processId) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios",
          variant: "destructive"
        });
        return;
      }

      // Aqui você usaria o serviço real para salvar o pagamento
      // if (currentPayment.id) {
      //   await paymentService.updatePayment(currentPayment.id, currentPayment);
      //   toast({
      //     title: "Pagamento atualizado",
      //     description: "O pagamento foi atualizado com sucesso"
      //   });
      // } else {
      //   await paymentService.createPayment(currentPayment);
      //   toast({
      //     title: "Pagamento criado",
      //     description: "O pagamento foi criado com sucesso"
      //   });
      // }
      
      // Por enquanto, vamos simular a atualização local
      if (currentPayment.id) {
        setPagamentos(pagamentos.map(p => 
          p.id === currentPayment.id ? { ...p, ...currentPayment } : p
        ));
        toast({
          title: "Pagamento atualizado",
          description: "O pagamento foi atualizado com sucesso"
        });
      } else {
        const newPayment: Payment = {
          ...currentPayment as Payment,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setPagamentos([...pagamentos, newPayment]);
        toast({
          title: "Pagamento criado",
          description: "O pagamento foi criado com sucesso"
        });
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao salvar pagamento:", error);
      toast({
        title: "Erro ao salvar pagamento",
        description: "Não foi possível salvar o pagamento. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  // Excluir pagamento
  const handleDeletePayment = async (id: string) => {
    try {
      // Aqui você usaria o serviço real para excluir o pagamento
      // await paymentService.deletePayment(id);
      
      // Por enquanto, vamos simular a exclusão local
      setPagamentos(pagamentos.filter(p => p.id !== id));
      toast({
        title: "Pagamento excluído",
        description: "O pagamento foi excluído com sucesso"
      });
    } catch (error) {
      console.error("Erro ao excluir pagamento:", error);
      toast({
        title: "Erro ao excluir pagamento",
        description: "Não foi possível excluir o pagamento. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  // Obter a cor do badge com base no status
  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      case "PAGO":
        return "bg-green-100 text-green-800";
      case "ATRASADO":
        return "bg-red-100 text-red-800";
      case "CANCELADO":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Obter a cor do badge com base no tipo
  const getTypeColor = (type: PaymentType) => {
    switch (type) {
      case "HONORARIOS":
        return "bg-blue-100 text-blue-800";
      case "CUSTAS":
        return "bg-purple-100 text-purple-800";
      case "CONSULTA":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Formatar data para exibição
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pagamentos</CardTitle>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Pagamento
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar pagamentos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as PaymentStatus | "TODOS")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos os Status</SelectItem>
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                  <SelectItem value="PAGO">Pago</SelectItem>
                  <SelectItem value="ATRASADO">Atrasado</SelectItem>
                  <SelectItem value="CANCELADO">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as PaymentType | "TODOS")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos os Tipos</SelectItem>
                  <SelectItem value="HONORARIOS">Honorários</SelectItem>
                  <SelectItem value="CUSTAS">Custas</SelectItem>
                  <SelectItem value="CONSULTA">Consulta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredPagamentos.length === 0 ? (
            <div className="text-center py-10">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum pagamento encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== "TODOS" || typeFilter !== "TODOS"
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando um novo pagamento"}
              </p>
              {!searchTerm && statusFilter === "TODOS" && typeFilter === "TODOS" && (
                <Button className="mt-4" onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Pagamento
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Data de Pagamento</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPagamentos.map((pagamento) => (
                    <TableRow key={pagamento.id}>
                      <TableCell>{pagamento.description}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(pagamento.type)}>
                          {pagamento.type === "HONORARIOS" && "Honorários"}
                          {pagamento.type === "CUSTAS" && "Custas"}
                          {pagamento.type === "CONSULTA" && "Consulta"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(pagamento.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(pagamento.status)}>
                          {pagamento.status === "PENDENTE" && "Pendente"}
                          {pagamento.status === "PAGO" && "Pago"}
                          {pagamento.status === "ATRASADO" && "Atrasado"}
                          {pagamento.status === "CANCELADO" && "Cancelado"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(pagamento.dueDate)}</TableCell>
                      <TableCell>{formatDate(pagamento.paymentDate)}</TableCell>
                      <TableCell>{pagamento.paymentMethod || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewPayment(pagamento)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(pagamento)}
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletePayment(pagamento.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {isViewMode 
                ? "Detalhes do Pagamento"
                : currentPayment.id 
                  ? "Editar Pagamento"
                  : "Novo Pagamento"
              }
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição*</Label>
                <Input
                  id="description"
                  value={currentPayment.description}
                  onChange={(e) => setCurrentPayment({...currentPayment, description: e.target.value})}
                  disabled={isViewMode}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="amount">Valor*</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={currentPayment.amount}
                  onChange={(e) => setCurrentPayment({...currentPayment, amount: parseFloat(e.target.value)})}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo*</Label>
                <Select
                  value={currentPayment.type}
                  onValueChange={(value) => setCurrentPayment({...currentPayment, type: value as PaymentType})}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HONORARIOS">Honorários</SelectItem>
                    <SelectItem value="CUSTAS">Custas</SelectItem>
                    <SelectItem value="CONSULTA">Consulta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentPayment.status}
                  onValueChange={(value) => setCurrentPayment({...currentPayment, status: value as PaymentStatus})}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="PAGO">Pago</SelectItem>
                    <SelectItem value="ATRASADO">Atrasado</SelectItem>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Data de Vencimento*</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={currentPayment.dueDate ? new Date(currentPayment.dueDate).toISOString().split('T')[0] : ""}
                  onChange={(e) => setCurrentPayment({...currentPayment, dueDate: new Date(e.target.value)})}
                  disabled={isViewMode}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="paymentDate">Data de Pagamento</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={currentPayment.paymentDate ? new Date(currentPayment.paymentDate).toISOString().split('T')[0] : ""}
                  onChange={(e) => setCurrentPayment({...currentPayment, paymentDate: e.target.value ? new Date(e.target.value) : null})}
                  disabled={isViewMode}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Método de Pagamento</Label>
              <Input
                id="paymentMethod"
                value={currentPayment.paymentMethod || ""}
                onChange={(e) => setCurrentPayment({...currentPayment, paymentMethod: e.target.value})}
                disabled={isViewMode}
                placeholder="Ex: Transferência Bancária, Dinheiro, PIX, etc."
              />
            </div>
          </div>
          
          <DialogFooter>
            {!isViewMode && (
              <Button onClick={handleSavePayment}>
                {currentPayment.id ? "Atualizar" : "Criar"}
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {isViewMode ? "Fechar" : "Cancelar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pagamentos; 
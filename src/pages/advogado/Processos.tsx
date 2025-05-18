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
  FileText,
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
  Archive
} from "lucide-react";
import { processService } from "@/lib/db";
import { Process, ProcessStatus, Priority } from "@/types/database";

const Processos = () => {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProcessStatus | "TODOS">("TODOS");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "TODOS">("TODOS");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<Partial<Process>>({
    number: "",
    title: "",
    description: "",
    type: "",
    area: "",
    status: "EM_ANDAMENTO",
    court: "",
    judge: "",
    instance: "",
    priority: "MEDIA",
    emergency: false,
    startDate: new Date(),
  });

  // Carregar processos ao iniciar o componente
  useEffect(() => {
    loadProcessos();
  }, []);

  // Função para carregar os processos
  const loadProcessos = async () => {
    try {
      setLoading(true);
      // Aqui você usaria o serviço real para buscar os processos
      // const userId = "user-id"; // Obter o ID do usuário logado
      // const data = await processService.listByUser(userId);
      // setProcessos(data);
      
      // Por enquanto, vamos usar dados mockados
      const mockProcessos: Process[] = [
        {
          id: "1",
          number: "PROC-2023-001",
          title: "Divórcio Consensual",
          description: "Processo de divórcio consensual entre João Silva e Maria Santos",
          type: "Cível",
          area: "Família",
          status: "EM_ANDAMENTO",
          court: "TJSP",
          judge: "Dr. Carlos Oliveira",
          instance: "1ª Instância",
          priority: "MEDIA",
          emergency: false,
          startDate: new Date("2023-01-15"),
          lastUpdate: new Date("2023-03-20"),
          nextHearing: new Date("2023-04-10"),
          distributionDate: new Date("2023-01-20"),
          createdAt: new Date("2023-01-15"),
          updatedAt: new Date("2023-03-20"),
        },
        {
          id: "2",
          number: "PROC-2023-002",
          title: "Inventário",
          description: "Processo de inventário do falecido Pedro Alves",
          type: "Cível",
          area: "Sucessões",
          status: "AGUARDANDO",
          court: "TJSP",
          judge: "Dra. Ana Mendes",
          instance: "1ª Instância",
          priority: "ALTA",
          emergency: false,
          startDate: new Date("2023-02-10"),
          lastUpdate: new Date("2023-03-15"),
          nextHearing: null,
          distributionDate: new Date("2023-02-15"),
          createdAt: new Date("2023-02-10"),
          updatedAt: new Date("2023-03-15"),
        },
        {
          id: "3",
          number: "PROC-2023-003",
          title: "Ação de Indenização",
          description: "Ação de indenização por danos morais e materiais",
          type: "Cível",
          area: "Responsabilidade Civil",
          status: "CONCLUIDO",
          court: "TJSP",
          judge: "Dr. Roberto Santos",
          instance: "2ª Instância",
          priority: "BAIXA",
          emergency: false,
          startDate: new Date("2022-11-05"),
          lastUpdate: new Date("2023-02-28"),
          nextHearing: null,
          distributionDate: new Date("2022-11-10"),
          createdAt: new Date("2022-11-05"),
          updatedAt: new Date("2023-02-28"),
        },
        {
          id: "4",
          number: "PROC-2023-004",
          title: "Ação Trabalhista",
          description: "Ação trabalhista por rescisão indireta",
          type: "Trabalhista",
          area: "Direito do Trabalho",
          status: "EM_ANDAMENTO",
          court: "TRT-2",
          judge: "Dra. Juliana Costa",
          instance: "1ª Instância",
          priority: "URGENTE",
          emergency: true,
          startDate: new Date("2023-03-01"),
          lastUpdate: new Date("2023-03-18"),
          nextHearing: new Date("2023-04-05"),
          distributionDate: new Date("2023-03-05"),
          createdAt: new Date("2023-03-01"),
          updatedAt: new Date("2023-03-18"),
        },
        {
          id: "5",
          number: "PROC-2023-005",
          title: "Ação de Alimentos",
          description: "Ação de alimentos para filhos menores",
          type: "Cível",
          area: "Família",
          status: "ARQUIVADO",
          court: "TJSP",
          judge: "Dr. Paulo Mendonça",
          instance: "1ª Instância",
          priority: "MEDIA",
          emergency: false,
          startDate: new Date("2022-09-20"),
          lastUpdate: new Date("2023-01-15"),
          nextHearing: null,
          distributionDate: new Date("2022-09-25"),
          createdAt: new Date("2022-09-20"),
          updatedAt: new Date("2023-01-15"),
        }
      ];
      
      setProcessos(mockProcessos);
    } catch (error) {
      console.error("Erro ao carregar processos:", error);
      toast({
        title: "Erro ao carregar processos",
        description: "Não foi possível carregar a lista de processos. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar processos com base nos critérios de busca
  const filteredProcessos = processos.filter(processo => {
    const matchesSearch = 
      processo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.area.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "TODOS" || processo.status === statusFilter;
    const matchesPriority = priorityFilter === "TODOS" || processo.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Abrir diálogo para criar/editar processo
  const handleOpenDialog = (processo?: Process) => {
    if (processo) {
      setCurrentProcess(processo);
      setIsViewMode(false);
    } else {
      setCurrentProcess({
        number: "",
        title: "",
        description: "",
        type: "",
        area: "",
        status: "EM_ANDAMENTO",
        court: "",
        judge: "",
        instance: "",
        priority: "MEDIA",
        emergency: false,
        startDate: new Date(),
      });
      setIsViewMode(false);
    }
    setIsDialogOpen(true);
  };

  // Abrir diálogo para visualizar processo
  const handleViewProcess = (processo: Process) => {
    setCurrentProcess(processo);
    setIsViewMode(true);
    setIsDialogOpen(true);
  };

  // Salvar processo (criar ou atualizar)
  const handleSaveProcess = async () => {
    try {
      if (!currentProcess.title || !currentProcess.number || !currentProcess.type || !currentProcess.area) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios",
          variant: "destructive"
        });
        return;
      }

      // Aqui você usaria o serviço real para salvar o processo
      // if (currentProcess.id) {
      //   await processService.updateProcess(currentProcess.id, currentProcess);
      //   toast({
      //     title: "Processo atualizado",
      //     description: "O processo foi atualizado com sucesso"
      //   });
      // } else {
      //   const userId = "user-id"; // Obter o ID do usuário logado
      //   await processService.createProcess({ ...currentProcess, userId });
      //   toast({
      //     title: "Processo criado",
      //     description: "O processo foi criado com sucesso"
      //   });
      // }
      
      // Por enquanto, vamos simular a atualização local
      if (currentProcess.id) {
        setProcessos(processos.map(p => 
          p.id === currentProcess.id ? { ...p, ...currentProcess } : p
        ));
        toast({
          title: "Processo atualizado",
          description: "O processo foi atualizado com sucesso"
        });
      } else {
        const newProcess: Process = {
          ...currentProcess as Process,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          lastUpdate: new Date(),
        };
        setProcessos([...processos, newProcess]);
        toast({
          title: "Processo criado",
          description: "O processo foi criado com sucesso"
        });
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao salvar processo:", error);
      toast({
        title: "Erro ao salvar processo",
        description: "Não foi possível salvar o processo. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  // Excluir processo
  const handleDeleteProcess = async (id: string) => {
    try {
      // Aqui você usaria o serviço real para excluir o processo
      // await processService.deleteProcess(id);
      
      // Por enquanto, vamos simular a exclusão local
      setProcessos(processos.filter(p => p.id !== id));
      toast({
        title: "Processo excluído",
        description: "O processo foi excluído com sucesso"
      });
    } catch (error) {
      console.error("Erro ao excluir processo:", error);
      toast({
        title: "Erro ao excluir processo",
        description: "Não foi possível excluir o processo. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  // Obter a cor do badge com base no status
  const getStatusColor = (status: ProcessStatus) => {
    switch (status) {
      case "AGUARDANDO":
        return "bg-yellow-100 text-yellow-800";
      case "EM_ANDAMENTO":
        return "bg-blue-100 text-blue-800";
      case "ARQUIVADO":
        return "bg-gray-100 text-gray-800";
      case "CONCLUIDO":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Obter a cor do badge com base na prioridade
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "BAIXA":
        return "bg-green-100 text-green-800";
      case "MEDIA":
        return "bg-blue-100 text-blue-800";
      case "ALTA":
        return "bg-orange-100 text-orange-800";
      case "URGENTE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Formatar data para exibição
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Processos</CardTitle>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar processos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as ProcessStatus | "TODOS")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos os Status</SelectItem>
                  <SelectItem value="AGUARDANDO">Aguardando</SelectItem>
                  <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                  <SelectItem value="ARQUIVADO">Arquivado</SelectItem>
                  <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={priorityFilter}
                onValueChange={(value) => setPriorityFilter(value as Priority | "TODOS")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todas as Prioridades</SelectItem>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="ALTA">Alta</SelectItem>
                  <SelectItem value="URGENTE">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredProcessos.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum processo encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== "TODOS" || priorityFilter !== "TODOS"
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando um novo processo"}
              </p>
              {!searchTerm && statusFilter === "TODOS" && priorityFilter === "TODOS" && (
                <Button className="mt-4" onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Processo
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Data de Início</TableHead>
                    <TableHead>Próxima Audiência</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcessos.map((processo) => (
                    <TableRow key={processo.id}>
                      <TableCell className="font-medium">{processo.number}</TableCell>
                      <TableCell>{processo.title}</TableCell>
                      <TableCell>{processo.area}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(processo.status)}>
                          {processo.status === "AGUARDANDO" && "Aguardando"}
                          {processo.status === "EM_ANDAMENTO" && "Em Andamento"}
                          {processo.status === "ARQUIVADO" && "Arquivado"}
                          {processo.status === "CONCLUIDO" && "Concluído"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(processo.priority)}>
                          {processo.priority === "BAIXA" && "Baixa"}
                          {processo.priority === "MEDIA" && "Média"}
                          {processo.priority === "ALTA" && "Alta"}
                          {processo.priority === "URGENTE" && "Urgente"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(processo.startDate)}</TableCell>
                      <TableCell>{formatDate(processo.nextHearing)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewProcess(processo)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(processo)}
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProcess(processo.id)}
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
                ? "Detalhes do Processo"
                : currentProcess.id 
                  ? "Editar Processo"
                  : "Novo Processo"
              }
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="number">Número do Processo*</Label>
                <Input
                  id="number"
                  value={currentProcess.number}
                  onChange={(e) => setCurrentProcess({...currentProcess, number: e.target.value})}
                  disabled={isViewMode}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Título*</Label>
                <Input
                  id="title"
                  value={currentProcess.title}
                  onChange={(e) => setCurrentProcess({...currentProcess, title: e.target.value})}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={currentProcess.description || ""}
                onChange={(e) => setCurrentProcess({...currentProcess, description: e.target.value})}
                disabled={isViewMode}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo*</Label>
                <Input
                  id="type"
                  value={currentProcess.type}
                  onChange={(e) => setCurrentProcess({...currentProcess, type: e.target.value})}
                  disabled={isViewMode}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="area">Área do Direito*</Label>
                <Input
                  id="area"
                  value={currentProcess.area}
                  onChange={(e) => setCurrentProcess({...currentProcess, area: e.target.value})}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentProcess.status}
                  onValueChange={(value) => setCurrentProcess({...currentProcess, status: value as ProcessStatus})}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AGUARDANDO">Aguardando</SelectItem>
                    <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                    <SelectItem value="ARQUIVADO">Arquivado</SelectItem>
                    <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                  value={currentProcess.priority}
                  onValueChange={(value) => setCurrentProcess({...currentProcess, priority: value as Priority})}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BAIXA">Baixa</SelectItem>
                    <SelectItem value="MEDIA">Média</SelectItem>
                    <SelectItem value="ALTA">Alta</SelectItem>
                    <SelectItem value="URGENTE">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="court">Tribunal</Label>
                <Input
                  id="court"
                  value={currentProcess.court || ""}
                  onChange={(e) => setCurrentProcess({...currentProcess, court: e.target.value})}
                  disabled={isViewMode}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="judge">Juiz</Label>
                <Input
                  id="judge"
                  value={currentProcess.judge || ""}
                  onChange={(e) => setCurrentProcess({...currentProcess, judge: e.target.value})}
                  disabled={isViewMode}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="instance">Instância</Label>
                <Input
                  id="instance"
                  value={currentProcess.instance || ""}
                  onChange={(e) => setCurrentProcess({...currentProcess, instance: e.target.value})}
                  disabled={isViewMode}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Data de Início*</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentProcess.startDate ? new Date(currentProcess.startDate).toISOString().split('T')[0] : ""}
                  onChange={(e) => setCurrentProcess({...currentProcess, startDate: new Date(e.target.value)})}
                  disabled={isViewMode}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="nextHearing">Próxima Audiência</Label>
                <Input
                  id="nextHearing"
                  type="date"
                  value={currentProcess.nextHearing ? new Date(currentProcess.nextHearing).toISOString().split('T')[0] : ""}
                  onChange={(e) => setCurrentProcess({...currentProcess, nextHearing: e.target.value ? new Date(e.target.value) : null})}
                  disabled={isViewMode}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="distributionDate">Data de Distribuição</Label>
                <Input
                  id="distributionDate"
                  type="date"
                  value={currentProcess.distributionDate ? new Date(currentProcess.distributionDate).toISOString().split('T')[0] : ""}
                  onChange={(e) => setCurrentProcess({...currentProcess, distributionDate: e.target.value ? new Date(e.target.value) : null})}
                  disabled={isViewMode}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emergency"
                checked={currentProcess.emergency || false}
                onChange={(e) => setCurrentProcess({...currentProcess, emergency: e.target.checked})}
                disabled={isViewMode}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="emergency">Emergência Jurídica</Label>
            </div>
          </div>
          
          <DialogFooter>
            {!isViewMode && (
              <Button onClick={handleSaveProcess}>
                {currentProcess.id ? "Atualizar" : "Criar"}
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

export default Processos; 
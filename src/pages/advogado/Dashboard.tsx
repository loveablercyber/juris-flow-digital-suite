
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Filter, 
  Search, 
  Edit, 
  Save, 
  X,
  Trash2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Process {
  id: string;
  client: string;
  subject: string;
  status: string;
  date: string;
  urgency: string;
  description?: string; // Campo opcional para descrição
  notes?: string; // Campo opcional para anotações
}

const mockProcesses: Process[] = [
  { id: "2023-0001", client: "Maria Santos", subject: "Divórcio", status: "Em andamento", date: "10/05/2023", urgency: "Alta", description: "Processo de divórcio litigioso com disputa de bens e guarda de filhos." },
  { id: "2023-0002", client: "João Pereira", subject: "Pensão Alimentícia", status: "Aguardando documentos", date: "15/05/2023", urgency: "Média", description: "Revisão de pensão alimentícia por mudança na situação financeira." },
  { id: "2023-0003", client: "Ana Oliveira", subject: "Inventário", status: "Concluído", date: "22/05/2023", urgency: "Baixa", description: "Inventário e partilha de bens após falecimento." },
  { id: "2023-0004", client: "Carlos Silva", subject: "Contrato de Aluguel", status: "Em andamento", date: "01/06/2023", urgency: "Média", description: "Análise e elaboração de contrato de locação comercial." },
  { id: "2023-0005", client: "Paula Costa", subject: "Rescisão Trabalhista", status: "Audiência marcada", date: "10/06/2023", urgency: "Alta", description: "Processo de rescisão indireta do contrato de trabalho." },
  { id: "2023-0006", client: "Roberto Alves", subject: "Ação de Despejo", status: "Aguardando documentos", date: "15/06/2023", urgency: "Média", description: "Ação de despejo por falta de pagamento." },
  { id: "2023-0007", client: "Fernanda Lima", subject: "Posse de Imóvel", status: "Em andamento", date: "20/06/2023", urgency: "Alta", description: "Disputa de posse de imóvel urbano." },
  { id: "2023-0008", client: "Marcelo Gomes", subject: "Reclamação Trabalhista", status: "Concluído", date: "25/06/2023", urgency: "Baixa", description: "Processo trabalhista por horas extras não pagas." },
];

const statusOptions = [
  "Em andamento",
  "Aguardando documentos",
  "Concluído",
  "Audiência marcada"
];

const urgencyOptions = ["Alta", "Média", "Baixa"];

const statusColors: Record<string, string> = {
  "Em andamento": "bg-blue-100 text-blue-800",
  "Aguardando documentos": "bg-yellow-100 text-yellow-800",
  "Concluído": "bg-green-100 text-green-800",
  "Audiência marcada": "bg-purple-100 text-purple-800",
};

const Dashboard = () => {
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [processes, setProcesses] = useState<Process[]>(mockProcesses);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProcess, setEditedProcess] = useState<Process | null>(null);
  
  const filteredProcesses = processes.filter((process) => {
    const matchesFilter = filter === "Todos" || process.status === filter;
    const matchesSearch = 
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    "Todos": processes.length,
    "Em andamento": processes.filter(p => p.status === "Em andamento").length,
    "Aguardando documentos": processes.filter(p => p.status === "Aguardando documentos").length,
    "Concluído": processes.filter(p => p.status === "Concluído").length,
    "Audiência marcada": processes.filter(p => p.status === "Audiência marcada").length,
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleRowClick = (process: Process) => {
    setSelectedProcess(process);
    setEditedProcess({...process});
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (editedProcess) {
      const updatedProcesses = processes.map(p => 
        p.id === editedProcess.id ? editedProcess : p
      );
      setProcesses(updatedProcesses);
      setSelectedProcess(editedProcess);
      setIsEditMode(false);
      
      toast({
        title: "Processo atualizado",
        description: `O processo ${editedProcess.id} foi atualizado com sucesso.`,
      });
    }
  };

  const handleDelete = () => {
    if (selectedProcess) {
      const updatedProcesses = processes.filter(p => p.id !== selectedProcess.id);
      setProcesses(updatedProcesses);
      setIsDialogOpen(false);
      
      toast({
        title: "Processo removido",
        description: `O processo ${selectedProcess.id} foi removido com sucesso.`,
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof Process, value: string) => {
    if (editedProcess) {
      setEditedProcess({ ...editedProcess, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard de Processos</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar processo..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Badge variant="outline" className="gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filtrar
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processes.length}</div>
            <p className="text-xs text-muted-foreground">Atualizados em tempo real</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processes.filter(p => p.status === "Em andamento").length}</div>
            <p className="text-xs text-muted-foreground">Processos ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alta Urgência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{processes.filter(p => p.urgency === "Alta").length}</div>
            <p className="text-xs text-muted-foreground">Processos prioritários</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{processes.filter(p => p.status === "Concluído").length}</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Tabs defaultValue="Todos" onValueChange={setFilter}>
          <div className="p-4">
            <TabsList>
              {Object.entries(statusCounts).map(([status, count]) => (
                <TabsTrigger key={status} value={status}>
                  {status} ({count})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={filter} className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Urgência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcesses.length > 0 ? (
                  filteredProcesses.map((process) => (
                    <TableRow 
                      key={process.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(process)}
                    >
                      <TableCell className="font-medium">{process.id}</TableCell>
                      <TableCell>{process.client}</TableCell>
                      <TableCell>{process.subject}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[process.status] || "bg-gray-100 text-gray-800"}`}>
                          {process.status}
                        </span>
                      </TableCell>
                      <TableCell>{process.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(process.urgency)}`}>
                          {process.urgency}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Nenhum processo encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Modal de detalhes e edição */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Processo" : "Detalhes do Processo"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Edite os detalhes do processo abaixo."
                : "Visualize os detalhes do processo."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="id" className="text-right font-medium">Número:</label>
              <Input
                id="id"
                value={editedProcess?.id || ""}
                onChange={(e) => handleInputChange("id", e.target.value)}
                className="col-span-3"
                disabled={!isEditMode}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="client" className="text-right font-medium">Cliente:</label>
              <Input
                id="client"
                value={editedProcess?.client || ""}
                onChange={(e) => handleInputChange("client", e.target.value)}
                className="col-span-3"
                disabled={!isEditMode}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subject" className="text-right font-medium">Assunto:</label>
              <Input
                id="subject"
                value={editedProcess?.subject || ""}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="col-span-3"
                disabled={!isEditMode}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right font-medium">Status:</label>
              {isEditMode ? (
                <Select
                  value={editedProcess?.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="col-span-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[editedProcess?.status || ""] || ""}`}>
                    {editedProcess?.status}
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right font-medium">Data:</label>
              <Input
                id="date"
                value={editedProcess?.date || ""}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="col-span-3"
                disabled={!isEditMode}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="urgency" className="text-right font-medium">Urgência:</label>
              {isEditMode ? (
                <Select
                  value={editedProcess?.urgency}
                  onValueChange={(value) => handleInputChange("urgency", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyOptions.map((urgency) => (
                      <SelectItem key={urgency} value={urgency}>
                        {urgency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="col-span-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(editedProcess?.urgency || "")}`}>
                    {editedProcess?.urgency}
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">Descrição:</label>
              <Input
                id="description"
                value={editedProcess?.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="col-span-3"
                disabled={!isEditMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right font-medium">Anotações:</label>
              <Input
                id="notes"
                value={editedProcess?.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="col-span-3"
                disabled={!isEditMode}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <div>
              {!isEditMode && (
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {isEditMode ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditMode(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

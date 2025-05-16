import React, { useState, useEffect } from "react";
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
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  BarChart2,
  PieChart,
  MapPin,
  Bell,
  CheckSquare,
  File,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Moon,
  Sun,
  Loader2
} from "lucide-react";
import Calendar from "@/components/Calendar";
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
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { format, addDays, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Process {
  id: string;
  client: string;
  subject: string;
  status: string;
  date: string;
  urgency: string;
  description?: string;
  notes?: string;
  type?: string;
  area?: string;
  deadline?: string;
  comarca?: string;
  lastUpdate?: string;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  priority: string;
  assignedTo: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: string;
}

interface Hearing {
  id: string;
  processId: string;
  date: string;
  time: string;
  type: string;
  location: string;
}

const areaData = [
  { name: "Civil", value: 35 },
  { name: "Trabalhista", value: 25 },
  { name: "Família", value: 20 },
  { name: "Tributário", value: 15 },
  { name: "Criminal", value: 5 },
];

const monthlyData = [
  { month: "Jan", processos: 12 },
  { month: "Fev", processos: 19 },
  { month: "Mar", processos: 15 },
  { month: "Abr", processos: 22 },
  { month: "Mai", processos: 28 },
];

const comarcaData = [
  { name: "São Paulo", value: 45 },
  { name: "Rio de Janeiro", value: 25 },
  { name: "Belo Horizonte", value: 15 },
  { name: "Outros", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const mockProcesses: Process[] = [
  {
    id: "1",
    client: "João Silva",
    subject: "Ação Trabalhista",
    status: "Em andamento",
    date: "2025-05-10",
    urgency: "Alta",
    description: "Reclamação trabalhista contra empresa XYZ",
    type: "Trabalhista",
    area: "Direito do Trabalho",
    deadline: "2025-06-15",
    comarca: "São Paulo",
    lastUpdate: "2025-05-15",
    notes: "Audiência marcada para próxima semana"
  },
  {
    id: "2",
    client: "Maria Santos",
    subject: "Revisão Contratual",
    status: "Aguardando documentos",
    date: "2025-05-01",
    urgency: "Média",
    description: "Revisão de contrato de aluguel",
    type: "Civil",
    area: "Direito Civil",
    deadline: "2025-05-30",
    comarca: "Rio de Janeiro",
    lastUpdate: "2025-05-14",
    notes: "Cliente enviará documentos complementares"
  },
  {
    id: "3",
    client: "Pedro Oliveira",
    subject: "Processo Criminal",
    status: "Concluído",
    date: "2025-04-15",
    urgency: "Baixa",
    description: "Defesa em processo criminal",
    type: "Criminal",
    area: "Direito Penal",
    deadline: "2025-05-20",
    comarca: "Belo Horizonte",
    lastUpdate: "2025-05-13",
    notes: "Processo arquivado"
  },
  {
    id: "4",
    client: "Ana Costa",
    subject: "Inventário",
    status: "Em análise",
    date: "2025-05-05",
    urgency: "Média",
    description: "Processo de inventário e partilha",
    type: "Sucessões",
    area: "Direito das Sucessões",
    deadline: "2025-07-10",
    comarca: "Curitiba",
    lastUpdate: "2025-05-12",
    notes: "Aguardando avaliação dos bens"
  },
  {
    id: "5",
    client: "Carlos Mendes",
    subject: "Execução Fiscal",
    status: "Em andamento",
    date: "2025-05-08",
    urgency: "Alta",
    description: "Execução de dívida tributária",
    type: "Tributário",
    area: "Direito Tributário",
    deadline: "2025-06-01",
    comarca: "Salvador",
    lastUpdate: "2025-05-16",
    notes: "Prazo para embargos em curso"
  }
];

const statusColors = {
  "Em andamento": "blue",
  "Aguardando documentos": "yellow",
  "Concluído": "green",
  "Em análise": "purple"
};

const urgencyColors = {
  "Alta": "red",
  "Média": "yellow",
  "Baixa": "green"
};

const Dashboard = () => {
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [processes, setProcesses] = useState<Process[]>(mockProcesses);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProcess, setEditedProcess] = useState<Process | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Array<{ date: Date; title: string; type: 'deadline' | 'hearing' }>>([]);
  const [alerts, setAlerts] = useState<Array<{ id: string; message: string; type: 'warning' | 'error' | 'info' }>>([]);

  useEffect(() => {
    // Generate events from processes
    const newEvents = processes.flatMap(process => {
      const events = [];
      
      if (process.deadline) {
        events.push({
          date: new Date(process.deadline),
          title: `Prazo: ${process.subject}`,
          type: 'deadline' as const
        });
      }

      return events;
    });

    setEvents(newEvents);

    // Generate alerts
    const newAlerts = processes
      .filter(process => {
        if (!process.deadline) return false;
        const deadlineDate = new Date(process.deadline);
        const now = new Date();
        const next3Days = addDays(now, 3);
        return isWithinInterval(deadlineDate, { start: now, end: next3Days });
      })
      .map(process => ({
        id: process.id,
        message: `Prazo próximo para o processo ${process.id}: ${process.subject}`,
        type: 'warning' as const
      }));

    setAlerts(newAlerts);
  }, [processes]);
  
  // Calculate statistics
  const totalProcesses = processes.length;
  const activeProcesses = processes.filter(p => p.status === "Em andamento").length;
  const completedProcesses = processes.filter(p => p.status === "Concluído").length;
  const highPriorityProcesses = processes.filter(p => p.urgency === "Alta").length;
  const upcomingDeadlines = processes.filter(p => {
    if (!p.deadline) return false;
    const deadlineDate = new Date(p.deadline);
    const now = new Date();
    const next7Days = addDays(now, 7);
    return isWithinInterval(deadlineDate, { start: now, end: next7Days });
  }).length;
  
  const newProcessesThisMonth = processes.filter(p => {
    const processDate = new Date(p.date);
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    return isWithinInterval(processDate, { start: monthStart, end: monthEnd });
  }).length;

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

  const statusColors: Record<string, string> = {
    "Em andamento": "bg-blue-100 text-blue-800",
    "Aguardando documentos": "bg-yellow-100 text-yellow-800",
    "Concluído": "bg-green-100 text-green-800",
    "Audiência marcada": "bg-purple-100 text-purple-800",
  };

  // Event handlers
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`space-y-6 ${darkMode ? "dark" : ""}`}>
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard de Processos</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle jurídico
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar processo..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Total de Processos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProcesses}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span>+{newProcessesThisMonth} este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-yellow-500" />
              Em Andamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProcesses}</div>
            <div className="text-xs text-muted-foreground">
              {((activeProcesses / totalProcesses) * 100).toFixed(1)}% do total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Alta Urgência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityProcesses}</div>
            <div className="text-xs text-muted-foreground">
              {upcomingDeadlines} prazos próximos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-green-500" />
              Concluídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedProcesses}</div>
            <div className="text-xs text-muted-foreground">
              {((completedProcesses / totalProcesses) * 100).toFixed(1)}% de conclusão
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Evolution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Evolução de Processos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="processos" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution by Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Área</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={areaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {areaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Section */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg flex items-center justify-between ${
                alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                alert.type === 'error' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>{alert.message}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Calendar and Deadlines Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Próximos Prazos e Audiências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar events={events} onDateSelect={(date) => {
              const selectedEvents = events.filter(
                event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
              );
              if (selectedEvents.length > 0) {
                toast({
                  title: format(date, "dd 'de' MMMM", { locale: ptBR }),
                  description: selectedEvents.map(e => e.title).join('\n'),
                });
              }
            }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Próximos Prazos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter(event => {
                  const eventDate = new Date(event.date);
                  const now = new Date();
                  const next7Days = addDays(now, 7);
                  return isWithinInterval(eventDate, { start: now, end: next7Days });
                })
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(event.date, "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                    </div>
                    <Badge variant={event.type === 'deadline' ? 'destructive' : 'default'}>
                      {event.type === 'deadline' ? 'Prazo' : 'Audiência'}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process List Section */}
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
                        <Badge className={statusColors[process.status]}>
                          {process.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{process.date}</TableCell>
                      <TableCell>
                        <Badge className={getUrgencyColor(process.urgency)}>
                          {process.urgency}
                        </Badge>
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

      {/* Process Management Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Processo" : "Detalhes do Processo"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Altere os dados do processo conforme necessário."
                : "Informações detalhadas do processo."}
            </DialogDescription>
          </DialogHeader>

          {selectedProcess && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Número do Processo</label>
                  <Input
                    value={editedProcess?.id || ""}
                    disabled={!isEditMode}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Cliente</label>
                  <Input
                    value={editedProcess?.client || ""}
                    disabled={!isEditMode}
                    onChange={(e) => handleInputChange("client", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Assunto</label>
                  <Input
                    value={editedProcess?.subject || ""}
                    disabled={!isEditMode}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={editedProcess?.status}
                    disabled={!isEditMode}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Em andamento">Em andamento</SelectItem>
                      <SelectItem value="Aguardando documentos">
                        Aguardando documentos
                      </SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                      <SelectItem value="Audiência marcada">
                        Audiência marcada
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Urgência</label>
                  <Select
                    value={editedProcess?.urgency}
                    disabled={!isEditMode}
                    onValueChange={(value) => handleInputChange("urgency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Prazo</label>
                  <Input
                    type="date"
                    value={editedProcess?.deadline || ""}
                    disabled={!isEditMode}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Observações</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  value={editedProcess?.notes || ""}
                  disabled={!isEditMode}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </Button>
            ) : isEditMode ? (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Fechar
                </Button>
                <Button variant="default" onClick={handleEdit}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Excluir
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

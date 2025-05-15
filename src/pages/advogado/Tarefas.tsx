
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { CheckSquare, Clock, MoreVertical, Plus, Calendar, UserPlus, AlertTriangle } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "pendente" | "em_andamento" | "concluida";
  priority: "baixa" | "media" | "alta";
  assignedTo: string;
  dueDate: string;
  processo?: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

// Mock data
const teamMembers: TeamMember[] = [
  { id: "1", name: "Dr. João Silva", role: "Advogado Sênior", avatar: "/placeholder.svg" },
  { id: "2", name: "Dra. Maria Santos", role: "Advogada", avatar: "/placeholder.svg" },
  { id: "3", name: "Pedro Oliveira", role: "Assistente Jurídico", avatar: "/placeholder.svg" },
  { id: "4", name: "Carla Mendes", role: "Estagiária", avatar: "/placeholder.svg" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Preparar recurso para processo 2023-0001",
    description: "Elaborar e finalizar a minuta de recurso de apelação",
    status: "pendente",
    priority: "alta",
    assignedTo: "1",
    dueDate: "2025-05-25",
    processo: "2023-0001"
  },
  {
    id: "2",
    title: "Revisar contrato do cliente João Pereira",
    description: "Revisar cláusulas contratuais e enviar feedback",
    status: "em_andamento",
    priority: "media",
    assignedTo: "2",
    dueDate: "2025-05-20",
    processo: "2023-0002"
  },
  {
    id: "3",
    title: "Agendar reunião com cliente",
    description: "Agendar reunião para discutir estratégias do caso",
    status: "pendente",
    priority: "baixa",
    assignedTo: "3",
    dueDate: "2025-05-18"
  },
  {
    id: "4",
    title: "Protocolar petição inicial",
    description: "Protocolar petição inicial no sistema do tribunal",
    status: "concluida",
    priority: "alta",
    assignedTo: "1",
    dueDate: "2025-05-10",
    processo: "2023-0004"
  },
  {
    id: "5",
    title: "Pesquisa jurisprudencial",
    description: "Pesquisar jurisprudência sobre casos semelhantes",
    status: "em_andamento",
    priority: "media",
    assignedTo: "4",
    dueDate: "2025-05-22"
  }
];

const Tarefas = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentTab, setCurrentTab] = useState("todas");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    status: "pendente",
    priority: "media",
    assignedTo: "",
    dueDate: ""
  });

  // Filtragem de tarefas
  const filteredTasks = tasks.filter(task => {
    if (currentTab === "todas") return true;
    if (currentTab === "pendentes") return task.status === "pendente";
    if (currentTab === "em_andamento") return task.status === "em_andamento";
    if (currentTab === "concluidas") return task.status === "concluida";
    return true;
  });

  // Contagem de tarefas por status
  const taskCounts = {
    todas: tasks.length,
    pendentes: tasks.filter(t => t.status === "pendente").length,
    em_andamento: tasks.filter(t => t.status === "em_andamento").length,
    concluidas: tasks.filter(t => t.status === "concluida").length,
  };

  // Funções de gerenciamento de tarefas
  const handleAddTask = () => {
    setIsEditMode(false);
    setCurrentTask({
      id: "",
      title: "",
      description: "",
      status: "pendente",
      priority: "media",
      assignedTo: "",
      dueDate: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setIsEditMode(true);
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!currentTask.title || !currentTask.assignedTo || !currentTask.dueDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode) {
      // Atualizar tarefa existente
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? currentTask : task
      ));
      toast({
        title: "Tarefa atualizada",
        description: "A tarefa foi atualizada com sucesso"
      });
    } else {
      // Adicionar nova tarefa
      const newTask = {
        ...currentTask,
        id: Date.now().toString()
      };
      setTasks([...tasks, newTask]);
      toast({
        title: "Tarefa criada",
        description: "A nova tarefa foi criada com sucesso"
      });
    }

    setIsDialogOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Tarefa excluída",
      description: "A tarefa foi excluída com sucesso"
    });
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    toast({
      title: "Status atualizado",
      description: `A tarefa foi marcada como ${getStatusText(status)}`
    });
  };

  // Helper para obter texto do status
  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'pendente': return 'pendente';
      case 'em_andamento': return 'em andamento';
      case 'concluida': return 'concluída';
      default: return status;
    }
  };

  // Helper para obter cor de prioridade
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'alta': return 'text-red-600';
      case 'media': return 'text-yellow-600';
      case 'baixa': return 'text-green-600';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tarefas da Equipe</h1>
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gerenciamento de Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="todas">
                Todas ({taskCounts.todas})
              </TabsTrigger>
              <TabsTrigger value="pendentes">
                Pendentes ({taskCounts.pendentes})
              </TabsTrigger>
              <TabsTrigger value="em_andamento">
                Em Andamento ({taskCounts.em_andamento})
              </TabsTrigger>
              <TabsTrigger value="concluidas">
                Concluídas ({taskCounts.concluidas})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab} className="mt-0">
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-4 border rounded-lg ${
                        task.status === "concluida" ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={task.status === "concluida"} 
                            onCheckedChange={(checked) => {
                              handleStatusChange(
                                task.id, 
                                checked ? "concluida" : "pendente"
                              );
                            }}
                          />
                          <div>
                            <h3 
                              className={`font-medium ${
                                task.status === "concluida" ? "line-through text-gray-500" : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-md">
                                <UserPlus className="h-3 w-3 mr-1" />
                                <span>
                                  {teamMembers.find(m => m.id === task.assignedTo)?.name || "Não atribuído"}
                                </span>
                              </div>
                              <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-md">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>
                                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <div className={`flex items-center text-xs bg-gray-100 px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                <span>
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                              </div>
                              {task.processo && (
                                <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-md">
                                  <span>Processo: {task.processo}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-xs text-gray-500 mr-2">
                            {task.status === "em_andamento" && (
                              <span className="flex items-center text-blue-600">
                                <Clock className="h-3 w-3 mr-1" />
                                Em andamento
                              </span>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditTask(task)}>
                                Editar
                              </DropdownMenuItem>
                              {task.status !== "concluida" && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(task.id, "em_andamento")}
                                >
                                  Marcar em andamento
                                </DropdownMenuItem>
                              )}
                              {task.status !== "pendente" && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(task.id, "pendente")}
                                >
                                  Marcar como pendente
                                </DropdownMenuItem>
                              )}
                              {task.status !== "concluida" && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(task.id, "concluida")}
                                >
                                  Marcar como concluída
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-600"
                              >
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CheckSquare className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2">Nenhuma tarefa encontrada</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleAddTask}
                    >
                      Criar nova tarefa
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog para adicionar/editar tarefas */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Tarefa" : "Nova Tarefa"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="title">Título*</Label>
              <Input 
                id="title"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input 
                id="description"
                value={currentTask.description}
                onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Atribuir para*</Label>
                <Select 
                  value={currentTask.assignedTo} 
                  onValueChange={(value) => setCurrentTask({...currentTask, assignedTo: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select 
                  value={currentTask.priority} 
                  onValueChange={(value) => setCurrentTask({
                    ...currentTask, 
                    priority: value as Task['priority']
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Data de entrega*</Label>
                <Input 
                  id="dueDate"
                  type="date"
                  value={currentTask.dueDate}
                  onChange={(e) => setCurrentTask({...currentTask, dueDate: e.target.value})}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="processo">Processo relacionado</Label>
                <Input 
                  id="processo"
                  value={currentTask.processo || ""}
                  onChange={(e) => setCurrentTask({...currentTask, processo: e.target.value})}
                  placeholder="Opcional"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveTask}>
              {isEditMode ? "Salvar Alterações" : "Criar Tarefa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tarefas;

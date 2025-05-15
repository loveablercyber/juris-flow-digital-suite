
import React, { useState } from "react";
import { format, addDays, startOfWeek, isEqual } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  CalendarClock 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AgendamentoWeekView } from "@/components/advogado/AgendamentoWeekView";
import { AgendamentoSetting } from "@/components/advogado/AgendamentoSetting";

// Interfaces
interface Horario {
  inicio: string;
  fim: string;
}

interface DiaSemana {
  dia: string;
  disponivel: boolean;
  horarios: Horario[];
}

interface ConfiguracaoAgenda {
  diasSemana: DiaSemana[];
  duracaoConsulta: number;
  intervaloConsultas: number;
}

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

type TipoAgendamento = "presencial" | "videoconferencia";

type StatusAgendamento = "pendente" | "confirmado" | "concluido" | "cancelado";

interface Agendamento {
  id: string;
  data: Date;
  horario: string;
  tipo: TipoAgendamento;
  status: StatusAgendamento;
  cliente: Cliente;
  assunto: string;
  observacoes: string;
}

const Agendamentos = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"dia" | "semana">("dia");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: "1",
      data: new Date(2025, 4, 16),
      horario: "14:00",
      tipo: "presencial",
      status: "confirmado",
      cliente: {
        id: "1",
        nome: "João Silva",
        telefone: "(11) 99999-8888",
        email: "joao.silva@exemplo.com"
      },
      assunto: "Consulta sobre processo trabalhista",
      observacoes: "Cliente pediu para revisar documentos da empresa"
    },
    {
      id: "2",
      data: new Date(2025, 4, 17),
      horario: "10:30",
      tipo: "videoconferencia",
      status: "pendente",
      cliente: {
        id: "2",
        nome: "Maria Oliveira",
        telefone: "(11) 97777-6666",
        email: "maria.oliveira@exemplo.com"
      },
      assunto: "Revisão de contrato",
      observacoes: ""
    },
    {
      id: "3",
      data: new Date(2025, 4, 18),
      horario: "16:00",
      tipo: "presencial",
      status: "confirmado",
      cliente: {
        id: "3",
        nome: "Carlos Santos",
        telefone: "(11) 98888-7777",
        email: "carlos.santos@exemplo.com"
      },
      assunto: "Processo de divórcio",
      observacoes: "Trazer documentos do casal"
    }
  ]);
  
  const [configuracaoAgenda, setConfiguracaoAgenda] = useState<ConfiguracaoAgenda>({
    diasSemana: [
      { dia: "segunda", disponivel: true, horarios: [{ inicio: "09:00", fim: "18:00" }] },
      { dia: "terça", disponivel: true, horarios: [{ inicio: "09:00", fim: "18:00" }] },
      { dia: "quarta", disponivel: true, horarios: [{ inicio: "09:00", fim: "18:00" }] },
      { dia: "quinta", disponivel: true, horarios: [{ inicio: "09:00", fim: "18:00" }] },
      { dia: "sexta", disponivel: true, horarios: [{ inicio: "09:00", fim: "17:00" }] },
      { dia: "sábado", disponivel: false, horarios: [] },
      { dia: "domingo", disponivel: false, horarios: [] }
    ],
    duracaoConsulta: 60, // em minutos
    intervaloConsultas: 15 // em minutos
  });
  
  const [newAgendamento, setNewAgendamento] = useState<Partial<Agendamento>>({
    data: new Date(),
    horario: "09:00",
    tipo: "presencial",
    status: "pendente",
    assunto: "",
    observacoes: ""
  });
  
  const [newCliente, setNewCliente] = useState<Partial<Cliente>>({
    nome: "",
    telefone: "",
    email: ""
  });
  
  // Filtra os agendamentos para o dia selecionado
  const agendamentosDoDia = agendamentos.filter(
    (agendamento) => 
      agendamento.data.getDate() === selectedDate.getDate() && 
      agendamento.data.getMonth() === selectedDate.getMonth() &&
      agendamento.data.getFullYear() === selectedDate.getFullYear()
  );
  
  // Formata o nome do dia da semana
  const diaDaSemana = format(selectedDate, "eeee", { locale: ptBR });
  
  // Obtém a semana para exibição na visualização semanal
  const semanaInicio = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const semana = Array.from({ length: 7 }, (_, i) => addDays(semanaInicio, i));
  
  // Funções
  const handleAddAgendamento = () => {
    if (!newAgendamento.assunto || !newCliente.nome || !newCliente.telefone) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      data: newAgendamento.data || new Date(),
      horario: newAgendamento.horario || "09:00",
      tipo: newAgendamento.tipo || "presencial",
      status: newAgendamento.status || "pendente",
      cliente: {
        id: Date.now().toString(),
        nome: newCliente.nome || "",
        telefone: newCliente.telefone || "",
        email: newCliente.email || ""
      },
      assunto: newAgendamento.assunto || "",
      observacoes: newAgendamento.observacoes || ""
    };
    
    setAgendamentos([...agendamentos, novoAgendamento]);
    
    toast({
      title: "Agendamento criado",
      description: "O agendamento foi criado com sucesso."
    });
    
    // Resetar formulário
    setNewAgendamento({
      data: new Date(),
      horario: "09:00",
      tipo: "presencial",
      status: "pendente",
      assunto: "",
      observacoes: ""
    });
    
    setNewCliente({
      nome: "",
      telefone: "",
      email: ""
    });
    
    setShowAddDialog(false);
  };
  
  const handleUpdateStatus = (id: string, status: StatusAgendamento) => {
    setAgendamentos(
      agendamentos.map(agendamento => 
        agendamento.id === id 
          ? { ...agendamento, status } 
          : agendamento
      )
    );
    
    toast({
      title: "Status atualizado",
      description: `O agendamento foi marcado como ${status}.`
    });
  };
  
  const handleDeleteAgendamento = (id: string) => {
    setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
    
    toast({
      title: "Agendamento excluído",
      description: "O agendamento foi excluído com sucesso."
    });
  };
  
  const handleSaveSettings = (config: ConfiguracaoAgenda) => {
    setConfiguracaoAgenda(config);
    setShowSettingsDialog(false);
    
    toast({
      title: "Configurações salvas",
      description: "As configurações de agenda foram atualizadas."
    });
  };
  
  // Método para verificar se um dia tem agendamentos
  const temAgendamentoNoDia = (data: Date) => {
    return agendamentos.some(
      agendamento => 
        isEqual(
          new Date(agendamento.data.getFullYear(), agendamento.data.getMonth(), agendamento.data.getDate()),
          new Date(data.getFullYear(), data.getMonth(), data.getDate())
        )
    );
  };
  
  // Status de cores
  const getStatusColor = (status: StatusAgendamento) => {
    switch (status) {
      case "confirmado": return "bg-green-100 text-green-800 border-green-300";
      case "pendente": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "concluido": return "bg-blue-100 text-blue-800 border-blue-300";
      case "cancelado": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Agendamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus atendimentos e consultas agendadas
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowSettingsDialog(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
          
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="calendario" className="w-full">
        <TabsList>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="lista">Lista de Agendamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendario" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
                <CardDescription>
                  Selecione uma data para visualizar os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border w-full"
                  modifiers={{
                    hasAgendamento: (date) => temAgendamentoNoDia(date)
                  }}
                  modifiersStyles={{
                    hasAgendamento: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                      borderRadius: "0"
                    }
                  }}
                />
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Visualização</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={viewMode === "dia" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("dia")}
                    >
                      Dia
                    </Button>
                    <Button 
                      variant={viewMode === "semana" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("semana")}
                    >
                      Semana
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                {viewMode === "dia" ? (
                  <>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      {format(selectedDate, "PPP", { locale: ptBR })} - {diaDaSemana}
                    </CardTitle>
                    <CardDescription>
                      {agendamentosDoDia.length ? 
                        `${agendamentosDoDia.length} agendamentos` : 
                        "Nenhum agendamento para esta data"
                      }
                    </CardDescription>
                  </>
                ) : (
                  <>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Semana de {format(semana[0], "dd/MM", { locale: ptBR })} até {format(semana[6], "dd/MM", { locale: ptBR })}
                    </CardTitle>
                    <CardDescription>
                      Visualização semanal dos agendamentos
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent>
                {viewMode === "dia" ? (
                  agendamentosDoDia.length > 0 ? (
                    <div className="space-y-4">
                      {agendamentosDoDia.map((agendamento) => (
                        <Card key={agendamento.id} className="overflow-hidden">
                          <CardHeader className={`py-3 ${getStatusColor(agendamento.status)}`}>
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {agendamento.horario} - {agendamento.cliente.nome}
                                </div>
                              </CardTitle>
                              <Badge variant={agendamento.tipo === "presencial" ? "outline" : "secondary"}>
                                {agendamento.tipo === "presencial" ? "Presencial" : "Videoconferência"}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="py-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold">Assunto</h4>
                                <p>{agendamento.assunto}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold">Contato</h4>
                                <p>{agendamento.cliente.telefone} | {agendamento.cliente.email}</p>
                              </div>
                              
                              {agendamento.observacoes && (
                                <div>
                                  <h4 className="font-semibold">Observações</h4>
                                  <p>{agendamento.observacoes}</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          
                          <CardFooter className="bg-muted/50 py-2 flex justify-between">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleUpdateStatus(agendamento.id, "confirmado")}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Confirmar
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleUpdateStatus(agendamento.id, "concluido")}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Concluir
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleUpdateStatus(agendamento.id, "cancelado")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteAgendamento(agendamento.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CalendarClock className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-1">Nenhum agendamento para esta data</h3>
                      <p className="text-muted-foreground mb-6">
                        Não há consultas ou atendimentos agendados para o dia selecionado.
                      </p>
                      <Button onClick={() => setShowAddDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Agendamento
                      </Button>
                    </div>
                  )
                ) : (
                  <AgendamentoWeekView 
                    semana={semana}
                    agendamentos={agendamentos}
                    onDateSelect={setSelectedDate}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="lista">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Agendamentos</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os seus agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agendamentos.length > 0 ? (
                      agendamentos
                        .sort((a, b) => a.data.getTime() - b.data.getTime())
                        .map((agendamento) => (
                          <TableRow key={agendamento.id}>
                            <TableCell>
                              {format(agendamento.data, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>{agendamento.horario}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{agendamento.cliente.nome}</p>
                                <p className="text-xs text-muted-foreground">{agendamento.cliente.telefone}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={agendamento.tipo === "presencial" ? "outline" : "secondary"}>
                                {agendamento.tipo === "presencial" ? "Presencial" : "Vídeo"}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {agendamento.assunto}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(agendamento.status)}>
                                {agendamento.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleUpdateStatus(
                                    agendamento.id, 
                                    agendamento.status === "pendente" ? "confirmado" : 
                                    agendamento.status === "confirmado" ? "concluido" : 
                                    "pendente"
                                  )}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteAgendamento(agendamento.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          Nenhum agendamento encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para adicionar agendamento */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Agendamento</DialogTitle>
            <DialogDescription>
              Preencha os dados para agendar uma nova consulta ou atendimento.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data*</Label>
                <div className="relative">
                  <CalendarComponent
                    mode="single"
                    selected={newAgendamento.data}
                    onSelect={(date) => date && setNewAgendamento({...newAgendamento, data: date})}
                    disabled={(date) => {
                      // Desabilitar dias passados e fins de semana
                      return date < new Date() || [0, 6].includes(date.getDay());
                    }}
                    initialFocus
                    className={`p-3 pointer-events-auto rounded-md border`}
                  />
                </div>
              </div>
              
              <div>
                <div className="space-y-2">
                  <Label htmlFor="horario">Horário*</Label>
                  <Select 
                    value={newAgendamento.horario} 
                    onValueChange={(value) => setNewAgendamento({...newAgendamento, horario: value})}
                  >
                    <SelectTrigger id="horario">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Manhã</SelectLabel>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Tarde</SelectLabel>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="tipo">Tipo de Atendimento*</Label>
                  <Select 
                    value={newAgendamento.tipo} 
                    onValueChange={(value: TipoAgendamento) => setNewAgendamento({...newAgendamento, tipo: value})}
                  >
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="videoconferencia">Videoconferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium">Dados do Cliente</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo*</Label>
                  <Input 
                    id="nome" 
                    value={newCliente.nome} 
                    onChange={(e) => setNewCliente({...newCliente, nome: e.target.value})} 
                    placeholder="Nome do cliente"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone*</Label>
                    <Input 
                      id="telefone" 
                      value={newCliente.telefone} 
                      onChange={(e) => setNewCliente({...newCliente, telefone: e.target.value})} 
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={newCliente.email} 
                      onChange={(e) => setNewCliente({...newCliente, email: e.target.value})} 
                      placeholder="email@exemplo.com"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto da Consulta*</Label>
              <Input 
                id="assunto" 
                value={newAgendamento.assunto} 
                onChange={(e) => setNewAgendamento({...newAgendamento, assunto: e.target.value})} 
                placeholder="Informe o assunto da consulta"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea 
                id="observacoes" 
                value={newAgendamento.observacoes} 
                onChange={(e) => setNewAgendamento({...newAgendamento, observacoes: e.target.value})} 
                placeholder="Observações adicionais"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddAgendamento}>
              Adicionar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para configurações da agenda */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configurações de Agendamento</DialogTitle>
            <DialogDescription>
              Configure sua disponibilidade e preferências para agendamentos.
            </DialogDescription>
          </DialogHeader>
          
          <AgendamentoSetting 
            configuracaoAgenda={configuracaoAgenda}
            onSave={handleSaveSettings}
            onCancel={() => setShowSettingsDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agendamentos;

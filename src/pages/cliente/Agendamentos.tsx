import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Clock as ClockIcon, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  FileText, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Share2, 
  Printer, 
  Bell, 
  BellOff, 
  Star, 
  StarOff 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Agendamentos = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState("cards"); // "cards" ou "table"

  // Dados simulados para os agendamentos
  const agendamentos = [
    {
      id: 1,
      titulo: "Audiência de Conciliação",
      tipo: "presencial",
      status: "agendado",
      data: "2023-06-10",
      hora: "14:00",
      duracao: 60, // em minutos
      local: "Fórum Central - Sala 305",
      endereco: "Av. Paulista, 1000 - São Paulo, SP",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg",
        email: "ana.oliveira@jurisflow.com",
        telefone: "(11) 98765-4321"
      },
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      descricao: "Audiência de conciliação para discutir os termos do acordo de divórcio.",
      link: null
    },
    {
      id: 2,
      titulo: "Reunião de Alinhamento",
      tipo: "online",
      status: "agendado",
      data: "2023-06-15",
      hora: "10:00",
      duracao: 30, // em minutos
      local: "Videoconferência",
      endereco: null,
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg",
        email: "ana.oliveira@jurisflow.com",
        telefone: "(11) 98765-4321"
      },
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      descricao: "Reunião para alinhar os próximos passos do processo.",
      link: "https://meet.jurisflow.com/abc123"
    },
    {
      id: 3,
      titulo: "Assinatura de Documentos",
      tipo: "presencial",
      status: "concluido",
      data: "2023-05-15",
      hora: "15:30",
      duracao: 45, // em minutos
      local: "Escritório JurisFlow",
      endereco: "Rua Augusta, 500 - São Paulo, SP",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg",
        email: "ana.oliveira@jurisflow.com",
        telefone: "(11) 98765-4321"
      },
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      descricao: "Assinatura dos documentos finais do processo.",
      link: null
    },
    {
      id: 4,
      titulo: "Audiência Final",
      tipo: "presencial",
      status: "agendado",
      data: "2023-07-05",
      hora: "09:00",
      duracao: 90, // em minutos
      local: "Fórum Central - Sala 210",
      endereco: "Av. Paulista, 1000 - São Paulo, SP",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg",
        email: "ana.oliveira@jurisflow.com",
        telefone: "(11) 98765-4321"
      },
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      descricao: "Audiência final para homologação do acordo.",
      link: null
    },
    {
      id: 5,
      titulo: "Consulta Jurídica",
      tipo: "online",
      status: "cancelado",
      data: "2023-05-20",
      hora: "16:00",
      duracao: 60, // em minutos
      local: "Videoconferência",
      endereco: null,
      responsavel: {
        nome: "Dr. Carlos Mendes",
        avatar: "/avatars/advogado1.jpg",
        email: "carlos.mendes@jurisflow.com",
        telefone: "(11) 98765-4322"
      },
      processo: {
        id: 2,
        numero: "PROC-2023-002",
        titulo: "Inventário"
      },
      descricao: "Consulta para discutir questões específicas do inventário.",
      link: "https://meet.jurisflow.com/def456"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "agendado":
        return <Badge className="bg-blue-500">Agendado</Badge>;
      case "concluido":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "cancelado":
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "presencial":
        return <MapPin className="h-4 w-4 text-blue-500" />;
      case "online":
        return <Video className="h-4 w-4 text-purple-500" />;
      case "telefonico":
        return <Phone className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
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

  const formatarDataHora = (dataString: string, horaString: string) => {
    const data = new Date(dataString);
    const [horas, minutos] = horaString.split(':');
    data.setHours(parseInt(horas), parseInt(minutos));
    
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar agendamentos
  const filteredAgendamentos = agendamentos
    .filter(agendamento => {
      // Filtrar por termo de busca
      const searchMatch = 
        agendamento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agendamento.processo.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por tipo
      const tipoMatch = tipoFilter === "todos" || agendamento.tipo === tipoFilter;
      
      // Filtrar por status
      const statusMatch = statusFilter === "todos" || agendamento.status === statusFilter;
      
      // Filtrar por tab
      const tabMatch = 
        activeTab === "todos" || 
        (activeTab === "hoje" && formatarData(agendamento.data) === formatarData(new Date().toISOString())) ||
        (activeTab === "semana" && {
          const hoje = new Date();
          const fimSemana = new Date();
          fimSemana.setDate(hoje.getDate() + 7);
          const dataAgendamento = new Date(agendamento.data);
          return dataAgendamento >= hoje && dataAgendamento <= fimSemana;
        }) ||
        (activeTab === "mes" && {
          const hoje = new Date();
          const fimMes = new Date();
          fimMes.setMonth(hoje.getMonth() + 1);
          const dataAgendamento = new Date(agendamento.data);
          return dataAgendamento >= hoje && dataAgendamento <= fimMes;
        });
      
      return searchMatch && tipoMatch && statusMatch && tabMatch;
    })
    .sort((a, b) => {
      // Ordenar por data e hora
      const dataA = new Date(`${a.data}T${a.hora}`);
      const dataB = new Date(`${b.data}T${b.hora}`);
      return dataA.getTime() - dataB.getTime();
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar agendamentos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="telefonico">Telefônico</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="agendado">Agendado</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  {viewMode === "cards" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Visualização</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setViewMode("cards")}>
                  Cards
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("table")}>
                  Tabela
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="semana">Esta Semana</TabsTrigger>
          <TabsTrigger value="mes">Este Mês</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Agendamento</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para criar um novo agendamento.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input id="titulo" placeholder="Ex: Audiência de Conciliação" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="telefonico">Telefônico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data">Data</Label>
                      <Input id="data" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hora">Hora</Label>
                      <Input id="hora" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração (minutos)</Label>
                    <Input id="duracao" type="number" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea id="descricao" placeholder="Descreva o propósito do agendamento..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {viewMode === "cards" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgendamentos.map((agendamento) => (
                <Card key={agendamento.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{agendamento.titulo}</CardTitle>
                        <CardDescription>
                          {formatarDataHora(agendamento.data, agendamento.hora)}
                        </CardDescription>
                      </div>
                      {getStatusBadge(agendamento.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        {getTipoIcon(agendamento.tipo)}
                        <span>
                          {agendamento.tipo === "presencial" ? "Presencial" : 
                           agendamento.tipo === "online" ? "Online" : "Telefônico"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Duração: {agendamento.duracao} minutos</span>
                      </div>
                      
                      {agendamento.tipo === "presencial" && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{agendamento.local}</span>
                        </div>
                      )}
                      
                      {agendamento.tipo === "online" && agendamento.link && (
                        <div className="flex items-center gap-2 text-sm">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <a href={agendamento.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Link da reunião
                          </a>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Responsável:</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={agendamento.responsavel.avatar} alt={agendamento.responsavel.nome} />
                            <AvatarFallback>{agendamento.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{agendamento.responsavel.nome}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Processo:</span>
                        <Link to={`/cliente/processos/${agendamento.processo.id}`} className="text-blue-500 hover:underline">
                          {agendamento.processo.numero} - {agendamento.processo.titulo}
                        </Link>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-2">
                        {agendamento.descricao}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Ver no Calendário
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Enviar Mensagem
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgendamentos.map((agendamento) => (
                    <TableRow key={agendamento.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agendamento.titulo}</div>
                          <div className="text-sm text-muted-foreground">
                            Duração: {agendamento.duracao} min
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatarDataHora(agendamento.data, agendamento.hora)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTipoIcon(agendamento.tipo)}
                          <span>
                            {agendamento.tipo === "presencial" ? "Presencial" : 
                             agendamento.tipo === "online" ? "Online" : "Telefônico"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(agendamento.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={agendamento.responsavel.avatar} alt={agendamento.responsavel.nome} />
                            <AvatarFallback>{agendamento.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{agendamento.responsavel.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/cliente/processos/${agendamento.processo.id}`} className="text-blue-500 hover:underline">
                          {agendamento.processo.numero}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Enviar Mensagem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartilhar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancelar
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
          )}

          {filteredAgendamentos.length === 0 && (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum agendamento encontrado</h3>
              <p className="text-muted-foreground mt-2">
                Tente ajustar seus filtros ou criar um novo agendamento.
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agendamentos; 
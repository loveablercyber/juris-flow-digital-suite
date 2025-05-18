import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Processos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("recente");
  const [viewMode, setViewMode] = useState("cards"); // "cards" ou "table"

  // Dados simulados para os processos
  const processos = [
    {
      id: 1,
      numero: "PROC-2023-001",
      titulo: "Divórcio Consensual",
      status: "em_andamento",
      progresso: 65,
      ultimaAtualizacao: "2023-05-15",
      dataCriacao: "2023-03-10",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg"
      },
      documentos: [
        { id: 1, nome: "Petição Inicial", data: "2023-03-10", tipo: "pdf" },
        { id: 2, nome: "Contrato de Honorários", data: "2023-03-12", tipo: "pdf" },
        { id: 3, nome: "Documentos Pessoais", data: "2023-03-15", tipo: "zip" }
      ],
      eventos: [
        { id: 1, titulo: "Audiência de Conciliação", data: "2023-04-20", status: "concluido" },
        { id: 2, titulo: "Assinatura de Documentos", data: "2023-05-15", status: "concluido" },
        { id: 3, titulo: "Audiência Final", data: "2023-06-10", status: "pendente" }
      ]
    },
    {
      id: 2,
      numero: "PROC-2023-002",
      titulo: "Inventário",
      status: "aguardando",
      progresso: 30,
      ultimaAtualizacao: "2023-05-10",
      dataCriacao: "2023-04-05",
      responsavel: {
        nome: "Dr. Carlos Mendes",
        avatar: "/avatars/advogado1.jpg"
      },
      documentos: [
        { id: 1, nome: "Petição Inicial", data: "2023-04-05", tipo: "pdf" },
        { id: 2, nome: "Contrato de Honorários", data: "2023-04-07", tipo: "pdf" }
      ],
      eventos: [
        { id: 1, titulo: "Audiência de Conciliação", data: "2023-05-25", status: "pendente" }
      ]
    },
    {
      id: 3,
      numero: "PROC-2023-003",
      titulo: "Revisão de Contrato",
      status: "concluido",
      progresso: 100,
      ultimaAtualizacao: "2023-05-05",
      dataCriacao: "2023-02-15",
      responsavel: {
        nome: "Dra. Mariana Santos",
        avatar: "/avatars/advogada2.jpg"
      },
      documentos: [
        { id: 1, nome: "Contrato Original", data: "2023-02-15", tipo: "pdf" },
        { id: 2, nome: "Contrato Revisado", data: "2023-03-20", tipo: "pdf" },
        { id: 3, nome: "Parecer Jurídico", data: "2023-04-10", tipo: "pdf" }
      ],
      eventos: [
        { id: 1, titulo: "Reunião Inicial", data: "2023-02-20", status: "concluido" },
        { id: 2, titulo: "Entrega do Contrato Revisado", data: "2023-03-25", status: "concluido" },
        { id: 3, titulo: "Assinatura do Contrato", data: "2023-05-05", status: "concluido" }
      ]
    },
    {
      id: 4,
      numero: "PROC-2023-004",
      titulo: "Ação de Alimentos",
      status: "em_andamento",
      progresso: 45,
      ultimaAtualizacao: "2023-05-18",
      dataCriacao: "2023-04-20",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg"
      },
      documentos: [
        { id: 1, nome: "Petição Inicial", data: "2023-04-20", tipo: "pdf" },
        { id: 2, nome: "Contrato de Honorários", data: "2023-04-22", tipo: "pdf" },
        { id: 3, nome: "Comprovantes de Renda", data: "2023-04-25", tipo: "pdf" }
      ],
      eventos: [
        { id: 1, titulo: "Audiência de Conciliação", data: "2023-06-05", status: "pendente" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_andamento":
        return <Badge className="bg-blue-500">Em andamento</Badge>;
      case "aguardando":
        return <Badge className="bg-yellow-500">Aguardando</Badge>;
      case "concluido":
        return <Badge className="bg-green-500">Concluído</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getEventoStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pendente":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "cancelado":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  const formatarDataHora = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar e ordenar processos
  const filteredProcessos = processos
    .filter(processo => {
      // Filtrar por termo de busca
      const searchMatch = 
        processo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.numero.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por status
      const statusMatch = statusFilter === "todos" || processo.status === statusFilter;
      
      return searchMatch && statusMatch;
    })
    .sort((a, b) => {
      // Ordenar por data
      if (sortBy === "recente") {
        return new Date(b.ultimaAtualizacao).getTime() - new Date(a.ultimaAtualizacao).getTime();
      } else if (sortBy === "antigo") {
        return new Date(a.ultimaAtualizacao).getTime() - new Date(b.ultimaAtualizacao).getTime();
      } else if (sortBy === "progresso") {
        return b.progresso - a.progresso;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Meus Processos</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar processos..."
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
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recente">Mais recentes</SelectItem>
                <SelectItem value="antigo">Mais antigos</SelectItem>
                <SelectItem value="progresso">Progresso</SelectItem>
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

      {viewMode === "cards" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProcessos.map((processo) => (
            <Card key={processo.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{processo.titulo}</CardTitle>
                    <CardDescription>{processo.numero}</CardDescription>
                  </div>
                  {getStatusBadge(processo.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{processo.progresso}%</span>
                    </div>
                    <Progress value={processo.progresso} className="h-2" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Responsável:</span>
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={processo.responsavel.avatar} alt={processo.responsavel.nome} />
                        <AvatarFallback>{processo.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{processo.responsavel.nome}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Última atualização:</span>
                    <span>{formatarData(processo.ultimaAtualizacao)}</span>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="documentos">
                      <AccordionTrigger className="text-sm">
                        Documentos ({processo.documentos.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {processo.documentos.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{doc.nome}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{formatarData(doc.data)}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="eventos">
                      <AccordionTrigger className="text-sm">
                        Eventos ({processo.eventos.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {processo.eventos.map((evento) => (
                            <div key={evento.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                {getEventoStatusIcon(evento.status)}
                                <span>{evento.titulo}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{formatarData(evento.data)}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to={`/cliente/processos/${processo.id}`}>Ver detalhes</Link>
                </Button>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcessos.map((processo) => (
                <TableRow key={processo.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{processo.titulo}</div>
                      <div className="text-sm text-muted-foreground">{processo.numero}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(processo.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={processo.progresso} className="h-2 w-16" />
                      <span className="text-sm">{processo.progresso}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={processo.responsavel.avatar} alt={processo.responsavel.nome} />
                        <AvatarFallback>{processo.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{processo.responsavel.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatarData(processo.ultimaAtualizacao)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cliente/processos/${processo.id}`}>
                          Detalhes
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredProcessos.length === 0 && (
        <div className="text-center py-10">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum processo encontrado</h3>
          <p className="text-muted-foreground mt-2">
            Tente ajustar seus filtros ou criar um novo processo.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/cliente/processos/novo">
              <Plus className="h-4 w-4 mr-2" />
              Novo Processo
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Processos; 
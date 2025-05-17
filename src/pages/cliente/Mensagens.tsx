import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Send, 
  Paperclip, 
  Trash2, 
  Star, 
  StarOff, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Plus, 
  Edit, 
  Share2, 
  Printer, 
  Bell, 
  BellOff,
  Download
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

const Mensagens = () => {
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [viewMode, setViewMode] = useState("cards"); // "cards" ou "table"
  const [mensagemSelecionada, setMensagemSelecionada] = useState<number | null>(null);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [anexoSelecionado, setAnexoSelecionado] = useState<File | null>(null);

  // Dados simulados para as mensagens
  const mensagens = [
    {
      id: 1,
      remetente: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg",
        email: "ana.oliveira@jurisflow.com",
        telefone: "(11) 98765-4321"
      },
      assunto: "Atualização sobre o processo de divórcio",
      conteudo: "Olá, gostaria de informar que o processo está progredindo bem. A próxima audiência está agendada para 10/06/2023 às 14h. Por favor, confirme sua presença.",
      data: "2023-05-15T09:30:00",
      tipo: "email",
      status: "nao_lida",
      favorita: false,
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      anexos: [
        { id: 1, nome: "Documento de Audiência", tipo: "pdf", tamanho: "1.2 MB" }
      ]
    },
    {
      id: 2,
      remetente: {
        nome: "Dr. Carlos Mendes",
        avatar: "/avatars/advogado1.jpg",
        email: "carlos.mendes@jurisflow.com",
        telefone: "(11) 98765-4322"
      },
      assunto: "Documentos pendentes",
      conteudo: "Precisamos que você envie os seguintes documentos para prosseguirmos com o inventário: comprovante de residência atualizado, declaração de imposto de renda e extrato bancário dos últimos 3 meses.",
      data: "2023-05-12T14:15:00",
      tipo: "mensagem",
      status: "lida",
      favorita: true,
      processo: {
        id: 2,
        numero: "PROC-2023-002",
        titulo: "Inventário"
      },
      anexos: []
    },
    {
      id: 3,
      remetente: {
        nome: "Sistema JurisFlow",
        avatar: "/avatars/sistema.jpg",
        email: "sistema@jurisflow.com",
        telefone: null
      },
      assunto: "Lembrete de pagamento",
      conteudo: "Lembrete: Você tem um pagamento pendente no valor de R$ 350,00 referente às taxas processuais do processo PROC-2023-001. O vencimento é em 25/05/2023.",
      data: "2023-05-10T08:00:00",
      tipo: "notificacao",
      status: "nao_lida",
      favorita: false,
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      anexos: [
        { id: 1, nome: "Boleto de Pagamento", tipo: "pdf", tamanho: "0.5 MB" }
      ]
    },
    {
      id: 4,
      remetente: {
        nome: "Dra. Mariana Santos",
        avatar: "/avatars/advogada2.jpg",
        email: "mariana.santos@jurisflow.com",
        telefone: "(11) 98765-4323"
      },
      assunto: "Revisão de contrato concluída",
      conteudo: "Informo que a revisão do contrato foi concluída. Segue em anexo o documento revisado com as alterações sugeridas. Por favor, analise e me informe se concorda com as mudanças.",
      data: "2023-05-08T11:20:00",
      tipo: "email",
      status: "lida",
      favorita: false,
      processo: {
        id: 3,
        numero: "PROC-2023-003",
        titulo: "Revisão de Contrato"
      },
      anexos: [
        { id: 1, nome: "Contrato Revisado", tipo: "pdf", tamanho: "2.8 MB" },
        { id: 2, nome: "Parecer Jurídico", tipo: "pdf", tamanho: "1.5 MB" }
      ]
    },
    {
      id: 5,
      remetente: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg",
        email: "ana.oliveira@jurisflow.com",
        telefone: "(11) 98765-4321"
      },
      assunto: "Confirmação de audiência",
      conteudo: "Confirmo que a audiência de conciliação está agendada para 10/06/2023 às 14h no Fórum Central - Sala 305. Por favor, chegue com 30 minutos de antecedência.",
      data: "2023-05-05T16:45:00",
      tipo: "mensagem",
      status: "lida",
      favorita: false,
      processo: {
        id: 1,
        numero: "PROC-2023-001",
        titulo: "Divórcio Consensual"
      },
      anexos: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nao_lida":
        return <Badge className="bg-blue-500">Não lida</Badge>;
      case "lida":
        return <Badge className="bg-green-500">Lida</Badge>;
      case "respondida":
        return <Badge className="bg-purple-500">Respondida</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "email":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "mensagem":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "notificacao":
        return <Bell className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
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

  // Filtrar mensagens
  const filteredMensagens = mensagens
    .filter(mensagem => {
      // Filtrar por termo de busca
      const searchMatch = 
        mensagem.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mensagem.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mensagem.remetente.nome.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por tipo
      const tipoMatch = tipoFilter === "todos" || mensagem.tipo === tipoFilter;
      
      // Filtrar por status
      const statusMatch = statusFilter === "todos" || mensagem.status === statusFilter;
      
      // Filtrar por tab
      const tabMatch = 
        activeTab === "todas" || 
        (activeTab === "nao_lidas" && mensagem.status === "nao_lida") ||
        (activeTab === "favoritas" && mensagem.favorita);
      
      return searchMatch && tipoMatch && statusMatch && tabMatch;
    })
    .sort((a, b) => {
      // Ordenar por data (mais recentes primeiro)
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim()) {
      // Aqui seria implementada a lógica para enviar a mensagem
      alert("Mensagem enviada com sucesso!");
      setNovaMensagem("");
      setAnexoSelecionado(null);
    }
  };

  const handleUploadAnexo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAnexoSelecionado(event.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Minhas Mensagens</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar mensagens..."
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
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="mensagem">Mensagem</SelectItem>
                <SelectItem value="notificacao">Notificação</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="nao_lida">Não lidas</SelectItem>
                <SelectItem value="lida">Lidas</SelectItem>
                <SelectItem value="respondida">Respondidas</SelectItem>
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
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="nao_lidas">Não lidas</TabsTrigger>
          <TabsTrigger value="favoritas">Favoritas</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredMensagens.length} mensagens encontradas
              </span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Mensagem
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nova Mensagem</DialogTitle>
                  <DialogDescription>
                    Envie uma mensagem para seu advogado ou para o escritório.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="destinatario">Destinatário</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o destinatário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ana.oliveira@jurisflow.com">Dra. Ana Oliveira</SelectItem>
                        <SelectItem value="carlos.mendes@jurisflow.com">Dr. Carlos Mendes</SelectItem>
                        <SelectItem value="mariana.santos@jurisflow.com">Dra. Mariana Santos</SelectItem>
                        <SelectItem value="escritorio@jurisflow.com">Escritório JurisFlow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input id="assunto" placeholder="Digite o assunto da mensagem" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processo">Processo (opcional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o processo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">PROC-2023-001 - Divórcio Consensual</SelectItem>
                        <SelectItem value="2">PROC-2023-002 - Inventário</SelectItem>
                        <SelectItem value="3">PROC-2023-003 - Revisão de Contrato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea 
                      id="mensagem" 
                      placeholder="Digite sua mensagem..." 
                      className="min-h-[200px]"
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="anexo">Anexo (opcional)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="anexo" 
                        type="file" 
                        onChange={handleUploadAnexo}
                      />
                      {anexoSelecionado && (
                        <span className="text-sm text-muted-foreground">
                          {anexoSelecionado.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button onClick={handleEnviarMensagem}>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {viewMode === "cards" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMensagens.map((mensagem) => (
                <Card 
                  key={mensagem.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${mensagem.status === "nao_lida" ? "border-blue-200 bg-blue-50" : ""}`}
                  onClick={() => setMensagemSelecionada(mensagem.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={mensagem.remetente.avatar} alt={mensagem.remetente.nome} />
                          <AvatarFallback>{mensagem.remetente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{mensagem.remetente.nome}</CardTitle>
                          <CardDescription>
                            {formatarDataHora(mensagem.data)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {mensagem.favorita ? (
                          <Star className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        {getStatusBadge(mensagem.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        {getTipoIcon(mensagem.tipo)}
                        <span className="font-medium">{mensagem.assunto}</span>
                      </div>
                      
                      <p className="text-sm line-clamp-2">
                        {mensagem.conteudo}
                      </p>
                      
                      {mensagem.processo && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <Link to={`/cliente/processos/${mensagem.processo.id}`} className="text-blue-500 hover:underline">
                            {mensagem.processo.numero} - {mensagem.processo.titulo}
                          </Link>
                        </div>
                      )}
                      
                      {mensagem.anexos.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span>{mensagem.anexos.length} anexo{mensagem.anexos.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Remetente</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMensagens.map((mensagem) => (
                    <TableRow 
                      key={mensagem.id}
                      className={mensagem.status === "nao_lida" ? "bg-blue-50" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={mensagem.remetente.avatar} alt={mensagem.remetente.nome} />
                            <AvatarFallback>{mensagem.remetente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{mensagem.remetente.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{mensagem.assunto}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {mensagem.conteudo}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTipoIcon(mensagem.tipo)}
                          <span>
                            {mensagem.tipo === "email" ? "Email" : 
                             mensagem.tipo === "mensagem" ? "Mensagem" : "Notificação"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(mensagem.status)}</TableCell>
                      <TableCell>{formatarDataHora(mensagem.data)}</TableCell>
                      <TableCell>
                        {mensagem.processo ? (
                          <Link to={`/cliente/processos/${mensagem.processo.id}`} className="text-blue-500 hover:underline">
                            {mensagem.processo.numero}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setMensagemSelecionada(mensagem.id)}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                {mensagem.favorita ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Responder
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartilhar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
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

          {filteredMensagens.length === 0 && (
            <div className="text-center py-10">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma mensagem encontrada</h3>
              <p className="text-muted-foreground mt-2">
                Tente ajustar seus filtros ou enviar uma nova mensagem.
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Nova Mensagem
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal de visualização de mensagem */}
      {mensagemSelecionada && (
        <Dialog open={!!mensagemSelecionada} onOpenChange={() => setMensagemSelecionada(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Visualizar Mensagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {(() => {
                const mensagem = mensagens.find(m => m.id === mensagemSelecionada);
                if (!mensagem) return null;
                
                return (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mensagem.remetente.avatar} alt={mensagem.remetente.nome} />
                          <AvatarFallback>{mensagem.remetente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{mensagem.remetente.nome}</h3>
                          <p className="text-sm text-muted-foreground">{mensagem.remetente.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {formatarDataHora(mensagem.data)}
                        </span>
                        <Button variant="ghost" size="icon">
                          {mensagem.favorita ? <Star className="h-4 w-4 text-yellow-500" /> : <StarOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">{mensagem.assunto}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        {getTipoIcon(mensagem.tipo)}
                        <span className="text-sm">
                          {mensagem.tipo === "email" ? "Email" : 
                           mensagem.tipo === "mensagem" ? "Mensagem" : "Notificação"}
                        </span>
                        {getStatusBadge(mensagem.status)}
                      </div>
                      
                      {mensagem.processo && (
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <Link to={`/cliente/processos/${mensagem.processo.id}`} className="text-blue-500 hover:underline">
                            {mensagem.processo.numero} - {mensagem.processo.titulo}
                          </Link>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 p-4 rounded-md mb-4">
                        <p className="whitespace-pre-line">{mensagem.conteudo}</p>
                      </div>
                      
                      {mensagem.anexos.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Anexos</h4>
                          <div className="space-y-2">
                            {mensagem.anexos.map((anexo) => (
                              <div key={anexo.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>{anexo.nome}</span>
                                  <span className="text-xs text-muted-foreground">({anexo.tamanho})</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Paperclip className="h-4 w-4 mr-2" />
                                  Baixar
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMensagemSelecionada(null)}>
                Fechar
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Responder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Mensagens; 
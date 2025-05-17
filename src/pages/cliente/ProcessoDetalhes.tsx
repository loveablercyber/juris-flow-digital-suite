import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FileText, 
  Download, 
  Upload, 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Share2, 
  Printer, 
  File, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  BellOff, 
  Star, 
  StarOff 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot 
} from "@/components/ui/timeline";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ProcessoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("geral");
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [favorito, setFavorito] = useState(false);
  const [comentario, setComentario] = useState("");
  const [documentoSelecionado, setDocumentoSelecionado] = useState<File | null>(null);

  // Dados simulados para o processo
  const processo = {
    id: parseInt(id || "1"),
    numero: "PROC-2023-001",
    titulo: "Divórcio Consensual",
    status: "em_andamento",
    progresso: 65,
    ultimaAtualizacao: "2023-05-15",
    dataCriacao: "2023-03-10",
    responsavel: {
      nome: "Dra. Ana Oliveira",
      avatar: "/avatars/advogada1.jpg",
      email: "ana.oliveira@jurisflow.com",
      telefone: "(11) 98765-4321"
    },
    cliente: {
      nome: "João Silva",
      cpf: "123.456.789-00",
      email: "joao.silva@email.com",
      telefone: "(11) 91234-5678",
      endereco: "Rua das Flores, 123 - São Paulo, SP"
    },
    documentos: [
      { id: 1, nome: "Petição Inicial", data: "2023-03-10", tipo: "pdf", tamanho: "2.5 MB", status: "aprovado" },
      { id: 2, nome: "Contrato de Honorários", data: "2023-03-12", tipo: "pdf", tamanho: "1.2 MB", status: "aprovado" },
      { id: 3, nome: "Documentos Pessoais", data: "2023-03-15", tipo: "zip", tamanho: "5.7 MB", status: "aprovado" },
      { id: 4, nome: "Comprovante de Residência", data: "2023-03-20", tipo: "pdf", tamanho: "0.8 MB", status: "pendente" }
    ],
    eventos: [
      { id: 1, titulo: "Audiência de Conciliação", data: "2023-04-20", status: "concluido", descricao: "Audiência realizada com sucesso. Acordo preliminar estabelecido." },
      { id: 2, titulo: "Assinatura de Documentos", data: "2023-05-15", status: "concluido", descricao: "Documentos assinados por ambas as partes." },
      { id: 3, titulo: "Audiência Final", data: "2023-06-10", status: "pendente", descricao: "Audiência final para homologação do acordo." }
    ],
    comunicacoes: [
      { id: 1, tipo: "email", data: "2023-05-10", titulo: "Atualização do Processo", conteudo: "Prezado cliente, informamos que seu processo está progredindo conforme esperado. A próxima audiência está agendada para 10/06/2023.", remetente: "Dra. Ana Oliveira" },
      { id: 2, tipo: "mensagem", data: "2023-05-05", titulo: "Confirmação de Documentos", conteudo: "Olá, gostaria de confirmar se você já enviou o comprovante de residência atualizado.", remetente: "Dra. Ana Oliveira" },
      { id: 3, tipo: "notificacao", data: "2023-04-25", titulo: "Lembrete de Audiência", conteudo: "Lembrete: Sua audiência está agendada para 20/04/2023 às 14h.", remetente: "Sistema" }
    ],
    pagamentos: [
      { id: 1, descricao: "Honorários Iniciais", valor: 2500.00, data: "2023-03-10", status: "pago", forma: "Cartão de Crédito" },
      { id: 2, descricao: "Custas Processuais", valor: 350.00, data: "2023-03-15", status: "pago", forma: "Boleto" },
      { id: 3, descricao: "Honorários Complementares", valor: 1500.00, data: "2023-05-20", status: "pendente", forma: "Pendente" }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_andamento":
        return <Badge className="bg-blue-500">Em andamento</Badge>;
      case "aguardando":
        return <Badge className="bg-yellow-500">Aguardando</Badge>;
      case "concluido":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "aprovado":
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "pago":
        return <Badge className="bg-green-500">Pago</Badge>;
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

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleEnviarComentario = () => {
    if (comentario.trim()) {
      // Aqui seria implementada a lógica para enviar o comentário
      alert("Comentário enviado com sucesso!");
      setComentario("");
    }
  };

  const handleUploadDocumento = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDocumentoSelecionado(event.target.files[0]);
    }
  };

  const handleEnviarDocumento = () => {
    if (documentoSelecionado) {
      // Aqui seria implementada a lógica para enviar o documento
      alert(`Documento "${documentoSelecionado.name}" enviado com sucesso!`);
      setDocumentoSelecionado(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/cliente/processos")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalhes do Processo</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{processo.titulo}</CardTitle>
                <CardDescription>{processo.numero}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setNotificacoesAtivas(!notificacoesAtivas)}
                >
                  {notificacoesAtivas ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setFavorito(!favorito)}
                >
                  {favorito ? <Star className="h-4 w-4 text-yellow-500" /> : <StarOff className="h-4 w-4" />}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Processo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="h-4 w-4 mr-2" />
                      Imprimir
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir Processo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Responsável:</span>
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
                    <span className="font-medium">Data de Criação:</span>
                    <span>{formatarData(processo.dataCriacao)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Última Atualização:</span>
                    <span>{formatarData(processo.ultimaAtualizacao)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Status:</span>
                    {getStatusBadge(processo.status)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Cliente:</span>
                    <span>{processo.cliente.nome}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">CPF:</span>
                    <span>{processo.cliente.cpf}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="comunicacoes">Comunicações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Nome:</span>
                    <span className="text-sm">{processo.cliente.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">CPF:</span>
                    <span className="text-sm">{processo.cliente.cpf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{processo.cliente.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Telefone:</span>
                    <span className="text-sm">{processo.cliente.telefone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Endereço:</span>
                    <span className="text-sm">{processo.cliente.endereco}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações do Responsável</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Nome:</span>
                    <span className="text-sm">{processo.responsavel.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{processo.responsavel.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Telefone:</span>
                    <span className="text-sm">{processo.responsavel.telefone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processo.pagamentos.map((pagamento) => (
                    <TableRow key={pagamento.id}>
                      <TableCell>{pagamento.descricao}</TableCell>
                      <TableCell>{formatarMoeda(pagamento.valor)}</TableCell>
                      <TableCell>{formatarData(pagamento.data)}</TableCell>
                      <TableCell>{getStatusBadge(pagamento.status)}</TableCell>
                      <TableCell>{pagamento.forma}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comentários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Adicione um comentário..." 
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                  <Button onClick={handleEnviarComentario}>Enviar</Button>
                </div>
                
                <div className="space-y-4">
                  {processo.comunicacoes.filter(c => c.tipo === "mensagem").map((comunicacao) => (
                    <div key={comunicacao.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={processo.responsavel.avatar} alt={processo.responsavel.nome} />
                        <AvatarFallback>{processo.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comunicacao.remetente}</span>
                          <span className="text-xs text-muted-foreground">{formatarData(comunicacao.data)}</span>
                        </div>
                        <p className="text-sm">{comunicacao.conteudo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Documentos do Processo</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Enviar Documento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enviar Documento</DialogTitle>
                  <DialogDescription>
                    Selecione um arquivo para enviar ao processo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="documento">Arquivo</Label>
                    <Input 
                      id="documento" 
                      type="file" 
                      onChange={handleUploadDocumento}
                    />
                    {documentoSelecionado && (
                      <p className="text-sm text-muted-foreground">
                        Arquivo selecionado: {documentoSelecionado.name}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDocumentoSelecionado(null)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleEnviarDocumento}>
                    Enviar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processo.documentos.map((documento) => (
              <Card key={documento.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{documento.nome}</CardTitle>
                      <CardDescription>
                        {formatarData(documento.data)} • {documento.tamanho}
                      </CardDescription>
                    </div>
                    {getStatusBadge(documento.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span>Tipo: {documento.tipo.toUpperCase()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                  <Button variant="outline" size="icon">
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="eventos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Eventos do Processo</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>
          
          <div className="space-y-4">
            {processo.eventos.map((evento) => (
              <Card key={evento.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{evento.titulo}</CardTitle>
                      <CardDescription>
                        {formatarData(evento.data)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getEventoStatusIcon(evento.status)}
                      {getStatusBadge(evento.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{evento.descricao}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver no Calendário
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="comunicacoes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Comunicações</h2>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Nova Mensagem
            </Button>
          </div>
          
          <div className="space-y-4">
            {processo.comunicacoes.map((comunicacao) => (
              <Card key={comunicacao.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{comunicacao.titulo}</CardTitle>
                      <CardDescription>
                        {formatarData(comunicacao.data)} • {comunicacao.remetente}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {comunicacao.tipo === "email" ? "Email" : 
                       comunicacao.tipo === "mensagem" ? "Mensagem" : "Notificação"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{comunicacao.conteudo}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Responder
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessoDetalhes; 
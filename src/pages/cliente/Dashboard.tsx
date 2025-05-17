import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  FileCheck, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  Clock4
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  // Dados simulados para o dashboard
  const [activeTab, setActiveTab] = useState("processos");
  
  const processos = [
    {
      id: 1,
      numero: "PROC-2023-001",
      titulo: "Divórcio Consensual",
      status: "em_andamento",
      progresso: 65,
      ultimaAtualizacao: "2023-05-15",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg"
      }
    },
    {
      id: 2,
      numero: "PROC-2023-002",
      titulo: "Inventário",
      status: "aguardando",
      progresso: 30,
      ultimaAtualizacao: "2023-05-10",
      responsavel: {
        nome: "Dr. Carlos Mendes",
        avatar: "/avatars/advogado1.jpg"
      }
    },
    {
      id: 3,
      numero: "PROC-2023-003",
      titulo: "Revisão de Contrato",
      status: "concluido",
      progresso: 100,
      ultimaAtualizacao: "2023-05-05",
      responsavel: {
        nome: "Dra. Mariana Santos",
        avatar: "/avatars/advogada2.jpg"
      }
    }
  ];

  const agendamentos = [
    {
      id: 1,
      titulo: "Reunião de Alinhamento",
      data: "2023-05-20T14:00:00",
      duracao: 60,
      status: "confirmado",
      responsavel: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg"
      }
    },
    {
      id: 2,
      titulo: "Assinatura de Documentos",
      data: "2023-05-25T10:30:00",
      duracao: 30,
      status: "pendente",
      responsavel: {
        nome: "Dr. Carlos Mendes",
        avatar: "/avatars/advogado1.jpg"
      }
    }
  ];

  const mensagens = [
    {
      id: 1,
      remetente: {
        nome: "Dra. Ana Oliveira",
        avatar: "/avatars/advogada1.jpg"
      },
      assunto: "Atualização sobre o processo de divórcio",
      conteudo: "Olá, gostaria de informar que o processo está progredindo bem...",
      data: "2023-05-15T09:30:00",
      lida: false
    },
    {
      id: 2,
      remetente: {
        nome: "Dr. Carlos Mendes",
        avatar: "/avatars/advogado1.jpg"
      },
      assunto: "Documentos pendentes",
      conteudo: "Precisamos que você envie os seguintes documentos...",
      data: "2023-05-12T14:15:00",
      lida: true
    }
  ];

  const pagamentos = [
    {
      id: 1,
      descricao: "Honorários - Divórcio",
      valor: 2500.00,
      data: "2023-05-01",
      status: "pago"
    },
    {
      id: 2,
      descricao: "Taxas Processuais",
      valor: 350.00,
      data: "2023-05-10",
      status: "pendente"
    },
    {
      id: 3,
      descricao: "Honorários - Inventário",
      valor: 1800.00,
      data: "2023-05-15",
      status: "atrasado"
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
      case "confirmado":
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "pago":
        return <Badge className="bg-green-500">Pago</Badge>;
      case "atrasado":
        return <Badge className="bg-red-500">Atrasado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatarData = (dataString: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "em andamento":
        return "bg-blue-100 text-blue-800";
      case "aguardando audiência":
        return "bg-yellow-100 text-yellow-800";
      case "em análise":
        return "bg-purple-100 text-purple-800";
      case "concluído":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case "audiencia":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "reuniao":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "prazo":
        return <Clock4 className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, Carlos. Aqui está um resumo da sua situação.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendário
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Nova Mensagem
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processos.filter(p => p.status === "em_andamento").length}</div>
            <p className="text-xs text-muted-foreground">
              {processos.filter(p => p.status === "em_andamento").length > 0 
                ? "Processos em andamento" 
                : "Nenhum processo ativo"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agendamentos.length}</div>
            <p className="text-xs text-muted-foreground">
              {agendamentos.length > 0 
                ? "Próximos agendamentos" 
                : "Nenhum agendamento"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mensagens.filter(m => !m.lida).length}</div>
            <p className="text-xs text-muted-foreground">
              {mensagens.filter(m => !m.lida).length > 0 
                ? "Mensagens não lidas" 
                : "Todas as mensagens lidas"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagamentos.filter(p => p.status === "pendente" || p.status === "atrasado").length}</div>
            <p className="text-xs text-muted-foreground">
              {pagamentos.filter(p => p.status === "pendente" || p.status === "atrasado").length > 0 
                ? "Pagamentos pendentes" 
                : "Todos os pagamentos em dia"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="processos" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="processos" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Processos</span>
          </TabsTrigger>
          <TabsTrigger value="agendamentos" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Agendamentos</span>
          </TabsTrigger>
          <TabsTrigger value="mensagens" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Mensagens</span>
          </TabsTrigger>
          <TabsTrigger value="pagamentos" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Pagamentos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="processos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Meus Processos</h2>
            <Button asChild>
              <Link to="/cliente/processos">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {processos.map((processo) => (
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{processo.progresso}%</span>
                    </div>
                    <Progress value={processo.progresso} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Última atualização</span>
                      <span>{formatarData(processo.ultimaAtualizacao)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Responsável:</span>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={processo.responsavel.avatar} alt={processo.responsavel.nome} />
                          <AvatarFallback>{processo.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{processo.responsavel.nome}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/cliente/processos/${processo.id}`}>Ver detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agendamentos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Meus Agendamentos</h2>
            <Button asChild>
              <Link to="/cliente/agendamentos">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {agendamentos.map((agendamento) => (
              <Card key={agendamento.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{agendamento.titulo}</CardTitle>
                      <CardDescription>{formatarData(agendamento.data)}</CardDescription>
                    </div>
                    {getStatusBadge(agendamento.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Duração: {agendamento.duracao} minutos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Responsável:</span>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={agendamento.responsavel.avatar} alt={agendamento.responsavel.nome} />
                          <AvatarFallback>{agendamento.responsavel.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{agendamento.responsavel.nome}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/cliente/agendamentos/${agendamento.id}`}>Ver detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mensagens" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Minhas Mensagens</h2>
            <Button asChild>
              <Link to="/cliente/mensagens">Ver todas</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {mensagens.map((mensagem) => (
              <Card key={mensagem.id} className={mensagem.lida ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mensagem.remetente.avatar} alt={mensagem.remetente.nome} />
                        <AvatarFallback>{mensagem.remetente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{mensagem.remetente.nome}</CardTitle>
                        <CardDescription>{mensagem.assunto}</CardDescription>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatarData(mensagem.data)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{mensagem.conteudo}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/cliente/mensagens/${mensagem.id}`}>Ver mensagem</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Meus Pagamentos</h2>
            <Button asChild>
              <Link to="/cliente/pagamentos">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {pagamentos.map((pagamento) => (
              <Card key={pagamento.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{pagamento.descricao}</CardTitle>
                      <CardDescription>{formatarData(pagamento.data)}</CardDescription>
                    </div>
                    {getStatusBadge(pagamento.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{formatarMoeda(pagamento.valor)}</span>
                    {pagamento.status === "pendente" && (
                      <Button size="sm">Pagar agora</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas atualizações nos seus processos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Documento assinado</p>
                  <p className="text-xs text-muted-foreground">Divórcio Consensual - PROC-2023-001</p>
                  <p className="text-xs text-muted-foreground">15/05/2023 09:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pagamento pendente</p>
                  <p className="text-xs text-muted-foreground">Taxas Processuais - R$ 350,00</p>
                  <p className="text-xs text-muted-foreground">10/05/2023 14:15</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Processo atualizado</p>
                  <p className="text-xs text-muted-foreground">Inventário - PROC-2023-002</p>
                  <p className="text-xs text-muted-foreground">08/05/2023 11:20</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/cliente/atividades">Ver todas as atividades</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Prazos</CardTitle>
            <CardDescription>Prazos importantes para seus processos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pagamento atrasado</p>
                  <p className="text-xs text-muted-foreground">Honorários - Inventário</p>
                  <p className="text-xs text-muted-foreground">Venceu em 15/05/2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pagamento pendente</p>
                  <p className="text-xs text-muted-foreground">Taxas Processuais</p>
                  <p className="text-xs text-muted-foreground">Vence em 25/05/2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Audiência</p>
                  <p className="text-xs text-muted-foreground">Divórcio Consensual</p>
                  <p className="text-xs text-muted-foreground">30/05/2023 14:00</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/cliente/prazos">Ver todos os prazos</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 
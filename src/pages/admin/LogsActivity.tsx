
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Download, AlertTriangle, Info, FileText } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const LogsActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("today");
  
  // Mock logs data
  const adminLogs = [
    {
      id: "log-001",
      action: "Usuário Criado",
      user: "admin@advocacialex.com",
      details: "Criou o usuário 'maria@advocacialex.com'",
      timestamp: "13/05/2025 15:45:22",
      ip: "192.168.1.10",
      type: "user"
    },
    {
      id: "log-002",
      action: "Post Publicado",
      user: "carlos@advocacialex.com",
      details: "Publicou o post 'Mudanças na Legislação Trabalhista de 2024'",
      timestamp: "13/05/2025 14:10:55",
      ip: "192.168.1.15",
      type: "content"
    },
    {
      id: "log-003",
      action: "Login",
      user: "admin@advocacialex.com",
      details: "Login bem-sucedido",
      timestamp: "13/05/2025 09:05:12",
      ip: "192.168.1.10",
      type: "auth"
    },
    {
      id: "log-004",
      action: "Página Editada",
      user: "fernanda@advocacialex.com",
      details: "Editou a página 'Quem Somos'",
      timestamp: "12/05/2025 16:32:40",
      ip: "192.168.1.20",
      type: "content"
    },
    {
      id: "log-005",
      action: "E-book Adicionado",
      user: "carlos@advocacialex.com",
      details: "Adicionou o e-book 'Guia de LGPD para Empresas'",
      timestamp: "12/05/2025 11:20:15",
      ip: "192.168.1.15",
      type: "content"
    },
    {
      id: "log-006",
      action: "Login Falhou",
      user: "unknown",
      details: "Tentativa de login falhou para 'teste@email.com'",
      timestamp: "11/05/2025 22:45:30",
      ip: "203.0.113.42",
      type: "auth"
    },
    {
      id: "log-007",
      action: "Configurações Alteradas",
      user: "admin@advocacialex.com",
      details: "Alterou configurações de SEO",
      timestamp: "11/05/2025 14:22:08",
      ip: "192.168.1.10",
      type: "settings"
    },
    {
      id: "log-008",
      action: "Usuário Bloqueado",
      user: "admin@advocacialex.com",
      details: "Bloqueou o usuário 'paulo@email.com'",
      timestamp: "10/05/2025 10:12:33",
      ip: "192.168.1.10",
      type: "user"
    }
  ];
  
  const systemLogs = [
    {
      id: "sys-001",
      level: "error",
      component: "Database",
      message: "Falha na conexão com o banco de dados",
      timestamp: "13/05/2025 08:45:12"
    },
    {
      id: "sys-002",
      level: "warning",
      component: "API",
      message: "Tempo limite excedido ao processar requisição",
      timestamp: "13/05/2025 07:30:21"
    },
    {
      id: "sys-003",
      level: "info",
      component: "System",
      message: "Backup automático iniciado",
      timestamp: "13/05/2025 03:00:00"
    },
    {
      id: "sys-004",
      level: "info",
      component: "System",
      message: "Backup automático concluído com sucesso",
      timestamp: "13/05/2025 03:15:42"
    },
    {
      id: "sys-005",
      level: "warning",
      component: "Storage",
      message: "Espaço de armazenamento abaixo de 20%",
      timestamp: "12/05/2025 22:10:33"
    },
    {
      id: "sys-006",
      level: "error",
      component: "API",
      message: "Erro na integração com serviço externo",
      timestamp: "12/05/2025 16:40:18"
    },
    {
      id: "sys-007",
      level: "info",
      component: "Security",
      message: "Verificação de segurança concluída",
      timestamp: "12/05/2025 12:00:05"
    },
    {
      id: "sys-008",
      level: "warning",
      component: "Email",
      message: "Falha no envio de email para recipient@example.com",
      timestamp: "11/05/2025 14:22:08"
    }
  ];
  
  // Filter logs based on search term
  const filteredAdminLogs = adminLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSystemLogs = systemLogs.filter(log => 
    log.component.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Alerta</Badge>;
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "auth":
        return <div className="bg-blue-100 p-1 rounded-full"><Lock className="h-4 w-4 text-blue-600" /></div>;
      case "user":
        return <div className="bg-purple-100 p-1 rounded-full"><User className="h-4 w-4 text-purple-600" /></div>;
      case "content":
        return <div className="bg-green-100 p-1 rounded-full"><FileText className="h-4 w-4 text-green-600" /></div>;
      case "settings":
        return <div className="bg-amber-100 p-1 rounded-full"><Settings className="h-4 w-4 text-amber-600" /></div>;
      default:
        return <div className="bg-gray-100 p-1 rounded-full"><Activity className="h-4 w-4 text-gray-600" /></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Logs de Atividade</h1>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          
          <MockActionButton action="Exportar Logs" variant="outline">
            <Download className="mr-2 h-4 w-4" />
          </MockActionButton>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Registro de Atividades</span>
            <div className="relative max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar logs..."
                className="pl-8 max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin">
            <TabsList className="mb-4">
              <TabsTrigger value="admin">
                <User className="h-4 w-4 mr-2" />
                Logs Administrativos
              </TabsTrigger>
              <TabsTrigger value="system">
                <Settings className="h-4 w-4 mr-2" />
                Logs do Sistema
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Detalhes</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdminLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {getTypeIcon(log.type)}
                        </TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                      </TableRow>
                    ))}
                    {filteredAdminLogs.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <p className="text-muted-foreground">Nenhum log encontrado</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="system">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Nível</TableHead>
                      <TableHead>Componente</TableHead>
                      <TableHead>Mensagem</TableHead>
                      <TableHead>Data/Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSystemLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {getLevelBadge(log.level)}
                        </TableCell>
                        <TableCell className="font-medium">{log.component}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {log.level === "error" && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                            {log.level === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />}
                            {log.level === "info" && <Info className="h-4 w-4 text-blue-500 mr-2" />}
                            {log.message}
                          </div>
                        </TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                    {filteredSystemLogs.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <p className="text-muted-foreground">Nenhum log encontrado</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredAdminLogs.length} de {adminLogs.length} logs
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-2 mb-2">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-xl font-bold">24</div>
                  <p className="text-sm text-muted-foreground">Atividades de Usuários</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-2 mb-2">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-xl font-bold">18</div>
                  <p className="text-sm text-muted-foreground">Alterações de Conteúdo</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="bg-amber-100 rounded-full p-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="text-xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">Alertas do Sistema</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 rounded-full p-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="text-xl font-bold">2</div>
                  <p className="text-sm text-muted-foreground">Erros Críticos</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Usuários Mais Ativos</h3>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ações</TableHead>
                    <TableHead>Última Atividade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">admin@advocacialex.com</TableCell>
                    <TableCell>15 ações</TableCell>
                    <TableCell>13/05/2025 15:45:22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">carlos@advocacialex.com</TableCell>
                    <TableCell>8 ações</TableCell>
                    <TableCell>13/05/2025 14:10:55</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">fernanda@advocacialex.com</TableCell>
                    <TableCell>6 ações</TableCell>
                    <TableCell>12/05/2025 16:32:40</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add required components from lucide-react
const { User, Settings, Activity, Lock } = require('lucide-react');

export default LogsActivity;

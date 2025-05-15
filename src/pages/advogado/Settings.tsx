
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { User, Settings as SettingsIcon, BellRing, Calendar, Shield, LogOut } from "lucide-react";

const Settings = () => {
  const [profileData, setProfileData] = useState({
    nome: "Dr. João Silva",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 98765-4321",
    oab: "OAB/SP 123456",
    especialidade: "Direito Civil"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    novasTarefas: true,
    prazosProximos: true,
    novosMensagens: true,
    atualizacoesProcessos: false
  });
  
  const [agendaSettings, setAgendaSettings] = useState({
    horariosDisponiveis: true,
    bloqueioHorarios: ["segunda", "quarta", "sexta"],
    duracaoConsulta: "60",
    intervaloConsultas: "15"
  });
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram atualizadas com sucesso"
    });
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configurações de notificação atualizadas",
      description: "Suas preferências de notificação foram salvas"
    });
  };
  
  const handleAgendaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configurações de agenda atualizadas",
      description: "Suas preferências de agenda foram salvas"
    });
  };
  
  const handleToggleBloqueio = (dia: string) => {
    if (agendaSettings.bloqueioHorarios.includes(dia)) {
      setAgendaSettings({
        ...agendaSettings,
        bloqueioHorarios: agendaSettings.bloqueioHorarios.filter(d => d !== dia)
      });
    } else {
      setAgendaSettings({
        ...agendaSettings,
        bloqueioHorarios: [...agendaSettings.bloqueioHorarios, dia]
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="perfil">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" /> Notificações
          </TabsTrigger>
          <TabsTrigger value="agenda" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Agenda
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Segurança
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <img src="/placeholder.svg" alt="Foto de perfil" />
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      Alterar foto
                    </Button>
                    <p className="mt-2 text-xs text-gray-500">
                      JPG, PNG ou GIF. Tamanho máximo 1MB.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                      id="nome"
                      value={profileData.nome}
                      onChange={(e) => setProfileData({...profileData, nome: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={profileData.telefone}
                      onChange={(e) => setProfileData({...profileData, telefone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="oab">Número OAB</Label>
                    <Input
                      id="oab"
                      value={profileData.oab}
                      onChange={(e) => setProfileData({...profileData, oab: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="especialidade">Especialidade</Label>
                    <Select 
                      value={profileData.especialidade}
                      onValueChange={(value) => setProfileData({...profileData, especialidade: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direito Civil">Direito Civil</SelectItem>
                        <SelectItem value="Direito Penal">Direito Penal</SelectItem>
                        <SelectItem value="Direito Trabalhista">Direito Trabalhista</SelectItem>
                        <SelectItem value="Direito Tributário">Direito Tributário</SelectItem>
                        <SelectItem value="Direito Empresarial">Direito Empresarial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Salvar Alterações</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canais de Notificação</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">
                          Notificações por Email
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receba notificações por email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: checked
                        })}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications" className="font-medium">
                          Notificações por SMS
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receba notificações por mensagem de texto
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          smsNotifications: checked
                        })}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications" className="font-medium">
                          Notificações Push
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receba notificações no navegador
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: checked
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="novas-tarefas">Novas Tarefas</Label>
                      <Switch
                        id="novas-tarefas"
                        checked={notificationSettings.novasTarefas}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          novasTarefas: checked
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="prazos-proximos">Prazos Próximos</Label>
                      <Switch
                        id="prazos-proximos"
                        checked={notificationSettings.prazosProximos}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          prazosProximos: checked
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="novos-mensagens">Novas Mensagens</Label>
                      <Switch
                        id="novos-mensagens"
                        checked={notificationSettings.novosMensagens}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          novosMensagens: checked
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="atualizacoes-processos">Atualizações de Processos</Label>
                      <Switch
                        id="atualizacoes-processos"
                        checked={notificationSettings.atualizacoesProcessos}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          atualizacoesProcessos: checked
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Salvar Preferências</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAgendaSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="horarios-disponiveis" className="font-medium">
                      Horários Disponíveis para Agendamento
                    </Label>
                    <p className="text-sm text-gray-500">
                      Permitir que clientes agendem consultas online
                    </p>
                  </div>
                  <Switch
                    id="horarios-disponiveis"
                    checked={agendaSettings.horariosDisponiveis}
                    onCheckedChange={(checked) => setAgendaSettings({
                      ...agendaSettings,
                      horariosDisponiveis: checked
                    })}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dias Disponíveis</h3>
                  <p className="text-sm text-gray-500">Selecione os dias em que você não estará disponível para consultas</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"].map((dia) => (
                      <Button
                        key={dia}
                        type="button"
                        variant={agendaSettings.bloqueioHorarios.includes(dia) ? "default" : "outline"}
                        className="capitalize"
                        onClick={() => handleToggleBloqueio(dia)}
                      >
                        {dia}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duracao-consulta">Duração da Consulta</Label>
                    <Select 
                      value={agendaSettings.duracaoConsulta}
                      onValueChange={(value) => setAgendaSettings({
                        ...agendaSettings,
                        duracaoConsulta: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                        <SelectItem value="120">120 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="intervalo-consultas">Intervalo entre Consultas</Label>
                    <Select 
                      value={agendaSettings.intervaloConsultas}
                      onValueChange={(value) => setAgendaSettings({
                        ...agendaSettings,
                        intervaloConsultas: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o intervalo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Sem intervalo</SelectItem>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Salvar Configurações</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alterar Senha</h3>
                <div className="space-y-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input id="senha-atual" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" />
                </div>
                <Button>Alterar Senha</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessões Ativas</h3>
                <div className="space-y-2">
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Este dispositivo</p>
                        <p className="text-sm text-gray-500">Windows 11 · Chrome · São Paulo, BR</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Atual
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dispositivo móvel</p>
                        <p className="text-sm text-gray-500">iOS 16 · Safari · São Paulo, BR</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Encerrar
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Encerrar Todas Outras Sessões</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-red-600">Zona de Perigo</h3>
                <Button variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

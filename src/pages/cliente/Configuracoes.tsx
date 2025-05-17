import { useState } from "react";
import { 
  Settings, 
  Bell, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Smartphone, 
  Globe, 
  Shield, 
  FileText, 
  Download, 
  Trash2, 
  Save, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Switch 
} from "@/components/ui/switch";
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

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState("notificacoes");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
    notificacoes: {
      email: {
        novosProcessos: true,
        atualizacoesProcesso: true,
        pagamentos: true,
        mensagens: true,
        lembretes: true
      },
      sms: {
        novosProcessos: false,
        atualizacoesProcesso: false,
        pagamentos: true,
        mensagens: false,
        lembretes: true
      },
      push: {
        novosProcessos: true,
        atualizacoesProcesso: true,
        pagamentos: true,
        mensagens: true,
        lembretes: true
      }
    },
    privacidade: {
      compartilharDados: false,
      mostrarPerfil: true,
      permitirMensagens: true,
      salvarHistorico: true
    },
    idioma: "pt-BR",
    tema: "sistema"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (path: string, value: boolean) => {
    const [parent, child] = path.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [child]: value
      }
    }));
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold mb-4">Configurações</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Editar Configurações
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
          <TabsTrigger value="preferencias">Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações por E-mail</CardTitle>
              <CardDescription>
                Configure quais notificações você deseja receber por e-mail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Processos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando novos processos forem criados
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.email.novosProcessos}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.email.novosProcessos", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações de Processo</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre atualizações nos seus processos
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.email.atualizacoesProcesso}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.email.atualizacoesProcesso", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pagamentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre pagamentos e faturas
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.email.pagamentos}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.email.pagamentos", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mensagens</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando receber novas mensagens
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.email.mensagens}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.email.mensagens", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes sobre prazos e compromissos
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.email.lembretes}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.email.lembretes", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações por SMS</CardTitle>
              <CardDescription>
                Configure quais notificações você deseja receber por SMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Processos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando novos processos forem criados
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.sms.novosProcessos}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.sms.novosProcessos", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações de Processo</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre atualizações nos seus processos
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.sms.atualizacoesProcesso}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.sms.atualizacoesProcesso", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pagamentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre pagamentos e faturas
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.sms.pagamentos}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.sms.pagamentos", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mensagens</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando receber novas mensagens
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.sms.mensagens}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.sms.mensagens", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes sobre prazos e compromissos
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.sms.lembretes}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.sms.lembretes", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações Push</CardTitle>
              <CardDescription>
                Configure quais notificações você deseja receber no navegador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Processos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando novos processos forem criados
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.push.novosProcessos}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.push.novosProcessos", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações de Processo</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre atualizações nos seus processos
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.push.atualizacoesProcesso}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.push.atualizacoesProcesso", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pagamentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre pagamentos e faturas
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.push.pagamentos}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.push.pagamentos", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mensagens</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando receber novas mensagens
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.push.mensagens}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.push.mensagens", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes sobre prazos e compromissos
                  </p>
                </div>
                <Switch
                  checked={formData.notificacoes.push.lembretes}
                  onCheckedChange={(checked) => handleSwitchChange("notificacoes.push.lembretes", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha para manter sua conta segura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senhaAtual">Senha Atual</Label>
                <div className="relative">
                  <Input
                    id="senhaAtual"
                    name="senhaAtual"
                    type={showPassword ? "text" : "password"}
                    value={formData.senhaAtual}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!isEditing}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="novaSenha">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="novaSenha"
                    name="novaSenha"
                    type={showPassword ? "text" : "password"}
                    value={formData.novaSenha}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmarSenha}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação em Duas Etapas</CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação em Duas Etapas</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba um código por SMS ou e-mail ao fazer login
                  </p>
                </div>
                <Switch disabled={!isEditing} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacidade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Privacidade</CardTitle>
              <CardDescription>
                Controle como seus dados são compartilhados e utilizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compartilhar Dados</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que seus dados sejam compartilhados com parceiros
                  </p>
                </div>
                <Switch
                  checked={formData.privacidade.compartilharDados}
                  onCheckedChange={(checked) => handleSwitchChange("privacidade.compartilharDados", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostrar Perfil</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que outros usuários vejam seu perfil
                  </p>
                </div>
                <Switch
                  checked={formData.privacidade.mostrarPerfil}
                  onCheckedChange={(checked) => handleSwitchChange("privacidade.mostrarPerfil", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir Mensagens</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que outros usuários enviem mensagens para você
                  </p>
                </div>
                <Switch
                  checked={formData.privacidade.permitirMensagens}
                  onCheckedChange={(checked) => handleSwitchChange("privacidade.permitirMensagens", checked)}
                  disabled={!isEditing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Salvar Histórico</Label>
                  <p className="text-sm text-muted-foreground">
                    Salva seu histórico de navegação e atividades
                  </p>
                </div>
                <Switch
                  checked={formData.privacidade.salvarHistorico}
                  onCheckedChange={(checked) => handleSwitchChange("privacidade.salvarHistorico", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exportar Dados</CardTitle>
              <CardDescription>
                Baixe uma cópia dos seus dados pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled={!isEditing}>
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Excluir Conta</CardTitle>
              <CardDescription>
                Exclua permanentemente sua conta e todos os seus dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" disabled={!isEditing}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir Conta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Excluir Conta</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="confirmacao">Digite "EXCLUIR" para confirmar</Label>
                      <Input id="confirmacao" placeholder="EXCLUIR" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button variant="destructive">Excluir Conta</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências Gerais</CardTitle>
              <CardDescription>
                Configure suas preferências de uso do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Select
                  value={formData.idioma}
                  onValueChange={(value) => 
                    setFormData(prev => ({
                      ...prev,
                      idioma: value
                    }))
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <Select
                  value={formData.tema}
                  onValueChange={(value) => 
                    setFormData(prev => ({
                      ...prev,
                      tema: value
                    }))
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="sistema">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes; 
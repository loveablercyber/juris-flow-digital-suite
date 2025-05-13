
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Edit, Trash, User, Shield, Check, X } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";
import { toast } from "@/hooks/use-toast";

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  // Mock user data
  const users = [
    {
      id: 1,
      name: "Admin Master",
      email: "admin@advocacialex.com",
      role: "Administrador",
      status: "Ativo",
      lastLogin: "13/05/2025 14:32"
    },
    {
      id: 2,
      name: "Dr. Carlos Mendes",
      email: "carlos@advocacialex.com",
      role: "Advogado",
      status: "Ativo",
      lastLogin: "13/05/2025 10:15"
    },
    {
      id: 3,
      name: "Dra. Fernanda Almeida",
      email: "fernanda@advocacialex.com",
      role: "Advogado",
      status: "Ativo",
      lastLogin: "12/05/2025 16:45"
    },
    {
      id: 4,
      name: "Maria Silva",
      email: "maria@advocacialex.com",
      role: "Editor",
      status: "Ativo",
      lastLogin: "10/05/2025 09:20"
    },
    {
      id: 5,
      name: "João Oliveira",
      email: "joao@example.com",
      role: "Cliente",
      status: "Ativo",
      lastLogin: "08/05/2025 11:30"
    },
    {
      id: 6,
      name: "Pedro Santos",
      email: "pedro@example.com",
      role: "Cliente",
      status: "Inativo",
      lastLogin: "25/04/2025 14:10"
    },
    {
      id: 7,
      name: "Ana Costa",
      email: "ana@example.com",
      role: "Cliente",
      status: "Bloqueado",
      lastLogin: "15/03/2025 16:22"
    }
  ];

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewUser = () => {
    setEditingUser(null);
    setUserDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Usuário excluído",
      description: "O usuário foi removido com sucesso."
    });
  };

  const handleSaveUser = () => {
    toast({
      title: editingUser ? "Usuário atualizado" : "Usuário criado",
      description: editingUser 
        ? "As alterações foram salvas com sucesso." 
        : "O novo usuário foi criado com sucesso."
    });
    setUserDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800";
      case "Inativo":
        return "bg-gray-100 text-gray-800";
      case "Bloqueado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        <Button onClick={handleNewUser}>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuários..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os perfis</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="lawyer">Advogado</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Administrador" ? "default" : "outline"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum usuário encontrado</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
            <DialogDescription>
              {editingUser 
                ? "Altere as informações do usuário conforme necessário." 
                : "Preencha as informações para criar um novo usuário."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="permissions">Permissões</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name" 
                    defaultValue={editingUser?.name || ""} 
                    placeholder="Nome completo" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={editingUser?.email || ""} 
                    placeholder="email@exemplo.com" 
                  />
                </div>
                <div>
                  <Label htmlFor="role">Perfil</Label>
                  <Select defaultValue={editingUser?.role?.toLowerCase() || "client"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrador">Administrador</SelectItem>
                      <SelectItem value="advogado">Advogado</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="cliente">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={editingUser?.status?.toLowerCase() || "ativo"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="bloqueado">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {!editingUser && (
                  <>
                    <div>
                      <Label htmlFor="password">Senha</Label>
                      <Input id="password" type="password" placeholder="Digite a senha" />
                    </div>
                    <div>
                      <Label htmlFor="password-confirm">Confirmar Senha</Label>
                      <Input id="password-confirm" type="password" placeholder="Confirme a senha" />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="permissions" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Permissões de Conteúdo</h3>
                    </div>
                    <MockActionButton action="Atribuir Tudo" variant="outline" size="sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-pages-view" className="flex-1">Visualizar Páginas</Label>
                      <Switch id="perm-pages-view" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-pages-edit" className="flex-1">Editar Páginas</Label>
                      <Switch id="perm-pages-edit" defaultChecked={editingUser?.role !== "Cliente"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-blog-view" className="flex-1">Visualizar Blog</Label>
                      <Switch id="perm-blog-view" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-blog-edit" className="flex-1">Editar Blog</Label>
                      <Switch id="perm-blog-edit" defaultChecked={editingUser?.role !== "Cliente"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-ebooks-view" className="flex-1">Visualizar E-books</Label>
                      <Switch id="perm-ebooks-view" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-ebooks-edit" className="flex-1">Editar E-books</Label>
                      <Switch id="perm-ebooks-edit" defaultChecked={editingUser?.role === "Administrador" || editingUser?.role === "Editor"} />
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Permissões Administrativas</h3>
                    </div>
                    <MockActionButton action="Atribuir Tudo" variant="outline" size="sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-users-view" className="flex-1">Visualizar Usuários</Label>
                      <Switch id="perm-users-view" defaultChecked={editingUser?.role === "Administrador"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-users-edit" className="flex-1">Editar Usuários</Label>
                      <Switch id="perm-users-edit" defaultChecked={editingUser?.role === "Administrador"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-settings-view" className="flex-1">Visualizar Configurações</Label>
                      <Switch id="perm-settings-view" defaultChecked={editingUser?.role === "Administrador"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-settings-edit" className="flex-1">Editar Configurações</Label>
                      <Switch id="perm-settings-edit" defaultChecked={editingUser?.role === "Administrador"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-stats-view" className="flex-1">Visualizar Estatísticas</Label>
                      <Switch id="perm-stats-view" defaultChecked={editingUser?.role === "Administrador" || editingUser?.role === "Advogado"} />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-logs-view" className="flex-1">Visualizar Logs</Label>
                      <Switch id="perm-logs-view" defaultChecked={editingUser?.role === "Administrador"} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-muted-foreground">Receber atualizações e notificações por email</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                    <p className="text-sm text-muted-foreground">Ativar autenticação de dois fatores para maior segurança</p>
                  </div>
                  <Switch defaultChecked={editingUser?.role === "Administrador"} />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <h4 className="font-medium">Sessões Simultâneas</h4>
                    <p className="text-sm text-muted-foreground">Permitir login em múltiplos dispositivos ao mesmo tempo</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                {editingUser && (
                  <div className="flex items-center justify-between py-2">
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Redefinir Senha
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserDialogOpen(false)}>Cancelar</Button>
            <MockActionButton action="Salvar" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;

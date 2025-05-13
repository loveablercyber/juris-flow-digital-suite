
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const PermissionsManagement = () => {
  // Mock permission data
  const roles = ["Administrador", "Advogado", "Editor", "Cliente"];
  
  const permissionGroups = [
    {
      name: "Painel Administrativo",
      permissions: [
        { name: "Acessar Dashboard", id: "access-dashboard" },
        { name: "Visualizar Estatísticas", id: "view-stats" },
        { name: "Exportar Dados", id: "export-data" }
      ]
    },
    {
      name: "Gerenciamento de Conteúdo",
      permissions: [
        { name: "Visualizar Páginas", id: "view-pages" },
        { name: "Editar Páginas", id: "edit-pages" },
        { name: "Publicar Páginas", id: "publish-pages" },
        { name: "Excluir Páginas", id: "delete-pages" }
      ]
    },
    {
      name: "Blog",
      permissions: [
        { name: "Visualizar Posts", id: "view-posts" },
        { name: "Criar Posts", id: "create-posts" },
        { name: "Editar Posts", id: "edit-posts" },
        { name: "Publicar Posts", id: "publish-posts" },
        { name: "Excluir Posts", id: "delete-posts" }
      ]
    },
    {
      name: "Usuários",
      permissions: [
        { name: "Visualizar Usuários", id: "view-users" },
        { name: "Criar Usuários", id: "create-users" },
        { name: "Editar Usuários", id: "edit-users" },
        { name: "Excluir Usuários", id: "delete-users" },
        { name: "Gerir Permissões", id: "manage-permissions" }
      ]
    },
    {
      name: "Materiais",
      permissions: [
        { name: "Visualizar E-books", id: "view-ebooks" },
        { name: "Criar E-books", id: "create-ebooks" },
        { name: "Editar E-books", id: "edit-ebooks" },
        { name: "Excluir E-books", id: "delete-ebooks" },
        { name: "Visualizar Checklists", id: "view-checklists" },
        { name: "Criar Checklists", id: "create-checklists" },
        { name: "Editar Checklists", id: "edit-checklists" },
        { name: "Excluir Checklists", id: "delete-checklists" }
      ]
    }
  ];

  // Helper to determine if a permission should be checked based on role and permission ID
  const isPermissionEnabled = (role: string, permissionId: string) => {
    // Admin has all permissions
    if (role === "Administrador") return true;
    
    // Advogado
    if (role === "Advogado") {
      // Can view most things but not edit system settings
      if (permissionId.startsWith("view-")) return true;
      // Can manage blog posts
      if (["create-posts", "edit-posts", "publish-posts"].includes(permissionId)) return true;
      // Can manage materials
      if (["create-ebooks", "edit-ebooks", "create-checklists", "edit-checklists"].includes(permissionId)) return true;
      return false;
    }
    
    // Editor
    if (role === "Editor") {
      // Can view and manage content but not users or settings
      if (["view-pages", "edit-pages", "view-posts", "create-posts", "edit-posts"].includes(permissionId)) return true;
      if (["view-ebooks", "edit-ebooks", "view-checklists", "edit-checklists"].includes(permissionId)) return true;
      if (permissionId === "view-stats") return true;
      return false;
    }
    
    // Cliente
    if (role === "Cliente") {
      // Can only view content
      if (["view-pages", "view-posts", "view-ebooks", "view-checklists"].includes(permissionId)) return true;
      return false;
    }
    
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Permissões</h1>
        <MockActionButton action="Salvar Alterações" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permissões por Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Tabela de Permissões</TabsTrigger>
              <TabsTrigger value="roles">Perfis de Acesso</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      <TableHead className="min-w-[200px]">Permissão</TableHead>
                      {roles.map(role => (
                        <TableHead key={role} className="text-center">{role}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionGroups.map(group => (
                      <React.Fragment key={group.name}>
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={roles.length + 1} className="font-medium">
                            {group.name}
                          </TableCell>
                        </TableRow>
                        {group.permissions.map(permission => (
                          <TableRow key={permission.id}>
                            <TableCell className="font-normal pl-6">
                              {permission.name}
                            </TableCell>
                            {roles.map(role => (
                              <TableCell key={`${role}-${permission.id}`} className="text-center">
                                <Switch
                                  checked={isPermissionEnabled(role, permission.id)}
                                  disabled={role === "Administrador"} // Admin always has all permissions
                                  aria-label={`${permission.name} for ${role}`}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="roles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map(role => (
                  <Card key={role}>
                    <CardHeader>
                      <CardTitle className="text-lg">{role}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {permissionGroups.map(group => (
                          <li key={`${role}-${group.name}`}>
                            <h4 className="font-medium mb-1">{group.name}</h4>
                            <ul className="space-y-1 pl-4">
                              {group.permissions.map(permission => (
                                <li key={`${role}-${permission.id}`} className="flex items-center gap-2">
                                  {isPermissionEnabled(role, permission.id) ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-500" />
                                  )}
                                  <span className="text-sm">
                                    {permission.name}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <div className="space-x-2">
              <MockActionButton action="Restaurar Padrões" variant="outline" />
              <MockActionButton action="Salvar Alterações" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Regras Especiais de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">Restrição por IP</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Restringir o acesso administrativo apenas a IPs autorizados
              </p>
              <div className="flex space-x-2">
                <Switch id="ip-restriction" />
                <label htmlFor="ip-restriction" className="text-sm">Ativar restrição por IP</label>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">Autenticação de Dois Fatores</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Exigir autenticação de dois fatores para perfis administrativos
              </p>
              <div className="flex space-x-2">
                <Switch id="2fa-admin" defaultChecked />
                <label htmlFor="2fa-admin" className="text-sm">Exigir para Administradores</label>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">Tempo Máximo de Sessão</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Definir tempo máximo de sessão para usuários administrativos
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-1">Administradores</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option value="30">30 minutos</option>
                    <option value="60" selected>1 hora</option>
                    <option value="120">2 horas</option>
                    <option value="240">4 horas</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm block mb-1">Outros perfis</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option value="60">1 hora</option>
                    <option value="120">2 horas</option>
                    <option value="240" selected>4 horas</option>
                    <option value="480">8 horas</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <MockActionButton action="Salvar Configurações" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionsManagement;

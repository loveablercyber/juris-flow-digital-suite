import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  CreditCard,
  FileCheck,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const ClienteLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulação de dados do cliente
  const cliente = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    avatar: "/avatars/cliente.jpg",
    notificacoes: 3
  };

  const menuItems = [
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: "Dashboard", 
      path: "/cliente/dashboard" 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: "Meus Processos", 
      path: "/cliente/processos" 
    },
    { 
      icon: <Calendar className="h-5 w-5" />, 
      label: "Agendamentos", 
      path: "/cliente/agendamentos" 
    },
    { 
      icon: <MessageSquare className="h-5 w-5" />, 
      label: "Mensagens", 
      path: "/cliente/mensagens" 
    },
    { 
      icon: <FileCheck className="h-5 w-5" />, 
      label: "Documentos", 
      path: "/cliente/documentos" 
    },
    { 
      icon: <CreditCard className="h-5 w-5" />, 
      label: "Pagamentos", 
      path: "/cliente/pagamentos" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "Configurações", 
      path: "/cliente/configuracoes" 
    },
  ];

  const handleLogout = () => {
    // Lógica de logout aqui
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo e toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!collapsed && (
              <Link to="/cliente/dashboard" className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-semibold text-lg">Cliente</span>
              </Link>
            )}
            {collapsed && (
              <Link to="/cliente/dashboard" className="flex justify-center">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto"
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          {/* Perfil do cliente */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={cliente.avatar} alt={cliente.nome} />
                <AvatarFallback>{cliente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{cliente.nome}</p>
                  <p className="text-xs text-gray-500 truncate">{cliente.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Sair</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {menuItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {cliente.notificacoes > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {cliente.notificacoes}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClienteLayout; 
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
  CheckSquare,
  MessageSquare,
  Bell
} from "lucide-react";

const AdvogadoSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/advogado/dashboard"
    },
    {
      title: "Processos",
      icon: <FileText className="h-5 w-5" />,
      path: "/advogado/processos"
    },
    {
      title: "Agenda",
      icon: <Calendar className="h-5 w-5" />,
      path: "/advogado/agendamentos"
    },
    {
      title: "Clientes",
      icon: <Users className="h-5 w-5" />,
      path: "/advogado/clientes"
    },
    {
      title: "Tarefas",
      icon: <CheckSquare className="h-5 w-5" />,
      path: "/advogado/tarefas"
    },
    {
      title: "Chat",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/advogado/chat"
    },
    {
      title: "Notificações",
      icon: <Bell className="h-5 w-5" />,
      path: "/advogado/notificacoes"
    },
    {
      title: "Documentos",
      icon: <FileText className="h-5 w-5" />,
      path: "/advogado/documentos"
    },
    {
      title: "Pagamentos",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/advogado/pagamentos"
    },
    {
      title: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      path: "/advogado/configuracoes"
    }
  ];
  
  return (
    <div
      className={cn(
        "h-screen bg-white border-r transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-primary">JurisFlow</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            )}
          >
            {item.icon}
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 justify-start"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Sair</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdvogadoSidebar;

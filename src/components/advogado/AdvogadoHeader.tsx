
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Settings, User, LogOut, Sun, Moon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const AdvogadoHeader = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [notifications, setNotifications] = React.useState(3);
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toast({
      title: `Modo ${theme === "light" ? "escuro" : "claro"} ativado`,
      description: "A aparência do painel foi atualizada"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("advogadoToken");
    localStorage.removeItem("advogadoUser");
    toast({
      title: "Logout bem-sucedido",
      description: "Você foi desconectado do painel do advogado"
    });
    navigate("/advogado");
  };

  const user = JSON.parse(localStorage.getItem("advogadoUser") || '{"name": "Dr. João Silva", "oab": "OAB/SP 123456"}');

  return (
    <header className="border-b bg-background py-3 px-4 md:px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Escritório Virtual</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
              {notifications}
            </span>
          )}
        </Button>
        
        <Button variant="outline" size="icon" onClick={() => navigate("/advogado/chat")}>
          <MessageSquare className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs text-gray-500 font-normal">{user.oab}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/advogado/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdvogadoHeader;

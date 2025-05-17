
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Settings, User, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import NotificationBell from "@/components/common/NotificationBell";
import { notificationService } from "@/services/notificationService";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [notificationCount, setNotificationCount] = useState(0);
  
  const userId = localStorage.getItem('adminUser') 
    ? JSON.parse(localStorage.getItem('adminUser') || '{}').id || '' 
    : '';
  
  useEffect(() => {
    // Initial load of notifications
    updateNotificationCount();
    
    // Set up interval to periodically check for new notifications
    const interval = setInterval(updateNotificationCount, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const updateNotificationCount = () => {
    const count = notificationService.getNotificationCount("advogado", userId); // Admin gets advogado notifications too
    setNotificationCount(count.naoLidas);
  };
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toast({
      title: `Modo ${theme === "light" ? "escuro" : "claro"} ativado`,
      description: "A aparência do painel foi atualizada"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logout bem-sucedido",
      description: "Você foi desconectado do painel administrativo"
    });
    navigate("/admin");
  };

  const user = JSON.parse(localStorage.getItem("adminUser") || '{"name": "Admin", "id": "admin1"}');

  return (
    <header className="border-b bg-background py-3 px-4 md:px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Admin Master</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        
        <NotificationBell count={notificationCount} userType="admin" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
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

export default AdminHeader;

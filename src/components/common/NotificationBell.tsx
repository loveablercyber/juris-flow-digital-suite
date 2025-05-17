
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NotificationBellProps {
  count: number;
  userType: "admin" | "advogado";
}

const NotificationBell = ({ count, userType }: NotificationBellProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const basePath = userType === "admin" ? "/admin" : "/advogado";
    navigate(`${basePath}/notificacoes`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="relative" onClick={handleClick}>
            <Bell className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {count > 0 
            ? `Você tem ${count} notificações não lidas` 
            : "Nenhuma notificação não lida"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NotificationBell;

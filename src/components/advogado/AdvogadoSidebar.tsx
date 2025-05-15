
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Upload,
  CheckSquare,
  FileEdit,
  Send,
  MessageSquare,
  Settings,
  CalendarClock
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

const AdvogadoSidebar = () => {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/advogado/dashboard' && location.pathname === '/advogado/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/advogado/dashboard';
  };
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/advogado/dashboard",
    },
    {
      icon: Calendar,
      label: "Calendário",
      path: "/advogado/calendario",
    },
    {
      icon: CalendarClock,
      label: "Agendamentos",
      path: "/advogado/agendamentos",
    },
    {
      icon: FileText,
      label: "Documentos",
      path: "/advogado/documentos",
    },
    {
      icon: CheckSquare,
      label: "Tarefas",
      path: "/advogado/tarefas",
    },
    {
      icon: Send,
      label: "Propostas",
      path: "/advogado/propostas",
    },
    {
      icon: FileEdit,
      label: "Blog",
      path: "/advogado/blog",
    },
    {
      icon: MessageSquare,
      label: "Chat",
      path: "/advogado/chat",
    },
    {
      icon: Settings,
      label: "Configurações",
      path: "/advogado/settings",
    },
  ];
  
  return (
    <SidebarProvider>
      <Sidebar 
        className="border-r h-screen" 
        data-side="left"
        collapsible="icon"
        variant="sidebar"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.path)}
                    >
                      <NavLink to={item.path} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarTrigger className="absolute right-[-12px] top-6" />
      </Sidebar>
    </SidebarProvider>
  );
};

export default AdvogadoSidebar;


import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Shield,
  BarChart,
  Book,
  File,
  Activity,
  Image
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

const AdminSidebar = () => {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/admin/dashboard' && location.pathname === '/admin/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin/dashboard';
  };
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: FileText,
      label: "Páginas",
      path: "/admin/pages",
    },
    {
      icon: Image,
      label: "Blog",
      path: "/admin/blog",
    },
    {
      icon: Settings,
      label: "SEO",
      path: "/admin/seo",
    },
    {
      icon: Users,
      label: "Usuários",
      path: "/admin/users",
    },
    {
      icon: Shield,
      label: "Permissões",
      path: "/admin/permissions",
    },
    {
      icon: Settings,
      label: "Configurações",
      path: "/admin/settings",
    },
    {
      icon: BarChart,
      label: "Estatísticas",
      path: "/admin/statistics",
    },
    {
      icon: Book,
      label: "E-books",
      path: "/admin/ebooks",
    },
    {
      icon: Activity,
      label: "Logs",
      path: "/admin/logs",
    },
  ];
  
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r">
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

export default AdminSidebar;

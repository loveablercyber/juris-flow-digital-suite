
import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import AdvogadoSidebar from "./AdvogadoSidebar";
import AdvogadoHeader from "./AdvogadoHeader";

const AdvogadoLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("advogadoToken");
    if (!token) {
      toast({
        title: "Acesso não autorizado",
        description: "Por favor, faça login para acessar o painel do advogado",
        variant: "destructive"
      });
      navigate("/advogado");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-none">
        <AdvogadoSidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdvogadoHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdvogadoLayout;

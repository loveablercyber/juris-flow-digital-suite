import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import AdvogadoLayout from "@/layouts/AdvogadoLayout";
import Dashboard from "@/pages/advogado/Dashboard";
import Processos from "@/pages/advogado/Processos";
import ProcessoDetalhes from "@/pages/advogado/ProcessoDetalhes";
import Clientes from "@/pages/advogado/Clientes";
import ClienteDetalhes from "@/pages/advogado/ClienteDetalhes";
import Documentos from "@/pages/advogado/Documentos";
import Pagamentos from "@/pages/advogado/Pagamentos";
import Perfil from "@/pages/advogado/Perfil";
import Configuracoes from "@/pages/advogado/Configuracoes";
import Agendamentos from "@/pages/advogado/Agendamentos";
import Login from "@/pages/advogado/Login";

// Lazy loading para as páginas do advogado
const CobrancaDetalhes = lazy(() => import("@/pages/advogado/CobrancaDetalhes"));

const AdvogadoRoutes = () => {
  // Verificar se o usuário está autenticado
  const isAuthenticated = true; // Substituir por lógica real de autenticação

  if (!isAuthenticated) {
    return <Navigate to="/advogado/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdvogadoLayout />}>
        <Route index element={<Navigate to="/advogado/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="processos" element={<Processos />} />
        <Route path="processos/:id" element={<ProcessoDetalhes />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="clientes/:id" element={<ClienteDetalhes />} />
        <Route path="documentos" element={<Documentos />} />
        <Route path="pagamentos" element={<Pagamentos />} />
        <Route path="agenda" element={<Agendamentos />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AdvogadoRoutes;

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ClienteLayout from "@/layouts/ClienteLayout";

// Lazy loading para as páginas do cliente
const Dashboard = lazy(() => import("@/pages/cliente/Dashboard"));
const Processos = lazy(() => import("@/pages/cliente/Processos"));
const ProcessoDetalhes = lazy(() => import("@/pages/cliente/ProcessoDetalhes"));
const Documentos = lazy(() => import("@/pages/cliente/Documentos"));
const Mensagens = lazy(() => import("@/pages/cliente/Mensagens"));
const Pagamentos = lazy(() => import("@/pages/cliente/Pagamentos"));
const Perfil = lazy(() => import("@/pages/cliente/Perfil"));
const Configuracoes = lazy(() => import("@/pages/cliente/Configuracoes"));

const ClienteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClienteLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="processos" element={<Processos />} />
        <Route path="processos/:id" element={<ProcessoDetalhes />} />
        <Route path="documentos" element={<Documentos />} />
        <Route path="mensagens" element={<Mensagens />} />
        <Route path="pagamentos" element={<Pagamentos />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  );
};

export default ClienteRoutes; 
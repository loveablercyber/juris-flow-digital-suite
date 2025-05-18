import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ClienteLayout from "@/layouts/ClienteLayout";
import ProcessoDetalhes from "@/pages/cliente/ProcessoDetalhes";
import Documentos from "@/pages/cliente/Documentos";
import CobrancaDetalhes from "@/pages/cliente/CobrancaDetalhes";

// Lazy loading para as páginas do cliente
const Dashboard = lazy(() => import("@/pages/cliente/Dashboard"));
const Processos = lazy(() => import("@/pages/cliente/Processos"));
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
        <Route path="cobrancas/:id" element={<CobrancaDetalhes />} />
        <Route path="mensagens" element={<Mensagens />} />
        <Route path="pagamentos" element={<Pagamentos />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  );
};

export default ClienteRoutes; 
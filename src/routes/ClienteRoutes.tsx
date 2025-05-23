import { lazy, Suspense, Component, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import ClienteLayout from "@/layouts/ClienteLayout";
import ProcessoDetalhes from "@/pages/cliente/ProcessoDetalhes";
import Documentos from "@/pages/cliente/Documentos";
import CobrancaDetalhes from "@/pages/cliente/CobrancaDetalhes";
import Agendamentos from "@/pages/cliente/Agendamentos";
import Dashboard from "@/pages/cliente/Dashboard";

// Lazy loading para as páginas do cliente
const Processos = lazy(() => import("@/pages/cliente/Processos"));
const Mensagens = lazy(() => import("@/pages/cliente/Mensagens"));
const Pagamentos = lazy(() => import("@/pages/cliente/Pagamentos"));
const Perfil = lazy(() => import("@/pages/cliente/Perfil"));
const Configuracoes = lazy(() => import("@/pages/cliente/Configuracoes"));

// Componente de carregamento
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// ErrorBoundary simples
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-red-600">Erro ao carregar a página: {this.state.error?.message || 'Erro desconhecido.'}</div>;
    }
    return this.props.children;
  }
}

const ClienteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClienteLayout />}>
        <Route index element={
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        } />
        <Route path="processos" element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Processos />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="processos/:id" element={<ProcessoDetalhes />} />
        <Route path="documentos" element={<Documentos />} />
        <Route path="cobrancas/:id" element={<CobrancaDetalhes />} />
        <Route path="mensagens" element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Mensagens />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="pagamentos" element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Pagamentos />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="perfil" element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Perfil />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="configuracoes" element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Configuracoes />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="agendamentos" element={<Agendamentos />} />
        <Route path="dashboard" element={
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        } />
      </Route>
    </Routes>
  );
};

export default ClienteRoutes; 
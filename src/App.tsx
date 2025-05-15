
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import AreasDeAtuacao from "./pages/AreasDeAtuacao";
import AreaDetalhe from "./pages/AreaDetalhe";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Atendimento from "./pages/Atendimento";
import Agendamento from "./pages/Agendamento";
import WikiFaq from "./pages/WikiFaq";
import Checklists from "./pages/Checklists";
import Ebooks from "./pages/Ebooks";
import Newsletter from "./pages/Newsletter";
import Webinars from "./pages/Webinars";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PagesManagement from "./pages/admin/PagesManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import SeoManagement from "./pages/admin/SeoManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import PermissionsManagement from "./pages/admin/PermissionsManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import Statistics from "./pages/admin/Statistics";
import EbooksManagement from "./pages/admin/EbooksManagement";
import LogsActivity from "./pages/admin/LogsActivity";

// Advogado pages
import AdvogadoLogin from "./pages/advogado/Login";
import AdvogadoLayout from "./components/advogado/AdvogadoLayout";
import AdvogadoDashboard from "./pages/advogado/Dashboard";
import Calendario from "./pages/advogado/Calendario";
import Documentos from "./pages/advogado/Documentos";
import Tarefas from "./pages/advogado/Tarefas";
import Propostas from "./pages/advogado/Propostas";
import AdvogadoBlog from "./pages/advogado/Blog";
import Chat from "./pages/advogado/Chat";
import AdvogadoSettings from "./pages/advogado/Settings";
import Agendamentos from "./pages/advogado/Agendamentos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/areas-de-atuacao" element={<AreasDeAtuacao />} />
          <Route path="/areas-de-atuacao/:id" element={<AreaDetalhe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/wiki-faq" element={<WikiFaq />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/webinars" element={<Webinars />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pages" element={<PagesManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="seo" element={<SeoManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="permissions" element={<PermissionsManagement />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="ebooks" element={<EbooksManagement />} />
            <Route path="logs" element={<LogsActivity />} />
          </Route>
          
          {/* Advogado Routes */}
          <Route path="/advogado" element={<AdvogadoLogin />} />
          <Route path="/advogado" element={<AdvogadoLayout />}>
            <Route path="dashboard" element={<AdvogadoDashboard />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="tarefas" element={<Tarefas />} />
            <Route path="propostas" element={<Propostas />} />
            <Route path="blog" element={<AdvogadoBlog />} />
            <Route path="chat" element={<Chat />} />
            <Route path="settings" element={<AdvogadoSettings />} />
            <Route path="agendamentos" element={<Agendamentos />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

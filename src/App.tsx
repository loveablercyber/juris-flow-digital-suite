
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
import NotFound from "./pages/NotFound";

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

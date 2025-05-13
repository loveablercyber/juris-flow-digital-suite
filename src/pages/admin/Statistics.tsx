
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateRangeSelector from "@/components/admin/statistics/DateRangeSelector";
import OverviewTab from "@/components/admin/statistics/OverviewTab";
import VisitorsTab from "@/components/admin/statistics/VisitorsTab";
import LeadsTab from "@/components/admin/statistics/LeadsTab";
import ContentTab from "@/components/admin/statistics/ContentTab";
import TechnicalTab from "@/components/admin/statistics/TechnicalTab";

const Statistics = () => {
  const [dateRange, setDateRange] = useState("last30days");
  
  // Define colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF5733', '#C70039'];
  
  // Mock visitor data
  const visitorsData = [
    { date: "1 Mai", visitors: 120, pageViews: 540 },
    { date: "2 Mai", visitors: 132, pageViews: 580 },
    { date: "3 Mai", visitors: 101, pageViews: 430 },
    { date: "4 Mai", visitors: 134, pageViews: 590 },
    { date: "5 Mai", visitors: 90, pageViews: 400 },
    { date: "6 Mai", visitors: 110, pageViews: 490 },
    { date: "7 Mai", visitors: 120, pageViews: 528 },
    { date: "8 Mai", visitors: 132, pageViews: 584 },
    { date: "9 Mai", visitors: 131, pageViews: 590 },
    { date: "10 Mai", visitors: 101, pageViews: 430 },
    { date: "11 Mai", visitors: 90, pageViews: 398 },
    { date: "12 Mai", visitors: 148, pageViews: 684 },
    { date: "13 Mai", visitors: 140, pageViews: 650 }
  ];
  
  // Mock sources data
  const sourcesData = [
    { name: "Busca Orgânica", value: 45 },
    { name: "Direto", value: 30 },
    { name: "Redes Sociais", value: 15 },
    { name: "Email", value: 7 },
    { name: "Referência", value: 3 }
  ];
  
  // Mock page data 
  const pagesData = [
    { name: "Página Inicial", views: 2450, avg: "00:02:34" },
    { name: "Quem Somos", views: 1265, avg: "00:01:48" },
    { name: "Áreas de Atuação", views: 980, avg: "00:02:10" },
    { name: "Blog", views: 864, avg: "00:03:22" },
    { name: "Atendimento", views: 742, avg: "00:01:35" },
    { name: "E-books", views: 590, avg: "00:02:05" },
    { name: "Wiki/FAQ", views: 485, avg: "00:02:42" }
  ];
  
  // Mock leads data by area
  const leadsAreaData = [
    { name: "Trabalhista", value: 35 },
    { name: "Empresarial", value: 25 },
    { name: "Civil", value: 20 },
    { name: "Tributário", value: 12 },
    { name: "Imobiliário", value: 8 }
  ];
  
  // Mock conversion data
  const conversionData = [
    { name: "Trabalhista", total: 350, converted: 35 },
    { name: "Empresarial", total: 280, converted: 25 },
    { name: "Civil", total: 220, converted: 20 },
    { name: "Tributário", total: 180, converted: 12 },
    { name: "Imobiliário", total: 120, converted: 8 }
  ];
  
  // Mock devices data
  const devicesData = [
    { name: "Desktop", value: 45 },
    { name: "Mobile", value: 48 },
    { name: "Tablet", value: 7 }
  ];
  
  // Mock browser data
  const browsersData = [
    { name: "Chrome", value: 62 },
    { name: "Safari", value: 19 },
    { name: "Firefox", value: 11 },
    { name: "Edge", value: 6 },
    { name: "Others", value: 2 }
  ];
  
  // Mock e-book downloads
  const ebooksData = [
    { name: "Guia Completo de Direitos Trabalhistas", downloads: 145 },
    { name: "Recuperação de Crédito para Empresas", downloads: 98 },
    { name: "Planejamento Sucessório Familiar", downloads: 87 },
    { name: "Direito Imobiliário na Prática", downloads: 76 },
    { name: "Reforma Tributária e Impactos para Empresas", downloads: 65 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Estatísticas Detalhadas</h1>
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 h-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="visitors">Visitantes</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="technical">Dados Técnicos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-6">
          <OverviewTab 
            visitorsData={visitorsData} 
            sourcesData={sourcesData} 
            pagesData={pagesData} 
            colors={COLORS} 
          />
        </TabsContent>
        
        <TabsContent value="visitors" className="space-y-6 pt-6">
          <VisitorsTab 
            devicesData={devicesData} 
            browsersData={browsersData} 
            colors={COLORS} 
          />
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-6 pt-6">
          <LeadsTab 
            leadsAreaData={leadsAreaData} 
            conversionData={conversionData} 
            colors={COLORS} 
          />
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6 pt-6">
          <ContentTab ebooksData={ebooksData} />
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-6 pt-6">
          <TechnicalTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;

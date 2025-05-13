import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, LineChart, PieChart,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, 
  Bar, Line, Pie, Cell 
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const Statistics = () => {
  const [dateRange, setDateRange] = useState("last30days");
  
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
  
  // Define colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF5733', '#C70039'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Estatísticas Detalhadas</h1>
        
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="thismonth">Este mês</SelectItem>
              <SelectItem value="lastmonth">Mês passado</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          
          <MockActionButton action="Exportar Dados" variant="outline">
            <Download className="mr-2 h-4 w-4" />
          </MockActionButton>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Visitantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,458</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+14%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">685</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+7.4%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.5%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-amber-500">+0.3%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio no Site</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 48s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Tendência de Visitantes</CardTitle>
                <CardDescription>Visitantes por dia nos últimos 14 dias</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  width={500}
                  height={300}
                  data={visitorsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#8884d8" name="Visitantes" />
                  <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" name="Visualizações" />
                </LineChart>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>Origem dos visitantes do site</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart width={500} height={300}>
                  <Pie
                    data={sourcesData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Páginas Mais Visitadas</CardTitle>
                <CardDescription>Total de visualizações por página</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Página</TableHead>
                      <TableHead className="text-right">Visualizações</TableHead>
                      <TableHead className="text-right">Tempo Médio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagesData.map((page, index) => (
                      <TableRow key={index}>
                        <TableCell>{page.name}</TableCell>
                        <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{page.avg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="visitors" className="space-y-6 pt-6">
          {/* Visitor detailed stats would go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
                <CardDescription>Distribuição de visitantes por dispositivo</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart width={500} height={300}>
                  <Pie
                    data={devicesData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {devicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Navegadores</CardTitle>
                <CardDescription>Distribuição de visitantes por navegador</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart width={500} height={300}>
                  <Pie
                    data={browsersData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {browsersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leads por Área Jurídica</CardTitle>
                <CardDescription>Distribuição de leads por especialidade</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart width={500} height={300}>
                  <Pie
                    data={leadsAreaData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {leadsAreaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão por Área</CardTitle>
                <CardDescription>Comparação entre leads e consultas agendadas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  width={500}
                  height={300}
                  data={conversionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total de Leads" />
                  <Bar dataKey="converted" fill="#82ca9d" name="Consultas Agendadas" />
                </BarChart>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Downloads de E-books</CardTitle>
              <CardDescription>Total de downloads por material</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart
                width={800}
                height={300}
                data={ebooksData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="downloads" fill="#8884d8" name="Downloads" />
              </BarChart>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-6 pt-6">
          {/* Technical data would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Performance do Site</CardTitle>
              <CardDescription>Métricas técnicas de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Tempo de Carregamento</span>
                    <span className="text-sm font-medium">2.3s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Bom</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">First Contentful Paint</span>
                    <span className="text-sm font-medium">1.8s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Bom</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Tempo de Interação</span>
                    <span className="text-sm font-medium">3.2s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Precisa melhorar</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Mobile Speed</span>
                    <span className="text-sm font-medium">4.1s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Precisa melhorar</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">SEO Score</span>
                    <span className="text-sm font-medium">87/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Bom</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;

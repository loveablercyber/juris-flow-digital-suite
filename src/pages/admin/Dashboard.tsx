
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, LineChart, PieChart,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, 
  Bar, Line, Pie, Cell 
} from "recharts";
import { BarChart as BarChartIcon, Users, Calendar, TrendingUp } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const Dashboard = () => {
  // Mock data
  const visitorsData = [
    { name: "Jan", value: 400 },
    { name: "Fev", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Abr", value: 800 },
    { name: "Mai", value: 500 },
    { name: "Jun", value: 900 }
  ];
  
  const leadsData = [
    { name: "Jan", value: 240 },
    { name: "Fev", value: 180 },
    { name: "Mar", value: 320 },
    { name: "Abr", value: 400 },
    { name: "Mai", value: 280 },
    { name: "Jun", value: 450 }
  ];
  
  const conversionData = [
    { name: "Jan", Leads: 240, Conversions: 140 },
    { name: "Fev", Leads: 180, Conversions: 90 },
    { name: "Mar", Leads: 320, Conversions: 150 },
    { name: "Abr", Leads: 400, Conversions: 200 },
    { name: "Mai", Leads: 280, Conversions: 120 },
    { name: "Jun", Leads: 450, Conversions: 220 }
  ];
  
  const appointmentsData = [
    { name: "Trabalhista", value: 35 },
    { name: "Empresarial", value: 25 },
    { name: "Civil", value: 20 },
    { name: "Tributário", value: 15 },
    { name: "Imobiliário", value: 5 }
  ];
  
  // KPI cards data
  const kpiCards = [
    {
      title: "Visitantes",
      value: "12,458",
      change: "+14%",
      period: "este mês",
      icon: <BarChartIcon className="h-4 w-4 text-blue-600" />,
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Leads",
      value: "685",
      change: "+7.4%",
      period: "este mês",
      icon: <Users className="h-4 w-4 text-green-600" />,
      color: "border-green-200 bg-green-50"
    },
    {
      title: "Taxa de Conversão",
      value: "32%",
      change: "+4.6%",
      period: "este mês",
      icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
      color: "border-purple-200 bg-purple-50"
    },
    {
      title: "Agendamentos",
      value: "85",
      change: "+12.3%",
      period: "este mês",
      icon: <Calendar className="h-4 w-4 text-orange-600" />,
      color: "border-orange-200 bg-orange-50"
    }
  ];

  // Define colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MockActionButton action="Exportar Relatório" variant="outline" />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index} className={`border ${card.color}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{card.change}</span> {card.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitantes</CardTitle>
            <CardDescription>Total de visitas ao site nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Visitantes" />
            </BarChart>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversão de Leads</CardTitle>
            <CardDescription>Comparação de leads e conversões</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <LineChart
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
              <Line type="monotone" dataKey="Leads" stroke="#8884d8" />
              <Line type="monotone" dataKey="Conversions" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leads por Mês</CardTitle>
            <CardDescription>Total de leads captados mensalmente</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart
              width={500}
              height={300}
              data={leadsData}
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
              <Bar dataKey="value" fill="#82ca9d" name="Leads" />
            </BarChart>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos por Área</CardTitle>
            <CardDescription>Distribuição de agendamentos por área jurídica</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <PieChart width={500} height={300}>
              <Pie
                data={appointmentsData}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {appointmentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>Últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Novo post publicado</p>
                <p className="text-sm text-muted-foreground">Admin publicou "Mudanças na Legislação Trabalhista"</p>
              </div>
              <span className="text-sm text-muted-foreground">2h atrás</span>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Nova consulta agendada</p>
                <p className="text-sm text-muted-foreground">Cliente João Silva agendou para 15/06 às 14h</p>
              </div>
              <span className="text-sm text-muted-foreground">5h atrás</span>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">E-book baixado</p>
                <p className="text-sm text-muted-foreground">"Guia Completo de Direitos Trabalhistas" - 12 downloads</p>
              </div>
              <span className="text-sm text-muted-foreground">1d atrás</span>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Alteração de página</p>
                <p className="text-sm text-muted-foreground">Admin atualizou a página "Quem Somos"</p>
              </div>
              <span className="text-sm text-muted-foreground">2d atrás</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <MockActionButton action="Ver Todos os Logs" variant="outline" className="w-full" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;

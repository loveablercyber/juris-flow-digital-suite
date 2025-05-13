
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatisticCard from "./StatisticCard";
import { 
  LineChart, 
  PieChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  RechartsTooltip, 
  Legend, 
  Line, 
  Pie, 
  Cell 
} from "./chartTypes";

interface OverviewTabProps {
  visitorsData: Array<{ date: string; visitors: number; pageViews: number }>;
  sourcesData: Array<{ name: string; value: number }>;
  pagesData: Array<{ name: string; views: number; avg: string }>;
  colors: string[];
}

const OverviewTab = ({ visitorsData, sourcesData, pagesData, colors }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Total de Visitantes"
          value="12,458"
          change={{ value: "+14%", trend: "up" }}
          subtitle="em relação ao período anterior"
        />
        <StatisticCard
          title="Leads Gerados"
          value="685"
          change={{ value: "+7.4%", trend: "up" }}
          subtitle="em relação ao período anterior"
        />
        <StatisticCard
          title="Taxa de Conversão"
          value="5.5%"
          change={{ value: "+0.3%", trend: "neutral" }}
          subtitle="em relação ao período anterior"
        />
        <StatisticCard
          title="Tempo Médio no Site"
          value="2m 48s"
          change={{ value: "+12%", trend: "up" }}
          subtitle="em relação ao período anterior"
        />
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
              <RechartsTooltip />
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
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `${value}%`} />
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
    </div>
  );
};

export default OverviewTab;

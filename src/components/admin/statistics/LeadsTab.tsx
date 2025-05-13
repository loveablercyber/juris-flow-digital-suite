
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  RechartsTooltip, 
  Cell, 
  RechartsBarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Legend, 
  Bar 
} from "./chartTypes";

interface LeadsTabProps {
  leadsAreaData: Array<{ name: string; value: number }>;
  conversionData: Array<{ name: string; total: number; converted: number }>;
  colors: string[];
}

const LeadsTab = ({ leadsAreaData, conversionData, colors }: LeadsTabProps) => {
  return (
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
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <RechartsTooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Conversão por Área</CardTitle>
          <CardDescription>Comparação entre leads e consultas agendadas</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <RechartsBarChart
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
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Total de Leads" />
            <Bar dataKey="converted" fill="#82ca9d" name="Consultas Agendadas" />
          </RechartsBarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsTab;

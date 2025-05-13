
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, RechartsTooltip, Cell } from "./chartTypes";

interface VisitorsTabProps {
  devicesData: Array<{ name: string; value: number }>;
  browsersData: Array<{ name: string; value: number }>;
  colors: string[];
}

const VisitorsTab = ({ devicesData, browsersData, colors }: VisitorsTabProps) => {
  return (
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
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <RechartsTooltip formatter={(value) => `${value}%`} />
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
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <RechartsTooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorsTab;

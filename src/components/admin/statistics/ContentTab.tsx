
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RechartsBarChart, CartesianGrid, XAxis, YAxis, RechartsTooltip, Legend, Bar } from "./chartTypes";

interface ContentTabProps {
  ebooksData: Array<{ name: string; downloads: number }>;
}

const ContentTab = ({ ebooksData }: ContentTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Downloads de E-books</CardTitle>
        <CardDescription>Total de downloads por material</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <RechartsBarChart
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
          <RechartsTooltip />
          <Legend />
          <Bar dataKey="downloads" fill="#8884d8" name="Downloads" />
        </RechartsBarChart>
      </CardContent>
    </Card>
  );
};

export default ContentTab;

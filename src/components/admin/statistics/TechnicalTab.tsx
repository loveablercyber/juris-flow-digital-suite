
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TechnicalTab = () => {
  return (
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
  );
};

export default TechnicalTab;

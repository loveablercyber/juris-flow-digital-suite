
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardDrive } from "lucide-react";

interface DocumentStatsProps {
  usedStorage: number;
  totalStorage: number;
  usedStoragePercent: number;
  formatBytes: (bytes: number) => string;
  topDocuments: any[];
  getFileIcon: (type: string) => JSX.Element;
}

const DocumentStats: React.FC<DocumentStatsProps> = ({
  usedStorage,
  totalStorage,
  usedStoragePercent,
  formatBytes,
  topDocuments,
  getFileIcon
}) => {
  // Determina a cor da barra de progresso com base na porcentagem de uso
  const getStorageColor = (percent: number) => {
    if (percent < 50) return "bg-emerald-500";
    if (percent < 80) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Espaço de Armazenamento</CardTitle>
        <CardDescription>Utilização do espaço de armazenamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <HardDrive className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Armazenamento</span>
                <span className="text-sm text-muted-foreground">
                  {formatBytes(usedStorage)} / {formatBytes(totalStorage)}
                </span>
              </div>
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full ${getStorageColor(usedStoragePercent)}`} 
                  style={{ width: `${usedStoragePercent}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Documentos</div>
              <div className="text-2xl font-bold">{topDocuments.length}</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Disponível</div>
              <div className="text-2xl font-bold">{formatBytes(totalStorage - usedStorage)}</div>
            </div>
          </div>
          
          {/* Porcentagem por tipo de arquivo */}
          <div className="space-y-3 pt-4">
            <h4 className="text-sm font-medium">Distribuição por tipo</h4>
            
            {["pdf", "word", "image"].map((type) => {
              const typeCount = topDocuments.filter(doc => doc.type === type).length;
              const typePercent = (typeCount / topDocuments.length) * 100 || 0;
              
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground capitalize">{type}</span>
                    <span>{typePercent.toFixed(0)}%</span>
                  </div>
                  <Progress value={typePercent} className="h-1" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentStats;

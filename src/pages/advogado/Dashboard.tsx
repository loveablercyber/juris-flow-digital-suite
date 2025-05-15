
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

const mockProcesses = [
  { id: "2023-0001", client: "Maria Santos", subject: "Divórcio", status: "Em andamento", date: "10/05/2023", urgency: "Alta" },
  { id: "2023-0002", client: "João Pereira", subject: "Pensão Alimentícia", status: "Aguardando documentos", date: "15/05/2023", urgency: "Média" },
  { id: "2023-0003", client: "Ana Oliveira", subject: "Inventário", status: "Concluído", date: "22/05/2023", urgency: "Baixa" },
  { id: "2023-0004", client: "Carlos Silva", subject: "Contrato de Aluguel", status: "Em andamento", date: "01/06/2023", urgency: "Média" },
  { id: "2023-0005", client: "Paula Costa", subject: "Rescisão Trabalhista", status: "Audiência marcada", date: "10/06/2023", urgency: "Alta" },
  { id: "2023-0006", client: "Roberto Alves", subject: "Ação de Despejo", status: "Aguardando documentos", date: "15/06/2023", urgency: "Média" },
  { id: "2023-0007", client: "Fernanda Lima", subject: "Posse de Imóvel", status: "Em andamento", date: "20/06/2023", urgency: "Alta" },
  { id: "2023-0008", client: "Marcelo Gomes", subject: "Reclamação Trabalhista", status: "Concluído", date: "25/06/2023", urgency: "Baixa" },
];

const statusColors: Record<string, string> = {
  "Em andamento": "bg-blue-100 text-blue-800",
  "Aguardando documentos": "bg-yellow-100 text-yellow-800",
  "Concluído": "bg-green-100 text-green-800",
  "Audiência marcada": "bg-purple-100 text-purple-800",
};

const Dashboard = () => {
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProcesses = mockProcesses.filter((process) => {
    const matchesFilter = filter === "Todos" || process.status === filter;
    const matchesSearch = 
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    "Todos": mockProcesses.length,
    "Em andamento": mockProcesses.filter(p => p.status === "Em andamento").length,
    "Aguardando documentos": mockProcesses.filter(p => p.status === "Aguardando documentos").length,
    "Concluído": mockProcesses.filter(p => p.status === "Concluído").length,
    "Audiência marcada": mockProcesses.filter(p => p.status === "Audiência marcada").length,
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard de Processos</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar processo..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Badge variant="outline" className="gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filtrar
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProcesses.length}</div>
            <p className="text-xs text-muted-foreground">Atualizados em tempo real</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProcesses.filter(p => p.status === "Em andamento").length}</div>
            <p className="text-xs text-muted-foreground">Processos ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alta Urgência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mockProcesses.filter(p => p.urgency === "Alta").length}</div>
            <p className="text-xs text-muted-foreground">Processos prioritários</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockProcesses.filter(p => p.status === "Concluído").length}</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Tabs defaultValue="Todos" onValueChange={setFilter}>
          <div className="p-4">
            <TabsList>
              {Object.entries(statusCounts).map(([status, count]) => (
                <TabsTrigger key={status} value={status}>
                  {status} ({count})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={filter} className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Urgência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcesses.length > 0 ? (
                  filteredProcesses.map((process) => (
                    <TableRow key={process.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{process.id}</TableCell>
                      <TableCell>{process.client}</TableCell>
                      <TableCell>{process.subject}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[process.status] || "bg-gray-100 text-gray-800"}`}>
                          {process.status}
                        </span>
                      </TableCell>
                      <TableCell>{process.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(process.urgency)}`}>
                          {process.urgency}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Nenhum processo encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Dashboard;

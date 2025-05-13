import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import MockActionButton from "@/components/admin/MockActionButton";

const LogsActivity = () => {
  const [dateRange, setDateRange] = useState("last30days");
  const [logs, setLogs] = useState([
    { id: 1, user: "Admin", activity: "Criou um novo post no blog", date: "2024-05-03 10:20:30" },
    { id: 2, user: "Usuário 1", activity: "Agendou uma consulta", date: "2024-05-03 09:30:00" },
    { id: 3, user: "Admin", activity: "Editou a página 'Sobre Nós'", date: "2024-05-02 18:45:12" },
    { id: 4, user: "Usuário 2", activity: "Baixou o e-book 'Guia Trabalhista'", date: "2024-05-02 15:10:45" },
    { id: 5, user: "Admin", activity: "Atualizou as configurações do site", date: "2024-05-01 22:00:00" },
  ]);

  useEffect(() => {
    // Mock: Simula a busca de logs de atividade
    // Em um cenário real, você buscaria esses dados de uma API
    const fetchLogs = () => {
      // Simulação de dados de logs
      const mockLogs = [
        { id: 1, user: "Admin", activity: "Criou um novo post no blog", date: "2024-05-03 10:20:30" },
        { id: 2, user: "Usuário 1", activity: "Agendou uma consulta", date: "2024-05-03 09:30:00" },
        { id: 3, user: "Admin", activity: "Editou a página 'Sobre Nós'", date: "2024-05-02 18:45:12" },
        { id: 4, user: "Usuário 2", activity: "Baixou o e-book 'Guia Trabalhista'", date: "2024-05-02 15:10:45" },
        { id: 5, user: "Admin", activity: "Atualizou as configurações do site", date: "2024-05-01 22:00:00" },
      ];
      setLogs(mockLogs);
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Logs de Atividade</h1>
        <MockActionButton action="Exportar Logs" variant="outline" />
      </div>
      
      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Registros</CardTitle>
          <CardDescription>Histórico de atividades dos usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
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
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Atividade</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsActivity;

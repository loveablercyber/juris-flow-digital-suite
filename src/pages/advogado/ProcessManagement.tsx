import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Process {
  id: string;
  numero: string;
  cliente: string;
  tipo: string;
  status: string;
  dataAbertura: string;
  ultimaAtualizacao: string;
}

export default function ProcessManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "1",
      numero: "0001234-12.2024.8.26.0000",
      cliente: "João Silva",
      tipo: "Civil",
      status: "Em andamento",
      dataAbertura: "2024-05-16",
      ultimaAtualizacao: "2024-05-16",
    },
    // Add more sample processes here
  ]);

  const [newProcess, setNewProcess] = useState({
    numero: "",
    cliente: "",
    tipo: "",
    status: "Novo",
  });

  const handleAddProcess = () => {
    const process: Process = {
      id: Math.random().toString(36).substr(2, 9),
      numero: newProcess.numero,
      cliente: newProcess.cliente,
      tipo: newProcess.tipo,
      status: newProcess.status,
      dataAbertura: new Date().toISOString().split("T")[0],
      ultimaAtualizacao: new Date().toISOString().split("T")[0],
    };

    setProcesses([...processes, process]);
    setNewProcess({ numero: "", cliente: "", tipo: "", status: "Novo" });
  };

  const filteredProcesses = processes.filter((process) =>
    Object.values(process).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Processos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Processo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Processo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="numero">Número do Processo</Label>
                <Input
                  id="numero"
                  value={newProcess.numero}
                  onChange={(e) =>
                    setNewProcess({ ...newProcess, numero: e.target.value })
                  }
                  placeholder="0000000-00.0000.0.00.0000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  value={newProcess.cliente}
                  onChange={(e) =>
                    setNewProcess({ ...newProcess, cliente: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Processo</Label>
                <Input
                  id="tipo"
                  value={newProcess.tipo}
                  onChange={(e) =>
                    setNewProcess({ ...newProcess, tipo: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddProcess}>Adicionar Processo</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar processos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número do Processo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Abertura</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell>{process.numero}</TableCell>
                  <TableCell>{process.cliente}</TableCell>
                  <TableCell>{process.tipo}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        process.status === "Em andamento"
                          ? "default"
                          : process.status === "Concluído"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {process.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{process.dataAbertura}</TableCell>
                  <TableCell>{process.ultimaAtualizacao}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

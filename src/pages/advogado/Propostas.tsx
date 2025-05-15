
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  FileText,
  Send,
  FileEdit,
  Eye,
  Download,
  CheckCircle,
  Clock,
  CircleX
} from "lucide-react";

type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
};

type Proposta = {
  id: string;
  titulo: string;
  clienteId: string;
  valor: string;
  prazo: string;
  descricao: string;
  status: "rascunho" | "enviada" | "aceita" | "recusada";
  dataEnvio: string | null;
};

// Mock data
const mockClientes: Cliente[] = [
  { id: "1", nome: "Maria Santos", email: "maria@example.com", telefone: "(11) 98765-4321" },
  { id: "2", nome: "João Pereira", email: "joao@example.com", telefone: "(11) 91234-5678" },
  { id: "3", nome: "Ana Oliveira", email: "ana@example.com", telefone: "(11) 92345-6789" },
  { id: "4", nome: "Carlos Silva", email: "carlos@example.com", telefone: "(11) 93456-7890" },
  { id: "5", nome: "Paula Costa", email: "paula@example.com", telefone: "(11) 94567-8901" },
];

const mockPropostas: Proposta[] = [
  {
    id: "1",
    titulo: "Contrato de prestação de serviços jurídicos",
    clienteId: "1",
    valor: "R$ 3.500,00",
    prazo: "30 dias",
    descricao: "Elaboração de contrato de prestação de serviços jurídicos para a empresa do cliente.",
    status: "enviada",
    dataEnvio: "2025-05-10"
  },
  {
    id: "2",
    titulo: "Consultoria jurídica empresarial",
    clienteId: "2",
    valor: "R$ 5.000,00",
    prazo: "45 dias",
    descricao: "Consultoria jurídica mensal para empresa de médio porte.",
    status: "aceita",
    dataEnvio: "2025-05-05"
  },
  {
    id: "3",
    titulo: "Representação em processo trabalhista",
    clienteId: "3",
    valor: "R$ 4.200,00",
    prazo: "60 dias",
    descricao: "Representação legal em processo trabalhista em andamento.",
    status: "recusada",
    dataEnvio: "2025-04-28"
  },
  {
    id: "4",
    titulo: "Elaboração de contrato de locação",
    clienteId: "4",
    valor: "R$ 1.800,00",
    prazo: "15 dias",
    descricao: "Elaboração e revisão de contrato de locação comercial.",
    status: "rascunho",
    dataEnvio: null
  },
];

const Propostas = () => {
  const [propostas, setPropostas] = useState<Proposta[]>(mockPropostas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentProposta, setCurrentProposta] = useState<Proposta>({
    id: "",
    titulo: "",
    clienteId: "",
    valor: "",
    prazo: "",
    descricao: "",
    status: "rascunho",
    dataEnvio: null
  });

  const handleNovaProposta = () => {
    setIsViewMode(false);
    setCurrentProposta({
      id: "",
      titulo: "",
      clienteId: "",
      valor: "",
      prazo: "",
      descricao: "",
      status: "rascunho",
      dataEnvio: null
    });
    setIsDialogOpen(true);
  };

  const handleVerProposta = (proposta: Proposta) => {
    setIsViewMode(true);
    setCurrentProposta(proposta);
    setIsDialogOpen(true);
  };

  const handleEditarProposta = (proposta: Proposta) => {
    setIsViewMode(false);
    setCurrentProposta(proposta);
    setIsDialogOpen(true);
  };

  const handleSalvarProposta = () => {
    if (!currentProposta.titulo || !currentProposta.clienteId || !currentProposta.valor || !currentProposta.prazo) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (currentProposta.id) {
      // Atualizar proposta existente
      setPropostas(propostas.map(p => 
        p.id === currentProposta.id ? currentProposta : p
      ));
      toast({
        title: "Proposta atualizada",
        description: "A proposta foi atualizada com sucesso"
      });
    } else {
      // Adicionar nova proposta
      const novaProposta: Proposta = {
        ...currentProposta,
        id: Date.now().toString(),
        status: "rascunho",
        dataEnvio: null
      };
      setPropostas([...propostas, novaProposta]);
      toast({
        title: "Proposta criada",
        description: "A proposta foi salva como rascunho"
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleEnviarProposta = (propostaId: string) => {
    setPropostas(propostas.map(p => 
      p.id === propostaId 
        ? { ...p, status: "enviada" as const, dataEnvio: new Date().toISOString().split('T')[0] } 
        : p
    ));
    
    toast({
      title: "Proposta enviada",
      description: "A proposta foi enviada para o cliente com sucesso"
    });
    
    setIsDialogOpen(false);
  };

  // Helpers
  const getClienteNome = (clienteId: string) => {
    return mockClientes.find(c => c.id === clienteId)?.nome || "Cliente não encontrado";
  };

  const getStatusBadge = (status: Proposta['status']) => {
    switch (status) {
      case 'rascunho':
        return <Badge variant="outline" className="bg-gray-100">Rascunho</Badge>;
      case 'enviada':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Enviada</Badge>;
      case 'aceita':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Aceita</Badge>;
      case 'recusada':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Recusada</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: Proposta['status']) => {
    switch (status) {
      case 'rascunho':
        return <FileEdit className="h-4 w-4 text-gray-500" />;
      case 'enviada':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'aceita':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'recusada':
        return <CircleX className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Propostas para Clientes</h1>
        <Button onClick={handleNovaProposta}>
          <FileText className="mr-2 h-4 w-4" />
          Nova Proposta
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Propostas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propostas.length > 0 ? (
                propostas.map(proposta => (
                  <TableRow key={proposta.id}>
                    <TableCell>
                      {getStatusIcon(proposta.status)}
                    </TableCell>
                    <TableCell className="font-medium">{proposta.titulo}</TableCell>
                    <TableCell>{getClienteNome(proposta.clienteId)}</TableCell>
                    <TableCell>{proposta.valor}</TableCell>
                    <TableCell>{getStatusBadge(proposta.status)}</TableCell>
                    <TableCell>{proposta.dataEnvio || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleVerProposta(proposta)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {proposta.status === "rascunho" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditarProposta(proposta)}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600"
                              onClick={() => handleEnviarProposta(proposta.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {proposta.status === "enviada" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Nenhuma proposta encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para criar/editar/visualizar propostas */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isViewMode 
                ? "Detalhes da Proposta"
                : currentProposta.id 
                  ? "Editar Proposta"
                  : "Nova Proposta"
              }
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Título*</Label>
              <Input
                id="titulo"
                value={currentProposta.titulo}
                onChange={(e) => setCurrentProposta({...currentProposta, titulo: e.target.value})}
                disabled={isViewMode}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cliente">Cliente*</Label>
              <Select
                value={currentProposta.clienteId}
                onValueChange={(value) => setCurrentProposta({...currentProposta, clienteId: value})}
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {mockClientes.map(cliente => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="valor">Valor*</Label>
                <Input
                  id="valor"
                  value={currentProposta.valor}
                  onChange={(e) => setCurrentProposta({...currentProposta, valor: e.target.value})}
                  placeholder="R$ 0,00"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prazo">Prazo*</Label>
                <Input
                  id="prazo"
                  value={currentProposta.prazo}
                  onChange={(e) => setCurrentProposta({...currentProposta, prazo: e.target.value})}
                  placeholder="30 dias"
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição detalhada dos serviços</Label>
              <Textarea
                id="descricao"
                rows={5}
                value={currentProposta.descricao}
                onChange={(e) => setCurrentProposta({...currentProposta, descricao: e.target.value})}
                disabled={isViewMode}
              />
            </div>

            {isViewMode && currentProposta.status !== "rascunho" && (
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium">Status:</p>
                  {getStatusBadge(currentProposta.status)}
                </div>
                <p><span className="font-medium">Data de envio:</span> {currentProposta.dataEnvio || "Não enviada"}</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {isViewMode ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Fechar
                </Button>
                {currentProposta.status === "enviada" && (
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSalvarProposta}>
                  Salvar como Rascunho
                </Button>
                <Button 
                  onClick={() => {
                    if (currentProposta.id) {
                      handleEnviarProposta(currentProposta.id);
                    } else {
                      handleSalvarProposta();
                      // Precisamos do ID que foi gerado no salvar
                      setTimeout(() => {
                        const novaProposta = propostas[propostas.length - 1];
                        handleEnviarProposta(novaProposta.id);
                      }, 100);
                    }
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Gerar Proposta
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Propostas;

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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface Process {
  // Informações Gerais
  id: string;
  numero: string;
  tipo: string;
  areaDireito: string;
  descricao: string;
  clientes: string[];
  parteContraria: string;
  advogadosResponsaveis: string[];

  // Informações Judiciais
  tribunal: string;
  varaComarca: string;
  estado: string;
  cidade: string;
  numeroOAB: string;
  juizRelator: string;
  instancia: string;
  status: string;
  classeProcessual: string;

  // Datas Importantes
  dataAbertura: string;
  ultimaAtualizacao: string;
  prazosVencimentos: Array<{data: string; descricao: string}>;
  dataProximaAudiencia: string;
  dataDistribuicao: string;

  // Documentos & Provas
  documentos: Array<{
    tipo: string;
    descricao: string;
    arquivo: string;
    tags: string[];
  }>;

  // Envolvidos
  partes: Array<{
    tipo: string;
    nome: string;
    papel: string;
  }>;
  testemunhas: Array<{
    nome: string;
    contato: string;
  }>;
  peritos: string[];

  // Observações Internas
  observacoes: string;
  checklist: Array<{
    item: string;
    concluido: boolean;
  }>;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  emergenciaJuridica: boolean;

  // Configurações Adicionais
  tarefaVinculada?: string;
  contratoDigital?: string;
  permissoes: Array<{
    usuario: string;
    tipo: 'visualizar' | 'editar';
  }>;
  integracoes: {
    esaj?: boolean;
    projudi?: boolean;
    pje?: boolean;
  };
}

export default function ProcessManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "1",
      numero: "0001234-12.2024.8.26.0000",
      tipo: "Civil",
      areaDireito: "Direito Civil",
      descricao: "Ação de cobrança",
      clientes: ["João Silva"],
      parteContraria: "Maria Souza",
      advogadosResponsaveis: ["Dr. Pedro"],
      tribunal: "TJSP",
      varaComarca: "Comarca de São Paulo",
      estado: "SP",
      cidade: "São Paulo",
      numeroOAB: "123456/SP",
      juizRelator: "Dr. José",
      instancia: "1ª Instância",
      status: "Em andamento",
      classeProcessual: "Ação de Cobrança",
      dataAbertura: "2024-05-16",
      ultimaAtualizacao: "2024-05-16",
      prazosVencimentos: [{ data: "2024-06-16", descricao: "Prazo para contestação" }],
      dataProximaAudiencia: "2024-07-16",
      dataDistribuicao: "2024-05-16",
      documentos: [
        {
          tipo: "Petição Inicial",
          descricao: "Petição inicial do processo",
          arquivo: "peticao_inicial.pdf",
          tags: ["inicial", "cobrança"],
        },
      ],
      partes: [
        {
          tipo: "Autor",
          nome: "João Silva",
          papel: "Requerente",
        },
        {
          tipo: "Réu",
          nome: "Maria Souza",
          papel: "Requerida",
        },
      ],
      testemunhas: [
        {
          nome: "Carlos Pereira",
          contato: "carlos@example.com",
        },
      ],
      peritos: ["Dr. Ana"],
      observacoes: "Processo prioritário",
      checklist: [
        {
          item: "Enviar notificação",
          concluido: false,
        },
      ],
      prioridade: "alta",
      emergenciaJuridica: false,
      tarefaVinculada: "Tarefa 1",
      contratoDigital: "contrato.pdf",
      permissoes: [
        {
          usuario: "advogado1",
          tipo: "visualizar",
        },
      ],
      integracoes: {
        esaj: true,
        projudi: false,
        pje: true,
      },
    },
    // Add more sample processes here
  ]);

  const [newProcess, setNewProcess] = useState({
    numero: "",
    tipo: "",
    areaDireito: "",
    descricao: "",
    clientes: [""],
    parteContraria: "",
    advogadosResponsaveis: [""],
    tribunal: "",
    varaComarca: "",
    estado: "",
    cidade: "",
    numeroOAB: "",
    juizRelator: "",
    instancia: "",
    status: "Novo",
    classeProcessual: "",
    dataAbertura: "",
    ultimaAtualizacao: "",
    prazosVencimentos: [{ data: "", descricao: "" }],
    dataProximaAudiencia: "",
    dataDistribuicao: "",
    documentos: [{ tipo: "", descricao: "", arquivo: "", tags: [""] }],
    partes: [{ tipo: "", nome: "", papel: "" }],
    testemunhas: [{ nome: "", contato: "" }],
    peritos: [""],
    observacoes: "",
    checklist: [{ item: "", concluido: false }],
    prioridade: "baixa",
    emergenciaJuridica: false,
    tarefaVinculada: "",
    contratoDigital: "",
    permissoes: [{ usuario: "", tipo: "visualizar" }],
    integracoes: { esaj: false, projudi: false, pje: false },
  });

  const handleAddProcess = () => {
    const process: Process = {
      id: Math.random().toString(36).substr(2, 9),
      numero: newProcess.numero,
      tipo: newProcess.tipo,
      areaDireito: newProcess.areaDireito,
      descricao: newProcess.descricao,
      clientes: newProcess.clientes,
      parteContraria: newProcess.parteContraria,
      advogadosResponsaveis: newProcess.advogadosResponsaveis,
      tribunal: newProcess.tribunal,
      varaComarca: newProcess.varaComarca,
      estado: newProcess.estado,
      cidade: newProcess.cidade,
      numeroOAB: newProcess.numeroOAB,
      juizRelator: newProcess.juizRelator,
      instancia: newProcess.instancia,
      status: newProcess.status,
      classeProcessual: newProcess.classeProcessual,
      dataAbertura: new Date().toISOString().split("T")[0],
      ultimaAtualizacao: new Date().toISOString().split("T")[0],
      prazosVencimentos: newProcess.prazosVencimentos,
      dataProximaAudiencia: newProcess.dataProximaAudiencia,
      dataDistribuicao: newProcess.dataDistribuicao,
      documentos: newProcess.documentos,
      partes: newProcess.partes,
      testemunhas: newProcess.testemunhas,
      peritos: newProcess.peritos,
      observacoes: newProcess.observacoes,
      checklist: newProcess.checklist,
      prioridade: newProcess.prioridade,
      emergenciaJuridica: newProcess.emergenciaJuridica,
      tarefaVinculada: newProcess.tarefaVinculada,
      contratoDigital: newProcess.contratoDigital,
      permissoes: newProcess.permissoes,
      integracoes: newProcess.integracoes,
    };

    setProcesses([...processes, process]);
    setNewProcess({
      numero: "",
      tipo: "",
      areaDireito: "",
      descricao: "",
      clientes: [""],
      parteContraria: "",
      advogadosResponsaveis: [""],
      tribunal: "",
      varaComarca: "",
      estado: "",
      cidade: "",
      numeroOAB: "",
      juizRelator: "",
      instancia: "",
      status: "Novo",
      classeProcessual: "",
      dataAbertura: "",
      ultimaAtualizacao: "",
      prazosVencimentos: [{ data: "", descricao: "" }],
      dataProximaAudiencia: "",
      dataDistribuicao: "",
      documentos: [{ tipo: "", descricao: "", arquivo: "", tags: [""] }],
      partes: [{ tipo: "", nome: "", papel: "" }],
      testemunhas: [{ nome: "", contato: "" }],
      peritos: [""],
      observacoes: "",
      checklist: [{ item: "", concluido: false }],
      prioridade: "baixa",
      emergenciaJuridica: false,
      tarefaVinculada: "",
      contratoDigital: "",
      permissoes: [{ usuario: "", tipo: "visualizar" }],
      integracoes: { esaj: false, projudi: false, pje: false },
    });
  };

  const filteredProcesses = processes.filter((process) =>
    Object.values(process).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Processo</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="geral">📌 Geral</TabsTrigger>
                <TabsTrigger value="judicial">🏛️ Judicial</TabsTrigger>
                <TabsTrigger value="datas">🗓️ Datas</TabsTrigger>
                <TabsTrigger value="documentos">📎 Documentos</TabsTrigger>
                <TabsTrigger value="envolvidos">👥 Envolvidos</TabsTrigger>
                <TabsTrigger value="observacoes">📝 Observações</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="numero" className="font-semibold">Número do Processo*</Label>
                    <Input
                      id="numero"
                      value={newProcess.numero}
                      onChange={(e) => setNewProcess({ ...newProcess, numero: e.target.value })}
                      placeholder="0000000-00.0000.0.00.0000"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tipo" className="font-semibold">Tipo de Processo*</Label>
                    <Select value={newProcess.tipo} onValueChange={(value) => setNewProcess({ ...newProcess, tipo: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="civil">Cível</SelectItem>
                        <SelectItem value="criminal">Criminal</SelectItem>
                        <SelectItem value="trabalhista">Trabalhista</SelectItem>
                        <SelectItem value="previdenciario">Previdenciário</SelectItem>
                        <SelectItem value="tributario">Tributário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="areaDireito" className="font-semibold">Área do Direito*</Label>
                    <Select value={newProcess.areaDireito} onValueChange={(value) => setNewProcess({ ...newProcess, areaDireito: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="familia">Família</SelectItem>
                        <SelectItem value="empresarial">Empresarial</SelectItem>
                        <SelectItem value="consumidor">Consumidor</SelectItem>
                        <SelectItem value="tributario">Tributário</SelectItem>
                        <SelectItem value="imobiliario">Imobiliário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="descricao" className="font-semibold">Descrição Resumida*</Label>
                    <Textarea
                      id="descricao"
                      value={newProcess.descricao}
                      onChange={(e) => setNewProcess({ ...newProcess, descricao: e.target.value })}
                      placeholder="Descreva brevemente o caso"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="clientes" className="font-semibold">Cliente(s)*</Label>
                    <Input
                      id="clientes"
                      value={newProcess.clientes[0]}
                      onChange={(e) => setNewProcess({ ...newProcess, clientes: [e.target.value] })}
                      placeholder="Nome do cliente principal"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="parteContraria" className="font-semibold">Parte Contrária</Label>
                    <Input
                      id="parteContraria"
                      value={newProcess.parteContraria}
                      onChange={(e) => setNewProcess({ ...newProcess, parteContraria: e.target.value })}
                      placeholder="Nome da parte contrária"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="advogadosResponsaveis" className="font-semibold">Advogado(s) Responsável(eis)*</Label>
                    <Input
                      id="advogadosResponsaveis"
                      value={newProcess.advogadosResponsaveis[0]}
                      onChange={(e) => setNewProcess({ ...newProcess, advogadosResponsaveis: [e.target.value] })}
                      placeholder="Nome do advogado responsável"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="judicial" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tribunal" className="font-semibold">Tribunal*</Label>
                    <Select value={newProcess.tribunal} onValueChange={(value) => setNewProcess({ ...newProcess, tribunal: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tribunal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tjsp">TJSP</SelectItem>
                        <SelectItem value="tjrj">TJRJ</SelectItem>
                        <SelectItem value="tjmg">TJMG</SelectItem>
                        <SelectItem value="trf3">TRF-3</SelectItem>
                        <SelectItem value="tst">TST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="estado" className="font-semibold">Estado*</Label>
                      <Select value={newProcess.estado} onValueChange={(value) => setNewProcess({ ...newProcess, estado: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="cidade" className="font-semibold">Cidade*</Label>
                      <Input
                        id="cidade"
                        value={newProcess.cidade}
                        onChange={(e) => setNewProcess({ ...newProcess, cidade: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="varaComarca" className="font-semibold">Vara/Comarca*</Label>
                    <Input
                      id="varaComarca"
                      value={newProcess.varaComarca}
                      onChange={(e) => setNewProcess({ ...newProcess, varaComarca: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="numeroOAB" className="font-semibold">Número OAB*</Label>
                    <Input
                      id="numeroOAB"
                      value={newProcess.numeroOAB}
                      onChange={(e) => setNewProcess({ ...newProcess, numeroOAB: e.target.value })}
                      placeholder="000000/UF"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="juizRelator" className="font-semibold">Juiz/Relator</Label>
                    <Input
                      id="juizRelator"
                      value={newProcess.juizRelator}
                      onChange={(e) => setNewProcess({ ...newProcess, juizRelator: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="instancia" className="font-semibold">Instância*</Label>
                    <Select value={newProcess.instancia} onValueChange={(value) => setNewProcess({ ...newProcess, instancia: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a instância" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1ª Instância</SelectItem>
                        <SelectItem value="2">2ª Instância</SelectItem>
                        <SelectItem value="superior">Superior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="classeProcessual" className="font-semibold">Classe Processual*</Label>
                    <Input
                      id="classeProcessual"
                      value={newProcess.classeProcessual}
                      onChange={(e) => setNewProcess({ ...newProcess, classeProcessual: e.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="datas" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dataDistribuicao" className="font-semibold">Data de Distribuição*</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newProcess.dataDistribuicao && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newProcess.dataDistribuicao ? format(new Date(newProcess.dataDistribuicao), "PP") : <span>Selecione a data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newProcess.dataDistribuicao ? new Date(newProcess.dataDistribuicao) : undefined}
                          onSelect={(date) => setNewProcess({ ...newProcess, dataDistribuicao: date ? date.toISOString().split('T')[0] : '' })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dataProximaAudiencia" className="font-semibold">Data da Próxima Audiência</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newProcess.dataProximaAudiencia && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newProcess.dataProximaAudiencia ? format(new Date(newProcess.dataProximaAudiencia), "PP") : <span>Selecione a data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newProcess.dataProximaAudiencia ? new Date(newProcess.dataProximaAudiencia) : undefined}
                          onSelect={(date) => setNewProcess({ ...newProcess, dataProximaAudiencia: date ? date.toISOString().split('T')[0] : '' })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentos" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Documentos Iniciais</h3>
                    {newProcess.documentos.map((doc, index) => (
                      <div key={index} className="grid gap-4 mb-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`docTipo${index}`} className="font-semibold">Tipo de Documento</Label>
                          <Select 
                            value={doc.tipo} 
                            onValueChange={(value) => {
                              const updatedDocs = [...newProcess.documentos];
                              updatedDocs[index] = { ...doc, tipo: value };
                              setNewProcess({ ...newProcess, documentos: updatedDocs });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="peticao">Petição</SelectItem>
                              <SelectItem value="procuracao">Procuração</SelectItem>
                              <SelectItem value="contrato">Contrato</SelectItem>
                              <SelectItem value="documento">Documento</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor={`docDesc${index}`} className="font-semibold">Descrição</Label>
                          <Input
                            id={`docDesc${index}`}
                            value={doc.descricao}
                            onChange={(e) => {
                              const updatedDocs = [...newProcess.documentos];
                              updatedDocs[index] = { ...doc, descricao: e.target.value };
                              setNewProcess({ ...newProcess, documentos: updatedDocs });
                            }}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor={`docFile${index}`} className="font-semibold">Arquivo</Label>
                          <Input
                            id={`docFile${index}`}
                            type="file"
                            onChange={(e) => {
                              const updatedDocs = [...newProcess.documentos];
                              updatedDocs[index] = { ...doc, arquivo: e.target.files?.[0]?.name || "" };
                              setNewProcess({ ...newProcess, documentos: updatedDocs });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setNewProcess({
                        ...newProcess,
                        documentos: [...newProcess.documentos, { tipo: "", descricao: "", arquivo: "", tags: [] }]
                      })}
                    >
                      + Adicionar Documento
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="envolvidos" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Partes do Processo</h3>
                    {newProcess.partes.map((parte, index) => (
                      <div key={index} className="grid gap-4 mb-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`parteTipo${index}`} className="font-semibold">Tipo</Label>
                          <Select
                            value={parte.tipo}
                            onValueChange={(value) => {
                              const updatedPartes = [...newProcess.partes];
                              updatedPartes[index] = { ...parte, tipo: value };
                              setNewProcess({ ...newProcess, partes: updatedPartes });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="autor">Autor</SelectItem>
                              <SelectItem value="reu">Réu</SelectItem>
                              <SelectItem value="terceiro">Terceiro Interessado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor={`parteNome${index}`} className="font-semibold">Nome</Label>
                          <Input
                            id={`parteNome${index}`}
                            value={parte.nome}
                            onChange={(e) => {
                              const updatedPartes = [...newProcess.partes];
                              updatedPartes[index] = { ...parte, nome: e.target.value };
                              setNewProcess({ ...newProcess, partes: updatedPartes });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setNewProcess({
                        ...newProcess,
                        partes: [...newProcess.partes, { tipo: "", nome: "", papel: "" }]
                      })}
                    >
                      + Adicionar Parte
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Testemunhas</h3>
                    {newProcess.testemunhas.map((testemunha, index) => (
                      <div key={index} className="grid gap-4 mb-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`testNome${index}`} className="font-semibold">Nome</Label>
                          <Input
                            id={`testNome${index}`}
                            value={testemunha.nome}
                            onChange={(e) => {
                              const updatedTest = [...newProcess.testemunhas];
                              updatedTest[index] = { ...testemunha, nome: e.target.value };
                              setNewProcess({ ...newProcess, testemunhas: updatedTest });
                            }}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor={`testContato${index}`} className="font-semibold">Contato</Label>
                          <Input
                            id={`testContato${index}`}
                            value={testemunha.contato}
                            onChange={(e) => {
                              const updatedTest = [...newProcess.testemunhas];
                              updatedTest[index] = { ...testemunha, contato: e.target.value };
                              setNewProcess({ ...newProcess, testemunhas: updatedTest });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setNewProcess({
                        ...newProcess,
                        testemunhas: [...newProcess.testemunhas, { nome: "", contato: "" }]
                      })}
                    >
                      + Adicionar Testemunha
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="observacoes" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="observacoes" className="font-semibold">Observações Internas</Label>
                    <Textarea
                      id="observacoes"
                      value={newProcess.observacoes}
                      onChange={(e) => setNewProcess({ ...newProcess, observacoes: e.target.value })}
                      placeholder="Anotações privadas sobre o processo"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label className="font-semibold">Checklist</Label>
                    {newProcess.checklist.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={item.item}
                          onChange={(e) => {
                            const updatedChecklist = [...newProcess.checklist];
                            updatedChecklist[index] = { ...item, item: e.target.value };
                            setNewProcess({ ...newProcess, checklist: updatedChecklist });
                          }}
                          placeholder="Item do checklist"
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setNewProcess({
                        ...newProcess,
                        checklist: [...newProcess.checklist, { item: "", concluido: false }]
                      })}
                    >
                      + Adicionar Item
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="prioridade" className="font-semibold">Nível de Prioridade</Label>
                    <Select value={newProcess.prioridade} onValueChange={(value: 'baixa' | 'media' | 'alta' | 'urgente') => setNewProcess({ ...newProcess, prioridade: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setNewProcess({
                numero: "",
                tipo: "",
                areaDireito: "",
                descricao: "",
                clientes: [""],
                parteContraria: "",
                advogadosResponsaveis: [""],
                tribunal: "",
                varaComarca: "",
                estado: "",
                cidade: "",
                numeroOAB: "",
                juizRelator: "",
                instancia: "",
                status: "Novo",
                classeProcessual: "",
                dataAbertura: "",
                ultimaAtualizacao: "",
                prazosVencimentos: [{ data: "", descricao: "" }],
                dataProximaAudiencia: "",
                dataDistribuicao: "",
                documentos: [{ tipo: "", descricao: "", arquivo: "", tags: [""] }],
                partes: [{ tipo: "", nome: "", papel: "" }],
                testemunhas: [{ nome: "", contato: "" }],
                peritos: [""],
                observacoes: "",
                checklist: [{ item: "", concluido: false }],
                prioridade: "baixa",
                emergenciaJuridica: false,
                tarefaVinculada: "",
                contratoDigital: "",
                permissoes: [{ usuario: "", tipo: "visualizar" }],
                integracoes: { esaj: false, projudi: false, pje: false },
              })}>
                Limpar
              </Button>
              <Button onClick={handleAddProcess}>Cadastrar Processo</Button>
            </DialogFooter>
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
                  <TableCell>{process.clientes.join(", ")}</TableCell>
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

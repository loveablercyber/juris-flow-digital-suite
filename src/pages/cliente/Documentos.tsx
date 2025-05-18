import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Search, Filter, File, FileImage } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Documento {
  id: number;
  nome: string;
  tipo: string;
  data: string;
  status: string;
  processo?: string;
  categoria: string;
  descricao?: string;
  tamanho?: string;
  advogado?: string;
}

interface Advogado {
  id: number;
  nome: string;
  especialidade: string;
}

const Documentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Documento | null>(null);
  const [uploadDetails, setUploadDetails] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    file: null as File | null,
    advogado: ""
  });

  // Dados mockados
  const documentos: Documento[] = [
    {
      id: 1,
      nome: "Contrato de Prestação de Serviços",
      tipo: "PDF",
      data: "15/03/2024",
      status: "Ativo",
      categoria: "contratos",
      descricao: "Contrato padrão de prestação de serviços advocatícios.",
      tamanho: "456 KB",
      advogado: "Dra. Ana Silva"
    },
    {
      id: 2,
      nome: "RG Digitalizado",
      tipo: "Imagem",
      data: "15/03/2024",
      status: "Ativo",
      categoria: "pessoal",
      descricao: "Cópia digitalizada do RG do cliente.",
      tamanho: "234 KB",
      advogado: "Dr. Carlos Oliveira"
    },
    {
      id: 3,
      nome: "Petição Inicial - Processo 123",
      tipo: "PDF",
      data: "20/03/2024",
      status: "Ativo",
      processo: "0001234-56.2024.8.26.0100",
      categoria: "processos",
      descricao: "Petição inicial para processo de indenização por danos morais.",
      tamanho: "345 KB",
      advogado: "Dra. Mariana Santos"
    }
  ];

  const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "contratos", nome: "Contratos" },
    { id: "pessoal", nome: "Documentos Pessoais" },
    { id: "processos", nome: "Processos" }
  ];

  const advogados: Advogado[] = [
    { id: 1, nome: "Dra. Ana Silva", especialidade: "Direito Civil" },
    { id: 2, nome: "Dr. Carlos Oliveira", especialidade: "Direito Trabalhista" },
    { id: 3, nome: "Dra. Mariana Santos", especialidade: "Direito Tributário" },
    { id: 4, nome: "Dr. Rafael Costa", especialidade: "Direito Empresarial" },
    { id: 5, nome: "Dra. Juliana Ferreira", especialidade: "Direito de Família" }
  ];

  const filteredDocumentos = documentos.filter(doc => {
    const matchesSearch = doc.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || doc.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "imagem":
        return <FileImage className="h-8 w-8 text-blue-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadDetails({
        ...uploadDetails,
        nome: file.name,
        file: file
      });
    }
  };

  const handleUpload = () => {
    if (!uploadDetails.nome || !uploadDetails.categoria || !uploadDetails.advogado) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    // Simulação de upload
    toast({
      title: "Documento enviado",
      description: `O documento foi enviado com sucesso para ${uploadDetails.advogado}`
    });
    
    setIsUploadDialogOpen(false);
    setUploadDetails({
      nome: "",
      categoria: "",
      descricao: "",
      file: null,
      advogado: ""
    });
  };

  const handleViewDetails = (doc: Documento) => {
    setSelectedDocument(doc);
    setIsDetailsDrawerOpen(true);
  };

  const handleDownload = (doc: Documento) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${doc.nome}...`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documentos</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Enviar Documento
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList>
          {categorias.map((categoria) => (
            <TabsTrigger
              key={categoria.id}
              value={categoria.id}
              onClick={() => setSelectedCategory(categoria.id)}
            >
              {categoria.nome}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocumentos.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getFileIcon(doc.tipo)}
                      <div>
                        <p className="font-medium">{doc.nome}</p>
                        <p className="text-sm text-gray-500">
                          {doc.data} • {doc.tipo}
                        </p>
                        {doc.processo && (
                          <p className="text-sm text-gray-500">
                            Processo: {doc.processo}
                          </p>
                        )}
                        {doc.advogado && (
                          <p className="text-sm text-gray-500">
                            Advogado: {doc.advogado}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline">{doc.status}</Badge>
                    <Button variant="link" size="sm" onClick={() => handleViewDetails(doc)}>
                      Ver detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo de Upload de Documento */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Novo Documento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="file">Arquivo*</Label>
              <Input 
                id="file" 
                type="file" 
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria*</Label>
              <Select 
                value={uploadDetails.categoria} 
                onValueChange={(value) => setUploadDetails({...uploadDetails, categoria: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.filter(cat => cat.id !== "todos").map(categoria => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="advogado">Advogado Responsável*</Label>
              <Select 
                value={uploadDetails.advogado} 
                onValueChange={(value) => setUploadDetails({...uploadDetails, advogado: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um advogado" />
                </SelectTrigger>
                <SelectContent>
                  {advogados.map(advogado => (
                    <SelectItem key={advogado.id} value={advogado.nome}>
                      {advogado.nome} - {advogado.especialidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                placeholder="Adicione uma descrição para o documento"
                value={uploadDetails.descricao}
                onChange={(e) => setUploadDetails({...uploadDetails, descricao: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drawer de Detalhes do Documento */}
      {selectedDocument && (
        <Drawer open={isDetailsDrawerOpen} onOpenChange={setIsDetailsDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalhes do Documento</DrawerTitle>
              <DrawerDescription>Informações completas sobre o documento</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-muted rounded-md mr-4">
                  {getFileIcon(selectedDocument.tipo)}
                </div>
                <div>
                  <h3 className="font-medium">{selectedDocument.nome}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDocument.tamanho || "Tamanho não disponível"}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm text-muted-foreground">
                      {categorias.find(c => c.id === selectedDocument.categoria)?.nome || selectedDocument.categoria}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.status}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.data}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tipo</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.tipo}</p>
                  </div>
                </div>
                
                {selectedDocument.advogado && (
                  <div>
                    <p className="text-sm font-medium">Advogado Responsável</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.advogado}</p>
                  </div>
                )}
                
                {selectedDocument.processo && (
                  <div>
                    <p className="text-sm font-medium">Processo</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.processo}</p>
                  </div>
                )}
                
                {selectedDocument.descricao && (
                  <div>
                    <p className="text-sm font-medium">Descrição</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.descricao}</p>
                  </div>
                )}
              </div>
            </div>
            <DrawerFooter>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Documentos; 

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { 
  Upload, 
  Download, 
  Plus, 
  MoreVertical, 
  FileText,
  File,
  FileIcon,
  FileImage,
  Trash2,
  Share,
  HardDrive,
  Folder,
  FolderOpen,
  Search,
  Filter,
  Info
} from "lucide-react";
import DocumentStats from "@/components/advogado/documentos/DocumentStats";
import DocumentFolders from "@/components/advogado/documentos/DocumentFolders";

// Mock clientes
const mockClientes = [
  { id: "1", name: "Maria Santos" },
  { id: "2", name: "João Pereira" },
  { id: "3", name: "Ana Oliveira" },
  { id: "4", name: "Carlos Silva" },
  { id: "5", name: "Paula Costa" }
];

// Mock documentos
const mockDocumentos = [
  { 
    id: "doc1", 
    name: "Contrato de Prestação de Serviços.pdf", 
    type: "pdf", 
    size: "456 KB",
    sizeInBytes: 456000,
    client: "1",
    uploadedAt: "12/05/2023",
    category: "Contratos",
    lastAccessed: "25/04/2023" 
  },
  { 
    id: "doc2", 
    name: "Procuração.pdf", 
    type: "pdf", 
    size: "234 KB",
    sizeInBytes: 234000,
    client: "1",
    uploadedAt: "14/05/2023",
    category: "Procurações",
    lastAccessed: "05/05/2023" 
  },
  { 
    id: "doc3", 
    name: "Comprovante de Pagamento.jpg", 
    type: "image", 
    size: "1.2 MB",
    sizeInBytes: 1200000,
    client: "2",
    uploadedAt: "18/05/2023",
    category: "Comprovantes",
    lastAccessed: "18/05/2023" 
  },
  { 
    id: "doc4", 
    name: "Petição Inicial.docx", 
    type: "word", 
    size: "345 KB",
    sizeInBytes: 345000,
    client: "3",
    uploadedAt: "20/05/2023",
    category: "Petições",
    lastAccessed: "21/05/2023" 
  },
  { 
    id: "doc5", 
    name: "Certidão Negativa.pdf", 
    type: "pdf", 
    size: "189 KB",
    sizeInBytes: 189000,
    client: "4",
    uploadedAt: "22/05/2023",
    category: "Certidões",
    lastAccessed: "22/05/2023" 
  },
  { 
    id: "doc6", 
    name: "Contestação.docx", 
    type: "word", 
    size: "567 KB",
    sizeInBytes: 567000,
    client: "5",
    uploadedAt: "24/05/2023",
    category: "Petições",
    lastAccessed: "25/05/2023" 
  }
];

// Mock pastas
const mockFolders = [
  { id: "folder1", name: "Contratos", count: 12, size: "45.6 MB" },
  { id: "folder2", name: "Procurações", count: 8, size: "12.3 MB" },
  { id: "folder3", name: "Petições", count: 24, size: "67.8 MB" },
  { id: "folder4", name: "Certidões", count: 5, size: "8.9 MB" },
  { id: "folder5", name: "Comprovantes", count: 15, size: "34.5 MB" }
];

const Documentos = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [documentos, setDocumentos] = useState(mockDocumentos);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDocumentDetailsOpen, setIsDocumentDetailsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [uploadDetails, setUploadDetails] = useState({
    name: "",
    client: "",
    category: "",
    description: "",
    file: null as File | null
  });
  const [activeTab, setActiveTab] = useState("todos");
  
  // Estatísticas de armazenamento
  const totalStorage = 5 * 1024 * 1024 * 1024; // 5GB em bytes
  const usedStorage = documentos.reduce((acc, doc) => acc + doc.sizeInBytes, 0);
  const usedStoragePercent = (usedStorage / totalStorage) * 100;
  
  // Formatar bytes para unidades legíveis
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Documentos mais acessados
  const topDocuments = [...documentos]
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .slice(0, 5);
  
  // Função para filtrar documentos
  const filteredDocumentos = documentos.filter(doc => {
    // Filtro por cliente
    const clientMatch = selectedClient ? doc.client === selectedClient : true;
    
    // Filtro por categoria
    const categoryMatch = selectedCategory ? doc.category === selectedCategory : true;
    
    // Filtro por pesquisa
    const searchMatch = searchTerm 
      ? doc.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      : true;
    
    return clientMatch && categoryMatch && searchMatch;
  });

  // Função para lidar com upload de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadDetails({
        ...uploadDetails,
        name: file.name,
        file: file
      });
    }
  };

  // Função para salvar o upload
  const handleUpload = () => {
    if (!uploadDetails.name || !uploadDetails.client || !uploadDetails.category) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    // Mock do upload de arquivo
    const fileSize = uploadDetails.file ? uploadDetails.file.size : 0;
    const formattedSize = formatBytes(fileSize);
    
    const newDoc = {
      id: `doc${Date.now()}`,
      name: uploadDetails.name,
      type: uploadDetails.name.split('.').pop() || "unknown",
      size: formattedSize,
      sizeInBytes: fileSize,
      client: uploadDetails.client,
      uploadedAt: new Date().toLocaleDateString('pt-BR'),
      category: uploadDetails.category,
      description: uploadDetails.description,
      lastAccessed: new Date().toLocaleDateString('pt-BR')
    };
    
    setDocumentos([...documentos, newDoc]);
    setIsUploadDialogOpen(false);
    setUploadDetails({
      name: "",
      client: "",
      category: "",
      description: "",
      file: null
    });
    
    toast({
      title: "Documento enviado",
      description: "O documento foi enviado com sucesso"
    });
  };

  // Função para baixar documento (simulação)
  const handleDownload = (docId: string) => {
    const doc = documentos.find(d => d.id === docId);
    if (doc) {
      // Atualiza a data de último acesso
      const updatedDocs = documentos.map(d => 
        d.id === docId 
          ? {...d, lastAccessed: new Date().toLocaleDateString('pt-BR')} 
          : d
      );
      setDocumentos(updatedDocs);
      
      toast({
        title: "Download iniciado",
        description: `Baixando ${doc.name}...`
      });
    }
  };

  // Função para excluir documento
  const handleDelete = (docId: string) => {
    setDocumentos(documentos.filter(doc => doc.id !== docId));
    toast({
      title: "Documento excluído",
      description: "O documento foi excluído com sucesso"
    });
  };

  // Função para visualizar detalhes do documento
  const handleViewDetails = (docId: string) => {
    const doc = documentos.find(d => d.id === docId);
    if (doc) {
      setSelectedDocument(doc);
      setIsDocumentDetailsOpen(true);
    }
  };

  // Função para gerar ícone com base no tipo de arquivo
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileIcon className="h-5 w-5 text-red-500" />;
      case 'docx':
      case 'word':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'jpg':
      case 'png':
      case 'image':
        return <FileImage className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciador de Documentos</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Enviar Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Espaço de Armazenamento */}
        <DocumentStats 
          usedStorage={usedStorage} 
          totalStorage={totalStorage} 
          usedStoragePercent={usedStoragePercent} 
          formatBytes={formatBytes}
          topDocuments={topDocuments}
          getFileIcon={getFileIcon}
        />
        
        {/* Pastas */}
        <DocumentFolders 
          folders={mockFolders} 
          setSelectedCategory={setSelectedCategory}
        />
        
        {/* Documentos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
            <CardDescription>Últimos documentos acessados</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {topDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center p-4 hover:bg-muted/50">
                  <div className="mr-4">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {mockClientes.find(c => c.id === doc.client)?.name}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground ml-2">
                    {doc.lastAccessed}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Gerenciamento de Documentos</CardTitle>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
                  className="w-full md:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select 
                  value={selectedClient} 
                  onValueChange={setSelectedClient}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os clientes</SelectItem>
                    {mockClientes.map(cliente => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    <SelectItem value="Contratos">Contratos</SelectItem>
                    <SelectItem value="Procurações">Procurações</SelectItem>
                    <SelectItem value="Petições">Petições</SelectItem>
                    <SelectItem value="Certidões">Certidões</SelectItem>
                    <SelectItem value="Comprovantes">Comprovantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos os Documentos</TabsTrigger>
              <TabsTrigger value="recentes">Recentes</TabsTrigger>
              <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="w-full">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Data de Upload</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocumentos.length > 0 ? (
                      filteredDocumentos.map(doc => (
                        <TableRow key={doc.id}>
                          <TableCell>{getFileIcon(doc.type)}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="cursor-pointer hover:underline" onClick={() => handleViewDetails(doc.id)}>
                                {doc.name}
                              </span>
                              {doc.description && (
                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {doc.description}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {mockClientes.find(c => c.id === doc.client)?.name || "Desconhecido"}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.category}</Badge>
                          </TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.uploadedAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(doc.id)}>
                                  <Info className="mr-2 h-4 w-4" />
                                  <span>Detalhes</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(doc.id)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Baixar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="mr-2 h-4 w-4" />
                                  <span>Compartilhar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Excluir</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Nenhum documento encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="recentes">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Última Visualização</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topDocuments.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell>{getFileIcon(doc.type)}</TableCell>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          {mockClientes.find(c => c.id === doc.client)?.name || "Desconhecido"}
                        </TableCell>
                        <TableCell>{doc.lastAccessed}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="favoritos">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhum favorito ainda</h3>
                <p className="text-sm text-muted-foreground max-w-md mt-2">
                  Você não adicionou nenhum documento aos favoritos. 
                  Marque documentos importantes como favoritos para acessá-los rapidamente.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog para upload de documentos */}
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
              <Label htmlFor="client">Cliente*</Label>
              <Select 
                value={uploadDetails.client} 
                onValueChange={(value) => setUploadDetails({...uploadDetails, client: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {mockClientes.map(cliente => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria*</Label>
              <Select 
                value={uploadDetails.category} 
                onValueChange={(value) => setUploadDetails({...uploadDetails, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Contratos">Contratos</SelectItem>
                  <SelectItem value="Procurações">Procurações</SelectItem>
                  <SelectItem value="Petições">Petições</SelectItem>
                  <SelectItem value="Comprovantes">Comprovantes</SelectItem>
                  <SelectItem value="Certidões">Certidões</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                placeholder="Adicione uma descrição para o documento"
                value={uploadDetails.description}
                onChange={(e) => setUploadDetails({...uploadDetails, description: e.target.value})}
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

      {/* Drawer para detalhes do documento */}
      <Drawer open={isDocumentDetailsOpen} onOpenChange={setIsDocumentDetailsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Detalhes do Documento</DrawerTitle>
            <DrawerDescription>Informações completas sobre o documento</DrawerDescription>
          </DrawerHeader>
          {selectedDocument && (
            <div className="px-4 py-2">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-muted rounded-md mr-4">
                  {getFileIcon(selectedDocument.type)}
                </div>
                <div>
                  <h3 className="font-medium">{selectedDocument.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDocument.size}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Cliente</p>
                    <p className="text-sm text-muted-foreground">
                      {mockClientes.find(c => c.id === selectedDocument.client)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.category}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Data de Upload</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.uploadedAt}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Último Acesso</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.lastAccessed}</p>
                  </div>
                </div>
                
                {selectedDocument.description && (
                  <div>
                    <p className="text-sm font-medium">Descrição</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DrawerFooter>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => selectedDocument && handleDownload(selectedDocument.id)}
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => {
                  if (selectedDocument) {
                    handleDelete(selectedDocument.id);
                    setIsDocumentDetailsOpen(false);
                  }
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Documentos;

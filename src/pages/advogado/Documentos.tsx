
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  FilePdf,
  FileImage,
  Trash2,
  Share
} from "lucide-react";

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
    client: "1",
    uploadedAt: "12/05/2023",
    category: "Contratos" 
  },
  { 
    id: "doc2", 
    name: "Procuração.pdf", 
    type: "pdf", 
    size: "234 KB",
    client: "1",
    uploadedAt: "14/05/2023",
    category: "Procurações" 
  },
  { 
    id: "doc3", 
    name: "Comprovante de Pagamento.jpg", 
    type: "image", 
    size: "1.2 MB",
    client: "2",
    uploadedAt: "18/05/2023",
    category: "Comprovantes" 
  },
  { 
    id: "doc4", 
    name: "Petição Inicial.docx", 
    type: "word", 
    size: "345 KB",
    client: "3",
    uploadedAt: "20/05/2023",
    category: "Petições" 
  },
  { 
    id: "doc5", 
    name: "Certidão Negativa.pdf", 
    type: "pdf", 
    size: "189 KB",
    client: "4",
    uploadedAt: "22/05/2023",
    category: "Certidões" 
  },
  { 
    id: "doc6", 
    name: "Contestação.docx", 
    type: "word", 
    size: "567 KB",
    client: "5",
    uploadedAt: "24/05/2023",
    category: "Petições" 
  }
];

const Documentos = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [documentos, setDocumentos] = useState(mockDocumentos);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadDetails, setUploadDetails] = useState({
    name: "",
    client: "",
    category: "",
    file: null as File | null
  });
  
  // Função para filtrar documentos por cliente
  const filteredDocumentos = selectedClient 
    ? documentos.filter(doc => doc.client === selectedClient)
    : documentos;

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
    const newDoc = {
      id: `doc${Date.now()}`,
      name: uploadDetails.name,
      type: uploadDetails.name.split('.').pop() || "unknown",
      size: uploadDetails.file ? `${Math.round(uploadDetails.file.size / 1024)} KB` : "0 KB",
      client: uploadDetails.client,
      uploadedAt: new Date().toLocaleDateString('pt-BR'),
      category: uploadDetails.category
    };
    
    setDocumentos([...documentos, newDoc]);
    setIsUploadDialogOpen(false);
    setUploadDetails({
      name: "",
      client: "",
      category: "",
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

  // Função para gerar ícone com base no tipo de arquivo
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdf className="h-5 w-5 text-red-500" />;
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
        <h1 className="text-2xl font-bold">Documentos</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Enviar Documento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gerenciamento de Documentos</CardTitle>
            <Select 
              value={selectedClient} 
              onValueChange={setSelectedClient}
            >
              <SelectTrigger className="w-[200px]">
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
          </div>
        </CardHeader>
        <CardContent>
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
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                      {mockClientes.find(c => c.id === doc.client)?.name || "Desconhecido"}
                    </TableCell>
                    <TableCell>{doc.category}</TableCell>
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
        </CardContent>
      </Card>

      {/* Dialog para upload de documentos */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
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
    </div>
  );
};

export default Documentos;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { useDocumentManager } from "@/hooks/useDocumentManager";
import DocumentStats from "@/components/advogado/documentos/DocumentStats";
import DocumentFolders from "@/components/advogado/documentos/DocumentFolders";
import RecentDocuments from "@/components/advogado/documentos/RecentDocuments";
import DocumentFilters from "@/components/advogado/documentos/DocumentFilters";
import DocumentTabs from "@/components/advogado/documentos/DocumentTabs";
import DocumentUploadDialog from "@/components/advogado/documentos/DocumentUploadDialog";
import DocumentDetailsDrawer from "@/components/advogado/documentos/DocumentDetailsDrawer";

// Mock clientes
const mockClientes = [
  { id: "1", name: "Maria Santos" },
  { id: "2", name: "João Pereira" },
  { id: "3", name: "Ana Oliveira" },
  { id: "4", name: "Carlos Silva" },
  { id: "5", name: "Paula Costa" }
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
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDocumentDetailsOpen, setIsDocumentDetailsOpen] = useState(false);
  const [uploadDetails, setUploadDetails] = useState({
    name: "",
    client: "",
    category: "",
    description: "",
    file: null as File | null
  });
  const [activeTab, setActiveTab] = useState("todos");
  
  // Use custom hook for document management logic
  const { 
    documentos,
    setDocumentos,
    selectedDocument,
    setSelectedDocument,
    totalStorage,
    usedStorage,
    usedStoragePercent,
    formatBytes,
    recentDocuments,
    handleDownload,
    handleDelete,
    handleViewDetails,
    getFileIcon
  } = useDocumentManager();
  
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

  // Handle view document details
  const viewDocumentDetails = (docId: string) => {
    handleViewDetails(docId);
    setIsDocumentDetailsOpen(true);
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
          topDocuments={recentDocuments}
          getFileIcon={getFileIcon}
        />
        
        {/* Pastas */}
        <DocumentFolders 
          folders={mockFolders} 
          setSelectedCategory={setSelectedCategory}
        />
        
        {/* Documentos Recentes */}
        <RecentDocuments
          documents={recentDocuments}
          clients={mockClientes}
          getFileIcon={getFileIcon}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Gerenciamento de Documentos</CardTitle>
            <DocumentFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              clients={mockClientes}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DocumentTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredDocuments={filteredDocumentos}
            recentDocuments={recentDocuments}
            clients={mockClientes}
            getFileIcon={getFileIcon}
            handleViewDetails={viewDocumentDetails}
            handleDownload={handleDownload}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Dialog para upload de documentos */}
      <DocumentUploadDialog
        isOpen={isUploadDialogOpen}
        setIsOpen={setIsUploadDialogOpen}
        uploadDetails={uploadDetails}
        setUploadDetails={setUploadDetails}
        handleUpload={handleUpload}
        clients={mockClientes}
      />

      {/* Drawer para detalhes do documento */}
      <DocumentDetailsDrawer
        isOpen={isDocumentDetailsOpen}
        setIsOpen={setIsDocumentDetailsOpen}
        selectedDocument={selectedDocument}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
        getFileIcon={getFileIcon}
        clients={mockClientes}
      />
    </div>
  );
};

export default Documentos;

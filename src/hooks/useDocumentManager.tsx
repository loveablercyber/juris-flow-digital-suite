import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { File, FileImage, FileText } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  sizeInBytes: number;
  client: string;
  uploadedAt: string;
  category: string;
  lastAccessed: string;
  description: string;
}

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
    lastAccessed: "25/04/2023",
    description: "Contrato padrão de prestação de serviços advocatícios."
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
    lastAccessed: "05/05/2023",
    description: "Procuração com poderes específicos para representação em juízo."
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
    lastAccessed: "18/05/2023",
    description: "Comprovante de pagamento de honorários."
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
    lastAccessed: "21/05/2023",
    description: "Petição inicial para processo de indenização por danos morais."
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
    lastAccessed: "22/05/2023",
    description: "Certidão negativa de débitos trabalhistas."
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
    lastAccessed: "25/05/2023",
    description: "Contestação para processo de cobrança indevida."
  }
];

export const useDocumentManager = () => {
  const [documentos, setDocumentos] = useState<Document[]>(mockDocumentos);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  // Storage statistics
  const totalStorage = 5 * 1024 * 1024 * 1024; // 5GB em bytes
  const usedStorage = documentos.reduce((acc, doc) => acc + doc.sizeInBytes, 0);
  const usedStoragePercent = (usedStorage / totalStorage) * 100;
  
  // Formatação de bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Documentos recentes
  const recentDocuments = [...documentos]
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .slice(0, 5);
  
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
    }
  };
  
  // Função para gerar ícone com base no tipo de arquivo
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
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
  
  return {
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
  };
};


import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FolderOpen } from "lucide-react";
import DocumentTable from "./DocumentTable";

interface Client {
  id: string;
  name: string;
}

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

interface DocumentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredDocuments: Document[];
  recentDocuments: Document[];
  clients: Client[];
  getFileIcon: (type: string) => JSX.Element;
  handleViewDetails: (docId: string) => void;
  handleDownload: (docId: string) => void;
  handleDelete: (docId: string) => void;
}

const DocumentTabs: React.FC<DocumentTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredDocuments,
  recentDocuments,
  clients,
  getFileIcon,
  handleViewDetails,
  handleDownload,
  handleDelete
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="todos">Todos os Documentos</TabsTrigger>
        <TabsTrigger value="recentes">Recentes</TabsTrigger>
        <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="todos" className="w-full">
        <DocumentTable 
          documents={filteredDocuments}
          clients={clients}
          getFileIcon={getFileIcon}
          handleViewDetails={handleViewDetails}
          handleDownload={handleDownload}
          handleDelete={handleDelete}
        />
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
              {recentDocuments.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell>{getFileIcon(doc.type)}</TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    {clients.find(c => c.id === doc.client)?.name || "Desconhecido"}
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
  );
};

export default DocumentTabs;

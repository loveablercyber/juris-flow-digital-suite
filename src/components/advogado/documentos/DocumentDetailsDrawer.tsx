
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

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

interface DocumentDetailsDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDocument: Document | null;
  handleDownload: (docId: string) => void;
  handleDelete: (docId: string) => void;
  getFileIcon: (type: string) => JSX.Element;
  clients: Client[];
}

const DocumentDetailsDrawer: React.FC<DocumentDetailsDrawerProps> = ({
  isOpen,
  setIsOpen,
  selectedDocument,
  handleDownload,
  handleDelete,
  getFileIcon,
  clients
}) => {
  if (!selectedDocument) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalhes do Documento</DrawerTitle>
          <DrawerDescription>Informações completas sobre o documento</DrawerDescription>
        </DrawerHeader>
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
                  {clients.find(c => c.id === selectedDocument.client)?.name}
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
        <DrawerFooter>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleDownload(selectedDocument.id)}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => {
                handleDelete(selectedDocument.id);
                setIsOpen(false);
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
  );
};

export default DocumentDetailsDrawer;

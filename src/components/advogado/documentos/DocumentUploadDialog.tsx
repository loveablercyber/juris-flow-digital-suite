
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Client {
  id: string;
  name: string;
}

interface UploadDetails {
  name: string;
  client: string;
  category: string;
  description: string;
  file: File | null;
}

interface DocumentUploadDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  uploadDetails: UploadDetails;
  setUploadDetails: React.Dispatch<React.SetStateAction<UploadDetails>>;
  handleUpload: () => void;
  clients: Client[];
}

const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({
  isOpen,
  setIsOpen,
  uploadDetails,
  setUploadDetails,
  handleUpload,
  clients
}) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                {clients.map(cliente => (
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;

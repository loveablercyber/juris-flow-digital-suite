
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

interface DocumentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedClient: string;
  setSelectedClient: (clientId: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  clients: Client[];
}

const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedClient,
  setSelectedClient,
  selectedCategory,
  setSelectedCategory,
  clients
}) => {
  return (
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
            <SelectItem value="all">Todos os clientes</SelectItem>
            {clients.map(cliente => (
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
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="Contratos">Contratos</SelectItem>
            <SelectItem value="Procurações">Procurações</SelectItem>
            <SelectItem value="Petições">Petições</SelectItem>
            <SelectItem value="Certidões">Certidões</SelectItem>
            <SelectItem value="Comprovantes">Comprovantes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DocumentFilters;

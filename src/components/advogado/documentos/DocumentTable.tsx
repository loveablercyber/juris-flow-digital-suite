
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Download, Info, MoreVertical, Share, Trash2 } from "lucide-react";

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

interface DocumentTableProps {
  documents: Document[];
  clients: Client[];
  getFileIcon: (type: string) => JSX.Element;
  handleViewDetails: (docId: string) => void;
  handleDownload: (docId: string) => void;
  handleDelete: (docId: string) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  clients,
  getFileIcon,
  handleViewDetails,
  handleDownload,
  handleDelete
}) => {
  return (
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
          {documents.length > 0 ? (
            documents.map(doc => (
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
                  {clients.find(c => c.id === doc.client)?.name || "Desconhecido"}
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
  );
};

export default DocumentTable;

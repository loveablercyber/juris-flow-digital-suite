
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

interface RecentDocumentsProps {
  documents: Document[];
  clients: Client[];
  getFileIcon: (type: string) => JSX.Element;
}

const RecentDocuments: React.FC<RecentDocumentsProps> = ({
  documents,
  clients,
  getFileIcon
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos Recentes</CardTitle>
        <CardDescription>Últimos documentos acessados</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center p-4 hover:bg-muted/50">
              <div className="mr-4">
                {getFileIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {clients.find(c => c.id === doc.client)?.name}
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
  );
};

export default RecentDocuments;

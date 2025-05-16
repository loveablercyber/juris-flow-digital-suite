
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

interface Folder {
  id: string;
  name: string;
  count: number;
  size: string;
}

interface DocumentFoldersProps {
  folders: Folder[];
  setSelectedCategory: (category: string) => void;
}

const DocumentFolders: React.FC<DocumentFoldersProps> = ({ 
  folders,
  setSelectedCategory
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardDescription>Documentos organizados por categoria</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {folders.map((folder) => (
            <Button
              key={folder.id}
              variant="ghost"
              className="w-full flex items-center justify-start px-4 py-3 h-auto"
              onClick={() => setSelectedCategory(folder.name)}
            >
              <div className="flex-1 flex items-center">
                <Folder className="h-5 w-5 mr-3 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-left">{folder.name}</p>
                  <p className="text-xs text-muted-foreground text-left">
                    {folder.count} {folder.count === 1 ? 'arquivo' : 'arquivos'}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{folder.size}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentFolders;

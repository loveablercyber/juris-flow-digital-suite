
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  FileEdit,
  FileText,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Save,
  Send
} from "lucide-react";

type Artigo = {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  status: "rascunho" | "publicado";
  dataCriacao: string;
  dataPublicacao: string | null;
  autor: string;
};

const mockArtigos: Artigo[] = [
  {
    id: "1",
    titulo: "Reforma trabalhista: o que mudou?",
    resumo: "Uma análise das principais alterações trazidas pela reforma trabalhista.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor ac enim aliquam lacinia. Vivamus a magna at justo facilisis dignissim. Nullam auctor urna in magna commodo, at fermentum felis commodo. Donec tristique eros eu tellus posuere, vel viverra tortor luctus. Nullam condimentum magna eget diam aliquam, vitae dapibus sapien facilisis.",
    categoria: "Direito Trabalhista",
    status: "publicado",
    dataCriacao: "2025-04-15",
    dataPublicacao: "2025-04-20",
    autor: "Dr. João Silva"
  },
  {
    id: "2",
    titulo: "Contratos de locação comercial: cláusulas essenciais",
    resumo: "Saiba quais são as cláusulas que não podem faltar em um contrato de locação comercial.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor ac enim aliquam lacinia. Vivamus a magna at justo facilisis dignissim. Nullam auctor urna in magna commodo, at fermentum felis commodo. Donec tristique eros eu tellus posuere, vel viverra tortor luctus. Nullam condimentum magna eget diam aliquam, vitae dapibus sapien facilisis.",
    categoria: "Direito Imobiliário",
    status: "rascunho",
    dataCriacao: "2025-05-10",
    dataPublicacao: null,
    autor: "Dra. Maria Santos"
  },
  {
    id: "3",
    titulo: "Proteção de dados e LGPD: o que empresas precisam saber",
    resumo: "Um guia prático sobre a Lei Geral de Proteção de Dados e seu impacto nos negócios.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor ac enim aliquam lacinia. Vivamus a magna at justo facilisis dignissim. Nullam auctor urna in magna commodo, at fermentum felis commodo. Donec tristique eros eu tellus posuere, vel viverra tortor luctus. Nullam condimentum magna eget diam aliquam, vitae dapibus sapien facilisis.",
    categoria: "Direito Digital",
    status: "publicado",
    dataCriacao: "2025-05-01",
    dataPublicacao: "2025-05-05",
    autor: "Dr. João Silva"
  },
];

const categorias = [
  "Direito Civil",
  "Direito Empresarial",
  "Direito Trabalhista",
  "Direito Tributário",
  "Direito Imobiliário",
  "Direito Digital",
  "Direito de Família",
];

const Blog = () => {
  const [artigos, setArtigos] = useState<Artigo[]>(mockArtigos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentArtigo, setCurrentArtigo] = useState<Artigo>({
    id: "",
    titulo: "",
    resumo: "",
    conteudo: "",
    categoria: "",
    status: "rascunho",
    dataCriacao: new Date().toISOString().split('T')[0],
    dataPublicacao: null,
    autor: "Dr. João Silva" // Placeholder, idealmente viria do usuário logado
  });

  // Funções de manipulação de artigos
  const handleNovoArtigo = () => {
    setIsViewMode(false);
    setCurrentArtigo({
      id: "",
      titulo: "",
      resumo: "",
      conteudo: "",
      categoria: "",
      status: "rascunho",
      dataCriacao: new Date().toISOString().split('T')[0],
      dataPublicacao: null,
      autor: "Dr. João Silva" // Placeholder, idealmente viria do usuário logado
    });
    setIsDialogOpen(true);
  };

  const handleVerArtigo = (artigo: Artigo) => {
    setIsViewMode(true);
    setCurrentArtigo(artigo);
    setIsDialogOpen(true);
  };

  const handleEditarArtigo = (artigo: Artigo) => {
    setIsViewMode(false);
    setCurrentArtigo(artigo);
    setIsDialogOpen(true);
  };

  const handleSalvarArtigo = (publicar: boolean = false) => {
    if (!currentArtigo.titulo || !currentArtigo.resumo || !currentArtigo.conteudo || !currentArtigo.categoria) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const status = publicar ? "publicado" : "rascunho" as const;
    const dataPublicacao = publicar ? new Date().toISOString().split('T')[0] : null;

    if (currentArtigo.id) {
      // Atualizar artigo existente
      setArtigos(artigos.map(a => 
        a.id === currentArtigo.id 
          ? {...currentArtigo, status, dataPublicacao} 
          : a
      ));
      
      toast({
        title: publicar ? "Artigo publicado" : "Rascunho salvo",
        description: publicar 
          ? "O artigo foi publicado com sucesso" 
          : "O rascunho foi salvo com sucesso"
      });
    } else {
      // Adicionar novo artigo
      const novoArtigo: Artigo = {
        ...currentArtigo,
        id: Date.now().toString(),
        status,
        dataPublicacao
      };
      
      setArtigos([...artigos, novoArtigo]);
      
      toast({
        title: publicar ? "Artigo publicado" : "Rascunho salvo",
        description: publicar 
          ? "O novo artigo foi publicado com sucesso" 
          : "O novo rascunho foi salvo com sucesso"
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleExcluirArtigo = (id: string) => {
    setArtigos(artigos.filter(a => a.id !== id));
    toast({
      title: "Artigo excluído",
      description: "O artigo foi excluído com sucesso"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Button onClick={handleNovoArtigo}>
          <FileText className="mr-2 h-4 w-4" />
          Novo Artigo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Artigos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Data de Publicação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artigos.length > 0 ? (
                artigos.map(artigo => (
                  <TableRow key={artigo.id}>
                    <TableCell className="font-medium">{artigo.titulo}</TableCell>
                    <TableCell>{artigo.categoria}</TableCell>
                    <TableCell>
                      {artigo.status === "publicado" ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Publicado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100">
                          Rascunho
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{artigo.dataCriacao}</TableCell>
                    <TableCell>{artigo.dataPublicacao || "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerArtigo(artigo)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditarArtigo(artigo)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {artigo.status === "rascunho" && (
                            <DropdownMenuItem 
                              onClick={() => {
                                handleEditarArtigo(artigo);
                                setTimeout(() => handleSalvarArtigo(true), 100);
                              }}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Publicar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleExcluirArtigo(artigo.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Nenhum artigo encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para criar/editar/visualizar artigos */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isViewMode 
                ? "Visualizar Artigo" 
                : currentArtigo.id 
                  ? "Editar Artigo" 
                  : "Novo Artigo"
              }
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Título*</Label>
              <Input
                id="titulo"
                value={currentArtigo.titulo}
                onChange={(e) => setCurrentArtigo({...currentArtigo, titulo: e.target.value})}
                disabled={isViewMode}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria*</Label>
              <Select
                value={currentArtigo.categoria}
                onValueChange={(value) => setCurrentArtigo({...currentArtigo, categoria: value})}
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="resumo">Resumo*</Label>
              <Input
                id="resumo"
                value={currentArtigo.resumo}
                onChange={(e) => setCurrentArtigo({...currentArtigo, resumo: e.target.value})}
                disabled={isViewMode}
                required
                placeholder="Um breve resumo do artigo (aparece na listagem)"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="conteudo">Conteúdo*</Label>
              <Textarea
                id="conteudo"
                rows={10}
                value={currentArtigo.conteudo}
                onChange={(e) => setCurrentArtigo({...currentArtigo, conteudo: e.target.value})}
                disabled={isViewMode}
                required
                placeholder="Escreva o conteúdo completo do artigo aqui"
              />
            </div>

            {isViewMode && (
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md mt-4">
                <div>
                  <p><span className="font-medium">Status:</span> {currentArtigo.status === "publicado" ? "Publicado" : "Rascunho"}</p>
                  <p><span className="font-medium">Autor:</span> {currentArtigo.autor}</p>
                </div>
                <div>
                  <p><span className="font-medium">Data de criação:</span> {currentArtigo.dataCriacao}</p>
                  <p><span className="font-medium">Data de publicação:</span> {currentArtigo.dataPublicacao || "Não publicado"}</p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {isViewMode ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Fechar
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewMode(false);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSalvarArtigo(false)}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Rascunho
                </Button>
                <Button onClick={() => handleSalvarArtigo(true)}>
                  <Send className="mr-2 h-4 w-4" />
                  Publicar
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;

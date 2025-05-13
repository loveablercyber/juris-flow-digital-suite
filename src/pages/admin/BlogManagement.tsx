
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Eye, Plus, Search, Upload, Tags, Calendar } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";
import { toast } from "@/hooks/use-toast";

const BlogManagement = () => {
  const [view, setView] = useState<"list" | "edit" | "new">("list");
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock blog posts
  const mockPosts = [
    {
      id: 1,
      title: "Mudanças na Legislação Trabalhista de 2024",
      excerpt: "Conheça as principais mudanças na legislação trabalhista e seus impactos para empregadores e empregados.",
      date: "15/05/2024",
      author: "Dr. Carlos Mendes",
      status: "Publicado",
      category: "Trabalhista"
    },
    {
      id: 2,
      title: "Como Abrir Uma Empresa: Guia Completo",
      excerpt: "Um passo a passo detalhado de todos os requisitos legais para abertura de empresas no Brasil.",
      date: "03/05/2024",
      author: "Dra. Fernanda Almeida",
      status: "Publicado",
      category: "Empresarial"
    },
    {
      id: 3,
      title: "Planejamento Sucessório: Proteja seu Patrimônio",
      excerpt: "Entenda como o planejamento sucessório pode proteger seu patrimônio e garantir a tranquilidade de sua família.",
      date: "28/04/2024",
      author: "Dr. Ricardo Torres",
      status: "Publicado",
      category: "Sucessório"
    },
    {
      id: 4,
      title: "LGPD para Pequenas Empresas",
      excerpt: "O que as pequenas empresas precisam saber para estar em conformidade com a Lei Geral de Proteção de Dados.",
      date: "20/04/2024",
      author: "Dra. Camila Rocha",
      status: "Rascunho",
      category: "Digital"
    },
    {
      id: 5,
      title: "Guia Prático para Compra de Imóveis",
      excerpt: "Tudo o que você precisa saber antes de fechar negócio na compra de um imóvel.",
      date: "10/04/2024",
      author: "Dr. Paulo Mendes",
      status: "Rascunho",
      category: "Imobiliário"
    }
  ];

  // Filter posts based on search term
  const filteredPosts = mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPost = () => {
    setSelectedPost(null);
    setView("new");
  };

  const handleEditPost = (post: any) => {
    setSelectedPost(post);
    setView("edit");
  };

  const handleDeletePost = (postId: number) => {
    toast({
      title: "Post excluído",
      description: `O post foi excluído com sucesso.`
    });
  };

  const handleSavePost = () => {
    toast({
      title: "Post salvo",
      description: view === "new" ? "O novo post foi criado com sucesso." : "As alterações foram salvas com sucesso."
    });
    setView("list");
  };

  const renderForm = () => {
    const isNewPost = view === "new";
    const postData = isNewPost ? {} : selectedPost;
    
    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">{isNewPost ? "Novo Post" : "Editar Post"}</h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setView("list")}>Cancelar</Button>
            <MockActionButton action="Salvar" />
            {!isNewPost && <MockActionButton action="Visualizar" variant="outline" />}
          </div>
        </div>
        
        <div className="mt-6">
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="metadata">Metadados</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" defaultValue={postData?.title} placeholder="Digite o título do post" />
              </div>
              
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea 
                  id="excerpt"
                  defaultValue={postData?.excerpt}
                  placeholder="Digite um breve resumo do post"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea 
                  id="content"
                  rows={10}
                  placeholder="Escreva o conteúdo do post aqui..."
                  defaultValue={postData?.content || ""}
                />
              </div>
              
              <div>
                <Label>Imagem de Capa</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-2">
                  <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">{postData?.image || "Nenhuma imagem selecionada"}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Imagem
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="metadata" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select defaultValue={postData?.category || "trabalhista"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="tributario">Tributário</SelectItem>
                      <SelectItem value="imobiliario">Imobiliário</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="sucessorio">Sucessório</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="author">Autor</Label>
                  <Select defaultValue={postData?.author || "carlos"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o autor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Dr. Carlos Mendes</SelectItem>
                      <SelectItem value="fernanda">Dra. Fernanda Almeida</SelectItem>
                      <SelectItem value="ricardo">Dr. Ricardo Torres</SelectItem>
                      <SelectItem value="camila">Dra. Camila Rocha</SelectItem>
                      <SelectItem value="paulo">Dr. Paulo Mendes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="date">Data de Publicação</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    defaultValue={postData?.dateRaw || new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={postData?.status?.toLowerCase() || "draft"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="agendado">Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags" 
                  defaultValue={postData?.tags || "direito, legislação"} 
                  placeholder="Separe as tags por vírgulas" 
                />
                <p className="text-xs text-muted-foreground mt-1">Ex: direito trabalhista, reforma, clt</p>
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4 py-4">
              <div>
                <Label htmlFor="meta-title">Meta Título</Label>
                <Input 
                  id="meta-title" 
                  defaultValue={postData?.metaTitle || postData?.title} 
                  placeholder="Digite o meta título para SEO"
                />
                <p className="text-xs text-muted-foreground mt-1">Recomendação: 50-60 caracteres</p>
              </div>
              
              <div>
                <Label htmlFor="meta-desc">Meta Descrição</Label>
                <Textarea 
                  id="meta-desc" 
                  defaultValue={postData?.metaDescription || postData?.excerpt}
                  placeholder="Digite a meta descrição para SEO"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">Recomendação: 150-160 caracteres</p>
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug" 
                  defaultValue={postData?.slug || (postData?.title || "novo-post").toLowerCase().replace(/\s+/g, '-')} 
                  placeholder="slug-do-post"
                />
              </div>
              
              <div>
                <Label>Imagem para compartilhamento social</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-2">
                  <div className="h-28 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">{postData?.socialImage || "Nenhuma imagem selecionada"}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Imagem
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">Recomendação: 1200x630 pixels</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento do Blog</h1>
        {view === "list" && (
          <Button onClick={handleNewPost}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Post
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {view === "list" ? "Posts do Blog" : view === "new" ? "Criar Novo Post" : "Editar Post"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {view === "list" ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="empresarial">Empresarial</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                    <SelectItem value="imobiliario">Imobiliário</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map(post => (
                      <TableRow key={post.id}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Tags className="h-4 w-4" />
                            {post.category}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === "Publicado" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {post.status}
                          </span>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPosts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <p className="text-muted-foreground">Nenhum post encontrado</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            renderForm()
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;

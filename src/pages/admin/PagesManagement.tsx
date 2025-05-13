
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Upload, Plus, Save } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const PagesManagement = () => {
  // Mock state for page content
  const [selectedPage, setSelectedPage] = useState("home");
  
  const pages = [
    { id: "home", name: "Página Inicial" },
    { id: "about", name: "Quem Somos" },
    { id: "areas", name: "Áreas de Atuação" },
    { id: "blog", name: "Blog" },
    { id: "contact", name: "Contato" },
    { id: "checklists", name: "Checklists" },
    { id: "ebooks", name: "E-books" },
    { id: "wiki", name: "Wiki/FAQ" },
  ];

  // Mock sections for the selected page
  const pageSections = [
    { id: "hero", name: "Banner Principal", type: "hero" },
    { id: "content1", name: "Conteúdo Principal", type: "content" },
    { id: "testimonials", name: "Depoimentos", type: "testimonials" },
    { id: "cta", name: "CTA (Call to Action)", type: "cta" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Páginas</h1>
        <div className="flex gap-2">
          <MockActionButton action="Publicar Alterações" />
          <MockActionButton action="Pré-visualizar" variant="outline" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - page selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Páginas do Site</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={selectedPage === page.id ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedPage(page.id)}
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main content editor */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Editando: {pages.find(p => p.id === selectedPage)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-6 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Seções da Página</h3>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Seção
                    </Button>
                  </div>

                  {/* Page sections */}
                  {pageSections.map((section) => (
                    <Card key={section.id} className="border border-gray-200">
                      <CardHeader className="bg-gray-50 py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{section.name}</CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-1" />
                              Mídia
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        {section.type === "hero" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Título</label>
                              <Input defaultValue="Advocacia Especializada para Todos os Seus Problemas Jurídicos" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Subtítulo</label>
                              <Input defaultValue="Atendimento personalizado com foco em resultados" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Imagem de fundo</label>
                              <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                                <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                                  <p className="text-gray-500">hero-image-1.jpg</p>
                                </div>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Trocar Imagem
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {section.type === "content" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Título da Seção</label>
                              <Input defaultValue="Nossos Serviços Jurídicos" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Conteúdo</label>
                              <Textarea 
                                rows={6} 
                                defaultValue="Nossa equipe de advogados altamente qualificados está pronta para assistir você em diversas áreas do direito, oferecendo soluções personalizadas para cada caso. Temos orgulho de fornecer atendimento jurídico de excelência, com foco em resultados e satisfação do cliente." 
                              />
                            </div>
                          </div>
                        )}

                        {section.type === "testimonials" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Título da Seção</label>
                              <Input defaultValue="O que nossos clientes dizem" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Depoimentos</label>
                              <div className="border rounded-md p-3 mb-2">
                                <div className="flex justify-between">
                                  <span>João Silva</span>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-sm text-gray-500">Excelente atendimento e profissionalismo...</p>
                              </div>
                              <div className="border rounded-md p-3">
                                <div className="flex justify-between">
                                  <span>Maria Oliveira</span>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-sm text-gray-500">Resolução rápida e eficiente do meu caso...</p>
                              </div>
                              <Button variant="outline" size="sm" className="mt-2">
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Depoimento
                              </Button>
                            </div>
                          </div>
                        )}

                        {section.type === "cta" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Texto CTA</label>
                              <Input defaultValue="Precisa de assessoria jurídica? Entre em contato hoje mesmo!" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Texto do Botão</label>
                              <Input defaultValue="Agendar Consulta" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Link do Botão</label>
                              <Input defaultValue="/agendamento" />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end mt-4">
                          <MockActionButton action="Salvar Seção" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="settings" className="py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título da Página</label>
                    <Input defaultValue={pages.find(p => p.id === selectedPage)?.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug da Página</label>
                    <Input defaultValue={`/${selectedPage}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <Select defaultValue="published">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Publicada</SelectItem>
                        <SelectItem value="draft">Rascunho</SelectItem>
                        <SelectItem value="hidden">Oculta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Template</label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Padrão</SelectItem>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="fullwidth">Largura Total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end mt-4">
                    <MockActionButton action="Salvar Configurações" />
                  </div>
                </TabsContent>
                
                <TabsContent value="seo" className="py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Título</label>
                    <Input defaultValue={`${pages.find(p => p.id === selectedPage)?.name} | ADVOCACIALEX`} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recomendação: 50-60 caracteres
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Descrição</label>
                    <Textarea 
                      rows={3} 
                      defaultValue="Conheça nossos serviços jurídicos especializados com atendimento personalizado e foco em resultados. Consulta gratuita disponível." 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recomendação: 150-160 caracteres
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Palavras-chave</label>
                    <Input defaultValue="advocacia, advogados, jurídico, direito, consultoria jurídica" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separe as palavras-chave por vírgulas
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Imagem Social</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">social-image.jpg</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Trocar Imagem
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <MockActionButton action="Salvar SEO" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PagesManagement;

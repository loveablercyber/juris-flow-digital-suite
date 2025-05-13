
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Search, Edit, Save, Upload } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const SeoManagement = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock pages data
  const pages = [
    {
      id: "home",
      path: "/",
      title: "Página Inicial",
      metaTitle: "ADVOCACIALEX | Escritório de Advocacia Especializada",
      metaDescription: "Escritório de advocacia com atendimento personalizado em diversas áreas do direito. Consulta gratuita disponível.",
      keywords: "advocacia, advogados, direito, consultoria jurídica, atendimento personalizado",
      score: 92
    },
    {
      id: "about",
      path: "/quem-somos",
      title: "Quem Somos",
      metaTitle: "Quem Somos | ADVOCACIALEX",
      metaDescription: "Conheça a história, valores e a equipe altamente qualificada de advogados da ADVOCACIALEX.",
      keywords: "equipe jurídica, advogados especialistas, escritório de advocacia, história",
      score: 85
    },
    {
      id: "areas",
      path: "/areas-de-atuacao",
      title: "Áreas de Atuação",
      metaTitle: "Áreas de Atuação | ADVOCACIALEX",
      metaDescription: "Advocacia especializada em direito trabalhista, empresarial, civil, tributário e outras áreas. Conheça nossos serviços.",
      keywords: "direito trabalhista, direito empresarial, direito civil, direito tributário",
      score: 78
    },
    {
      id: "blog",
      path: "/blog",
      title: "Blog",
      metaTitle: "Blog Jurídico | ADVOCACIALEX",
      metaDescription: "Artigos, notícias e dicas sobre temas jurídicos atuais. Mantenha-se informado sobre direitos e obrigações.",
      keywords: "blog jurídico, artigos de direito, notícias jurídicas, dicas legais",
      score: 89
    },
    {
      id: "contact",
      path: "/atendimento",
      title: "Atendimento",
      metaTitle: "Entre em Contato | ADVOCACIALEX",
      metaDescription: "Entre em contato com nossa equipe para tirar dúvidas ou agendar uma consulta jurídica.",
      keywords: "contato advogado, consulta jurídica, atendimento advocacia",
      score: 75
    },
    {
      id: "ebooks",
      path: "/ebooks",
      title: "E-books",
      metaTitle: "E-books Jurídicos Gratuitos | ADVOCACIALEX",
      metaDescription: "Baixe gratuitamente nossos e-books sobre diversos temas jurídicos e amplie seus conhecimentos.",
      keywords: "e-books jurídicos, materiais gratuitos, guias de direito",
      score: 81
    },
    {
      id: "wiki",
      path: "/wiki-faq",
      title: "Wiki/FAQ",
      metaTitle: "Wiki Jurídico e Perguntas Frequentes | ADVOCACIALEX",
      metaDescription: "Consulte nossa biblioteca de termos jurídicos e respostas para dúvidas comuns sobre questões legais.",
      keywords: "termos jurídicos, faq jurídico, dúvidas legais, wiki direito",
      score: 67
    }
  ];
  
  // Filter pages based on search term
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    page.path.includes(searchTerm.toLowerCase())
  );
  
  const handleSelectPage = (pageId: string) => {
    setSelectedPage(pageId);
  };
  
  const selectedPageData = pages.find(page => page.id === selectedPage);

  // Helper function to determine SEO score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  // Helper function to get SEO status based on score
  const getSeoStatus = (score: number) => {
    if (score >= 90) return "Excelente";
    if (score >= 80) return "Bom";
    if (score >= 70) return "Adequado";
    if (score >= 60) return "Precisa melhorar";
    return "Ruim";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de SEO</h1>
        <Button variant="outline">Análise Geral do Site</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Páginas</span>
              <BarChart className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar página..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Página</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.map(page => (
                    <TableRow 
                      key={page.id}
                      className={selectedPage === page.id ? "bg-muted" : ""}
                      onClick={() => handleSelectPage(page.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{page.title}</TableCell>
                      <TableCell className="text-right">
                        <span className={getScoreColor(page.score)}>
                          {page.score}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-4">
                        <p className="text-muted-foreground">Nenhuma página encontrada</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedPageData ? `Editar SEO: ${selectedPageData.title}` : "Selecione uma página"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedPageData && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Edit className="h-6 w-6" />
                </div>
                <p className="text-muted-foreground">
                  Selecione uma página na lista ao lado para editar suas informações de SEO.
                </p>
              </div>
            )}
            
            {selectedPageData && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`text-xl font-bold ${getScoreColor(selectedPageData.score)}`}>
                      {selectedPageData.score}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {getSeoStatus(selectedPageData.score)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    URL: {selectedPageData.path}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title">Meta Título</Label>
                    <Input id="meta-title" defaultValue={selectedPageData.metaTitle} />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted-foreground">
                        Recomendação: 50-60 caracteres
                      </p>
                      <span className="text-xs">
                        {selectedPageData.metaTitle.length} caracteres
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="meta-description">Meta Descrição</Label>
                    <Textarea
                      id="meta-description"
                      rows={3}
                      defaultValue={selectedPageData.metaDescription}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted-foreground">
                        Recomendação: 150-160 caracteres
                      </p>
                      <span className="text-xs">
                        {selectedPageData.metaDescription.length} caracteres
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="keywords">Palavras-chave</Label>
                    <Input id="keywords" defaultValue={selectedPageData.keywords} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separe as palavras-chave por vírgulas
                    </p>
                  </div>
                  
                  <div>
                    <Label>Compartilhamento Social</Label>
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-2">
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">Imagem para redes sociais</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Alterar Imagem
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tamanho recomendado: 1200x630 pixels
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Sugestões de melhoria:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">⚠️</span>
                        <span>A meta descrição poderia ser mais específica sobre os serviços oferecidos.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>O meta título está bem otimizado e dentro do tamanho recomendado.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">⚠️</span>
                        <span>Considere adicionar palavras-chave mais específicas da sua área de atuação.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Pré-visualizar</Button>
                    <MockActionButton action="Salvar Alterações" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Análise Geral de SEO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Score Médio</h3>
                  <span className="text-green-500 font-bold">81</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  O score médio do site está bom, mas há espaço para melhorias.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Páginas Indexadas</h3>
                  <span className="font-bold">14/15</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Uma página não está sendo indexada pelos motores de busca.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Problemas Críticos</h3>
                  <span className="text-red-500 font-bold">2</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Existem 2 problemas críticos que precisam ser corrigidos.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Sugestões Gerais</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start rounded-md border p-3">
                  <span className="text-red-500 mr-2 mt-0.5">●</span>
                  <div>
                    <p className="font-medium">Velocidade de carregamento da página</p>
                    <p className="text-muted-foreground">Algumas páginas estão lentas em dispositivos móveis. Otimize as imagens e utilize compressão para melhorar.</p>
                  </div>
                </li>
                <li className="flex items-start rounded-md border p-3">
                  <span className="text-red-500 mr-2 mt-0.5">●</span>
                  <div>
                    <p className="font-medium">Links quebrados</p>
                    <p className="text-muted-foreground">Detectamos 3 links quebrados no site, principalmente em páginas de blog antigas.</p>
                  </div>
                </li>
                <li className="flex items-start rounded-md border p-3">
                  <span className="text-amber-500 mr-2 mt-0.5">●</span>
                  <div>
                    <p className="font-medium">Meta descrições duplicadas</p>
                    <p className="text-muted-foreground">Algumas páginas possuem meta descrições muito similares. Personalize-as para cada página.</p>
                  </div>
                </li>
                <li className="flex items-start rounded-md border p-3">
                  <span className="text-amber-500 mr-2 mt-0.5">●</span>
                  <div>
                    <p className="font-medium">Otimização para mobile</p>
                    <p className="text-muted-foreground">Algumas páginas não estão totalmente adaptadas para visualização em dispositivos móveis.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <MockActionButton action="Gerar Relatório Completo" variant="outline" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoManagement;

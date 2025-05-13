
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Plus, Search, Edit, Trash, Eye, Download, Upload, FileText } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";
import { toast } from "@/hooks/use-toast";

const EbooksManagement = () => {
  const [view, setView] = useState<"list" | "edit" | "new" | "leads">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEbook, setSelectedEbook] = useState<any>(null);
  
  // Mock e-books data
  const ebooks = [
    {
      id: "1",
      title: "Guia Completo de Direitos Trabalhistas",
      description: "Entenda todos os seus direitos como trabalhador CLT e saiba como agir em diversas situações - desde horas extras até assédio moral.",
      category: "Trabalhista",
      pages: 52,
      downloadCount: 145,
      leadsGenerated: 162,
      lastUpdated: "15/04/2025",
      status: "Ativo"
    },
    {
      id: "2",
      title: "Recuperação de Crédito para Empresas",
      description: "Estratégias eficientes para recuperar crédito de devedores, incluindo abordagens extrajudiciais e judiciais para empresas de todos os portes.",
      category: "Empresarial",
      pages: 43,
      downloadCount: 98,
      leadsGenerated: 110,
      lastUpdated: "02/04/2025",
      status: "Ativo"
    },
    {
      id: "3",
      title: "Planejamento Sucessório Familiar",
      description: "Aprenda como realizar o planejamento sucessório de forma eficiente, protegendo seu patrimônio e garantindo tranquilidade para sua família.",
      category: "Sucessões",
      pages: 68,
      downloadCount: 87,
      leadsGenerated: 94,
      lastUpdated: "10/03/2025",
      status: "Ativo"
    },
    {
      id: "4",
      title: "Direito Imobiliário na Prática",
      description: "Guia completo sobre compra, venda, locação e outros aspectos do direito imobiliário para proteger seus investimentos.",
      category: "Imobiliário",
      pages: 75,
      downloadCount: 76,
      leadsGenerated: 83,
      lastUpdated: "25/02/2025",
      status: "Ativo"
    },
    {
      id: "5",
      title: "Reforma Tributária e Impactos para Empresas",
      description: "Análise completa das recentes mudanças tributárias e como elas afetam as empresas brasileiras, com dicas para compliance fiscal.",
      category: "Tributário",
      pages: 48,
      downloadCount: 65,
      leadsGenerated: 72,
      lastUpdated: "10/02/2025",
      status: "Ativo"
    },
    {
      id: "6",
      title: "Direito Digital para Todos",
      description: "Entenda a legislação que protege seus dados pessoais, sua privacidade online e como se proteger juridicamente no ambiente digital.",
      category: "Digital",
      pages: 39,
      downloadCount: 58,
      leadsGenerated: 64,
      lastUpdated: "05/01/2025",
      status: "Inativo"
    }
  ];
  
  // Mock leads data
  const leads = [
    { name: "João Silva", email: "joao.silva@email.com", ebook: "Guia Completo de Direitos Trabalhistas", date: "13/05/2025", status: "Novo" },
    { name: "Maria Oliveira", email: "maria.oliveira@email.com", ebook: "Recuperação de Crédito para Empresas", date: "12/05/2025", status: "Contatado" },
    { name: "Pedro Santos", email: "pedro.santos@email.com", ebook: "Planejamento Sucessório Familiar", date: "10/05/2025", status: "Contatado" },
    { name: "Ana Costa", email: "ana.costa@email.com", ebook: "Direito Imobiliário na Prática", date: "09/05/2025", status: "Convertido" },
    { name: "Carlos Mendes", email: "carlos.mendes@email.com", ebook: "Reforma Tributária e Impactos para Empresas", date: "08/05/2025", status: "Novo" },
    { name: "Fernanda Almeida", email: "fernanda.almeida@email.com", ebook: "Guia Completo de Direitos Trabalhistas", date: "07/05/2025", status: "Novo" },
    { name: "Ricardo Torres", email: "ricardo.torres@email.com", ebook: "Recuperação de Crédito para Empresas", date: "06/05/2025", status: "Convertido" },
    { name: "Camila Rocha", email: "camila.rocha@email.com", ebook: "Direito Digital para Todos", date: "05/05/2025", status: "Contatado" },
    { name: "Paulo Mendes", email: "paulo.mendes@email.com", ebook: "Direito Digital para Todos", date: "04/05/2025", status: "Descartado" }
  ];
  
  // Filter e-books based on search term
  const filteredEbooks = ebooks.filter(ebook => 
    ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ebook.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.ebook.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewEbook = () => {
    setSelectedEbook(null);
    setView("new");
  };

  const handleEditEbook = (ebook: any) => {
    setSelectedEbook(ebook);
    setView("edit");
  };

  const handleDeleteEbook = (ebookId: string) => {
    toast({
      title: "E-book excluído",
      description: "O e-book foi removido com sucesso."
    });
  };

  const handleSaveEbook = () => {
    toast({
      title: selectedEbook ? "E-book atualizado" : "E-book criado",
      description: selectedEbook 
        ? "As alterações foram salvas com sucesso." 
        : "O novo e-book foi criado com sucesso."
    });
    setView("list");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case "Inativo":
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>;
      case "Novo":
        return <Badge className="bg-blue-100 text-blue-800">Novo</Badge>;
      case "Contatado":
        return <Badge className="bg-amber-100 text-amber-800">Contatado</Badge>;
      case "Convertido":
        return <Badge className="bg-green-100 text-green-800">Convertido</Badge>;
      case "Descartado":
        return <Badge className="bg-red-100 text-red-800">Descartado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderForm = () => {
    const isNewEbook = view === "new";
    const ebookData = isNewEbook ? {} : selectedEbook;
    
    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">{isNewEbook ? "Novo E-book" : "Editar E-book"}</h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setView("list")}>Cancelar</Button>
            <MockActionButton action="Salvar" />
          </div>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" defaultValue={ebookData?.title} placeholder="Título do e-book" />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  rows={5}
                  defaultValue={ebookData?.description}
                  placeholder="Descrição detalhada do e-book"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    defaultValue={ebookData?.category || ""}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Trabalhista">Trabalhista</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Civil">Civil</option>
                    <option value="Tributário">Tributário</option>
                    <option value="Imobiliário">Imobiliário</option>
                    <option value="Digital">Digital</option>
                    <option value="Sucessões">Sucessões</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="pages">Número de páginas</Label>
                  <Input 
                    id="pages" 
                    type="number" 
                    defaultValue={ebookData?.pages} 
                    placeholder="Ex: 42" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    defaultValue={ebookData?.status || "Ativo"}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="cta">Texto do CTA</Label>
                  <Input 
                    id="cta" 
                    defaultValue={ebookData?.cta || "Baixar E-book"} 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="thankyou">Mensagem de Agradecimento</Label>
                <Textarea 
                  id="thankyou" 
                  rows={2}
                  defaultValue={ebookData?.thankyou || "Obrigado por baixar nosso e-book! Verifique seu email para acessar o material."}
                  placeholder="Mensagem exibida após o download"
                />
              </div>
              
              <div>
                <Label htmlFor="emails">Configuração de E-mails</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="send-welcome" defaultChecked />
                  <Label htmlFor="send-welcome" className="text-sm">Enviar e-mail de boas-vindas</Label>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <input type="checkbox" id="add-newsletter" defaultChecked />
                  <Label htmlFor="add-newsletter" className="text-sm">Adicionar à newsletter</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Arquivo PDF</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mt-2">
                  <div className="flex flex-col items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {ebookData?.file || "Nenhum arquivo selecionado"}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    {ebookData?.file ? "Trocar Arquivo" : "Selecionar PDF"}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Imagem de Capa</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-2">
                  <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">{ebookData?.image || "Nenhuma imagem selecionada"}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Imagem
                  </Button>
                </div>
              </div>
              
              {!isNewEbook && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estatísticas</p>
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between text-sm">
                      <span>Downloads:</span>
                      <span className="font-medium">{ebookData?.downloadCount || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Leads gerados:</span>
                      <span className="font-medium">{ebookData?.leadsGenerated || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Última atualização:</span>
                      <span className="font-medium">{ebookData?.lastUpdated || "--/--/----"}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {!isNewEbook && (
                <div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Privado
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciador de E-books</h1>
        <div className="space-x-2">
          {view === "list" && (
            <>
              <Button variant="outline" onClick={() => setView("leads")}>
                Ver Leads
              </Button>
              <Button onClick={handleNewEbook}>
                <Plus className="h-4 w-4 mr-2" />
                Novo E-book
              </Button>
            </>
          )}
          {view === "leads" && (
            <Button variant="outline" onClick={() => setView("list")}>
              Voltar para E-books
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {view === "list" && "E-books Disponíveis"}
            {view === "edit" && "Editar E-book"}
            {view === "new" && "Novo E-book"}
            {view === "leads" && "Leads Gerados por E-books"}
            
            {(view === "list" || view === "leads") && (
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={view === "list" ? "Buscar e-books..." : "Buscar leads..."}
                  className="pl-8 max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {view === "list" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-center">Páginas</TableHead>
                    <TableHead className="text-center">Downloads</TableHead>
                    <TableHead className="text-center">Leads</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEbooks.map(ebook => (
                    <TableRow key={ebook.id}>
                      <TableCell className="font-medium">{ebook.title}</TableCell>
                      <TableCell>{ebook.category}</TableCell>
                      <TableCell className="text-center">{ebook.pages}</TableCell>
                      <TableCell className="text-center">{ebook.downloadCount}</TableCell>
                      <TableCell className="text-center">{ebook.leadsGenerated}</TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(ebook.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditEbook(ebook)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteEbook(ebook.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEbooks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum e-book encontrado</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          {(view === "edit" || view === "new") && renderForm()}
          
          {view === "leads" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="all"
                >
                  <option value="all">Todos os E-books</option>
                  {ebooks.map(ebook => (
                    <option key={ebook.id} value={ebook.id}>{ebook.title}</option>
                  ))}
                </select>
                
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="all"
                >
                  <option value="all">Todos os Status</option>
                  <option value="novo">Novo</option>
                  <option value="contatado">Contatado</option>
                  <option value="convertido">Convertido</option>
                  <option value="descartado">Descartado</option>
                </select>
                
                <Button variant="outline" size="sm" className="ml-auto">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar CSV
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>E-book</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={lead.ebook}>
                            {lead.ebook}
                          </div>
                        </TableCell>
                        <TableCell>{lead.date}</TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(lead.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4 mr-1" />
                              Contatar
                            </Button>
                            <select
                              className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                              defaultValue={lead.status.toLowerCase()}
                            >
                              <option value="novo">Novo</option>
                              <option value="contatado">Contatado</option>
                              <option value="convertido">Convertido</option>
                              <option value="descartado">Descartado</option>
                            </select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredLeads.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <p className="text-muted-foreground">Nenhum lead encontrado</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {view === "list" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Desempenho de E-books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart
                width={800}
                height={300}
                data={ebooks.map(ebook => ({
                  name: ebook.title.length > 30 ? ebook.title.substring(0, 30) + "..." : ebook.title,
                  downloads: ebook.downloadCount,
                  leads: ebook.leadsGenerated,
                  conversion: Math.round((ebook.leadsGenerated / ebook.downloadCount) * 100)
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={200} />
                <Tooltip />
                <Legend />
                <Bar dataKey="downloads" fill="#8884d8" name="Downloads" />
                <Bar dataKey="leads" fill="#82ca9d" name="Leads Gerados" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Add recharts required components
const { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } = require('recharts');
// Add Mail component
const Mail = require('lucide-react').Mail;

export default EbooksManagement;

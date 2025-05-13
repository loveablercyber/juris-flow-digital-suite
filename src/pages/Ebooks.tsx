
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Mail, Download, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { toast } from "@/hooks/use-toast";

const Ebooks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<{
    id: string;
    title: string;
    image: string;
  } | null>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "E-books | ADVOCACIALEX";
    window.scrollTo(0, 0);
  }, []);

  const ebooks = [
    {
      id: "1",
      title: "Guia Completo de Direitos Trabalhistas",
      description: "Entenda todos os seus direitos como trabalhador CLT e saiba como agir em diversas situações - desde horas extras até assédio moral.",
      category: "Trabalhista",
      pages: "52 páginas",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: "2",
      title: "Recuperação de Crédito para Empresas",
      description: "Estratégias eficientes para recuperar crédito de devedores, incluindo abordagens extrajudiciais e judiciais para empresas de todos os portes.",
      category: "Empresarial",
      pages: "43 páginas",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: "3",
      title: "Planejamento Sucessório Familiar",
      description: "Aprenda como realizar o planejamento sucessório de forma eficiente, protegendo seu patrimônio e garantindo tranquilidade para sua família.",
      category: "Sucessões",
      pages: "68 páginas",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    },
    {
      id: "4",
      title: "Direito Imobiliário na Prática",
      description: "Guia completo sobre compra, venda, locação e outros aspectos do direito imobiliário para proteger seus investimentos.",
      category: "Imobiliário",
      pages: "75 páginas",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: "5",
      title: "Reforma Tributária e Impactos para Empresas",
      description: "Análise completa das recentes mudanças tributárias e como elas afetam as empresas brasileiras, com dicas para compliance fiscal.",
      category: "Tributário",
      pages: "48 páginas",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      id: "6",
      title: "Direito Digital para Todos",
      description: "Entenda a legislação que protege seus dados pessoais, sua privacidade online e como se proteger juridicamente no ambiente digital.",
      category: "Digital",
      pages: "39 páginas",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  const handleEbookRequest = (id: string, title: string, image: string) => {
    setSelectedEbook({ id, title, image });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send this data to your backend/CRM
    // For now we're just showing a success message
    toast({
      title: "E-book enviado com sucesso!",
      description: `Enviamos o e-book "${selectedEbook?.title}" para ${email}.`
    });
    
    // Reset form and close dialog
    setName("");
    setEmail("");
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 mr-3" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl">E-books Jurídicos Gratuitos</h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">
              Conhecimento jurídico de qualidade ao seu alcance. Baixe nossos e-books gratuitos e aprimore seu entendimento sobre diversas áreas do direito.
            </p>
          </div>
        </section>

        {/* E-books Grid */}
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map((ebook) => (
              <Card key={ebook.id} className="overflow-hidden card-hover h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={ebook.image} 
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2 flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium">
                      {ebook.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{ebook.pages}</span>
                  </div>
                  <CardTitle>{ebook.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">
                    {ebook.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button 
                    onClick={() => handleEbookRequest(ebook.id, ebook.title, ebook.image)}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar E-book
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Lead Generation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Baixar E-book</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para receber "{selectedEbook?.title}" em seu email.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div className="flex items-center p-4 rounded-md bg-muted">
                <Book className="h-10 w-10 mr-4 text-primary" />
                <div>
                  <h4 className="font-medium">{selectedEbook?.title}</h4>
                  <p className="text-sm text-muted-foreground">PDF enviado diretamente ao seu email</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Receber E-book
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Ebooks;


import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ListCheck, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { toast } from "@/hooks/use-toast";

const Checklists = () => {
  useEffect(() => {
    document.title = "Checklists Jurídicos | ADVOCACIALEX";
    window.scrollTo(0, 0);
  }, []);

  const checklists = [
    {
      id: "1",
      title: "Checklist para Abertura de Empresa",
      description: "Guia completo com todos os passos para abrir sua empresa corretamente, incluindo documentação necessária, registros, licenças e aspectos tributários.",
      category: "Empresarial",
      items: "23 itens",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: "2",
      title: "Documentos para Processo Trabalhista",
      description: "Lista completa de documentos necessários para dar entrada em um processo trabalhista, abrangendo diferentes situações de reclamação.",
      category: "Trabalhista",
      items: "18 itens",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: "3",
      title: "Checklist para Compra de Imóvel",
      description: "Guia passo a passo para garantir uma compra segura de imóvel, verificando documentação, situação do vendedor e do imóvel.",
      category: "Imobiliário",
      items: "27 itens",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    },
    {
      id: "4",
      title: "Documentos para Inventário",
      description: "Lista completa de documentos necessários para dar entrada em um inventário, seja judicial ou extrajudicial.",
      category: "Sucessório",
      items: "16 items",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: "5",
      title: "Preparação para Audiência Trabalhista",
      description: "Checklist completo do que preparar antes de uma audiência trabalhista, incluindo documentos, testemunhas e argumentação.",
      category: "Trabalhista",
      items: "12 itens",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: "6",
      title: "Checklist para Divórcio Consensual",
      description: "Guia passo a passo para organizar um divórcio consensual, incluindo documentos, acordos e partilha de bens.",
      category: "Família",
      items: "20 itens",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
  ];

  const handleDownload = (title: string) => {
    // In a real application, this would actually download a PDF
    toast({
      title: "Download iniciado",
      description: `O checklist "${title}" será baixado em alguns instantes.`
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center mb-6">
              <ListCheck className="h-8 w-8 mr-3" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl">Checklists Jurídicos</h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">
              Baixe gratuitamente nossos checklists para diferentes serviços jurídicos.
              Material preparado por nossa equipe especializada para garantir que você não esqueça nenhum detalhe importante.
            </p>
          </div>
        </section>

        {/* Checklists Grid */}
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklists.map((checklist) => (
              <Card key={checklist.id} className="overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={checklist.image} 
                    alt={checklist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium">
                      {checklist.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{checklist.items}</span>
                  </div>
                  <CardTitle>{checklist.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base min-h-[80px]">
                    {checklist.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleDownload(checklist.title)}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Checklists;

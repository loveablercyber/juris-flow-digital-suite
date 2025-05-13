
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Video, Play, Calendar, Clock, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import WhatsAppButton from "@/components/home/WhatsAppButton";

const Webinars = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
    embedId: string;
  } | null>(null);

  useEffect(() => {
    document.title = "Webinars e Vídeos | ADVOCACIALEX";
    window.scrollTo(0, 0);
  }, []);

  const recordedWebinars = [
    {
      id: "1",
      title: "Reforma Trabalhista: Principais Mudanças para Empregadores",
      description: "Análise completa da reforma trabalhista com foco nas mudanças que afetam os empregadores, incluindo relações trabalhistas e desafios para a gestão de RH.",
      presenter: "Dra. Márcia Oliveira",
      date: "20 de março, 2023",
      duration: "67 min",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      embedId: "dQw4w9WgXcQ" // This would be a YouTube embed ID in a real scenario
    },
    {
      id: "2",
      title: "Proteção de Dados e LGPD para Empresas",
      description: "Guia completo sobre como adequar seu negócio à LGPD, procedimentos necessários e riscos de não-conformidade, incluindo multas e sanções.",
      presenter: "Dr. Paulo Mendes",
      date: "15 de abril, 2023",
      duration: "53 min",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      embedId: "dQw4w9WgXcQ" // This would be a YouTube embed ID in a real scenario
    },
    {
      id: "3",
      title: "Planejamento Sucessório e Patrimonial",
      description: "Estratégias para proteção patrimonial e planejamento sucessório, com foco em instrumentos jurídicos como holding familiar, testamento e doação.",
      presenter: "Dra. Fernanda Almeida",
      date: "10 de maio, 2023",
      duration: "72 min",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      embedId: "dQw4w9WgXcQ" // This would be a YouTube embed ID in a real scenario
    },
    {
      id: "4",
      title: "Tributação para Empreendedores e Startups",
      description: "Explicação detalhada sobre regime tributário ideal para startups, benefícios fiscais disponíveis e estratégias de planejamento tributário.",
      presenter: "Dr. Ricardo Torres",
      date: "28 de junho, 2023",
      duration: "65 min",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      embedId: "dQw4w9WgXcQ" // This would be a YouTube embed ID in a real scenario
    }
  ];

  const upcomingWebinars = [
    {
      id: "5",
      title: "Propriedade Intelectual e Proteção de Software",
      description: "Como proteger juridicamente seus desenvolvimentos de software, aplicativos e tecnologias, incluindo patentes, direitos autorais e contratos.",
      presenter: "Dra. Camila Rocha",
      date: "12 de julho, 2025",
      time: "19:00 - 20:30",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      id: "6",
      title: "Contratos Internacionais e Exportação",
      description: "Aspectos jurídicos essenciais para empresas que desejam expandir para o mercado internacional, incluindo legislação aplicável e cláusulas importantes.",
      presenter: "Dr. Antônio Vieira",
      date: "25 de julho, 2025",
      time: "16:00 - 17:30",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    }
  ];

  const handlePlayVideo = (id: string, title: string, embedId: string) => {
    setSelectedVideo({ id, title, embedId });
    setVideoDialogOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center mb-6">
              <Video className="h-8 w-8 mr-3" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl">Webinars e Vídeos</h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">
              Conteúdos exclusivos produzidos por especialistas. Assista aos nossos webinars gravados sobre diversos temas jurídicos e inscreva-se nos próximos eventos ao vivo.
            </p>
          </div>
        </section>

        {/* Webinar Tabs */}
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <Tabs defaultValue="recorded" className="w-full">
            <TabsList className="mb-8 w-full sm:w-auto">
              <TabsTrigger value="recorded" className="flex-1 sm:flex-initial">
                <VideoIcon className="h-4 w-4 mr-2 hidden sm:inline" />
                Webinars Gravados
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex-1 sm:flex-initial">
                <Calendar className="h-4 w-4 mr-2 hidden sm:inline" />
                Próximos Webinars
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recorded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recordedWebinars.map((webinar) => (
                  <Card key={webinar.id} className="overflow-hidden card-hover h-full flex flex-col">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={webinar.image} 
                          alt={webinar.title}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="h-14 w-14 rounded-full"
                          onClick={() => handlePlayVideo(webinar.id, webinar.title, webinar.embedId)}
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{webinar.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{webinar.presenter}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {webinar.duration}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-base">
                        {webinar.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handlePlayVideo(webinar.id, webinar.title, webinar.embedId)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Assistir webinar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingWebinars.map((webinar) => (
                  <Card key={webinar.id} className="overflow-hidden card-hover h-full flex flex-col">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={webinar.image} 
                          alt={webinar.title}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                        Em breve
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{webinar.title}</CardTitle>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {webinar.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {webinar.time}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-base">
                        {webinar.description}
                      </CardDescription>
                      <p className="text-sm font-medium mt-3">
                        Apresentado por: {webinar.presenter}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Inscrever-se
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Video Dialog */}
        <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo?.embedId}`}
                  title={selectedVideo?.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Webinars;

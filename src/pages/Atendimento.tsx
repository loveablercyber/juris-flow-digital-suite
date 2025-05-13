
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, MessageSquare, Video, Phone, Mail, Users } from "lucide-react";

const Atendimento = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Set page title
    document.title = "Atendimento | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Em breve, um de nossos advogados entrará em contato.",
        duration: 5000,
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 bg-navy-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791055366-0d553381c47a?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Atendimento <span className="text-gold-400">Jurídico</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Escolha a forma de atendimento que melhor se adapta às suas necessidades 
              e entre em contato com nossa equipe de especialistas.
            </p>
          </div>
        </section>

        {/* Atendimento Options */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Formas de <span className="text-navy-500 dark:text-gold-400">Atendimento</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Oferecemos diferentes modalidades de atendimento para garantir o melhor 
                suporte jurídico, de acordo com sua preferência e necessidade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-gray-100 dark:border-navy-700 overflow-hidden transition-transform hover:-translate-y-2 duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-navy-50 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-navy-500 dark:text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Presencial</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Atendimento em nosso escritório com hora marcada. Ambiente 
                    confortável e privativo para discussão do seu caso.
                  </p>
                  <Button asChild className="w-full bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                    <Link to="/agendamento">Agendar Visita</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-navy-700 overflow-hidden transition-transform hover:-translate-y-2 duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-navy-50 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <Video className="h-8 w-8 text-navy-500 dark:text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Videoconferência</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Reuniões online via Zoom, Google Meet ou Microsoft Teams, 
                    com a mesma qualidade do atendimento presencial.
                  </p>
                  <Button asChild className="w-full bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                    <Link to="/agendamento?tipo=video">Agendar Vídeo</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-navy-700 overflow-hidden transition-transform hover:-translate-y-2 duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-navy-50 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-navy-500 dark:text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Atendimento rápido via WhatsApp para consultas simples 
                    e dúvidas pontuais sobre seu caso.
                  </p>
                  <Button asChild className="w-full bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                    <a href="https://wa.me/5511990000000" target="_blank" rel="noopener noreferrer">Iniciar Conversa</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Call */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto">
            <div className="bg-red-500 rounded-xl overflow-hidden shadow-xl">
              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Emergência Jurídica?</h2>
                    <p className="text-white/90 mb-6">
                      Para casos que exigem ação imediata, como prisões em flagrante, 
                      mandados de segurança ou medidas protetivas, oferecemos atendimento 
                      jurídico 24 horas por dia, 7 dias por semana.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                        <a href="tel:+551130000000" className="flex items-center gap-2">
                          <Phone className="h-5 w-5" />
                          (11) 3000-0000
                        </a>
                      </Button>
                      <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/40">
                        <a href="https://wa.me/5511990000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          WhatsApp 24h
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl text-center">
                      <Clock className="h-16 w-16 mx-auto text-white mb-4" />
                      <h3 className="text-xl font-bold text-white mb-1">Plantão 24h</h3>
                      <p className="text-white/80 text-sm">
                        Advogados de plantão prontos para atender casos urgentes 
                        a qualquer hora.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulários de Contato */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Entre em <span className="text-navy-500 dark:text-gold-400">Contato</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Preencha um dos formulários abaixo para solicitar atendimento 
                jurídico ou uma consulta inicial.
              </p>
            </div>
            
            <Tabs defaultValue="consulta" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="consulta">Solicitar Consulta</TabsTrigger>
                <TabsTrigger value="contato">Formulário de Contato</TabsTrigger>
              </TabsList>
              
              <TabsContent value="consulta">
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome Completo *
                          </label>
                          <Input id="name" required placeholder="Seu nome completo" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email *
                          </label>
                          <Input id="email" type="email" required placeholder="seu@email.com" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone *
                          </label>
                          <Input id="phone" required placeholder="(11) 99999-9999" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="area" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Área de Interesse *
                          </label>
                          <Select required>
                            <SelectTrigger className="bg-gray-50 dark:bg-navy-800">
                              <SelectValue placeholder="Selecione a área" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trabalhista">Direito Trabalhista</SelectItem>
                              <SelectItem value="civil">Direito Civil</SelectItem>
                              <SelectItem value="familia">Direito de Família</SelectItem>
                              <SelectItem value="previdenciario">Direito Previdenciário</SelectItem>
                              <SelectItem value="tributario">Direito Tributário</SelectItem>
                              <SelectItem value="empresarial">Direito Empresarial</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="atendimento" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tipo de Atendimento *
                          </label>
                          <Select required>
                            <SelectTrigger className="bg-gray-50 dark:bg-navy-800">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="presencial">Presencial</SelectItem>
                              <SelectItem value="video">Videoconferência</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="telefone">Telefone</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="urgencia" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Urgência
                          </label>
                          <Select>
                            <SelectTrigger className="bg-gray-50 dark:bg-navy-800">
                              <SelectValue placeholder="Selecione a urgência" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="baixa">Baixa - Consulta informativa</SelectItem>
                              <SelectItem value="media">Média - Preciso em alguns dias</SelectItem>
                              <SelectItem value="alta">Alta - Preciso esta semana</SelectItem>
                              <SelectItem value="urgente">Urgente - Preciso imediatamente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Descreva seu caso *
                        </label>
                        <Textarea 
                          id="message" 
                          required
                          placeholder="Descreva brevemente sua situação jurídica..." 
                          className="bg-gray-50 dark:bg-navy-800 min-h-[120px]" 
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            type="checkbox"
                            required
                            className="w-4 h-4 border-gray-300 rounded accent-navy-500 dark:accent-gold-400"
                          />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          Li e concordo com os <a href="/privacidade" className="text-navy-500 dark:text-gold-400 hover:underline">termos de privacidade</a>
                        </label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500"
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-navy-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </div>
                        ) : "Solicitar Consulta"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contato">
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name-contact" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome *
                          </label>
                          <Input id="name-contact" required placeholder="Seu nome" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email-contact" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email *
                          </label>
                          <Input id="email-contact" type="email" required placeholder="seu@email.com" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone-contact" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone
                          </label>
                          <Input id="phone-contact" placeholder="(11) 99999-9999" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Assunto *
                          </label>
                          <Input id="subject" required placeholder="Assunto da mensagem" className="bg-gray-50 dark:bg-navy-800" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message-contact" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Mensagem *
                        </label>
                        <Textarea 
                          id="message-contact" 
                          required
                          placeholder="Digite sua mensagem..." 
                          className="bg-gray-50 dark:bg-navy-800 min-h-[120px]" 
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms-contact"
                            type="checkbox"
                            required
                            className="w-4 h-4 border-gray-300 rounded accent-navy-500 dark:accent-gold-400"
                          />
                        </div>
                        <label htmlFor="terms-contact" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          Li e concordo com os <a href="/privacidade" className="text-navy-500 dark:text-gold-400 hover:underline">termos de privacidade</a>
                        </label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500"
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-navy-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </div>
                        ) : "Enviar Mensagem"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Informações de <span className="text-navy-500 dark:text-gold-400">Contato</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Entre em contato conosco através dos canais abaixo ou visite nosso escritório.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-gray-100 dark:border-navy-700 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-navy-500 dark:text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="tel:+551130000000" className="hover:text-navy-500 dark:hover:text-gold-400">(11) 3000-0000</a><br />
                    <a href="tel:+551130000001" className="hover:text-navy-500 dark:hover:text-gold-400">(11) 3000-0001</a>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-navy-700 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-navy-500 dark:text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="mailto:contato@advocacialex.com.br" className="hover:text-navy-500 dark:hover:text-gold-400">contato@advocacialex.com.br</a><br />
                    <a href="mailto:atendimento@advocacialex.com.br" className="hover:text-navy-500 dark:hover:text-gold-400">atendimento@advocacialex.com.br</a>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-navy-700 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <CalendarDays className="h-6 w-6 text-navy-500 dark:text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Horário de Atendimento</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Segunda a Sexta: 9h às 18h<br />
                    Sábados: 9h às 12h (com agendamento)
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 bg-white dark:bg-navy-700 rounded-xl overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 md:p-10">
                  <h3 className="text-2xl font-bold mb-4">Visite nosso escritório</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Estamos localizados em uma região central e de fácil acesso em São Paulo.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-600 flex items-center justify-center flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Endereço</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Av. Paulista, 1000, 10º andar<br />
                          Bela Vista, São Paulo - SP<br />
                          CEP: 01310-100
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-600 flex items-center justify-center flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Como Chegar</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Estacionamento no local<br />
                          Próximo ao metrô Trianon-Masp<br />
                          Diversas linhas de ônibus
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                      <a href="https://goo.gl/maps/1234567890" target="_blank" rel="noopener noreferrer">
                        Ver no Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="h-96 lg:h-auto">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0975402079866!2d-46.65679362446367!3d-23.564611178799432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700580000000!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Atendimento;


import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, ArrowRight, Check, Video, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Agendamento = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("tipo") || "presencial";
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string>(initialType);
  const [lawyer, setLawyer] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Set page title
    document.title = "Agendamento | ADVOCACIALEX";
    
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
        title: "Agendamento realizado com sucesso!",
        description: "Enviamos um email de confirmação com os detalhes do seu agendamento.",
        duration: 5000,
      });
      
      // Reset form and state
      setStep(1);
      setDate(undefined);
      setTime(undefined);
      setLawyer(undefined);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };
  
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];
  
  const lawyers = [
    {
      id: "carlos-mendes",
      name: "Dr. Carlos Mendes",
      specialty: "Direito Empresarial e Tributário",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"
    },
    {
      id: "ana-paula-silveira",
      name: "Dra. Ana Paula Silveira",
      specialty: "Direito Civil e Contratos",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    {
      id: "roberto-almeida",
      name: "Dr. Roberto Almeida",
      specialty: "Direito Trabalhista",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    {
      id: "juliana-costa",
      name: "Dra. Juliana Costa",
      specialty: "Direito de Família e Sucessões",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 bg-navy-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Agende uma <span className="text-gold-400">Consulta</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Escolha a data, horário e o advogado de sua preferência para 
              uma consulta jurídica personalizada.
            </p>
          </div>
        </section>

        {/* Scheduling Section */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto max-w-4xl">
            <Card className="border border-gray-100 dark:border-navy-700 shadow-lg">
              <CardContent className="p-6 md:p-8">
                {/* Stepper */}
                <div className="mb-10">
                  <div className="flex items-center justify-between">
                    <div className={`flex flex-col items-center ${step >= 1 ? 'text-navy-500 dark:text-gold-400' : 'text-gray-400'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-navy-500 text-white dark:bg-gold-400 dark:text-navy-800' : 'bg-gray-200 text-gray-500 dark:bg-navy-700'}`}>
                        {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                      </div>
                      <span className="text-sm">Tipo</span>
                    </div>
                    
                    <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-navy-500 dark:bg-gold-400' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                    
                    <div className={`flex flex-col items-center ${step >= 2 ? 'text-navy-500 dark:text-gold-400' : 'text-gray-400'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-navy-500 text-white dark:bg-gold-400 dark:text-navy-800' : 'bg-gray-200 text-gray-500 dark:bg-navy-700'}`}>
                        {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                      </div>
                      <span className="text-sm">Data e Hora</span>
                    </div>
                    
                    <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-navy-500 dark:bg-gold-400' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                    
                    <div className={`flex flex-col items-center ${step >= 3 ? 'text-navy-500 dark:text-gold-400' : 'text-gray-400'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-navy-500 text-white dark:bg-gold-400 dark:text-navy-800' : 'bg-gray-200 text-gray-500 dark:bg-navy-700'}`}>
                        {step > 3 ? <Check className="h-5 w-5" /> : "3"}
                      </div>
                      <span className="text-sm">Advogado</span>
                    </div>
                    
                    <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-navy-500 dark:bg-gold-400' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                    
                    <div className={`flex flex-col items-center ${step >= 4 ? 'text-navy-500 dark:text-gold-400' : 'text-gray-400'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? 'bg-navy-500 text-white dark:bg-gold-400 dark:text-navy-800' : 'bg-gray-200 text-gray-500 dark:bg-navy-700'}`}>
                        {step > 4 ? <Check className="h-5 w-5" /> : "4"}
                      </div>
                      <span className="text-sm">Dados</span>
                    </div>
                  </div>
                </div>
                
                {/* Step 1: Tipo de Atendimento */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Escolha o tipo de atendimento</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div 
                        className={`border rounded-xl p-6 cursor-pointer transition-colors ${type === "presencial" ? "border-navy-500 dark:border-gold-400 bg-navy-50 dark:bg-navy-800" : "border-gray-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-600"}`}
                        onClick={() => setType("presencial")}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${type === "presencial" ? "bg-navy-500 text-white dark:bg-gold-400 dark:text-navy-800" : "bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300"}`}>
                            <Users className="h-8 w-8" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Atendimento Presencial</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Consulta presencial em nosso escritório com o advogado de sua escolha.
                          </p>
                          {type === "presencial" && (
                            <div className="inline-flex items-center text-navy-500 dark:text-gold-400">
                              <Check className="h-5 w-5 mr-1" />
                              <span>Selecionado</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-xl p-6 cursor-pointer transition-colors ${type === "video" ? "border-navy-500 dark:border-gold-400 bg-navy-50 dark:bg-navy-800" : "border-gray-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-600"}`}
                        onClick={() => setType("video")}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${type === "video" ? "bg-navy-500 text-white dark:bg-gold-400 dark:text-navy-800" : "bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300"}`}>
                            <Video className="h-8 w-8" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Videoconferência</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Consulta online via Zoom, Google Meet ou Microsoft Teams.
                          </p>
                          {type === "video" && (
                            <div className="inline-flex items-center text-navy-500 dark:text-gold-400">
                              <Check className="h-5 w-5 mr-1" />
                              <span>Selecionado</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-10 flex justify-end">
                      <Button 
                        onClick={() => setStep(2)}
                        className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500"
                      >
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Data e Hora */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Escolha a data e horário</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Selecione uma data:</h3>
                        <div className="border rounded-md p-3 dark:border-navy-700">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            locale={ptBR}
                            disabled={(date) => {
                              // Disable past dates, Sundays, and Saturdays
                              const day = date.getDay();
                              return date < new Date() || day === 0 || day === 6;
                            }}
                            className={cn("p-3 pointer-events-auto rounded-md")}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Selecione um horário:</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimes.map((t) => (
                            <Button
                              key={t}
                              variant={time === t ? "default" : "outline"}
                              className={time === t ? "bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500" : ""}
                              onClick={() => setTime(t)}
                            >
                              {t}
                            </Button>
                          ))}
                        </div>
                        
                        {date && time && (
                          <div className="mt-6 p-4 bg-navy-50 dark:bg-navy-800 rounded-md">
                            <h4 className="font-medium mb-2">Consulta agendada para:</h4>
                            <div className="flex items-center text-navy-500 dark:text-gold-400">
                              <CalendarIcon className="mr-2 h-5 w-5" />
                              <span>{format(date, "PPPP", { locale: ptBR })}</span>
                            </div>
                            <div className="flex items-center mt-1 text-navy-500 dark:text-gold-400">
                              <Clock className="mr-2 h-5 w-5" />
                              <span>{time}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-10 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        className="border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={() => setStep(3)}
                        disabled={!date || !time}
                        className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500"
                      >
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Advogado */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Escolha o advogado</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {lawyers.map((l) => (
                        <div 
                          key={l.id}
                          className={`border rounded-xl p-4 cursor-pointer transition-colors ${lawyer === l.id ? "border-navy-500 dark:border-gold-400 bg-navy-50 dark:bg-navy-800" : "border-gray-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-600"}`}
                          onClick={() => setLawyer(l.id)}
                        >
                          <div className="flex items-center">
                            <img 
                              src={l.image} 
                              alt={l.name} 
                              className={`w-16 h-16 rounded-full object-cover mr-4 ${lawyer === l.id ? "ring-2 ring-navy-500 dark:ring-gold-400" : ""}`}
                            />
                            <div>
                              <h3 className="font-bold text-lg">{l.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{l.specialty}</p>
                              {lawyer === l.id && (
                                <div className="inline-flex items-center text-navy-500 dark:text-gold-400 mt-1 text-sm">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span>Selecionado</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(2)}
                        className="border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={() => setStep(4)}
                        disabled={!lawyer}
                        className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500"
                      >
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Dados Pessoais */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Complete seus dados</h2>
                    
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
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Assunto da Consulta *
                        </label>
                        <Input id="subject" required placeholder="Assunto a ser tratado na consulta" className="bg-gray-50 dark:bg-navy-800" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Detalhes do Caso
                        </label>
                        <Textarea 
                          id="message" 
                          placeholder="Forneça detalhes adicionais que possam ser relevantes para a consulta..." 
                          className="bg-gray-50 dark:bg-navy-800 min-h-[120px]" 
                        />
                      </div>
                      
                      <div className="p-4 bg-navy-50 dark:bg-navy-800 rounded-md">
                        <h3 className="font-bold mb-3">Resumo do Agendamento</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Tipo de Atendimento:</span>
                            <span className="font-medium">{type === "presencial" ? "Presencial" : "Videoconferência"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Data:</span>
                            <span className="font-medium">{date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Horário:</span>
                            <span className="font-medium">{time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Advogado:</span>
                            <span className="font-medium">{lawyers.find(l => l.id === lawyer)?.name}</span>
                          </div>
                        </div>
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
                      
                      <div className="mt-10 flex justify-between">
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setStep(3)}
                          className="border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800"
                        >
                          Voltar
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={loading} 
                          className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500"
                        >
                          {loading ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-navy-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processando...
                            </div>
                          ) : "Confirmar Agendamento"}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perguntas <span className="text-navy-500 dark:text-gold-400">Frequentes</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Tire suas dúvidas sobre o processo de agendamento de consultas.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Quanto tempo dura uma consulta?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  As consultas têm duração média de 1 hora, tempo suficiente para apresentar seu caso e receber orientações iniciais.
                </p>
              </div>
              
              <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">É necessário pagar pela consulta inicial?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim, a consulta inicial tem um valor que será informado no momento da confirmação do agendamento. Este valor pode ser revertido em desconto caso decida contratar nossos serviços.
                </p>
              </div>
              
              <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Que documentos devo apresentar na consulta?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Recomendamos que traga documentos relacionados ao seu caso, como contratos, notificações, processos e documentos pessoais. Isso agiliza a análise inicial.
                </p>
              </div>
              
              <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Posso remarcar minha consulta?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim, é possível remarcar com antecedência mínima de 24 horas, sem custo adicional. Cancelamentos ou remarcações com prazo inferior podem estar sujeitos a taxa.
                </p>
              </div>
              
              <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Como funciona a consulta por videoconferência?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Após a confirmação, você receberá por email um link para a sala virtual. A plataforma é de fácil acesso, bastando clicar no link no horário agendado.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ainda tem dúvidas sobre o agendamento?
              </p>
              <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                <Link to="/atendimento">Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Agendamento;

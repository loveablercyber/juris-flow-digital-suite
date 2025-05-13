
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, MailPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { toast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("weekly");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Newsletter Jurídica | ADVOCACIALEX";
    window.scrollTo(0, 0);
  }, []);

  const handleInterestChange = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !nome || interests.length === 0) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos e selecione pelo menos uma área de interesse.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    setSubmitted(true);
    toast({
      title: "Inscrição realizada!",
      description: "Você foi inscrito em nossa newsletter com sucesso. Verifique seu email para confirmar sua inscrição."
    });
  };

  const interestAreas = [
    { id: "trabalhista", label: "Direito Trabalhista" },
    { id: "civil", label: "Direito Civil" },
    { id: "empresarial", label: "Direito Empresarial" },
    { id: "tributario", label: "Direito Tributário" },
    { id: "familia", label: "Direito de Família" },
    { id: "consumidor", label: "Direito do Consumidor" },
    { id: "digital", label: "Direito Digital" },
    { id: "previdenciario", label: "Direito Previdenciário" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center mb-6">
              <Mail className="h-8 w-8 mr-3" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl">Newsletter Jurídica</h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">
              Mantenha-se atualizado com as novidades jurídicas. Receba conteúdos exclusivos, atualizações legislativas e análises de especialistas diretamente em seu email.
            </p>
          </div>
        </section>

        {/* Newsletter Form */}
        <section className="container mx-auto max-w-4xl px-4 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              {!submitted ? (
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-medium mb-6">Inscreva-se em nossa newsletter</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input 
                        id="nome" 
                        placeholder="Seu nome completo" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Áreas de interesse (selecione ao menos uma)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {interestAreas.map((area) => (
                          <div key={area.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={area.id} 
                              checked={interests.includes(area.id)}
                              onCheckedChange={() => handleInterestChange(area.id)}
                            />
                            <Label htmlFor={area.id} className="cursor-pointer">{area.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Frequência preferida</Label>
                      <RadioGroup 
                        value={frequency} 
                        onValueChange={setFrequency}
                      >
                        <div className="flex items-center space-x-8">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="weekly" id="weekly" />
                            <Label htmlFor="weekly">Semanal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="biweekly" id="biweekly" />
                            <Label htmlFor="biweekly">Quinzenal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly">Mensal</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button type="submit" className="w-full py-6 text-base">
                      <MailPlus className="mr-2 h-5 w-5" />
                      Inscrever-me na newsletter
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      Ao se inscrever, você concorda em receber emails de nossa newsletter.
                      Você pode cancelar sua inscrição a qualquer momento. Não compartilhamos seu email com terceiros.
                    </p>
                  </form>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-medium mb-3">Inscrição confirmada!</h2>
                    <p className="text-muted-foreground mb-6">
                      Obrigado por se inscrever em nossa newsletter jurídica. 
                      Enviamos um email de confirmação para <strong>{email}</strong>.
                    </p>
                    <Button onClick={() => setSubmitted(false)}>
                      Voltar
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-muted p-6 rounded-xl">
                <h3 className="text-xl font-medium mb-4">O que você receberá:</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Atualizações sobre mudanças legislativas relevantes</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Análises de especialistas sobre decisões judiciais importantes</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Dicas jurídicas práticas para o dia a dia</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Notícias sobre o mercado jurídico</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Acesso prioritário a webinars e eventos</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Conteúdo exclusivo não publicado em nosso site</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    "Nossa newsletter tem sido fundamental para manter nossos clientes atualizados sobre mudanças legislativas que impactam seus negócios."
                  </p>
                  <p className="text-sm font-medium mt-2">
                    — Dr. Alexandre Fernandes, Sócio-fundador
                  </p>
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

export default Newsletter;

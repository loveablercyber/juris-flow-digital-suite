
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";

const AreaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  
  const practiceAreas = [
    {
      id: "trabalhista",
      title: "Direito Trabalhista",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: "Assessoria completa em questões trabalhistas, defendendo direitos de empregados e empregadores.",
      fullDescription: "Nosso departamento trabalhista oferece assessoria jurídica completa em todas as questões relacionadas às relações de trabalho, tanto para empregados quanto para empregadores. Atuamos na defesa de direitos trabalhistas, na elaboração e revisão de contratos de trabalho, representação em negociações coletivas, e patrocínio de causas perante a Justiça do Trabalho.",
      benefits: [
        "Análise personalizada de cada caso",
        "Profissionais especializados em normas trabalhistas",
        "Experiência em negociações e acordos",
        "Assessoria preventiva para evitar litígios",
        "Representação em todas as instâncias trabalhistas"
      ],
      services: [
        "Elaboração e análise de contratos de trabalho",
        "Representação em processos trabalhistas",
        "Defesa em reclamações trabalhistas",
        "Assessoria em acordos e rescisões contratuais",
        "Orientação sobre normas regulamentadoras",
        "Consultoria para compliance trabalhista",
        "Representação em negociações sindicais",
        "Defesa em autos de infração"
      ],
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop"
    },
    {
      id: "civil",
      title: "Direito Civil",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Soluções para contratos, responsabilidade civil, direitos do consumidor e outras questões civis.",
      fullDescription: "Nossa prática civil abrange todas as áreas do Direito Civil, incluindo contratos, responsabilidade civil, direitos reais, obrigações e direitos do consumidor. Com ampla experiência e conhecimento técnico, oferecemos assistência jurídica personalizada para garantir a defesa de seus direitos e interesses.",
      benefits: [
        "Atendimento personalizado e humanizado",
        "Soluções jurídicas inovadoras",
        "Rigor técnico nas análises",
        "Transparência em todos os procedimentos",
        "Estratégias focadas em resultados"
      ],
      services: [
        "Elaboração e revisão de contratos civis",
        "Ações de indenização por danos morais e materiais",
        "Defesa em ações de cobrança",
        "Ações de usucapião e questões imobiliárias",
        "Ações de direito do consumidor",
        "Consultoria para relações contratuais",
        "Litígios e disputas civis",
        "Defesa em ações de responsabilidade civil"
      ],
      coverImage: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=1200&h=400&fit=crop"
    },
    {
      id: "familia",
      title: "Direito de Família",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Orientação humanizada em divórcio, guarda de filhos, pensão alimentícia e outros assuntos familiares.",
      fullDescription: "Nossa equipe de Direito de Família trabalha com sensibilidade e profissionalismo para conduzir questões familiares delicadas. Oferecemos assessoria jurídica completa em processos de divórcio, guarda de filhos, pensão alimentícia, reconhecimento de paternidade, inventários e outros assuntos relacionados ao direito familiar.",
      benefits: [
        "Atendimento sensível e empático",
        "Busca por soluções consensuais",
        "Proteção dos interesses dos menores",
        "Confidencialidade absoluta",
        "Experiência em mediação familiar"
      ],
      services: [
        "Divórcio consensual e litigioso",
        "Guarda de filhos e regulamentação de visitas",
        "Pensão alimentícia",
        "Investigação de paternidade",
        "Inventário e partilha de bens",
        "União estável e seu reconhecimento",
        "Adoção e tutela",
        "Planejamento sucessório familiar"
      ],
      coverImage: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1200&h=400&fit=crop"
    },
    {
      id: "previdenciario",
      title: "Direito Previdenciário",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Especialistas em aposentadorias, benefícios por incapacidade e demais questões previdenciárias.",
      fullDescription: "Nosso departamento previdenciário possui ampla experiência na análise, planejamento e obtenção de benefícios previdenciários. Oferecemos assessoria completa para aposentadorias, auxílios-doença, pensões por morte e outros benefícios, atuando administrativamente junto ao INSS e judicialmente quando necessário.",
      benefits: [
        "Análise detalhada do histórico contributivo",
        "Verificação da melhor regra para aposentadoria",
        "Acompanhamento em perícias médicas",
        "Estratégias para concessão de benefícios",
        "Suporte em todas as etapas administrativas"
      ],
      services: [
        "Planejamento de aposentadoria",
        "Aposentadoria por tempo de contribuição",
        "Aposentadoria por idade",
        "Aposentadoria especial",
        "Benefício por incapacidade temporária e permanente",
        "Pensão por morte",
        "Revisão de benefícios",
        "Recursos administrativos junto ao INSS"
      ],
      coverImage: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=1200&h=400&fit=crop"
    },
    {
      id: "tributario",
      title: "Direito Tributário",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Assessoria fiscal estratégica, defesas tributárias e planejamento fiscal personalizado.",
      fullDescription: "Nossa equipe tributária oferece soluções estratégicas para questões fiscais complexas, com foco na redução da carga tributária de forma legal e segura. Atuamos no contencioso administrativo e judicial, bem como no planejamento tributário preventivo para empresas e pessoas físicas.",
      benefits: [
        "Economia fiscal dentro da legalidade",
        "Prevenção de contingências tributárias",
        "Análise de riscos e oportunidades fiscais",
        "Defesa assertiva em processos fiscais",
        "Monitoramento de mudanças legislativas"
      ],
      services: [
        "Planejamento tributário",
        "Consultoria fiscal estratégica",
        "Defesa em processos administrativos fiscais",
        "Defesa em execuções fiscais",
        "Recuperação de tributos pagos indevidamente",
        "Análise de enquadramento tributário",
        "Obtenção de regimes especiais",
        "Consultoria para transações societárias"
      ],
      coverImage: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1200&h=400&fit=crop"
    },
    {
      id: "empresarial",
      title: "Direito Empresarial",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: "Suporte jurídico completo para empresas, desde a constituição até fusões e aquisições.",
      fullDescription: "Nosso departamento empresarial oferece assessoria jurídica completa para empresas de todos os portes, desde startups até grandes corporações. Atuamos em todas as etapas da vida empresarial, desde a constituição e estruturação societária até operações complexas de fusões e aquisições, sempre com foco na segurança jurídica e nos objetivos estratégicos de nossos clientes.",
      benefits: [
        "Análise de riscos jurídicos e oportunidades",
        "Suporte estratégico para decisões empresariais",
        "Proteção de ativos empresariais",
        "Conformidade regulatória e legal",
        "Estruturação eficiente de operações"
      ],
      services: [
        "Constituição de empresas",
        "Elaboração e revisão de contratos empresariais",
        "Planejamento societário",
        "Fusões e aquisições",
        "Due diligence legal",
        "Governança corporativa",
        "Recuperação judicial e falência",
        "Propriedade intelectual e proteção de marcas"
      ],
      coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=400&fit=crop"
    }
  ];

  const area = practiceAreas.find(area => area.id === id);

  useEffect(() => {
    // Set page title
    document.title = area ? `${area.title} | ADVOCACIALEX` : "Área de Atuação | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [area]);

  if (!area) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Área não encontrada</h1>
          <p className="mb-8">A área que você está procurando não foi encontrada.</p>
          <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
            <Link to="/areas-de-atuacao">Ver Todas as Áreas</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={area.coverImage} 
              alt={area.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/70 dark:bg-navy-950/80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {area.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl">
                  {area.description}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center mt-8 md:mt-0">
                <div className="bg-white/10 p-8 rounded-full backdrop-blur-sm">
                  <div className="text-gold-400">
                    {area.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Sobre nossa atuação em <span className="text-navy-500 dark:text-gold-400">{area.title}</span></h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {area.fullDescription}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Nossos diferenciais</h3>
                <ul className="space-y-4">
                  {area.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-navy-500 dark:text-gold-400 mt-1">
                        <Check size={20} />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Serviços Oferecidos</h3>
                <ul className="space-y-4">
                  {area.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-navy-500 dark:text-gold-400 mt-1">
                        <ArrowRight size={20} />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Precisa de assistência em {area.title}?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para analisar seu caso e oferecer 
              as melhores estratégias jurídicas. Entre em contato hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                <Link to="/atendimento">Agendar Consulta</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800">
                <Link to="/contato">Entrar em Contato</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Outras Áreas de Atuação</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {practiceAreas
                .filter(a => a.id !== area.id)
                .slice(0, 3)
                .map((relatedArea) => (
                  <Card key={relatedArea.id} className="border border-gray-100 dark:border-navy-700 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="mb-4 text-navy-500 dark:text-gold-400">
                        {relatedArea.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{relatedArea.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {relatedArea.description}
                      </p>
                      <Button asChild variant="outline" className="w-full border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800">
                        <Link to={`/areas-de-atuacao/${relatedArea.id}`}>Saiba Mais</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                <Link to="/areas-de-atuacao">Ver Todas as Áreas</Link>
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

export default AreaDetalhe;


import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AreasDeAtuacao = () => {
  useEffect(() => {
    // Set page title
    document.title = "Áreas de Atuação | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const practiceAreas = [
    {
      id: "trabalhista",
      title: "Direito Trabalhista",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: "Assessoria completa em questões trabalhistas, defendendo direitos de empregados e empregadores.",
      fullDescription: "Nosso departamento trabalhista oferece assessoria jurídica completa em todas as questões relacionadas às relações de trabalho, tanto para empregados quanto para empregadores. Atuamos na defesa de direitos trabalhistas, na elaboração e revisão de contratos de trabalho, representação em negociações coletivas, e patrocínio de causas perante a Justiça do Trabalho.",
      services: [
        "Elaboração e análise de contratos de trabalho",
        "Representação em processos trabalhistas",
        "Defesa em reclamações trabalhistas",
        "Assessoria em acordos e rescisões contratuais",
        "Orientação sobre normas regulamentadoras",
        "Consultoria para compliance trabalhista",
        "Representação em negociações sindicais",
        "Defesa em autos de infração"
      ]
    },
    {
      id: "civil",
      title: "Direito Civil",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Soluções para contratos, responsabilidade civil, direitos do consumidor e outras questões civis.",
      fullDescription: "Nossa prática civil abrange todas as áreas do Direito Civil, incluindo contratos, responsabilidade civil, direitos reais, obrigações e direitos do consumidor. Com ampla experiência e conhecimento técnico, oferecemos assistência jurídica personalizada para garantir a defesa de seus direitos e interesses.",
      services: [
        "Elaboração e revisão de contratos civis",
        "Ações de indenização por danos morais e materiais",
        "Defesa em ações de cobrança",
        "Ações de usucapião e questões imobiliárias",
        "Ações de direito do consumidor",
        "Consultoria para relações contratuais",
        "Litígios e disputas civis",
        "Defesa em ações de responsabilidade civil"
      ]
    },
    {
      id: "familia",
      title: "Direito de Família",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Orientação humanizada em divórcio, guarda de filhos, pensão alimentícia e outros assuntos familiares.",
      fullDescription: "Nossa equipe de Direito de Família trabalha com sensibilidade e profissionalismo para conduzir questões familiares delicadas. Oferecemos assessoria jurídica completa em processos de divórcio, guarda de filhos, pensão alimentícia, reconhecimento de paternidade, inventários e outros assuntos relacionados ao direito familiar.",
      services: [
        "Divórcio consensual e litigioso",
        "Guarda de filhos e regulamentação de visitas",
        "Pensão alimentícia",
        "Investigação de paternidade",
        "Inventário e partilha de bens",
        "União estável e seu reconhecimento",
        "Adoção e tutela",
        "Planejamento sucessório familiar"
      ]
    },
    {
      id: "previdenciario",
      title: "Direito Previdenciário",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Especialistas em aposentadorias, benefícios por incapacidade e demais questões previdenciárias.",
      fullDescription: "Nosso departamento previdenciário possui ampla experiência na análise, planejamento e obtenção de benefícios previdenciários. Oferecemos assessoria completa para aposentadorias, auxílios-doença, pensões por morte e outros benefícios, atuando administrativamente junto ao INSS e judicialmente quando necessário.",
      services: [
        "Planejamento de aposentadoria",
        "Aposentadoria por tempo de contribuição",
        "Aposentadoria por idade",
        "Aposentadoria especial",
        "Benefício por incapacidade temporária e permanente",
        "Pensão por morte",
        "Revisão de benefícios",
        "Recursos administrativos junto ao INSS"
      ]
    },
    {
      id: "tributario",
      title: "Direito Tributário",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Assessoria fiscal estratégica, defesas tributárias e planejamento fiscal personalizado.",
      fullDescription: "Nossa equipe tributária oferece soluções estratégicas para questões fiscais complexas, com foco na redução da carga tributária de forma legal e segura. Atuamos no contencioso administrativo e judicial, bem como no planejamento tributário preventivo para empresas e pessoas físicas.",
      services: [
        "Planejamento tributário",
        "Consultoria fiscal estratégica",
        "Defesa em processos administrativos fiscais",
        "Defesa em execuções fiscais",
        "Recuperação de tributos pagos indevidamente",
        "Análise de enquadramento tributário",
        "Obtenção de regimes especiais",
        "Consultoria para transações societárias"
      ]
    },
    {
      id: "empresarial",
      title: "Direito Empresarial",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: "Suporte jurídico completo para empresas, desde a constituição até fusões e aquisições.",
      fullDescription: "Nosso departamento empresarial oferece assessoria jurídica completa para empresas de todos os portes, desde startups até grandes corporações. Atuamos em todas as etapas da vida empresarial, desde a constituição e estruturação societária até operações complexas de fusões e aquisições, sempre com foco na segurança jurídica e nos objetivos estratégicos de nossos clientes.",
      services: [
        "Constituição de empresas",
        "Elaboração e revisão de contratos empresariais",
        "Planejamento societário",
        "Fusões e aquisições",
        "Due diligence legal",
        "Governança corporativa",
        "Recuperação judicial e falência",
        "Propriedade intelectual e proteção de marcas"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 bg-navy-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Áreas de <span className="text-gold-400">Atuação</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Nossa equipe multidisciplinar está preparada para oferecer soluções 
              jurídicas de excelência em diversas áreas do Direito.
            </p>
          </div>
        </section>

        {/* Areas Overview */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Especialidades <span className="text-navy-500 dark:text-gold-400">Jurídicas</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Contamos com profissionais especializados em diversas áreas do Direito, 
                prontos para atender às suas necessidades com excelência e dedicação.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreas.map((area) => (
                <Card key={area.id} className="border border-gray-100 dark:border-navy-700 overflow-hidden transition-transform hover:-translate-y-2 duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 text-navy-500 dark:text-gold-400">
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {area.description}
                    </p>
                    <Button asChild className="w-full bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                      <Link to={`/areas-de-atuacao/${area.id}`}>Saiba Mais</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto">
            <div className="bg-navy-500 dark:bg-navy-700 rounded-xl overflow-hidden shadow-xl">
              <div className="relative p-8 md:p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Precisa de assessoria jurídica especializada?</h2>
                  <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                    Entre em contato conosco hoje mesmo para uma consulta inicial. 
                    Nossa equipe está pronta para analisar seu caso e oferecer a melhor solução.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-white text-navy-800 hover:bg-gold-400">
                      <Link to="/atendimento">Agendar Consulta</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      <Link to="/contato">Falar com Advogado</Link>
                    </Button>
                  </div>
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

export default AreasDeAtuacao;

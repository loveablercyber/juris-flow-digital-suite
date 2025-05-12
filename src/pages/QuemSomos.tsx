
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuemSomos = () => {
  useEffect(() => {
    // Set page title
    document.title = "Quem Somos | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Carlos Mendes",
      position: "Sócio-fundador",
      area: "Direito Empresarial",
      bio: "Mais de 20 anos de experiência em direito empresarial e tributário. Formado pela USP com mestrado pela PUC-SP.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Dra. Ana Paula Silveira",
      position: "Sócia-fundadora",
      area: "Direito Civil",
      bio: "Especialista em direito civil e contratos. Formada pela UFMG com doutorado pela USP.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Dr. Roberto Almeida",
      position: "Sócio",
      area: "Direito Trabalhista",
      bio: "Advogado com vasta experiência em causas trabalhistas. Formado pela FGV com especialização em Direito do Trabalho.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Dra. Juliana Costa",
      position: "Sócia",
      area: "Direito de Família",
      bio: "Especialista em Direito de Família e Sucessões. Formada pela PUC-RJ com mestrado pela UERJ.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    }
  ];

  const values = [
    {
      title: "Excelência",
      description: "Comprometimento com a qualidade e resultados superiores em tudo que fazemos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Ética",
      description: "Atuação pautada na integridade, transparência e respeito à legislação e às pessoas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Inovação",
      description: "Busca constante por soluções criativas e uso de tecnologia para melhorar nossos serviços.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Compromisso",
      description: "Dedicação total aos interesses e necessidades dos nossos clientes em cada caso.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
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
              Quem <span className="text-gold-400">Somos</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Conheça nossa história, valores e a equipe que faz da ADVOCACIALEX um escritório 
              de referência no mercado jurídico brasileiro.
            </p>
          </div>
        </section>

        {/* História e Missão */}
        <section className="py-16 md:py-24 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581974944026-5d6ed762f617?q=80&w=1000" 
                  alt="Sede da ADVOCACIALEX" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-navy-500 dark:bg-gold-400 p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white dark:text-navy-800">2008</p>
                    <p className="text-sm text-white/80 dark:text-navy-800">Ano de Fundação</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Nossa <span className="text-navy-500 dark:text-gold-400">História</span></h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Fundada em 2008 pelos advogados Carlos Mendes e Ana Paula Silveira, a ADVOCACIALEX 
                  nasceu com a visão de oferecer serviços jurídicos de excelência, combinando experiência 
                  técnica com um atendimento personalizado e humanizado.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  O que começou como um escritório especializado em direito empresarial rapidamente 
                  expandiu para outras áreas do Direito, graças à reputação de seriedade e resultados 
                  consistentes obtidos pela equipe.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Hoje, contamos com uma equipe multidisciplinar de 20 advogados especializados em 
                  diversas áreas, mantendo o mesmo compromisso com a qualidade e a ética que nos 
                  guiou desde o primeiro dia.
                </p>
                
                <div className="border-l-4 border-navy-500 dark:border-gold-400 pl-6 mb-8">
                  <h3 className="text-xl font-bold mb-2">Nossa Missão</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Oferecer soluções jurídicas efetivas, éticas e personalizadas, contribuindo para o 
                    sucesso de nossos clientes e para o fortalecimento de um sistema de justiça mais 
                    acessível e transparente.
                  </p>
                </div>
                
                <div className="border-l-4 border-navy-500 dark:border-gold-400 pl-6">
                  <h3 className="text-xl font-bold mb-2">Nossa Visão</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Ser reconhecida como referência de excelência em advocacia, combinando tradição e 
                    inovação para superar os desafios jurídicos contemporâneos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Valores */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos <span className="text-navy-500 dark:text-gold-400">Valores</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Princípios que guiam nossa atuação e nosso relacionamento com clientes, 
                parceiros e colaboradores.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white dark:bg-navy-700 p-6 rounded-xl shadow-md">
                  <div className="text-navy-500 dark:text-gold-400 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Equipe */}
        <section className="py-16 md:py-24 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa <span className="text-navy-500 dark:text-gold-400">Equipe</span></h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Conheça os profissionais que compõem nossa equipe e fazem da ADVOCACIALEX 
                um escritório de referência no mercado jurídico.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white dark:bg-navy-700 rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-2 duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-navy-500 dark:text-gold-400 text-sm mb-1">{member.position}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{member.area}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                <Link to="/atendimento">Fale com Nossa Equipe</Link>
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

export default QuemSomos;

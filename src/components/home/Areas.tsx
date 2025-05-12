
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const practiceAreas = [
  {
    id: "trabalhista",
    title: "Direito Trabalhista",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "Defesa de direitos trabalhistas, resolução de conflitos e consultoria preventiva para empresas e empregados."
  },
  {
    id: "civil",
    title: "Direito Civil",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: "Atuação em contratos, responsabilidade civil, direitos do consumidor e outras questões civis."
  },
  {
    id: "familia",
    title: "Direito de Família",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description: "Suporte em divórcio, pensão alimentícia, guarda de filhos, inventário e outros assuntos familiares."
  },
  {
    id: "previdenciario",
    title: "Direito Previdenciário",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: "Orientação e representação em aposentadorias, benefícios por incapacidade e demais questões previdenciárias."
  },
  {
    id: "tributario",
    title: "Direito Tributário",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description: "Consultoria fiscal estratégica, defesas tributárias e planejamento fiscal para pessoas físicas e jurídicas."
  },
  {
    id: "empresarial",
    title: "Direito Empresarial",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "Assessoria em constituição de empresas, contratos comerciais, fusões e aquisições, e disputas societárias."
  }
];

const Areas = () => {
  return (
    <section className="section-padding bg-white dark:bg-navy-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Áreas de <span className="text-navy-500 dark:text-gold-400">Atuação</span></h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nossa equipe de advogados especializados está preparada para 
            oferecer soluções jurídicas personalizadas em diversas áreas do Direito.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <Card key={area.id} className="border border-gray-100 dark:border-navy-700 card-hover overflow-hidden">
              <CardContent className="pt-6">
                <div className="mb-4 text-navy-500 dark:text-gold-400">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {area.description}
                </p>
                <Button asChild variant="outline" className="border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800">
                  <Link to={`/areas-de-atuacao/${area.id}`}>Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
            <Link to="/areas-de-atuacao">Ver Todas as Áreas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Areas;

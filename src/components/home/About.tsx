
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-navy-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000" 
                alt="Equipe de Advogados" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-navy-700 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-500 dark:text-gold-400">15+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Anos de Experiência</p>
                </div>
                <div className="h-12 mx-6 border-r border-gray-300 dark:border-gray-600"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-500 dark:text-gold-400">100+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Clientes Satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre a <span className="text-navy-500 dark:text-gold-400">ADVOCACIALEX</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Fundada em 2008, a ADVOCACIALEX se estabeleceu no mercado como um escritório de advocacia 
              de referência, reconhecido pela excelência técnica, comprometimento ético 
              e resultados consistentes em favor de nossos clientes.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nossa equipe é composta por profissionais altamente qualificados, com formação 
              nas melhores instituições de ensino do país e constante atualização jurídica, 
              garantindo um atendimento personalizado e soluções eficientes para cada caso.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Atendimento Personalizado</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Análise detalhada de cada caso com abordagem individualizada.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Equipe Especializada</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Profissionais com formação e experiência em diversas áreas.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Tecnologia Jurídica</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Uso de sistemas avançados para gestão de processos e casos.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Transparência</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Comunicação clara e honesta sobre processos e custos.</p>
                </div>
              </div>
            </div>
            
            <Button asChild size="lg" className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
              <Link to="/quem-somos">Conheça Nossa História</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

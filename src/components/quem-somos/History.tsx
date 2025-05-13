
import React from "react";

const History = () => {
  return (
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
  );
};

export default History;

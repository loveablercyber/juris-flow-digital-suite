import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-r from-navy-500 to-navy-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-600/20 to-navy-800/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Excelência Jurídica e <span className="text-gold-400">Resultados</span> que Transformam
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Nossa equipe especializada está pronta para defender seus direitos e interesses 
              com dedicação, estratégia e profissionalismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gold-400 hover:bg-gold-500 text-navy-800 font-medium">
                <Link to="/atendimento">Fale com um Advogado</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/areas-de-atuacao">Conheça Nossas Áreas</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/70">Mais de</p>
                  <p className="font-bold">500+ Casos Vencidos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/70">Experiência de</p>
                  <p className="font-bold">15+ Anos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/70">Equipe de</p>
                  <p className="font-bold">20+ Especialistas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl animate-scale-in bg-navy-600/50 h-[500px] flex items-center justify-center">
              <p className="text-white/50 text-lg">Imagem do Hero</p>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/90 to-transparent p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gold-400 flex items-center justify-center text-navy-800 text-xl font-bold">
                    A+
                  </div>
                  <div>
                    <p className="font-bold text-lg">Avaliação Excelente</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-navy-800 p-4 rounded-lg shadow-lg animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Atendimento 24h</p>
                  <p className="font-bold text-navy-800 dark:text-white">Sempre Disponível</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

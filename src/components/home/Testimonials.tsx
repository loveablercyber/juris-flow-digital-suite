
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    position: "Direito Trabalhista",
    location: "São Paulo - SP",
    content: "O atendimento prestado pela equipe foi excepcional. Meu processo trabalhista foi conduzido com grande profissionalismo e dedicação, resultando em um desfecho positivo para meu caso.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Mariana Costa",
    position: "Direito Civil",
    location: "Rio de Janeiro - RJ",
    content: "Agradeço à advocaciaLEX pela assessoria jurídica prestada em meu processo de indenização. A equipe foi atenciosa, competente e conseguiu um resultado melhor do que eu esperava.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Roberto Mendes",
    position: "Direito de Família",
    location: "Belo Horizonte - MG",
    content: "Em um momento delicado como um divórcio, tive o suporte necessário para resolver tudo com o mínimo de estresse possível. Profissionais empáticos e altamente qualificados.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Fernanda Almeida",
    position: "Direito Previdenciário",
    location: "Curitiba - PR",
    content: "Após anos tentando resolver minha aposentadoria sozinha, em apenas alguns meses a advocaciaLEX conseguiu resolver meu caso. Profissionalismo e eficiência que fazem a diferença.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  }
];

const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 320; // Approximately the width of a card + gap
    const currentScroll = scrollContainerRef.current.scrollLeft;
    
    scrollContainerRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section-padding bg-white dark:bg-navy-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos <span className="text-navy-500 dark:text-gold-400">clientes</span> dizem</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A satisfação de nossos clientes é a nossa principal prioridade e o reflexo do nosso compromisso com a excelência jurídica.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-full border border-gray-300 bg-white dark:bg-navy-700 shadow-md"
              onClick={() => scroll('left')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Previous</span>
            </Button>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="min-w-[300px] max-w-[300px] border border-gray-100 dark:border-navy-700 card-hover snap-center">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-navy-500 dark:text-gold-400">{testimonial.position}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-full border border-gray-300 bg-white dark:bg-navy-700 shadow-md"
              onClick={() => scroll('right')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

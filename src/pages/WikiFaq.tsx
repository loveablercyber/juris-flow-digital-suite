
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Book, FileText } from "lucide-react";
import WhatsAppButton from "@/components/home/WhatsAppButton";

const WikiFaq = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Legal terms data (normally would come from a database)
  const legalTerms = [
    {
      id: "1",
      category: "Direito Civil",
      terms: [
        { 
          term: "Habeas Corpus", 
          definition: "Ação constitucional que visa proteger o direito de ir e vir do cidadão, quando este sofre ou se acha ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder." 
        },
        { 
          term: "Dano Moral", 
          definition: "Lesão de direitos cujo conteúdo não é pecuniário, nem comercialmente redutível a dinheiro, como os direitos da personalidade, direito à imagem, à honra, à privacidade, à integridade da esfera íntima." 
        },
        { 
          term: "Usucapião", 
          definition: "Forma de aquisição da propriedade, mediante a posse prolongada e ininterrupta da coisa, acrescida de outros requisitos legais." 
        },
      ]
    },
    {
      id: "2",
      category: "Direito Trabalhista",
      terms: [
        { 
          term: "Aviso Prévio", 
          definition: "Comunicação antecipada e obrigatória que uma parte deve dar à outra para manifestar seu desejo de rescindir o contrato de trabalho, sem justa causa." 
        },
        { 
          term: "FGTS", 
          definition: "Fundo de Garantia do Tempo de Serviço. É um depósito mensal, referente a um percentual de 8% do salário do empregado, que o empregador fica obrigado a depositar em uma conta vinculada ao contrato de trabalho." 
        },
        { 
          term: "Justa Causa", 
          definition: "Motivo relevante que justifica a rescisão do contrato de trabalho pelo empregador, sem indenização ao empregado, devido a uma falta grave cometida por este." 
        },
      ]
    },
    {
      id: "3",
      category: "Direito Tributário",
      terms: [
        { 
          term: "Fato Gerador", 
          definition: "Situação definida em lei como necessária e suficiente para originar a obrigação tributária." 
        },
        { 
          term: "ICMS", 
          definition: "Imposto sobre Circulação de Mercadorias e Serviços. É um tributo estadual que incide sobre operações relativas à circulação de mercadorias e sobre prestações de serviços de transporte interestadual, intermunicipal e de comunicação." 
        },
        { 
          term: "Contribuinte", 
          definition: "Pessoa física ou jurídica que tem relação pessoal e direta com o fato gerador do tributo." 
        },
      ]
    },
  ];

  // Filter terms based on search
  const filteredTerms = searchTerm 
    ? legalTerms.map(category => ({
        ...category,
        terms: category.terms.filter(term => 
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.terms.length > 0)
    : legalTerms;

  useEffect(() => {
    document.title = "Wiki Jurídico & FAQ | ADVOCACIALEX";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center mb-6">
              <Book className="h-8 w-8 mr-3" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl">Wiki Jurídico & FAQ</h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">
              Consulte nossa biblioteca completa de termos jurídicos e respostas para as dúvidas mais frequentes.
              Conhecimento jurídico simplificado para melhor entendimento.
            </p>
          </div>
        </section>

        {/* Search & Wiki Content */}
        <section className="container mx-auto max-w-5xl px-4 py-10">
          <div className="mb-10">
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Pesquisar termos jurídicos..."
                className="pl-4 pr-10 py-3 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((category) => (
                <div key={category.id} className="border rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-medium mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.terms.map((item, index) => (
                      <AccordionItem key={index} value={`item-${category.id}-${index}`}>
                        <AccordionTrigger className="text-lg font-medium">
                          {item.term}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.definition}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">
                  Nenhum termo encontrado para "{searchTerm}". Tente outra pesquisa.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WikiFaq;

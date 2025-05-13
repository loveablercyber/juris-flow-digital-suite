
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Tag } from "lucide-react";

const Blog = () => {
  useEffect(() => {
    // Set page title
    document.title = "Blog Jurídico | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const blogPosts = [
    {
      id: 1,
      title: "Reforma trabalhista: Principais impactos para empregados e empregadores",
      excerpt: "Conheça as principais mudanças trazidas pela reforma e como elas afetam os direitos e deveres nas relações de trabalho.",
      date: "12 Abr 2023",
      category: "Direito Trabalhista",
      author: "Dr. Carlos Mendes",
      image: "https://images.unsplash.com/photo-1521791055366-0d553381c47a?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "A importância do planejamento tributário para empresas em crescimento",
      excerpt: "Um bom planejamento tributário pode significar economia significativa e evitar problemas futuros com o fisco.",
      date: "28 Mar 2023",
      category: "Direito Tributário",
      author: "Dra. Ana Paula Silveira",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Guarda compartilhada: Vantagens e pontos de atenção",
      excerpt: "Entenda como funciona a guarda compartilhada e os benefícios que ela pode trazer para o desenvolvimento dos filhos.",
      date: "15 Mar 2023",
      category: "Direito de Família",
      author: "Dra. Juliana Costa",
      image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Direito do consumidor no e-commerce: O que você precisa saber",
      excerpt: "Conheça seus direitos nas compras online e saiba como se proteger de fraudes e práticas abusivas.",
      date: "02 Mar 2023",
      category: "Direito Civil",
      author: "Dr. Roberto Almeida",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Aposentadoria especial: Quem tem direito e como solicitar",
      excerpt: "Entenda os requisitos para a aposentadoria especial e como comprovar a exposição a agentes nocivos.",
      date: "18 Fev 2023",
      category: "Direito Previdenciário",
      author: "Dr. Carlos Mendes",
      image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=500&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Contratos de prestação de serviços: Cláusulas essenciais para proteção empresarial",
      excerpt: "Conheça as cláusulas que não podem faltar em contratos de prestação de serviços para proteger sua empresa.",
      date: "05 Fev 2023",
      category: "Direito Empresarial",
      author: "Dra. Ana Paula Silveira",
      image: "https://images.unsplash.com/photo-1604537372129-e0dba21f1166?w=500&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Reforma da Previdência: Como calcular sua aposentadoria com as novas regras",
      excerpt: "Aprenda a calcular o tempo de contribuição e o valor do benefício com as mudanças implementadas pela reforma.",
      date: "22 Jan 2023",
      category: "Direito Previdenciário",
      author: "Dr. Roberto Almeida",
      image: "https://images.unsplash.com/photo-1469571486292-b53601021b5a?w=500&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Home office e seus impactos nas relações de trabalho",
      excerpt: "Como o trabalho remoto mudou as relações trabalhistas e quais aspectos jurídicos precisam ser observados.",
      date: "10 Jan 2023",
      category: "Direito Trabalhista",
      author: "Dr. Carlos Mendes",
      image: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=500&h=300&fit=crop"
    },
    {
      id: 9,
      title: "Recuperação judicial: Uma alternativa para empresas em crise",
      excerpt: "Entenda como funciona o processo de recuperação judicial e quando ele pode ser a melhor opção para sua empresa.",
      date: "28 Dez 2022",
      category: "Direito Empresarial",
      author: "Dra. Ana Paula Silveira",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=300&fit=crop"
    }
  ];
  
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 bg-navy-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423592707957-3b212afa6733?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog <span className="text-gold-400">Jurídico</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Acompanhe nossos artigos, análises e atualizações sobre os principais 
              temas jurídicos e novidades legislativas.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-700">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="search" 
                  placeholder="Pesquisar artigos..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button 
                  variant={selectedCategory === null ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null ? "bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500" : ""}
                >
                  Todos
                </Button>
                
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={selectedCategory === category ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-navy-800">
          <div className="container mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="border border-gray-100 dark:border-navy-700 card-hover overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs px-3 py-1 bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-gold-400 rounded-full flex items-center gap-1">
                          <Tag size={12} />
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-navy-500 dark:hover:text-gold-400 transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.author}
                        </span>
                        
                        <Button asChild variant="link" className="p-0 text-navy-500 dark:text-gold-400 hover:text-navy-700 dark:hover:text-gold-500">
                          <Link to={`/blog/${post.id}`} className="flex items-center">
                            Ler mais
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Nenhum artigo encontrado</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Não encontramos nenhum artigo com os critérios de busca utilizados. 
                  Tente novamente com outros termos ou categorias.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                  }}
                  className="border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-800"
                >
                  Limpar Busca
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto max-w-4xl bg-navy-500 dark:bg-navy-700 rounded-xl overflow-hidden shadow-xl">
            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466723177128-00af077aca60?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
              <div className="relative z-10 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Receba nosso conteúdo</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Inscreva-se em nossa newsletter e receba gratuitamente artigos, análises 
                  jurídicas e atualizações legislativas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Seu melhor email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 sm:flex-1"
                  />
                  <Button className="bg-gold-400 hover:bg-gold-500 text-navy-800">
                    Inscrever-se
                  </Button>
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

export default Blog;

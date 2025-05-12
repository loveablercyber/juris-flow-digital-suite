
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Reforma trabalhista: Principais impactos para empregados e empregadores",
    excerpt: "Conheça as principais mudanças trazidas pela reforma e como elas afetam os direitos e deveres nas relações de trabalho.",
    date: "12 Abr 2023",
    category: "Direito Trabalhista",
    image: "https://images.unsplash.com/photo-1521791055366-0d553381c47a?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    title: "A importância do planejamento tributário para empresas em crescimento",
    excerpt: "Um bom planejamento tributário pode significar economia significativa e evitar problemas futuros com o fisco.",
    date: "28 Mar 2023",
    category: "Direito Tributário",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Guarda compartilhada: Vantagens e pontos de atenção",
    excerpt: "Entenda como funciona a guarda compartilhada e os benefícios que ela pode trazer para o desenvolvimento dos filhos.",
    date: "15 Mar 2023",
    category: "Direito de Família",
    image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=500&h=300&fit=crop"
  }
];

const Blog = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-navy-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Blog <span className="text-navy-500 dark:text-gold-400">Jurídico</span></h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Acompanhe nosso conteúdo sobre temas jurídicos relevantes e atualizações da legislação.
            </p>
          </div>
          
          <Button asChild variant="outline" className="mt-4 md:mt-0 border-navy-500 text-navy-500 hover:bg-navy-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-navy-700">
            <Link to="/blog">Ver Todos os Artigos</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
                  <span className="text-xs px-3 py-1 bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-gold-400 rounded-full">
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
                
                <Button asChild variant="link" className="p-0 text-navy-500 dark:text-gold-400 hover:text-navy-700 dark:hover:text-gold-500">
                  <Link to={`/blog/${post.id}`} className="flex items-center">
                    Ler mais
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

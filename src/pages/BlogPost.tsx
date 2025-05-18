import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, Tag, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Database of blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Reforma trabalhista: Principais impactos para empregados e empregadores",
      excerpt: "Conheça as principais mudanças trazidas pela reforma e como elas afetam os direitos e deveres nas relações de trabalho.",
      date: "12 Abr 2023",
      readTime: "8 min",
      category: "Direito Trabalhista",
      author: "Dr. Carlos Mendes",
      authorTitle: "Advogado especialista em Direito Trabalhista",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
      image: "https://images.unsplash.com/photo-1521791055366-0d553381c47a?w=1200&h=500&fit=crop",
      content: `
        <p>A reforma trabalhista, implementada pela Lei nº 13.467/2017, trouxe mudanças significativas para as relações de trabalho no Brasil. Após mais de cinco anos de sua entrada em vigor, é possível avaliar com maior clareza os impactos dessas alterações para empregados e empregadores.</p>
        
        <h2>Principais mudanças da reforma</h2>
        
        <p>A reforma trabalhista alterou mais de 100 pontos da CLT (Consolidação das Leis do Trabalho), com o objetivo de modernizar as relações trabalhistas e reduzir a insegurança jurídica. Entre as principais mudanças, destacam-se:</p>
        
        <ul>
          <li>Prevalência do negociado sobre o legislado</li>
          <li>Novas modalidades de contratação (trabalho intermitente, teletrabalho)</li>
          <li>Flexibilização da jornada de trabalho</li>
          <li>Alteração nas regras de férias e banco de horas</li>
          <li>Mudanças nas contribuições sindicais</li>
          <li>Novas regras para processos trabalhistas</li>
        </ul>
        
        <h2>Impactos para os empregadores</h2>
        
        <p>Para os empregadores, a reforma trouxe maior flexibilidade na gestão da mão de obra e redução de custos trabalhistas. A possibilidade de negociação direta com os empregados, sem a necessidade de intermediação sindical em alguns casos, também foi vista como um ponto positivo.</p>
        
        <p>Além disso, as novas modalidades de contratação permitiram adequar a força de trabalho às demandas sazonais e específicas de cada setor, contribuindo para uma gestão mais eficiente dos recursos humanos.</p>
        
        <h2>Impactos para os empregados</h2>
        
        <p>Já para os empregados, a reforma teve impactos diversos. Por um lado, houve maior flexibilidade de horários e condições de trabalho, permitindo arranjos que podem favorecer a conciliação entre vida profissional e pessoal. Por outro lado, algumas categorias profissionais enfrentaram maior precarização e insegurança nos vínculos de trabalho.</p>
        
        <p>A redução do poder de negociação coletiva dos sindicatos, com o fim da contribuição sindical obrigatória, também afetou a representatividade dos trabalhadores em negociações com empregadores.</p>
        
        <h2>Desafios jurídicos pós-reforma</h2>
        
        <p>Mesmo após anos de vigência, a reforma trabalhista ainda gera discussões e interpretações divergentes no meio jurídico. A Justiça do Trabalho tem sido chamada frequentemente a se manifestar sobre pontos controversos da nova legislação.</p>
        
        <p>Nesse cenário, tanto empregados quanto empregadores precisam estar bem assessorados juridicamente para evitar litígios e garantir que seus direitos sejam respeitados.</p>
        
        <h2>Conclusão</h2>
        
        <p>A reforma trabalhista representou uma mudança significativa no paradigma das relações de trabalho no Brasil. Embora tenha trazido maior flexibilidade e modernização em alguns aspectos, também gerou desafios e pontos de atenção que merecem ser observados.</p>
        
        <p>O ideal é que tanto empregados quanto empregadores busquem conhecer seus direitos e deveres, além de contar com assessoria jurídica especializada para garantir o cumprimento da legislação e a segurança jurídica nas relações trabalhistas.</p>
      `
    },
    {
      id: 2,
      title: "A importância do planejamento tributário para empresas em crescimento",
      excerpt: "Um bom planejamento tributário pode significar economia significativa e evitar problemas futuros com o fisco.",
      date: "28 Mar 2023",
      readTime: "6 min",
      category: "Direito Tributário",
      author: "Dra. Ana Paula Silveira",
      authorTitle: "Advogada especialista em Direito Tributário",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=500&fit=crop",
      content: `
        <p>O planejamento tributário é uma ferramenta indispensável para empresas em crescimento. Através dele, é possível identificar oportunidades de economia fiscal dentro da legalidade, evitando o pagamento desnecessário de tributos e prevenindo problemas com as autoridades fiscais.</p>
        
        <h2>O que é planejamento tributário?</h2>
        
        <p>Planejamento tributário é o conjunto de ações preventivas que visam identificar e aplicar a forma menos onerosa para o cumprimento das obrigações fiscais de uma empresa. Diferentemente da sonegação, que é ilegal, o planejamento tributário utiliza meios legítimos para reduzir a carga tributária.</p>
        
        <h2>Por que é importante para empresas em crescimento?</h2>
        
        <p>As empresas em fase de crescimento enfrentam desafios específicos no campo tributário. O aumento do faturamento geralmente implica em mudanças na tributação, como a transição entre regimes tributários (Simples Nacional, Lucro Presumido ou Lucro Real). Sem um planejamento adequado, essa transição pode resultar em aumento desproporcional da carga tributária.</p>
        
        <p>Além disso, empresas em crescimento frequentemente expandem suas operações para novos estados ou até para o exterior, o que traz complexidades adicionais ao cumprimento das obrigações fiscais.</p>
        
        <h2>Benefícios do planejamento tributário</h2>
        
        <ul>
          <li>Redução legal da carga tributária</li>
          <li>Prevenção de autuações fiscais</li>
          <li>Melhoria do fluxo de caixa</li>
          <li>Aumento da competitividade</li>
          <li>Maior segurança nas decisões empresariais</li>
          <li>Valorização da empresa</li>
        </ul>
        
        <h2>Estratégias de planejamento tributário</h2>
        
        <p>Entre as principais estratégias de planejamento tributário para empresas em crescimento, destacam-se:</p>
        
        <p><strong>Escolha do regime tributário adequado:</strong> A seleção entre Simples Nacional, Lucro Presumido ou Lucro Real deve considerar não apenas o faturamento atual da empresa, mas também projeções futuras e a natureza das operações.</p>
        
        <p><strong>Aproveitamento de incentivos fiscais:</strong> Muitos estados e municípios oferecem incentivos fiscais para empresas que investem em determinadas regiões ou setores.</p>
        
        <p><strong>Estruturação societária adequada:</strong> A forma como a empresa está estruturada pode impactar significativamente sua carga tributária.</p>
        
        <p><strong>Recuperação de créditos tributários:</strong> Identificar e recuperar créditos tributários que a empresa tem direito, mas que não estão sendo aproveitados.</p>
        
        <h2>Riscos do não-planejamento</h2>
        
        <p>A ausência de planejamento tributário pode resultar em diversos problemas, como pagamento excessivo de tributos, autuações fiscais por erros no cumprimento de obrigações acessórias, perda de competitividade e até comprometimento da saúde financeira da empresa.</p>
        
        <h2>Conclusão</h2>
        
        <p>O planejamento tributário é um investimento que traz retornos significativos para empresas em crescimento. Ao contar com assessoria jurídica especializada, é possível identificar as melhores estratégias fiscais e garantir o cumprimento da legislação, contribuindo para o crescimento sustentável do negócio.</p>
        
        <p>Lembre-se: a diferença entre elisão fiscal (legal) e evasão fiscal (ilegal) está justamente no planejamento prévio e na observância rigorosa da legislação.</p>
      `
    },
    {
      id: 3,
      title: "Guarda compartilhada: Vantagens e pontos de atenção",
      excerpt: "Entenda como funciona a guarda compartilhada e os benefícios que ela pode trazer para o desenvolvimento dos filhos.",
      date: "15 Mar 2023",
      readTime: "7 min",
      category: "Direito de Família",
      author: "Dra. Juliana Costa",
      authorTitle: "Advogada especialista em Direito de Família",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1200&h=500&fit=crop",
      content: `
        <p>A guarda compartilhada tem se tornado cada vez mais comum no Brasil, especialmente após a Lei nº 13.058/2014, que estabeleceu essa modalidade como regra nos casos de dissolução conjugal. Essa forma de guarda busca garantir a participação efetiva de ambos os pais na criação dos filhos, mesmo após o término do relacionamento.</p>
        
        <h2>O que é guarda compartilhada?</h2>
        
        <p>Na guarda compartilhada, ambos os pais exercem igualmente a guarda legal dos filhos, compartilhando decisões importantes sobre educação, saúde, religião e outras questões fundamentais para o desenvolvimento da criança. Isso não significa, necessariamente, que o tempo de convivência seja dividido igualmente, mas sim que as responsabilidades e decisões sejam conjuntas.</p>
        
        <h2>Diferenças entre guarda compartilhada e guarda alternada</h2>
        
        <p>É comum haver confusão entre guarda compartilhada e guarda alternada. Na guarda alternada, a criança passa períodos alternados (como semanas ou meses) com cada um dos pais, que exercem com exclusividade os direitos e deveres parentais durante esse período. Essa modalidade não é recomendada pelos especialistas e raramente é concedida pelo Judiciário brasileiro, pois pode causar instabilidade emocional para a criança.</p>
        
        <h2>Vantagens da guarda compartilhada</h2>
        
        <ul>
          <li>Manutenção dos vínculos afetivos com ambos os pais</li>
          <li>Divisão equilibrada de responsabilidades</li>
          <li>Redução de conflitos relacionados às decisões sobre os filhos</li>
          <li>Maior estabilidade emocional para as crianças</li>
          <li>Desenvolvimento mais saudável e equilibrado</li>
          <li>Menor sobrecarga para o genitor que seria o guardião exclusivo</li>
        </ul>
        
        <h2>Pontos de atenção</h2>
        
        <p>Apesar das vantagens, a guarda compartilhada exige alguns cuidados para funcionar adequadamente:</p>
        
        <p><strong>Boa comunicação entre os pais:</strong> É fundamental que os genitores mantenham um canal de comunicação respeitoso, focado exclusivamente nos interesses dos filhos.</p>
        
        <p><strong>Flexibilidade:</strong> É importante que ambos estejam dispostos a fazer ajustes na rotina e nas combinações conforme necessário.</p>
        
        <p><strong>Proximidade geográfica:</strong> Para facilitar a logística do dia a dia, é recomendável que os pais residam relativamente próximos um do outro.</p>
        
        <p><strong>Consistência de regras:</strong> Manter regras e limites consistentes em ambas as casas contribui para a segurança emocional da criança.</p>
        
        <h2>Quando a guarda compartilhada não é recomendada</h2>
        
        <p>Em alguns casos, a guarda compartilhada pode não ser a melhor opção:</p>
        
        <p><strong>Violência doméstica:</strong> Quando há histórico de violência por parte de um dos genitores.</p>
        
        <p><strong>Alienação parental grave:</strong> Casos em que um dos pais sistematicamente busca prejudicar a relação da criança com o outro genitor.</p>
        
        <p><strong>Abandono afetivo:</strong> Quando um dos pais demonstra desinteresse em participar ativamente da vida dos filhos.</p>
        
        <h2>Como implementar a guarda compartilhada</h2>
        
        <p>A implementação da guarda compartilhada pode ocorrer por acordo entre os pais ou por determinação judicial. É recomendável que seja elaborado um plano de parentalidade detalhado, abordando questões como:</p>
        
        <ul>
          <li>Rotina de convivência</li>
          <li>Divisão de despesas</li>
          <li>Responsabilidades específicas de cada genitor</li>
          <li>Formas de tomada de decisão conjunta</li>
          <li>Procedimentos para resolução de conflitos</li>
        </ul>
        
        <h2>Conclusão</h2>
        
        <p>A guarda compartilhada representa um avanço significativo no reconhecimento da importância de ambos os pais na criação dos filhos. Quando bem implementada, traz benefícios duradouros para o desenvolvimento infantil e para a relação familiar como um todo.</p>
        
        <p>Para que funcione adequadamente, é fundamental que os pais coloquem os interesses dos filhos acima de suas diferenças pessoais e busquem apoio jurídico e, quando necessário, psicológico para lidar com os desafios dessa modalidade de guarda.</p>
      `
    }
  ];
  
  const post = blogPosts.find(post => post.id === Number(id));
  
  // Related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== Number(id) && p.category === post?.category)
    .slice(0, 3);
  
  useEffect(() => {
    // Set page title
    document.title = post ? `${post.title} | ADVOCACIALEX` : "Blog | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="mb-8">O artigo que você está procurando não foi encontrado.</p>
          <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
            <Link to="/blog">Voltar para o Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/70 dark:bg-navy-950/80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center text-xs font-medium mb-4">
                <Tag size={14} className="mr-2 text-gold-400" />
                <span className="text-gold-400">{post.category}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <CalendarDays size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime} de leitura</span>
                </div>
                <div className="flex items-center">
                  <img 
                    src={post.authorImage} 
                    alt={post.author} 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-4 bg-white dark:bg-navy-900">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg dark:prose-invert max-w-none lg:prose-xl prose-headings:text-navy-700 dark:prose-headings:text-gold-400 prose-a:text-navy-500 dark:prose-a:text-gold-400 mb-8" dangerouslySetInnerHTML={{ __html: post.content }}>
                </article>
                
                {/* Share Section */}
                <div className="border-t border-gray-200 dark:border-navy-700 pt-6 mt-12">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2 flex items-center">
                        <Share2 className="mr-2" size={18} />
                        Compartilhe este artigo
                      </h3>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" aria-label="Compartilhar no Facebook" className="rounded-full h-10 w-10">
                          <Facebook size={18} />
                        </Button>
                        <Button size="icon" variant="outline" aria-label="Compartilhar no Twitter" className="rounded-full h-10 w-10">
                          <Twitter size={18} />
                        </Button>
                        <Button size="icon" variant="outline" aria-label="Compartilhar no LinkedIn" className="rounded-full h-10 w-10">
                          <Linkedin size={18} />
                        </Button>
                        <Button size="icon" variant="outline" aria-label="Compartilhar por Email" className="rounded-full h-10 w-10">
                          <Mail size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
                      <Link to="/atendimento">Falar com Especialista</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Author Section */}
                <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-6 mt-12">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-1">{post.author}</h3>
                      <p className="text-navy-500 dark:text-gold-400 text-sm mb-4">{post.authorTitle}</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Advogado(a) especializado(a) com vasta experiência na área. 
                        Formado(a) por uma das mais prestigiadas instituições do país e com 
                        constante atualização em sua área de atuação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Related Posts */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-navy-700 pb-2">
                    Artigos Relacionados
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.id} className="border border-gray-100 dark:border-navy-700 overflow-hidden">
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2 line-clamp-2 hover:text-navy-500 dark:hover:text-gold-400 transition-colors">
                            <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                          </h4>
                          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{relatedPost.date}</span>
                            <span>{relatedPost.readTime} de leitura</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-navy-700 pb-2">
                    Categorias
                  </h3>
                  <div className="space-y-2">
                    {Array.from(new Set(blogPosts.map(post => post.category))).map((category) => (
                      <Button 
                        key={category} 
                        asChild 
                        variant="outline" 
                        className="mr-2 mb-2 w-full justify-start border-navy-200 hover:border-navy-500 hover:bg-navy-50 dark:border-navy-700 dark:hover:border-gold-400 dark:hover:bg-navy-800"
                      >
                        <Link to={`/blog?categoria=${category}`} className="flex items-center">
                          <Tag size={14} className="mr-2" />
                          <span>{category}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="bg-navy-500 dark:bg-navy-700 text-white rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Precisa de assistência jurídica?</h3>
                  <p className="text-white/80 mb-6">
                    Entre em contato com nossos especialistas para uma consulta personalizada.
                  </p>
                  <Button asChild className="w-full bg-white text-navy-800 hover:bg-gold-400">
                    <Link to="/atendimento">Agendar Consulta</Link>
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

export default BlogPost;

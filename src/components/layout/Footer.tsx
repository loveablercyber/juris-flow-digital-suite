
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy-500 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ADVOCACIA<span className="text-gold-400">LEX</span></h3>
            <p className="text-white/80 mb-4">
              Soluções jurídicas com excelência e dedicação para proteger seus direitos e interesses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/quem-somos" className="text-white/80 hover:text-gold-400 transition-colors">Quem Somos</Link></li>
              <li><Link to="/areas-de-atuacao" className="text-white/80 hover:text-gold-400 transition-colors">Áreas de Atuação</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-gold-400 transition-colors">Blog Jurídico</Link></li>
              <li><Link to="/atendimento" className="text-white/80 hover:text-gold-400 transition-colors">Atendimento</Link></li>
              <li><Link to="/contato" className="text-white/80 hover:text-gold-400 transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Áreas de Atuação</h4>
            <ul className="space-y-2">
              <li><Link to="/areas-de-atuacao/trabalhista" className="text-white/80 hover:text-gold-400 transition-colors">Direito Trabalhista</Link></li>
              <li><Link to="/areas-de-atuacao/civil" className="text-white/80 hover:text-gold-400 transition-colors">Direito Civil</Link></li>
              <li><Link to="/areas-de-atuacao/familia" className="text-white/80 hover:text-gold-400 transition-colors">Direito de Família</Link></li>
              <li><Link to="/areas-de-atuacao/previdenciario" className="text-white/80 hover:text-gold-400 transition-colors">Direito Previdenciário</Link></li>
              <li><Link to="/areas-de-atuacao/tributario" className="text-white/80 hover:text-gold-400 transition-colors">Direito Tributário</Link></li>
              <li><Link to="/areas-de-atuacao/empresarial" className="text-white/80 hover:text-gold-400 transition-colors">Direito Empresarial</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <address className="not-italic text-white/80 space-y-2">
              <p>Av. Paulista, 1000, Conjunto 101</p>
              <p>Bela Vista, São Paulo - SP</p>
              <p>CEP: 01310-000</p>
              <p className="pt-2">Telefone: (11) 3000-0000</p>
              <p>Email: contato@advocacialex.com.br</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ADVOCACIALEX. Todos os direitos reservados. OAB/SP 123.456
            </p>
            <div className="flex gap-4">
              <Link to="/termos" className="text-white/70 hover:text-gold-400 transition-colors text-sm">Termos de Uso</Link>
              <Link to="/privacidade" className="text-white/70 hover:text-gold-400 transition-colors text-sm">Política de Privacidade</Link>
              <Link to="/denuncia" className="text-white/70 hover:text-gold-400 transition-colors text-sm">Denúncia</Link>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              SSL Seguro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

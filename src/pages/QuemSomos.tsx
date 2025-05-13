
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import Hero from "@/components/quem-somos/Hero";
import History from "@/components/quem-somos/History";
import Values from "@/components/quem-somos/Values";
import Team from "@/components/quem-somos/Team";

const QuemSomos = () => {
  useEffect(() => {
    // Set page title
    document.title = "Quem Somos | ADVOCACIALEX";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero />
        <History />
        <Values />
        <Team />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default QuemSomos;

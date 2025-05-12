
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Areas from "@/components/home/Areas";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";
import Contact from "@/components/home/Contact";
import WhatsAppButton from "@/components/home/WhatsAppButton";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "ADVOCACIALEX | Excelência Jurídica";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero />
        <Areas />
        <About />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

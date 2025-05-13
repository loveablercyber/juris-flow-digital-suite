
import React from "react";

const Hero = () => {
  return (
    <section className="relative py-24 bg-navy-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Quem <span className="text-gold-400">Somos</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
          Conheça nossa história, valores e a equipe que faz da ADVOCACIALEX um escritório 
          de referência no mercado jurídico brasileiro.
        </p>
      </div>
    </section>
  );
};

export default Hero;

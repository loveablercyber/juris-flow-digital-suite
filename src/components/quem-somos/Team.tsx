
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TeamMember from "./TeamMember";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Carlos Mendes",
      position: "Sócio-fundador",
      area: "Direito Empresarial",
      bio: "Mais de 20 anos de experiência em direito empresarial e tributário. Formado pela USP com mestrado pela PUC-SP.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Dra. Ana Paula Silveira",
      position: "Sócia-fundadora",
      area: "Direito Civil",
      bio: "Especialista em direito civil e contratos. Formada pela UFMG com doutorado pela USP.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Dr. Roberto Almeida",
      position: "Sócio",
      area: "Direito Trabalhista",
      bio: "Advogado com vasta experiência em causas trabalhistas. Formado pela FGV com especialização em Direito do Trabalho.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Dra. Juliana Costa",
      position: "Sócia",
      area: "Direito de Família",
      bio: "Especialista em Direito de Família e Sucessões. Formada pela PUC-RJ com mestrado pela UERJ.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white dark:bg-navy-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nossa <span className="text-navy-500 dark:text-gold-400">Equipe</span></h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conheça os profissionais que compõem nossa equipe e fazem da ADVOCACIALEX 
            um escritório de referência no mercado jurídico.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              position={member.position}
              area={member.area}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-navy-500 hover:bg-navy-600 dark:bg-gold-400 dark:text-navy-800 dark:hover:bg-gold-500">
            <Link to="/atendimento">Fale com Nossa Equipe</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Team;

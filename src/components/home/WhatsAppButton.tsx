import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { availabilityApi } from "@/api/availability";
import { User } from "@/types/database";

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lawyers, setLawyers] = useState<Partial<User>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnlineLawyers = async () => {
      try {
        const onlineLawyers = await availabilityApi.getOnlineLawyers();
        setLawyers(onlineLawyers);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar advogados online:', error);
        setLoading(false);
      }
    };

    if (isExpanded) {
      fetchOnlineLawyers();
    }
  }, [isExpanded]);

  const handleWhatsAppClick = (phoneNumber: string) => {
    const message = 'Olá! Gostaria de falar sobre um atendimento jurídico.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 bg-white dark:bg-navy-700 p-4 rounded-lg shadow-lg w-64 animate-fade-in">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Atendimento Online
          </h3>
          
          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : lawyers.length > 0 ? (
            <div className="space-y-3">
              {lawyers.map((lawyer) => (
                <div key={lawyer.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-navy-600 rounded-md">
                  <div className="relative">
                    <img 
                      src={lawyer.photoUrl || 'https://via.placeholder.com/40'} 
                      alt={lawyer.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{lawyer.name}</p>
                    <button 
                      onClick={() => handleWhatsAppClick(lawyer.whatsappNumber || '')}
                      className="text-xs text-green-600 dark:text-green-400 hover:underline"
                    >
                      Iniciar conversa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              Nenhum advogado disponível no momento.
            </div>
          )}
        </div>
      )}

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-14 w-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <FaWhatsapp className="h-8 w-8" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;

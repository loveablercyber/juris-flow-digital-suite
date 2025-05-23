import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { availabilityApi } from '@/api/availability';
import { useToast } from '@/components/ui/use-toast';

const AvailabilityToggle = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Aqui você pode buscar o status atual do usuário
      // Por enquanto, vamos usar um estado local
      setIsOnline(false);
      setLoading(false);
    }
  }, []);

  const handleToggle = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      const newStatus = !isOnline;
      await availabilityApi.setAvailability(userId, newStatus);
      setIsOnline(newStatus);

      toast({
        title: newStatus ? 'Disponível para atendimento' : 'Indisponível para atendimento',
        description: newStatus 
          ? 'Você está visível para clientes no botão de WhatsApp' 
          : 'Você não está visível para clientes no momento',
      });
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar sua disponibilidade',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-navy-700 rounded-lg shadow">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Status de Atendimento
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isOnline 
            ? 'Você está disponível para atendimento via WhatsApp' 
            : 'Você está indisponível para atendimento'}
        </p>
      </div>
      <Switch
        checked={isOnline}
        onCheckedChange={handleToggle}
        className={`${isOnline ? 'bg-green-500' : 'bg-gray-200'}`}
      />
    </div>
  );
};

export default AvailabilityToggle; 
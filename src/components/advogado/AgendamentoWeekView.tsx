
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

type TipoAgendamento = "presencial" | "videoconferencia";
type StatusAgendamento = "pendente" | "confirmado" | "concluido" | "cancelado";

interface Agendamento {
  id: string;
  data: Date;
  horario: string;
  tipo: TipoAgendamento;
  status: StatusAgendamento;
  cliente: Cliente;
  assunto: string;
  observacoes: string;
  advogado?: string;
  areaInteresse?: string;
  detalhesCase?: string;
}

interface AgendamentoWeekViewProps {
  semana: Date[];
  agendamentos: Agendamento[];
  onDateSelect: (date: Date) => void;
}

export const AgendamentoWeekView: React.FC<AgendamentoWeekViewProps> = ({
  semana,
  agendamentos,
  onDateSelect
}) => {
  // Horas de trabalho padrão (9h às 18h)
  const horasTrabalho = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);
  
  // Método para verificar se existe agendamento em determinado dia e hora
  const getAgendamento = (dia: Date, hora: string) => {
    return agendamentos.find(agendamento => 
      agendamento.data.getDate() === dia.getDate() && 
      agendamento.data.getMonth() === dia.getMonth() && 
      agendamento.data.getFullYear() === dia.getFullYear() &&
      agendamento.horario.startsWith(hora.split(":")[0])
    );
  };
  
  // Estilo para células com agendamento
  const getAgendamentoStyle = (agendamento: Agendamento | undefined) => {
    if (!agendamento) return "";
    
    switch (agendamento.status) {
      case "confirmado": return "bg-green-100 dark:bg-green-900/30 border-l-2 border-green-500";
      case "pendente": return "bg-yellow-100 dark:bg-yellow-900/30 border-l-2 border-yellow-500";
      case "concluido": return "bg-blue-100 dark:bg-blue-900/30 border-l-2 border-blue-500";
      case "cancelado": return "bg-red-100 dark:bg-red-900/30 border-l-2 border-red-500";
      default: return "bg-gray-100 dark:bg-gray-800/50";
    }
  };
  
  // Indica se o dia está no passado (para desabilitar)
  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  return (
    <div className="w-full overflow-hidden">
      <ScrollArea className="h-[600px]">
        <div className="min-w-[800px]">
          {/* Cabeçalho dos dias da semana */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 border-r text-center font-medium"></div>
            {semana.map((dia, index) => (
              <div 
                key={index} 
                className={`p-2 text-center border-r font-medium ${
                  isPastDay(dia) ? "text-muted-foreground" : ""
                } ${
                  new Date().toDateString() === dia.toDateString() ? "bg-primary/10" : ""
                }`}
                onClick={() => onDateSelect(dia)}
                role="button"
              >
                <div>{format(dia, "EEE", { locale: ptBR })}</div>
                <div className={`text-xl ${isPastDay(dia) ? "text-muted-foreground" : ""}`}>
                  {format(dia, "dd")}
                </div>
              </div>
            ))}
          </div>
          
          {/* Grade de horários */}
          {horasTrabalho.map((hora, rowIndex) => (
            <div key={hora} className="grid grid-cols-8 border-b hover:bg-muted/50">
              {/* Célula de hora */}
              <div className="p-2 border-r text-center text-sm font-medium flex items-center justify-center">
                {hora}
              </div>
              
              {/* Células de agendamento */}
              {semana.map((dia, colIndex) => {
                const agendamento = getAgendamento(dia, hora);
                
                return (
                  <div 
                    key={`${rowIndex}-${colIndex}`} 
                    className={`p-2 border-r min-h-[80px] ${getAgendamentoStyle(agendamento)} ${
                      isPastDay(dia) ? "bg-muted/30" : ""
                    }`}
                    onClick={() => {
                      if (!isPastDay(dia)) {
                        onDateSelect(dia);
                      }
                    }}
                    role={isPastDay(dia) ? "cell" : "button"}
                  >
                    {agendamento && (
                      <div className="h-full flex flex-col">
                        <div className="text-sm font-medium">
                          {agendamento.cliente.nome}
                        </div>
                        <div className="text-xs mb-1">
                          {agendamento.horario}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {agendamento.assunto}
                        </div>
                        {agendamento.advogado && (
                          <div className="text-xs mt-1">
                            <span className="font-medium">Advogado:</span> {agendamento.advogado}
                          </div>
                        )}
                        {agendamento.areaInteresse && (
                          <div className="text-xs">
                            <span className="font-medium">Área:</span> {agendamento.areaInteresse}
                          </div>
                        )}
                        <div className="mt-auto pt-1">
                          <Badge variant={agendamento.tipo === "presencial" ? "outline" : "secondary"} className="text-xs">
                            {agendamento.tipo === "presencial" ? "Presencial" : "Vídeo"}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

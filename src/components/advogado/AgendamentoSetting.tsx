
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface Horario {
  inicio: string;
  fim: string;
}

interface DiaSemana {
  dia: string;
  disponivel: boolean;
  horarios: Horario[];
}

interface ConfiguracaoAgenda {
  diasSemana: DiaSemana[];
  duracaoConsulta: number;
  intervaloConsultas: number;
}

interface AgendamentoSettingProps {
  configuracaoAgenda: ConfiguracaoAgenda;
  onSave: (config: ConfiguracaoAgenda) => void;
  onCancel: () => void;
}

export const AgendamentoSetting: React.FC<AgendamentoSettingProps> = ({
  configuracaoAgenda,
  onSave,
  onCancel
}) => {
  const [config, setConfig] = useState<ConfiguracaoAgenda>({ ...configuracaoAgenda });
  
  // Função para atualizar a disponibilidade de um dia da semana
  const handleToggleDia = (index: number) => {
    const novosDias = [...config.diasSemana];
    novosDias[index].disponivel = !novosDias[index].disponivel;
    
    // Se tornar disponível e não houver horários, adiciona um horário padrão
    if (novosDias[index].disponivel && novosDias[index].horarios.length === 0) {
      novosDias[index].horarios = [{ inicio: "09:00", fim: "18:00" }];
    }
    
    setConfig({ ...config, diasSemana: novosDias });
  };
  
  // Função para adicionar um novo horário a um dia
  const handleAddHorario = (diaIndex: number) => {
    const novosDias = [...config.diasSemana];
    novosDias[diaIndex].horarios.push({ inicio: "09:00", fim: "18:00" });
    setConfig({ ...config, diasSemana: novosDias });
  };
  
  // Função para remover um horário de um dia
  const handleRemoveHorario = (diaIndex: number, horarioIndex: number) => {
    const novosDias = [...config.diasSemana];
    novosDias[diaIndex].horarios.splice(horarioIndex, 1);
    setConfig({ ...config, diasSemana: novosDias });
  };
  
  // Função para atualizar um horário
  const handleUpdateHorario = (diaIndex: number, horarioIndex: number, campo: "inicio" | "fim", valor: string) => {
    const novosDias = [...config.diasSemana];
    novosDias[diaIndex].horarios[horarioIndex][campo] = valor;
    setConfig({ ...config, diasSemana: novosDias });
  };
  
  // Função para obter o nome formatado do dia
  const getDiaFormatado = (dia: string): string => {
    switch (dia) {
      case "segunda": return "Segunda-feira";
      case "terça": return "Terça-feira";
      case "quarta": return "Quarta-feira";
      case "quinta": return "Quinta-feira";
      case "sexta": return "Sexta-feira";
      case "sábado": return "Sábado";
      case "domingo": return "Domingo";
      default: return dia;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Duração e Intervalos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duracao">Duração padrão da consulta (minutos)</Label>
            <Input 
              id="duracao" 
              type="number" 
              min="15" 
              max="240" 
              step="15"
              value={config.duracaoConsulta} 
              onChange={(e) => setConfig({...config, duracaoConsulta: parseInt(e.target.value) || 60})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="intervalo">Intervalo entre consultas (minutos)</Label>
            <Input 
              id="intervalo" 
              type="number" 
              min="0" 
              max="60" 
              step="5"
              value={config.intervaloConsultas} 
              onChange={(e) => setConfig({...config, intervaloConsultas: parseInt(e.target.value) || 15})}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disponibilidade Semanal</h3>
        <p className="text-sm text-muted-foreground">
          Configure os dias e horários em que estará disponível para atendimentos.
        </p>
        
        <div className="space-y-6">
          {config.diasSemana.map((dia, diaIndex) => (
            <Card key={dia.dia} className={dia.disponivel ? "" : "opacity-80"}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Switch 
                      id={`dia-${diaIndex}`}
                      checked={dia.disponivel}
                      onCheckedChange={() => handleToggleDia(diaIndex)}
                    />
                    <Label htmlFor={`dia-${diaIndex}`} className="font-medium">
                      {getDiaFormatado(dia.dia)}
                    </Label>
                    
                    {!dia.disponivel && (
                      <Badge variant="outline" className="ml-2">
                        Indisponível
                      </Badge>
                    )}
                  </div>
                  
                  {dia.disponivel && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddHorario(diaIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Horário
                    </Button>
                  )}
                </div>
                
                {dia.disponivel && (
                  <div className="space-y-4">
                    {dia.horarios.map((horario, horarioIndex) => (
                      <div 
                        key={horarioIndex} 
                        className="grid grid-cols-[1fr,1fr,auto] gap-3 items-center"
                      >
                        <div className="space-y-1">
                          <Label htmlFor={`inicio-${diaIndex}-${horarioIndex}`} className="text-xs">
                            Início
                          </Label>
                          <Input 
                            id={`inicio-${diaIndex}-${horarioIndex}`}
                            type="time" 
                            value={horario.inicio} 
                            onChange={(e) => handleUpdateHorario(diaIndex, horarioIndex, "inicio", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor={`fim-${diaIndex}-${horarioIndex}`} className="text-xs">
                            Fim
                          </Label>
                          <Input 
                            id={`fim-${diaIndex}-${horarioIndex}`}
                            type="time" 
                            value={horario.fim} 
                            onChange={(e) => handleUpdateHorario(diaIndex, horarioIndex, "fim", e.target.value)}
                          />
                        </div>
                        
                        {dia.horarios.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-5"
                            onClick={() => handleRemoveHorario(diaIndex, horarioIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={() => onSave(config)}>
          Salvar Configurações
        </Button>
      </DialogFooter>
    </div>
  );
};

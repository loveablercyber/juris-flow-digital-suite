
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Event = {
  id: string;
  title: string;
  date: Date;
  type: "audiência" | "prazo" | "reunião" | "outro";
  time: string;
  description: string;
};

const Calendario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Audiência trabalhista",
      date: new Date(2025, 4, 20),
      type: "audiência",
      time: "14:00",
      description: "Audiência trabalhista caso Silva vs. Empresa XYZ"
    },
    {
      id: "2",
      title: "Prazo recursal",
      date: new Date(2025, 4, 22),
      type: "prazo",
      time: "23:59",
      description: "Prazo final para recurso de apelação processo nº 2023-0002"
    },
    {
      id: "3", 
      title: "Reunião com cliente", 
      date: new Date(2025, 4, 18), 
      type: "reunião",
      time: "10:30",
      description: "Reunião com João Pereira sobre andamento do processo"
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    type: "outro",
    time: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddEvent = () => {
    setIsEditing(false);
    setEventDetails({
      title: "",
      date: date || new Date(),
      type: "outro",
      time: "",
      description: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setIsEditing(true);
    setEventDetails(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Evento removido",
      description: "O evento foi removido do calendário"
    });
  };

  const handleSaveEvent = () => {
    if (!eventDetails.title || !eventDetails.date || !eventDetails.time) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && eventDetails.id) {
      setEvents(events.map(event => 
        event.id === eventDetails.id ? { ...eventDetails as Event } : event
      ));
      toast({
        title: "Evento atualizado",
        description: "As alterações foram salvas com sucesso"
      });
    } else {
      const newEvent = {
        ...eventDetails,
        id: Date.now().toString()
      } as Event;
      
      setEvents([...events, newEvent]);
      toast({
        title: "Evento adicionado",
        description: "O novo evento foi adicionado ao calendário"
      });
    }
    
    setIsDialogOpen(false);
  };

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    event => date && 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Get event dates for highlighting in the calendar
  const eventDates = events.map(event => event.date);

  // Helper for event type styling
  const getEventTypeStyle = (type: string) => {
    switch(type) {
      case "audiência": return "bg-purple-100 text-purple-800 border-purple-300";
      case "prazo": return "bg-red-100 text-red-800 border-red-300";
      case "reunião": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendário de Prazos e Audiências</h1>
        <Button onClick={handleAddEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
              modifiers={{
                event: eventDates
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  borderRadius: "0"
                }
              }}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                date.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              ) : "Selecione uma data"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`p-4 border rounded-lg flex justify-between items-start ${getEventTypeStyle(event.type)}`}
                    onClick={() => handleEditEvent(event)}
                  >
                    <div>
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                      <p className="text-sm mt-2">{event.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Nenhum evento para esta data</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={handleAddEvent}
                >
                  Adicionar evento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog for adding/editing events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Evento" : "Adicionar Novo Evento"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Atualize os detalhes do evento abaixo."
                : "Preencha os detalhes do novo evento."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título*</Label>
              <Input
                id="title"
                value={eventDetails.title || ""}
                onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Data*</Label>
                <Input 
                  type="date" 
                  value={eventDetails.date ? eventDetails.date.toISOString().slice(0, 10) : ""} 
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setEventDetails({...eventDetails, date: newDate});
                  }}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Hora*</Label>
                <Input 
                  type="time" 
                  value={eventDetails.time || ""} 
                  onChange={(e) => setEventDetails({...eventDetails, time: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Tipo</Label>
              <Select 
                value={eventDetails.type} 
                onValueChange={(value) => setEventDetails({...eventDetails, type: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audiência">Audiência</SelectItem>
                  <SelectItem value="prazo">Prazo</SelectItem>
                  <SelectItem value="reunião">Reunião</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={eventDetails.description || ""}
                onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSaveEvent}>
              {isEditing ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendario;

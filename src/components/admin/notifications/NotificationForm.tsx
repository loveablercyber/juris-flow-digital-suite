
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar as CalendarIcon, Users, User } from "lucide-react";

import { notificationService } from "@/services/notificationService";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { NotificationPriority, NotificationUserType } from "@/types/notification";

const notificationSchema = z.object({
  titulo: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  mensagem: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
  tipoUsuario: z.enum(["advogado", "cliente", "todos"]),
  destinatarioId: z.string().optional(),
  prioridade: z.enum(["alta", "media", "baixa"]),
  expiraEm: z.date().optional()
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

type Usuario = {
  id: string;
  nome: string;
  tipo: "advogado" | "cliente";
  email: string;
};

interface NotificationFormProps {
  onSubmit: (data: NotificationFormValues) => void;
  notificationData: {
    title: string;
    message: string;
  };
}

// Mock data for users
const mockUsuarios: Usuario[] = [
  { id: "1", nome: "João Silva", tipo: "advogado", email: "joao@exemplo.com" },
  { id: "2", nome: "Maria Oliveira", tipo: "advogado", email: "maria@exemplo.com" },
  { id: "3", nome: "Pedro Santos", tipo: "cliente", email: "pedro@exemplo.com" },
  { id: "4", nome: "Ana Costa", tipo: "cliente", email: "ana@exemplo.com" },
];

const NotificationForm: React.FC<NotificationFormProps> = ({ onSubmit, notificationData }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      titulo: "",
      mensagem: "",
      tipoUsuario: "todos",
      prioridade: "media"
    },
  });
  
  const tipoUsuarioSelecionado = form.watch("tipoUsuario");
  
  // Filter users based on selected user type
  useEffect(() => {
    if (tipoUsuarioSelecionado !== "todos") {
      setUsuariosFiltrados(usuarios.filter(u => u.tipo === tipoUsuarioSelecionado));
    } else {
      setUsuariosFiltrados(usuarios);
    }
    
    // Reset destinatário when changing user type
    form.setValue("destinatarioId", undefined);
  }, [tipoUsuarioSelecionado, usuarios, form]);
  
  // Load users (in a real app, this would fetch from API)
  useEffect(() => {
    setUsuarios(mockUsuarios);
    setUsuariosFiltrados(mockUsuarios);
  }, []);

  const handleSubmit = (data: NotificationFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título da notificação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Digite o conteúdo da mensagem" 
                  className="min-h-[150px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Você pode usar tags HTML básicas para formatação
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tipoUsuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Usuário</FormLabel>
              <FormControl>
                <RadioGroup 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advogado" />
                    </FormControl>
                    <FormLabel className="font-normal">Advogados</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cliente" />
                    </FormControl>
                    <FormLabel className="font-normal">Clientes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="todos" />
                    </FormControl>
                    <FormLabel className="font-normal">Todos</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {tipoUsuarioSelecionado !== "todos" && (
          <FormField
            control={form.control}
            name="destinatarioId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destinatário Específico (opcional)</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um destinatário específico (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os {tipoUsuarioSelecionado}s</SelectItem>
                      {usuariosFiltrados.map((usuario) => (
                        <SelectItem key={usuario.id} value={usuario.id}>
                          {usuario.nome} ({usuario.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Deixe em branco para enviar a todos os {tipoUsuarioSelecionado}s
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="prioridade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="expiraEm"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Expiração (opcional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP", { locale: pt })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                A notificação não será mais exibida após esta data
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Enviar Notificação
        </Button>
      </form>
    </Form>
  );
};

export default NotificationForm;

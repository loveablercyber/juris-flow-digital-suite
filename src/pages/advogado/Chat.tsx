
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Send, PaperclipIcon, Image, FileText, Phone, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
};

type Contact = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage?: {
    text: string;
    timestamp: string;
    unread: boolean;
  };
  online: boolean;
};

// Mock data
const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Dra. Maria Santos",
    role: "Advogada",
    avatar: "/placeholder.svg",
    lastMessage: {
      text: "Vou analisar o caso e te retorno ainda hoje",
      timestamp: "10:30",
      unread: true,
    },
    online: true,
  },
  {
    id: "2",
    name: "Dr. Paulo Oliveira",
    role: "Advogado Sênior",
    avatar: "/placeholder.svg",
    lastMessage: {
      text: "Os autos foram digitalizados",
      timestamp: "09:15",
      unread: false,
    },
    online: false,
  },
  {
    id: "3",
    name: "Suporte Técnico",
    role: "Atendimento",
    avatar: "/placeholder.svg",
    lastMessage: {
      text: "Seu ticket foi resolvido",
      timestamp: "Ontem",
      unread: false,
    },
    online: true,
  },
  {
    id: "4",
    name: "Amanda Silva",
    role: "Secretária",
    avatar: "/placeholder.svg",
    lastMessage: {
      text: "Reunião confirmada para amanhã às 14h",
      timestamp: "Ontem",
      unread: false,
    },
    online: false,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      text: "Bom dia Dr. João, tudo bem?",
      timestamp: "10:15",
      read: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      text: "Bom dia Dra. Maria, tudo ótimo e você?",
      timestamp: "10:17",
      read: true,
    },
    {
      id: "m3",
      senderId: "1",
      text: "Estou bem também! Analisei o processo do cliente Silva e precisamos incluir mais algumas provas documentais.",
      timestamp: "10:20",
      read: true,
    },
    {
      id: "m4",
      senderId: "current-user",
      text: "Entendo, quais documentos especificamente você acha que precisamos?",
      timestamp: "10:23",
      read: true,
    },
    {
      id: "m5",
      senderId: "1",
      text: "Precisamos dos extratos bancários dos últimos 6 meses e comprovantes de pagamento.",
      timestamp: "10:25",
      read: true,
    },
    {
      id: "m6",
      senderId: "1",
      text: "Também precisamos preparar as testemunhas para a audiência da próxima semana.",
      timestamp: "10:28",
      read: true,
    },
    {
      id: "m7",
      senderId: "current-user",
      text: "Perfeito! Vou entrar em contato com o cliente hoje mesmo para solicitar esses documentos.",
      timestamp: "10:29",
      read: true,
    },
    {
      id: "m8",
      senderId: "1",
      text: "Vou analisar o caso e te retorno ainda hoje",
      timestamp: "10:30",
      read: false,
    },
  ],
  "2": [
    {
      id: "m1",
      senderId: "2",
      text: "Olá João, como está o andamento do caso Pereira?",
      timestamp: "09:05",
      read: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      text: "Bom dia Paulo! Estamos na fase de produção de provas. Já enviamos os documentos solicitados pelo juiz.",
      timestamp: "09:10",
      read: true,
    },
    {
      id: "m3",
      senderId: "2",
      text: "Os autos foram digitalizados",
      timestamp: "09:15",
      read: true,
    },
  ],
  "3": [
    {
      id: "m1",
      senderId: "current-user",
      text: "Estou com problemas para acessar o sistema de processos eletrônicos",
      timestamp: "Ontem 15:30",
      read: true,
    },
    {
      id: "m2",
      senderId: "3",
      text: "Olá Dr. João, vamos verificar isso para você. Pode me informar qual mensagem de erro aparece?",
      timestamp: "Ontem 15:35",
      read: true,
    },
    {
      id: "m3",
      senderId: "current-user",
      text: "Aparece 'Erro de autenticação' quando tento acessar processos do TRT.",
      timestamp: "Ontem 15:40",
      read: true,
    },
    {
      id: "m4",
      senderId: "3",
      text: "Entendido. Acabamos de fazer uma atualização no sistema. Por favor, limpe o cache do navegador e tente novamente.",
      timestamp: "Ontem 15:45",
      read: true,
    },
    {
      id: "m5",
      senderId: "current-user",
      text: "Funcionou! Obrigado pela ajuda.",
      timestamp: "Ontem 16:00",
      read: true,
    },
    {
      id: "m6",
      senderId: "3",
      text: "Seu ticket foi resolvido",
      timestamp: "Ontem 16:05",
      read: true,
    },
  ],
  "4": [
    {
      id: "m1",
      senderId: "4",
      text: "Dr. João, gostaria de confirmar sua disponibilidade para a reunião com o cliente Pereira amanhã às 14h.",
      timestamp: "Ontem 14:00",
      read: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      text: "Olá Amanda, sim, está confirmado. A sala de reuniões já está reservada?",
      timestamp: "Ontem 14:10",
      read: true,
    },
    {
      id: "m3",
      senderId: "4",
      text: "Sim, já reservei a sala 3 para vocês. Também preparei as cópias dos documentos que você solicitou.",
      timestamp: "Ontem 14:15",
      read: true,
    },
    {
      id: "m4",
      senderId: "current-user",
      text: "Perfeito, obrigado!",
      timestamp: "Ontem 14:20",
      read: true,
    },
    {
      id: "m5",
      senderId: "4",
      text: "Reunião confirmada para amanhã às 14h",
      timestamp: "Ontem 14:25",
      read: true,
    },
  ],
};

const Chat = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState("colegas");

  useEffect(() => {
    if (selectedContact) {
      const contactMessages = mockMessages[selectedContact.id] || [];
      setMessages(contactMessages);
      
      // Marcar mensagens como lidas
      if (selectedContact.lastMessage?.unread) {
        setContacts(contacts.map(c => 
          c.id === selectedContact.id
            ? { ...c, lastMessage: { ...c.lastMessage!, unread: false } }
            : c
        ));
      }
      
      scrollToBottom();
    }
  }, [selectedContact]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      senderId: "current-user",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Atualizar último mensagem no contato
    setContacts(contacts.map(c => 
      c.id === selectedContact.id
        ? { 
            ...c, 
            lastMessage: {
              text: newMessage.trim(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              unread: false
            }
          }
        : c
    ));
    
    // Simular resposta (apenas para fins de demonstração)
    setTimeout(() => {
      if (selectedContact?.id === "1") {
        const responseMsg: Message = {
          id: `resp-${Date.now()}`,
          senderId: selectedContact.id,
          text: "Vou verificar esses detalhes e te retorno em breve!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        };
        
        setMessages(prev => [...prev, responseMsg]);
        scrollToBottom();
      }
    }, 3000);

    scrollToBottom();
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chat</h1>
      
      <Card className="h-[calc(100vh-180px)]">
        <div className="flex h-full">
          {/* Lista de Contatos */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contato..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="colegas" className="px-4 pt-4" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="w-full">
                <TabsTrigger value="colegas" className="flex-1">Colegas</TabsTrigger>
                <TabsTrigger value="clientes" className="flex-1">Clientes</TabsTrigger>
                <TabsTrigger value="suporte" className="flex-1">Suporte</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <ScrollArea className="h-[calc(100%-130px)] pt-2">
              <div className="px-4 space-y-2 py-2">
                {filteredContacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                      selectedContact?.id === contact.id
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <img src={contact.avatar} alt={contact.name} />
                      </Avatar>
                      {contact.online && (
                        <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-medium truncate">{contact.name}</h4>
                        {contact.lastMessage && (
                          <span className="text-xs text-gray-500">
                            {contact.lastMessage.timestamp}
                          </span>
                        )}
                      </div>
                      {contact.lastMessage && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 truncate">
                            {contact.lastMessage.text}
                          </p>
                          {contact.lastMessage.unread && (
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-gray-400">{contact.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Área de Chat */}
          {selectedContact ? (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedContact.avatar} alt={selectedContact.name} />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {selectedContact.online ? (
                        <>
                          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                          Online
                        </>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "current-user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === "current-user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 text-right ${
                            message.senderId === "current-user"
                              ? "text-primary-foreground/70"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      className="resize-none min-h-[80px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    className="h-10 shrink-0" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium">Bem-vindo ao Chat</h3>
              <p className="text-gray-500 max-w-md mt-2">
                Selecione um contato para iniciar uma conversa ou busque um colega específico.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Adicionando ícone do MessageSquare para quando não houver chat selecionado
const MessageSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default Chat;

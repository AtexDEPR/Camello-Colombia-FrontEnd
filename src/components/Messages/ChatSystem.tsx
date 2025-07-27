import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  read: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  project?: string;
}

export function ChatSystem() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const chats: Chat[] = [
    {
      id: "1",
      name: "María González",
      avatar: "/placeholder.svg",
      lastMessage: "Perfecto, me gusta mucho el diseño. ¿Cuándo podemos empezar?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      project: "Diseño de Logo"
    },
    {
      id: "2",
      name: "Carlos Mendoza",
      avatar: "/placeholder.svg",
      lastMessage: "Muchas gracias por el trabajo, quedó excelente!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      project: "Desarrollo Web"
    },
    {
      id: "3",
      name: "Ana López",
      avatar: "/placeholder.svg",
      lastMessage: "¿Podrías revisar los últimos cambios?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 1,
      isOnline: true,
      project: "Community Manager"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "Hola! Vi tu perfil y me interesa mucho tu trabajo de diseño gráfico.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isOwn: false,
      read: true
    },
    {
      id: "2",
      text: "¡Hola María! Muchas gracias por contactarme. Me encantaría ayudarte con tu proyecto. ¿Podrías contarme más detalles sobre lo que necesitas?",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      isOwn: true,
      read: true
    },
    {
      id: "3",
      text: "Necesito un logo para mi nueva cafetería. Quiero algo moderno pero que transmita calidez y tradición colombiana.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isOwn: false,
      read: true
    },
    {
      id: "4",
      text: "Perfecto! Eso suena muy interesante. Tengo experiencia diseñando logos para negocios locales. Te voy a enviar algunos ejemplos de mi portafolio.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      isOwn: true,
      read: true
    },
    {
      id: "5",
      text: "Perfecto, me gusta mucho el diseño. ¿Cuándo podemos empezar?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isOwn: false,
      read: false
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.project?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      return `${diffDays}d`;
    }
  };

  return (
    <div className="h-[600px] flex border rounded-lg overflow-hidden bg-background">
      {/* Chat List */}
      <div className="w-1/3 border-r bg-muted/20">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">Mensajes</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversaciones..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="h-[520px]">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedChat === chat.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{chat.name}</p>
                      <span className="text-xs text-muted-foreground">{formatTime(chat.timestamp)}</span>
                    </div>
                    {chat.project && (
                      <p className="text-xs text-primary font-medium">{chat.project}</p>
                    )}
                    <p className="text-sm text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChatData.avatar} />
                      <AvatarFallback>{selectedChatData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {selectedChatData.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedChatData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedChatData.isOnline ? "En línea" : "Desconectado"}
                    </p>
                  </div>
                  {selectedChatData.project && (
                    <Badge variant="outline">{selectedChatData.project}</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.isOwn && (
                          <div className="text-xs opacity-70">
                            {message.read ? '✓✓' : '✓'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">Selecciona una conversación</h3>
              <p className="text-sm text-muted-foreground">Elige un chat para empezar a conversar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

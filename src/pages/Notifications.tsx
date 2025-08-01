import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, Briefcase, Star, User, CheckCircle, Clock } from "lucide-react";

/**
 * Página de Notificaciones - Centro de notificaciones
 *
 * Esta página permite a los usuarios ver y gestionar sus notificaciones,
 * incluyendo mensajes, actualizaciones de contratos, y más.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Interfaces para tipado de datos
 * - Conditional rendering basado en tipo de notificación
 * 
 * @author Camello Colombia
 * @version 1.0.0
 */

// Interfaces para tipado
interface Notification {
  id: string;
  type: "message" | "contract" | "review" | "application" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  sender?: {
    name: string;
    avatar: string;
  };
  actionUrl?: string;
}

export default function Notifications() {
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-001",
      type: "message",
      title: "Nuevo mensaje de TechStartup SAS",
      description: "Hola Carlos, ¿podrías enviarme una actualización del proyecto?",
      timestamp: "2023-10-28T14:30:00",
      read: false,
      sender: {
        name: "TechStartup SAS",
        avatar: "/placeholder.svg",
      },
      actionUrl: "/messages"
    },
    {
      id: "notif-002",
      type: "contract",
      title: "Contrato finalizado",
      description: "Tu contrato 'Diseño de logo e identidad corporativa' ha sido marcado como completado.",
      timestamp: "2023-10-27T10:15:00",
      read: true,
      actionUrl: "/contracts"
    },
    {
      id: "notif-003",
      type: "review",
      title: "Nueva valoración recibida",
      description: "Café Colombiano te ha dejado una valoración de 5 estrellas.",
      timestamp: "2023-10-26T16:45:00",
      read: false,
      sender: {
        name: "Café Colombiano",
        avatar: "/placeholder.svg",
      },
      actionUrl: "/profile"
    },
    {
      id: "notif-004",
      type: "application",
      title: "Aplicación aceptada",
      description: "Tu aplicación para 'Desarrollo de tienda online' ha sido aceptada.",
      timestamp: "2023-10-25T09:20:00",
      read: true,
      actionUrl: "/jobs"
    },
    {
      id: "notif-005",
      type: "system",
      title: "Actualización de términos de servicio",
      description: "Hemos actualizado nuestros términos de servicio. Por favor, revísalos.",
      timestamp: "2023-10-24T11:30:00",
      read: false,
      actionUrl: "/settings"
    },
  ]);
  
  // Función para marcar una notificación como leída
  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };
  
  // Función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  // Función para renderizar el icono según el tipo de notificación
  const renderNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "contract":
        return <Briefcase className="h-5 w-5 text-purple-500" />;
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "application":
        return <User className="h-5 w-5 text-green-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };
  
  // Calcular tiempo relativo
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "hace unos segundos";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `hace ${days} ${days === 1 ? "día" : "días"}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notificaciones</h1>
              <p className="text-muted-foreground">Mantente al día con tus actividades en Camello</p>
            </div>
            
            <Button variant="outline" onClick={markAllAsRead}>
              Marcar todas como leídas
            </Button>
          </div>
          
          {/* Contador de no leídas */}
          <div className="mb-6">
            <Badge variant="secondary" className="text-sm">
              {notifications.filter(n => !n.read).length} no leídas
            </Badge>
          </div>
          
          {/* Tabs para filtrar notificaciones */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="messages">Mensajes</TabsTrigger>
              <TabsTrigger value="contracts">Contratos</TabsTrigger>
              <TabsTrigger value="reviews">Valoraciones</TabsTrigger>
              <TabsTrigger value="system">Sistema</TabsTrigger>
            </TabsList>
            
            {/* Contenido de todas las notificaciones */}
            <TabsContent value="all" className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <Card 
                    key={notification.id} 
                    className={`overflow-hidden ${!notification.read ? 'bg-muted/30' : ''}`}
                  >
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start gap-4">
                        <div className="mt-1">
                          {renderNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {getRelativeTime(notification.timestamp)}
                            </span>
                          </div>
                          
                          {notification.sender && (
                            <div className="flex items-center mt-3">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={notification.sender.avatar} />
                                <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{notification.sender.name}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-3">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              {notification.read ? (
                                <span className="flex items-center text-muted-foreground">
                                  <CheckCircle className="mr-1 h-3 w-3" /> Leída
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" /> Marcar como leída
                                </span>
                              )}
                            </Button>
                            
                            {notification.actionUrl && (
                              <Button variant="ghost" size="sm">
                                Ver detalles
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes notificaciones en este momento.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Contenido de mensajes */}
            <TabsContent value="messages" className="space-y-4">
              {notifications.filter(n => n.type === "message").length > 0 ? (
                notifications
                  .filter(n => n.type === "message")
                  .map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`overflow-hidden ${!notification.read ? 'bg-muted/30' : ''}`}
                    >
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start gap-4">
                          <div className="mt-1">
                            {renderNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {getRelativeTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            {notification.sender && (
                              <div className="flex items-center mt-3">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={notification.sender.avatar} />
                                  <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{notification.sender.name}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-3">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto text-sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.read ? (
                                  <span className="flex items-center text-muted-foreground">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Leída
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" /> Marcar como leída
                                  </span>
                                )}
                              </Button>
                              
                              {notification.actionUrl && (
                                <Button variant="ghost" size="sm">
                                  Ver mensaje
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes mensajes nuevos.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Contenido de contratos */}
            <TabsContent value="contracts" className="space-y-4">
              {notifications.filter(n => n.type === "contract").length > 0 ? (
                notifications
                  .filter(n => n.type === "contract")
                  .map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`overflow-hidden ${!notification.read ? 'bg-muted/30' : ''}`}
                    >
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start gap-4">
                          <div className="mt-1">
                            {renderNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {getRelativeTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto text-sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.read ? (
                                  <span className="flex items-center text-muted-foreground">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Leída
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" /> Marcar como leída
                                  </span>
                                )}
                              </Button>
                              
                              {notification.actionUrl && (
                                <Button variant="ghost" size="sm">
                                  Ver contrato
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes notificaciones de contratos.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Contenido de valoraciones */}
            <TabsContent value="reviews" className="space-y-4">
              {notifications.filter(n => n.type === "review").length > 0 ? (
                notifications
                  .filter(n => n.type === "review")
                  .map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`overflow-hidden ${!notification.read ? 'bg-muted/30' : ''}`}
                    >
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start gap-4">
                          <div className="mt-1">
                            {renderNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {getRelativeTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            {notification.sender && (
                              <div className="flex items-center mt-3">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={notification.sender.avatar} />
                                  <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{notification.sender.name}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-3">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto text-sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.read ? (
                                  <span className="flex items-center text-muted-foreground">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Leída
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" /> Marcar como leída
                                  </span>
                                )}
                              </Button>
                              
                              {notification.actionUrl && (
                                <Button variant="ghost" size="sm">
                                  Ver valoración
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes notificaciones de valoraciones.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Contenido de sistema */}
            <TabsContent value="system" className="space-y-4">
              {notifications.filter(n => n.type === "system").length > 0 ? (
                notifications
                  .filter(n => n.type === "system")
                  .map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`overflow-hidden ${!notification.read ? 'bg-muted/30' : ''}`}
                    >
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start gap-4">
                          <div className="mt-1">
                            {renderNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {getRelativeTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto text-sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.read ? (
                                  <span className="flex items-center text-muted-foreground">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Leída
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" /> Marcar como leída
                                  </span>
                                )}
                              </Button>
                              
                              {notification.actionUrl && (
                                <Button variant="ghost" size="sm">
                                  Ver detalles
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes notificaciones del sistema.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
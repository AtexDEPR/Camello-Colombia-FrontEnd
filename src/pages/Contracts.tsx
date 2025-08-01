import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, Calendar, FileText, MessageSquare, Star } from "lucide-react";

/**
 * Página de Contratos - Gestión de contratos activos
 *
 * Esta página permite a los usuarios (freelancers y contratantes)
 * visualizar y gestionar sus contratos en curso, completados y cancelados.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Interfaces para tipado de datos
 * - Conditional rendering basado en tipo de usuario y estado de contrato
 * 
 * @author Camello Colombia
 * @version 1.0.0
 */

// Interfaces para tipado
interface Contract {
  id: string;
  title: string;
  client: {
    name: string;
    avatar: string;
  };
  freelancer: {
    name: string;
    avatar: string;
  };
  status: "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  amount: number;
  description: string;
}

export default function Contracts() {
  // Estado para el tipo de usuario (en una app real vendría del contexto de autenticación)
  const [userType] = useState<"freelancer" | "contractor">("freelancer");
  
  // Estado para el diálogo de completar contrato
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  
  // Datos de ejemplo para contratos
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "cont-001",
      title: "Desarrollo de landing page para startup",
      client: {
        name: "TechStartup SAS",
        avatar: "/placeholder.svg",
      },
      freelancer: {
        name: "Carlos Rodríguez",
        avatar: "/placeholder.svg",
      },
      status: "active",
      startDate: "2023-10-15",
      endDate: "2023-11-15",
      amount: 1500000,
      description: "Diseño y desarrollo de una landing page moderna y responsive para una startup de tecnología."
    },
    {
      id: "cont-002",
      title: "Diseño de logo e identidad corporativa",
      client: {
        name: "Café Colombiano",
        avatar: "/placeholder.svg",
      },
      freelancer: {
        name: "Carlos Rodríguez",
        avatar: "/placeholder.svg",
      },
      status: "completed",
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      amount: 800000,
      description: "Creación de logo, paleta de colores y guía de estilo para una marca de café colombiano."
    },
    {
      id: "cont-003",
      title: "Optimización SEO para tienda online",
      client: {
        name: "Moda Colombiana",
        avatar: "/placeholder.svg",
      },
      freelancer: {
        name: "Carlos Rodríguez",
        avatar: "/placeholder.svg",
      },
      status: "cancelled",
      startDate: "2023-08-15",
      endDate: "2023-09-15",
      amount: 600000,
      description: "Análisis y optimización SEO para mejorar el posicionamiento de una tienda online de moda."
    },
  ]);
  
  // Función para marcar un contrato como completado
  const markAsCompleted = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId);
    if (contract) {
      setSelectedContract(contract);
      setCompleteDialogOpen(true);
    }
  };
  
  // Función para confirmar la finalización del contrato
  const confirmCompletion = () => {
    if (selectedContract) {
      // Actualizar el estado del contrato
      setContracts(contracts.map(contract => 
        contract.id === selectedContract.id 
          ? { ...contract, status: "completed" as const } 
          : contract
      ));
      
      // Cerrar el diálogo y resetear estados
      setCompleteDialogOpen(false);
      setSelectedContract(null);
      setFeedback("");
      setRating(0);
      
      // TODO: Enviar datos a la API
      console.log("Contrato completado:", selectedContract.id, "Feedback:", feedback, "Rating:", rating);
    }
  };
  
  // Función para renderizar el badge de estado
  const renderStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Clock className="mr-1 h-3 w-3" /> Activo
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle className="mr-1 h-3 w-3" /> Completado
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" /> Cancelado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Mis Contratos</h1>
            <p className="text-muted-foreground">
              {userType === "freelancer" 
                ? "Gestiona tus proyectos y contratos con clientes" 
                : "Administra tus contratos con freelancers"}
            </p>
          </div>
          
          {/* Tabs para filtrar contratos */}
          <Tabs defaultValue="active" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="active">Activos</TabsTrigger>
              <TabsTrigger value="completed">Completados</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
            </TabsList>
            
            {/* Contenido de contratos activos */}
            <TabsContent value="active" className="space-y-4">
              {contracts.filter(contract => contract.status === "active").length > 0 ? (
                contracts
                  .filter(contract => contract.status === "active")
                  .map(contract => (
                    <Card key={contract.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{contract.title}</h3>
                              <div className="flex items-center mt-2 space-x-4">
                                {renderStatusBadge(contract.status)}
                                <span className="text-sm text-muted-foreground flex items-center">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                                </span>
                                <span className="text-sm font-medium">
                                  ${contract.amount.toLocaleString()} COP
                                </span>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={() => markAsCompleted(contract.id)}
                              className="flex items-center"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marcar como completado
                            </Button>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{contract.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={userType === "freelancer" ? contract.client.avatar : contract.freelancer.avatar} />
                                <AvatarFallback>{userType === "freelancer" ? contract.client.name.charAt(0) : contract.freelancer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {userType === "freelancer" ? contract.client.name : contract.freelancer.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {userType === "freelancer" ? "Cliente" : "Freelancer"}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                Ver detalles
                              </Button>
                              <Button variant="outline" size="sm" className="flex items-center">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Enviar mensaje
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes contratos activos en este momento.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Contenido de contratos completados */}
            <TabsContent value="completed" className="space-y-4">
              {contracts.filter(contract => contract.status === "completed").length > 0 ? (
                contracts
                  .filter(contract => contract.status === "completed")
                  .map(contract => (
                    <Card key={contract.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{contract.title}</h3>
                              <div className="flex items-center mt-2 space-x-4">
                                {renderStatusBadge(contract.status)}
                                <span className="text-sm text-muted-foreground flex items-center">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                                </span>
                                <span className="text-sm font-medium">
                                  ${contract.amount.toLocaleString()} COP
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{contract.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={userType === "freelancer" ? contract.client.avatar : contract.freelancer.avatar} />
                                <AvatarFallback>{userType === "freelancer" ? contract.client.name.charAt(0) : contract.freelancer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {userType === "freelancer" ? contract.client.name : contract.freelancer.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {userType === "freelancer" ? "Cliente" : "Freelancer"}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                Ver detalles
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes contratos completados en este momento.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Contenido de contratos cancelados */}
            <TabsContent value="cancelled" className="space-y-4">
              {contracts.filter(contract => contract.status === "cancelled").length > 0 ? (
                contracts
                  .filter(contract => contract.status === "cancelled")
                  .map(contract => (
                    <Card key={contract.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{contract.title}</h3>
                              <div className="flex items-center mt-2 space-x-4">
                                {renderStatusBadge(contract.status)}
                                <span className="text-sm text-muted-foreground flex items-center">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                                </span>
                                <span className="text-sm font-medium">
                                  ${contract.amount.toLocaleString()} COP
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{contract.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={userType === "freelancer" ? contract.client.avatar : contract.freelancer.avatar} />
                                <AvatarFallback>{userType === "freelancer" ? contract.client.name.charAt(0) : contract.freelancer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {userType === "freelancer" ? contract.client.name : contract.freelancer.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {userType === "freelancer" ? "Cliente" : "Freelancer"}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                Ver detalles
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tienes contratos cancelados en este momento.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Diálogo para completar contrato */}
      <Dialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Completar Contrato</DialogTitle>
            <DialogDescription>
              Estás a punto de marcar este contrato como completado. Por favor, deja una valoración y comentarios sobre tu experiencia.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Valoración</h4>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    aria-label={`Rate ${star} out of 5 stars`}
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Comentarios</h4>
              <Textarea
                placeholder="Comparte tu experiencia trabajando en este proyecto..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteDialogOpen(false)}>Cancelar</Button>
            <Button onClick={confirmCompletion}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Clock, MapPin, Calendar, Briefcase, DollarSign, Users, BookmarkPlus, Share2, Send } from "lucide-react";

/**
 * Página de Detalle de Trabajo - Visualización completa de una oferta laboral
 *
 * Esta página muestra toda la información de una oferta de trabajo específica,
 * incluyendo descripción, presupuesto, plazo, requisitos,
 * y perfil del contratante que la publica.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - useParams: Hook para obtener parámetros de la URL
 * - Objetos tipados: mockJob tiene una estructura específica
 * 
 * @author Camello Colombia
 * @version 1.0.0
 */
export default function JobDetail() {
  // Obtener el ID del trabajo desde la URL
  const { id } = useParams<{ id: string }>();
  
  // Estado para controlar si el trabajo está guardado
  const [isSaved, setIsSaved] = useState(false);
  
  // Estado para la propuesta de aplicación
  const [applicationText, setApplicationText] = useState("");
  
  // TODO: Reemplazar con llamada a API para obtener detalles del trabajo por ID
  // Datos de ejemplo para el trabajo
  const mockJob = {
    id: id || "1",
    title: "Desarrollo de Tienda Online para Emprendimiento Local",
    description: "Buscamos un desarrollador web para crear una tienda online completa para nuestro emprendimiento de productos artesanales. Necesitamos un sitio responsive, con carrito de compras, pasarela de pagos y panel de administración sencillo.",
    budget: "1,200,000 - 1,800,000",
    budgetType: "Proyecto completo",
    deadline: "30 días",
    category: "Desarrollo Web",
    location: "Remoto (Colombia)",
    postedDate: "15/04/2024",
    applications: 8,
    skills: ["WordPress", "WooCommerce", "PHP", "Diseño Responsive", "Pasarelas de Pago"],
    contractor: {
      id: "c1",
      name: "Artesanías del Valle",
      avatar: "/placeholder.svg",
      location: "Cali",
      memberSince: "Marzo 2023",
      projectsPosted: 5,
      projectsCompleted: 3,
      verified: true
    },
    requirements: [
      "Experiencia comprobable en desarrollo de e-commerce",
      "Conocimiento de WooCommerce o similar",
      "Capacidad para integrar pasarelas de pago colombianas",
      "Disponibilidad para reuniones semanales de seguimiento",
      "Entrega de código fuente y documentación básica"
    ]
  };

  // Función para manejar la aplicación al trabajo
  const handleApply = () => {
    if (!applicationText.trim()) {
      alert("Por favor escribe una propuesta para aplicar");
      return;
    }
    
    // TODO: Implementar lógica de aplicación
    console.log("Aplicando al trabajo:", mockJob.id, "con propuesta:", applicationText);
    // Aquí iría la lógica para enviar la aplicación
    // 1. Verificar si el usuario está autenticado
    // 2. Crear solicitud de aplicación
    // 3. Mostrar confirmación
    
    // Simulación de éxito
    alert("¡Aplicación enviada con éxito!");
    setApplicationText("");
  };

  // Función para guardar/quitar trabajo
  const handleToggleSave = () => {
    // TODO: Implementar lógica de guardado con API
    setIsSaved(!isSaved);
    console.log(isSaved ? "Trabajo removido de guardados" : "Trabajo guardado", mockJob.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navegación de migas de pan */}
        <div className="text-sm text-muted-foreground mb-4">
          <span>Inicio</span> &gt; <span>Trabajos</span> &gt; <span>{mockJob.category}</span> &gt; <span className="text-foreground">{mockJob.title}</span>
        </div>
        
        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Detalles del trabajo */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título y acciones */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{mockJob.title}</h1>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {mockJob.category}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Publicado: {mockJob.postedDate}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{mockJob.applications} aplicaciones</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{mockJob.location}</span>
                </div>
              </div>
            </div>
            
            {/* Pestañas de información */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="requirements">Requisitos</TabsTrigger>
              </TabsList>
              
              {/* Pestaña de descripción */}
              <TabsContent value="description" className="space-y-4 pt-4">
                <div className="prose max-w-none">
                  <p className="text-foreground">{mockJob.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Presupuesto</p>
                          <p className="font-medium">$ {mockJob.budget}</p>
                          <p className="text-xs text-muted-foreground">{mockJob.budgetType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Plazo de entrega</p>
                          <p className="font-medium">{mockJob.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-2">
                  <p className="font-medium mb-2">Habilidades requeridas:</p>
                  <div className="flex flex-wrap gap-2">
                    {mockJob.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Pestaña de requisitos */}
              <TabsContent value="requirements" className="space-y-4 pt-4">
                <ul className="space-y-2">
                  {mockJob.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                      </div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
            
            {/* Sección de aplicación */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Aplicar a este trabajo</CardTitle>
                <CardDescription>Escribe una propuesta para el contratante</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Describe tu experiencia relevante, enfoque para este proyecto y por qué eres el candidato ideal..."
                  className="min-h-32"
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleApply}>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar aplicación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Columna derecha - Información del contratante */}
          <div className="space-y-6">
            {/* Card del contratante */}
            <Card className="border-border/50 shadow-elegant sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Información del contratante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Perfil del contratante */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mockJob.contractor.avatar} alt={mockJob.contractor.name} />
                      <AvatarFallback>{mockJob.contractor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{mockJob.contractor.name}</span>
                        {mockJob.contractor.verified && (
                          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{mockJob.contractor.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Miembro desde</span>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{mockJob.contractor.memberSince}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Proyectos publicados</span>
                      <div className="flex items-center">
                        <Briefcase className="mr-1 h-3 w-3" />
                        <span>{mockJob.contractor.projectsPosted}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Proyectos completados</span>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-3 w-3 text-green-500" />
                      <span>{mockJob.contractor.projectsCompleted}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Ver perfil completo
                  </Button>
                </div>
                
                <Separator />
                
                {/* Botones de acción */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleToggleSave}
                  >
                    <BookmarkPlus className={`mr-2 h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
                    {isSaved ? 'Trabajo guardado' : 'Guardar trabajo'}
                  </Button>
                  
                  <Button variant="ghost" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir este trabajo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
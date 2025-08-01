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
import { ReviewSystem } from "@/components/Reviews/ReviewSystem";
import { Star, Clock, MapPin, Calendar, MessageCircle, Heart, Share2, Eye } from "lucide-react";

/**
 * Página de Detalle de Servicio - Visualización completa de un servicio
 *
 * Esta página muestra toda la información de un servicio específico,
 * incluyendo descripción, precio, tiempo de entrega, calificaciones,
 * y perfil del freelancer que lo ofrece.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - useParams: Hook para obtener parámetros de la URL
 * - Objetos tipados: mockService tiene una estructura específica
 * 
 * @author Camello Colombia
 * @version 1.0.0
 */
export default function ServiceDetail() {
  // Obtener el ID del servicio desde la URL
  const { id } = useParams<{ id: string }>();
  
  // Estado para controlar si el servicio está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);
  
  // TODO: Reemplazar con llamada a API para obtener detalles del servicio por ID
  // Datos de ejemplo para el servicio
  const mockService = {
    id: id || "1",
    title: "Desarrollo de Landing Page Profesional",
    description: "Diseño y desarrollo de landing pages profesionales optimizadas para conversión. Incluye diseño responsive, optimización SEO básica, y hasta 3 secciones personalizadas. Entrega en HTML/CSS/JS o implementación en WordPress según necesidad.",
    price: "450,000",
    deliveryTime: "3-5 días",
    category: "Desarrollo",
    tags: ["React", "Responsive", "SEO"],
    rating: 4.9,
    reviews: 28,
    views: 142,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    freelancer: {
      id: "f1",
      name: "Carlos Rodríguez",
      avatar: "/placeholder.svg",
      location: "Bogotá",
      rating: 4.8,
      totalReviews: 42,
      memberSince: "Enero 2023",
      responseTime: "2 horas",
      verified: true
    },
    features: [
      "Diseño 100% responsive",
      "Optimización para SEO",
      "Hasta 3 revisiones incluidas",
      "Código fuente incluido",
      "Soporte post-entrega (7 días)"
    ],
    faq: [
      {
        question: "¿Qué información necesitas para comenzar?",
        answer: "Necesito tu brief con objetivos, referencias de diseño que te gusten, textos y logos/imágenes que quieras incluir."
      },
      {
        question: "¿Puedo solicitar cambios después de la entrega?",
        answer: "Sí, incluyo hasta 3 rondas de revisiones sin costo adicional. Cambios mayores pueden requerir un presupuesto adicional."
      },
      {
        question: "¿Incluye hosting o dominio?",
        answer: "No, el servicio incluye solo el desarrollo. Puedo asesorarte sobre opciones de hosting si lo necesitas."
      }
    ]
  };

  // Función para manejar la contratación del servicio
  const handleHire = () => {
    // TODO: Implementar lógica de contratación
    console.log("Contratando servicio:", mockService.id);
    // Aquí iría la lógica para iniciar el proceso de contratación
    // 1. Verificar si el usuario está autenticado
    // 2. Crear solicitud de contratación
    // 3. Redirigir a página de pago o chat con el freelancer
  };

  // Función para manejar agregar/quitar de favoritos
  const handleToggleFavorite = () => {
    // TODO: Implementar lógica de favoritos con API
    setIsFavorite(!isFavorite);
    console.log(isFavorite ? "Removido de favoritos" : "Agregado a favoritos", mockService.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navegación de migas de pan */}
        <div className="text-sm text-muted-foreground mb-4">
          <span>Inicio</span> &gt; <span>Servicios</span> &gt; <span>{mockService.category}</span> &gt; <span className="text-foreground">{mockService.title}</span>
        </div>
        
        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Detalles del servicio */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título y acciones */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{mockService.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{mockService.rating}</span>
                  <span className="text-muted-foreground ml-1">({mockService.reviews} reseñas)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{mockService.views} vistas</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{mockService.freelancer.location}</span>
                </div>
              </div>
            </div>
            
            {/* Galería de imágenes */}
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={mockService.images[0]} 
                  alt={mockService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {mockService.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${mockService.title} - imagen ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pestañas de información */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
              </TabsList>
              
              {/* Pestaña de descripción */}
              <TabsContent value="description" className="space-y-4 pt-4">
                <div className="prose max-w-none">
                  <p className="text-foreground">{mockService.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {mockService.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </TabsContent>
              
              {/* Pestaña de características */}
              <TabsContent value="features" className="space-y-4 pt-4">
                <ul className="space-y-2">
                  {mockService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              {/* Pestaña de FAQ */}
              <TabsContent value="faq" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {mockService.faq.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                      {index < mockService.faq.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Sección de reseñas */}
            <div className="pt-4">
              <h2 className="text-xl font-bold mb-4">Reseñas de clientes</h2>
              <ReviewSystem />
            </div>
          </div>
          
          {/* Columna derecha - Información de contratación y freelancer */}
          <div className="space-y-6">
            {/* Card de contratación */}
            <Card className="border-border/50 shadow-elegant sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Información del servicio</CardTitle>
                <CardDescription>Detalles para contratar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Precio y tiempo */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Precio</span>
                    <span className="text-2xl font-bold text-primary">$ {mockService.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tiempo de entrega</span>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{mockService.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="space-y-3 pt-2">
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90" 
                    onClick={handleHire}
                  >
                    Contratar ahora
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleToggleFavorite}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorite ? 'Guardado' : 'Guardar'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contactar
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                {/* Información del freelancer */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mockService.freelancer.avatar} alt={mockService.freelancer.name} />
                      <AvatarFallback>{mockService.freelancer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{mockService.freelancer.name}</span>
                        {mockService.freelancer.verified && (
                          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{mockService.freelancer.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{mockService.freelancer.totalReviews} reseñas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Miembro desde</span>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{mockService.freelancer.memberSince}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tiempo de respuesta</span>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{mockService.freelancer.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Ver perfil completo
                  </Button>
                </div>
                
                <Separator />
                
                {/* Compartir */}
                <div>
                  <Button variant="ghost" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir este servicio
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
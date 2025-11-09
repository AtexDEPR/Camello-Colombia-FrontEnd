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
import { serviceDetails, services } from "@/mocks/data";

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
  
  // Construcción del detalle a partir de mocks enriquecidos
  const selectedId = id || 'srv-3'
  const detail = serviceDetails[selectedId]
  const summary = services.find(s => s.id === selectedId) || (services[0] as any)

  // ViewModel para la página combinando detalle y resumen
  const vm = {
    id: selectedId,
    title: detail?.title || summary?.title || 'Servicio',
    description: detail?.description || summary?.description || '',
    price: (summary?.price || 0).toLocaleString('es-CO'),
    deliveryTime: detail?.deliveryTime || summary?.deliveryTime || '5-7 días',
    category: summary?.categoryName || 'Servicio',
    tags: detail?.tags || summary?.tags || [],
    rating: summary?.rating || detail?.freelancer?.rating || 4.8,
    reviews: detail?.freelancer?.totalReviews || 0,
    views: summary?.viewsCount || 0,
    images: detail?.images || summary?.images || ["/placeholder.svg"],
    freelancer: detail?.freelancer || {
      id: 'f1',
      name: summary?.freelancerName || 'Freelancer',
      avatar: summary?.freelancerProfilePicture || '/placeholder.svg',
      location: (summary as any)?.location || 'Colombia',
      rating: summary?.rating || 4.7,
      totalReviews: detail?.freelancer?.totalReviews || 0,
      memberSince: '2023',
      responseTime: '2 horas',
      verified: true,
    },
    benefits: detail?.benefits || [],
    processSteps: detail?.processSteps || [],
    requirements: detail?.requirements || [],
    caseStudies: detail?.caseStudies || [],
    testimonials: detail?.testimonials || [],
  }

  if (!detail) {
    console.warn(`[ServiceDetail] No hay contenido detallado para ${selectedId}. Usando resumen del servicio.`)
  }

  // Función para manejar la contratación del servicio
  const handleHire = () => {
    // TODO: Implementar lógica de contratación
    console.log("Contratando servicio:", vm.id);
    // Aquí iría la lógica para iniciar el proceso de contratación
    // 1. Verificar si el usuario está autenticado
    // 2. Crear solicitud de contratación
    // 3. Redirigir a página de pago o chat con el freelancer
  };

  // Función para manejar agregar/quitar de favoritos
  const handleToggleFavorite = () => {
    // TODO: Implementar lógica de favoritos con API
    setIsFavorite(!isFavorite);
    console.log(isFavorite ? "Removido de favoritos" : "Agregado a favoritos", vm.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navegación de migas de pan */}
        <div className="text-sm text-muted-foreground mb-4">
          <span>Inicio</span> &gt; <span>Servicios</span> &gt; <span>{vm.category}</span> &gt; <span className="text-foreground">{vm.title}</span>
        </div>
        
        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Detalles del servicio */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título y acciones */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{vm.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{vm.rating}</span>
                  <span className="text-muted-foreground ml-1">({vm.reviews} reseñas)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{vm.views} vistas</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{vm.freelancer.location}</span>
                </div>
              </div>
            </div>
            
            {/* Galería de imágenes */}
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={vm.images[0]} 
                  alt={vm.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {vm.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${vm.title} - imagen ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pestañas de información */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-6 sm:grid-cols-6">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="benefits">Beneficios</TabsTrigger>
                <TabsTrigger value="process">Proceso</TabsTrigger>
                <TabsTrigger value="requirements">Requisitos</TabsTrigger>
                <TabsTrigger value="cases">Casos de éxito</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
              </TabsList>
              
              {/* Pestaña de descripción */}
              <TabsContent value="description" className="space-y-4 pt-4">
                <div className="prose max-w-none">
                  <p className="text-foreground">{vm.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {vm.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </TabsContent>
              
              {/* Pestaña de beneficios */}
              <TabsContent value="benefits" className="space-y-4 pt-4">
                {vm.benefits.length ? (
                  <ul className="space-y-2">
                    {vm.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Información detallada en preparación.</p>
                )}
              </TabsContent>

              {/* Pestaña de proceso */}
              <TabsContent value="process" className="space-y-4 pt-4">
                {vm.processSteps.length ? (
                  <ol className="space-y-3 list-decimal pl-5">
                    {vm.processSteps.map((step, index) => (
                      <li key={index} className="text-foreground">{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-muted-foreground">Proceso estándar: Brief, Propuesta, Implementación, Revisión y Entrega.</p>
                )}
              </TabsContent>

              {/* Pestaña de requisitos */}
              <TabsContent value="requirements" className="space-y-4 pt-4">
                {vm.requirements?.length ? (
                  <ul className="space-y-2">
                    {vm.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-muted" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No se requieren insumos previos.</p>
                )}
              </TabsContent>

              {/* Pestaña de casos de éxito */}
              <TabsContent value="cases" className="space-y-4 pt-4">
                {vm.caseStudies?.length ? (
                  <div className="space-y-3">
                    {vm.caseStudies.map((cs, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <h3 className="font-medium">{cs.title}</h3>
                        <p className="text-muted-foreground">{cs.result}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Aún no hay casos publicados.</p>
                )}
              </TabsContent>

              {/* Pestaña de testimonios */}
              <TabsContent value="testimonials" className="space-y-4 pt-4">
                {vm.testimonials?.length ? (
                  <div className="space-y-3">
                    {vm.testimonials.map((t, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <p className="italic">“{t.quote}”</p>
                        <p className="text-sm text-muted-foreground mt-1">— {t.client}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Aún no hay testimonios disponibles.</p>
                )}
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
                    <span className="text-2xl font-bold text-primary">$ {vm.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tiempo de entrega</span>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{vm.deliveryTime}</span>
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
                      <AvatarImage src={vm.freelancer.avatar} alt={vm.freelancer.name} />
                      <AvatarFallback>{vm.freelancer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{vm.freelancer.name}</span>
                        {vm.freelancer.verified && (
                          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{vm.freelancer.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{vm.freelancer.totalReviews} reseñas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Miembro desde</span>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{vm.freelancer.memberSince}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tiempo de respuesta</span>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{vm.freelancer.responseTime}</span>
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
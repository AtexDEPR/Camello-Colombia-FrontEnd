import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useServicesWithLoading } from "@/hooks/useServices";
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  Eye, 
  Clock,
  MapPin,
  Code,
  Palette,
  Camera,
  Megaphone,
  PenTool,
  Video
} from "lucide-react";

/**
 * Página de Exploración - Descubrir servicios en Camello
 * 
 * Esta página permite a los usuarios explorar y buscar servicios
 * ofrecidos por freelancers en la plataforma.
 * 
 * Funcionalidades:
 * - Búsqueda de servicios por texto
 * - Filtrado por categorías
 * - Ordenamiento de resultados
 * - Vista de tarjetas de servicios
 * - Sistema de favoritos
 * 
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Arrays de objetos tipados
 * - Map function para renderizar listas
 * - Filter function para filtrar datos
 * - Conditional rendering
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export default function PaginaExplorar() {
  const [searchParams] = useSearchParams();
  const [consultaBusqueda, establecerConsultaBusqueda] = useState("");
  const [categoriaSeleccionada, establecerCategoriaSeleccionada] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  
  // Obtener servicios del backend
  const { services, isLoading, totalElements, hasNextPage } = useServicesWithLoading(currentPage, 12);

  // Establecer categoría desde URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      establecerCategoriaSeleccionada(categoryFromUrl);
    }
  }, [searchParams]);

  /**
   * Array de categorías disponibles
   * 
   * Cada categoría tiene un id único, nombre descriptivo y un icono asociado.
   * Los iconos son componentes de Lucide React.
   */
  const categorias = [
    { id: "all", nombre: "Todas las categorías", icono: Filter },
    { id: "development", nombre: "Desarrollo", icono: Code },
    { id: "design", nombre: "Diseño", icono: Palette },
    { id: "photography", nombre: "Fotografía", icono: Camera },
    { id: "marketing", nombre: "Marketing", icono: Megaphone },
    { id: "writing", nombre: "Redacción", icono: PenTool },
    { id: "video", nombre: "Video", icono: Video },
  ];

  // Filtrar servicios del backend
  const serviciosFiltrados = services.filter(servicio => {
    const coincideBusqueda = servicio.title.toLowerCase().includes(consultaBusqueda.toLowerCase()) ||
                             servicio.freelancerName?.toLowerCase().includes(consultaBusqueda.toLowerCase());
    
    const coincideCategoria = categoriaSeleccionada === "all" || servicio.category === categoriaSeleccionada;
    
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* 
        Header: Componente de navegación superior
        Se mantiene fijo en todas las páginas
      */}
      <Header />
      
      {/* 
        Contenido principal de la página
        container: Centra el contenido y establece un ancho máximo
        mx-auto: Margen automático horizontal para centrar
        px-4: Padding horizontal de 1rem (16px)
        py-8: Padding vertical de 2rem (32px)
      */}
      <main className="container mx-auto px-4 py-8">
        {/* Sección de encabezado */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Explora Servicios</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Descubre el mejor talento colombiano para hacer realidad tus proyectos
          </p>
        </div>

        {/* Búsqueda y filtros */}
        <div className="space-y-4 mb-8">
          {/* 
            Contenedor de búsqueda y selector de categoría
            flex flex-col lg:flex-row: Apila verticalmente en móvil, horizontalmente en desktop
            gap-4: Espaciado de 1rem entre elementos
          */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Campo de búsqueda */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar servicios o freelancers..."
                className="pl-10"
                value={consultaBusqueda}
                onChange={(e) => establecerConsultaBusqueda(e.target.value)}
              />
            </div>
            
            {/* Selector de categoría */}
            <Select value={categoriaSeleccionada} onValueChange={establecerCategoriaSeleccionada}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => {
                  const ComponenteIcono = categoria.icono;
                  return (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      <div className="flex items-center">
                        <ComponenteIcono className="mr-2 h-4 w-4" />
                        {categoria.nombre}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Píldoras de categorías */}
          <div className="flex flex-wrap gap-2">
            {categorias.slice(1).map((categoria) => {
              const ComponenteIcono = categoria.icono;
              return (
                <Button
                  key={categoria.id}
                  variant={categoriaSeleccionada === categoria.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => establecerCategoriaSeleccionada(categoria.id)}
                  className="text-xs"
                >
                  <ComponenteIcono className="mr-1 h-3 w-3" />
                  {categoria.nombre}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-muted-foreground">
            {isLoading ? 'Cargando...' : `${serviciosFiltrados.length} servicios encontrados`}
          </p>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recomendados</SelectItem>
              <SelectItem value="price-low">Precio: Menor a mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a menor</SelectItem>
              <SelectItem value="rating">Mejor calificados</SelectItem>
              <SelectItem value="recent">Más recientes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loading
            [...Array(6)].map((_, index) => (
              <Card key={index} className="border-border/50">
                <div className="aspect-video bg-muted rounded-t-lg">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : serviciosFiltrados.length > 0 ? (
            serviciosFiltrados.map((servicio) => (
              <Card key={servicio.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50">
                {/* Imagen del servicio */}
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={servicio.imageUrl || "/placeholder.svg"} 
                      alt={servicio.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Botón de favorito */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Encabezado de la tarjeta */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {servicio.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {servicio.freelancerName || 'Freelancer'} • {servicio.location || 'Colombia'}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                {/* Contenido de la tarjeta */}
                <CardContent className="space-y-3">
                  {/* Calificación y vistas */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{servicio.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground text-sm">({servicio.reviewsCount || 0})</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Eye className="mr-1 h-3 w-3" />
                      {servicio.viewsCount || 0}
                    </div>
                  </div>

                  {/* Etiquetas */}
                  <div className="flex flex-wrap gap-1">
                    {servicio.tags?.slice(0, 3).map((etiqueta, indice) => (
                      <Badge key={indice} variant="secondary" className="text-xs">
                        {etiqueta}
                      </Badge>
                    )) || (
                      <Badge variant="secondary" className="text-xs">
                        {servicio.category}
                      </Badge>
                    )}
                  </div>

                  {/* Precio y botón de acción */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t gap-2">
                    <div>
                      <p className="font-semibold text-primary">
                        ${servicio.price.toLocaleString('es-CO')}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {servicio.deliveryTime || '3-5 días'}
                      </p>
                    </div>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto" asChild>
                      <Link to={`/services/${servicio.id}`}>
                        Ver Servicio
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No se encontraron servicios</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
              </div>
            </div>
          )}
        </div>

        {/* Cargar más */}
        {hasNextPage && !isLoading && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Cargar más servicios
            </Button>
          </div>
        )}
      </main>

      {/* 
        Footer: Componente de pie de página
        Se mantiene fijo en todas las páginas
      */}
      <Footer />
    </div>
  );
}

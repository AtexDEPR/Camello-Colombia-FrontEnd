import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  /**
   * Estado para la consulta de búsqueda
   * 
   * Almacena el texto ingresado por el usuario en el campo de búsqueda.
   * Se actualiza en tiempo real mientras el usuario escribe.
   */
  const [consultaBusqueda, establecerConsultaBusqueda] = useState("");

  /**
   * Estado para la categoría seleccionada
   * 
   * Almacena la categoría actualmente seleccionada para filtrar los servicios.
   * Por defecto es "all" (todas las categorías).
   */
  const [categoriaSeleccionada, establecerCategoriaSeleccionada] = useState("all");

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

  /**
   * Array de servicios disponibles
   * 
   * Cada servicio tiene una estructura completa con toda la información
   * necesaria para mostrarlo en la interfaz.
   * 
   * Tipos de datos incluidos:
   * - id: Identificador único
   * - titulo: Nombre del servicio
   * - freelancer: Nombre del profesional
   * - calificacion: Puntuación (0-5)
   * - numeroResenas: Cantidad de reseñas
   * - precio: Precio del servicio
   * - tiempoEntrega: Tiempo estimado de entrega
   * - ubicacion: Ciudad del freelancer
   * - imagen: URL de la imagen
   * - categoria: Categoría del servicio
   * - etiquetas: Array de etiquetas descriptivas
   * - favorito: Estado de favorito (boolean)
   * - vistas: Número de vistas del servicio
   */
  const servicios = [
    {
      id: 1,
      titulo: "Desarrollo de Landing Page Profesional",
      freelancer: "Carlos Rodríguez",
      calificacion: 4.9,
      numeroResenas: 28,
      precio: "Desde $450,000",
      tiempoEntrega: "3-5 días",
      ubicacion: "Bogotá",
      imagen: "/placeholder.svg",
      categoria: "development",
      etiquetas: ["React", "Responsive", "SEO"],
      favorito: false,
      vistas: 142
    },
    {
      id: 2,
      titulo: "Diseño de Logo e Identidad Corporativa",
      freelancer: "Ana García",
      calificacion: 4.8,
      numeroResenas: 45,
      precio: "Desde $250,000",
      tiempoEntrega: "2-3 días",
      ubicacion: "Medellín",
      imagen: "/placeholder.svg",
      categoria: "design",
      etiquetas: ["Branding", "Vectorial", "Manual"],
      favorito: true,
      vistas: 89
    },
    {
      id: 3,
      titulo: "Gestión de Redes Sociales - Community Manager",
      freelancer: "María López",
      calificacion: 4.7,
      numeroResenas: 32,
      precio: "Desde $600,000/mes",
      tiempoEntrega: "Inmediato",
      ubicacion: "Cali",
      imagen: "/placeholder.svg",
      categoria: "marketing",
      etiquetas: ["Instagram", "Facebook", "Contenido"],
      favorito: false,
      vistas: 203
    },
    {
      id: 4,
      titulo: "Fotografía Profesional para Productos",
      freelancer: "Luis Mendoza",
      calificacion: 4.9,
      numeroResenas: 18,
      precio: "Desde $180,000",
      tiempoEntrega: "1-2 días",
      ubicacion: "Barranquilla",
      imagen: "/placeholder.svg",
      categoria: "photography",
      etiquetas: ["Estudio", "Productos", "E-commerce"],
      favorito: false,
      vistas: 67
    },
    {
      id: 5,
      titulo: "Redacción de Contenido SEO y Copywriting",
      freelancer: "Sandra Torres",
      calificacion: 4.6,
      numeroResenas: 25,
      precio: "Desde $120,000",
      tiempoEntrega: "2-4 días",
      ubicacion: "Bucaramanga",
      imagen: "/placeholder.svg",
      categoria: "writing",
      etiquetas: ["SEO", "Blog", "Web"],
      favorito: true,
      vistas: 156
    },
    {
      id: 6,
      titulo: "Edición de Video Promocional",
      freelancer: "Jorge Martínez",
      calificacion: 4.8,
      numeroResenas: 21,
      precio: "Desde $350,000",
      tiempoEntrega: "3-7 días",
      ubicacion: "Cartagena",
      imagen: "/placeholder.svg",
      categoria: "video",
      etiquetas: ["Promocional", "Motion Graphics", "Color"],
      favorito: false,
      vistas: 94
    }
  ];

  /**
   * Función para filtrar servicios según búsqueda y categoría
   * 
   * Esta función utiliza el método filter() de JavaScript para crear
   * un nuevo array con solo los servicios que coinciden con los criterios.
   * 
   * Lógica de filtrado:
   * - Búsqueda: Coincide con título o nombre del freelancer (case-insensitive)
   * - Categoría: Coincide exactamente con la categoría seleccionada
   * 
   * @returns Array filtrado de servicios
   */
  const serviciosFiltrados = servicios.filter(servicio => {
    // Verificar si el servicio coincide con la búsqueda
    const coincideBusqueda = servicio.titulo.toLowerCase().includes(consultaBusqueda.toLowerCase()) ||
                             servicio.freelancer.toLowerCase().includes(consultaBusqueda.toLowerCase());
    
    // Verificar si el servicio coincide con la categoría
    const coincideCategoria = categoriaSeleccionada === "all" || servicio.categoria === categoriaSeleccionada;
    
    // Retornar true solo si coincide con ambos criterios
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
            {serviciosFiltrados.length} servicios encontrados
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
          {serviciosFiltrados.map((servicio) => (
            <Card key={servicio.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50">
              {/* Imagen del servicio */}
              <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={servicio.imagen} 
                    alt={servicio.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Botón de favorito */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart className={`h-4 w-4 ${servicio.favorito ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              
              {/* Encabezado de la tarjeta */}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {servicio.titulo}
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {servicio.freelancer} • {servicio.ubicacion}
                  </span>
                </CardDescription>
              </CardHeader>
              
              {/* Contenido de la tarjeta */}
              <CardContent className="space-y-3">
                {/* Calificación y vistas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{servicio.calificacion}</span>
                    <span className="text-muted-foreground text-sm">({servicio.numeroResenas})</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Eye className="mr-1 h-3 w-3" />
                    {servicio.vistas}
                  </div>
                </div>

                {/* Etiquetas */}
                <div className="flex flex-wrap gap-1">
                  {servicio.etiquetas.map((etiqueta, indice) => (
                    <Badge key={indice} variant="secondary" className="text-xs">
                      {etiqueta}
                    </Badge>
                  ))}
                </div>

                {/* Precio y botón de acción */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t gap-2">
                  <div>
                    <p className="font-semibold text-primary">{servicio.precio}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {servicio.tiempoEntrega}
                    </p>
                  </div>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                    Ver Servicio
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cargar más */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Cargar más servicios
          </Button>
        </div>
      </main>

      {/* 
        Footer: Componente de pie de página
        Se mantiene fijo en todas las páginas
      */}
      <Footer />
    </div>
  );
}

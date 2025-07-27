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
  Clock, 
  MapPin, 
  DollarSign,
  Users,
  Briefcase,
  Calendar,
  Code,
  Palette,
  Camera,
  Megaphone,
  PenTool,
  Video
} from "lucide-react";

/**
 * Página de Trabajos - Oportunidades laborales en Camello
 * 
 * Esta página permite a los freelancers explorar y buscar oportunidades
 * de trabajo publicadas por contratantes en la plataforma.
 * 
 * Funcionalidades:
 * - Búsqueda de trabajos por texto
 * - Filtrado por categorías
 * - Ordenamiento de resultados
 * - Vista detallada de trabajos
 * - Sistema de postulaciones
 * 
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Arrays de objetos tipados
 * - Map function para renderizar listas
 * - Filter function para filtrar datos
 * - Conditional rendering
 * - Funciones helper para lógica reutilizable
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export default function PaginaTrabajos() {
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
   * Almacena la categoría actualmente seleccionada para filtrar los trabajos.
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
   * Array de trabajos disponibles
   * 
   * Cada trabajo tiene una estructura completa con toda la información
   * necesaria para mostrarlo en la interfaz.
   * 
   * Tipos de datos incluidos:
   * - id: Identificador único
   * - titulo: Nombre del trabajo
   * - empresa: Nombre de la empresa contratante
   * - descripcion: Descripción detallada del trabajo
   * - presupuesto: Rango de presupuesto
   * - tipoPresupuesto: Tipo de presupuesto (fijo, mensual, etc.)
   * - tiempoEstimado: Tiempo estimado para completar
   * - ubicacion: Ubicación del trabajo
   * - categoria: Categoría del trabajo
   * - habilidades: Array de habilidades requeridas
   * - postulaciones: Número de postulaciones recibidas
   * - verificado: Si la empresa está verificada
   * - tiempoPublicacion: Cuándo fue publicado
   * - urgencia: Nivel de urgencia del trabajo
   */
  const trabajos = [
    {
      id: 1,
      titulo: "Desarrollo de E-commerce con React y Node.js",
      empresa: "TechStart Colombia",
      descripcion: "Buscamos un desarrollador full-stack para crear una plataforma de e-commerce moderna con React, Node.js y MongoDB. El proyecto incluye panel de administración, sistema de pagos y dashboard de analytics.",
      presupuesto: "$2,500,000 - $3,500,000",
      tipoPresupuesto: "Proyecto fijo",
      tiempoEstimado: "2-3 meses",
      ubicacion: "Remoto",
      categoria: "development",
      habilidades: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
      postulaciones: 12,
      verificado: true,
      tiempoPublicacion: "Hace 2 horas",
      urgencia: "medium"
    },
    {
      id: 2,
      titulo: "Diseño de Identidad Visual para Startup",
      empresa: "InnovaLab",
      descripcion: "Necesitamos un diseñador gráfico para crear la identidad visual completa de nuestra startup. Incluye logo, paleta de colores, tipografías, papelería y manual de marca.",
      presupuesto: "$800,000 - $1,200,000",
      tipoPresupuesto: "Proyecto fijo",
      tiempoEstimado: "3-4 semanas",
      ubicacion: "Medellín",
      categoria: "design",
      habilidades: ["Branding", "Illustrator", "Photoshop", "InDesign"],
      postulaciones: 8,
      verificado: true,
      tiempoPublicacion: "Hace 4 horas",
      urgencia: "high"
    },
    {
      id: 3,
      titulo: "Community Manager para Marca de Moda",
      empresa: "Fashion Trends",
      descripcion: "Buscamos un community manager experimentado para gestionar nuestras redes sociales. Debe crear contenido atractivo, responder comentarios y desarrollar estrategias de engagement.",
      presupuesto: "$700,000 - $900,000/mes",
      tipoPresupuesto: "Mensual",
      tiempoEstimado: "Largo plazo",
      ubicacion: "Bogotá",
      categoria: "marketing",
      habilidades: ["Instagram", "Facebook", "TikTok", "Canva", "Analytics"],
      postulaciones: 15,
      verificado: false,
      tiempoPublicacion: "Hace 6 horas",
      urgencia: "low"
    },
    {
      id: 4,
      titulo: "Fotografía de Productos para Catálogo Online",
      empresa: "Artesanías Colombia",
      descripcion: "Necesitamos un fotógrafo profesional para crear un catálogo visual de nuestros productos artesanales. Requiere experiencia en fotografía de productos y edición profesional.",
      presupuesto: "$600,000 - $800,000",
      tipoPresupuesto: "Proyecto fijo",
      tiempoEstimado: "1-2 semanas",
      ubicacion: "Cali",
      categoria: "photography",
      habilidades: ["Fotografía", "Lightroom", "Photoshop", "Estudio"],
      postulaciones: 6,
      verificado: true,
      tiempoPublicacion: "Hace 1 día",
      urgencia: "medium"
    },
    {
      id: 5,
      titulo: "Redactor de Contenido para Blog Corporativo",
      empresa: "Consultoría Empresarial",
      descripcion: "Buscamos un redactor especializado en contenido empresarial para crear artículos de blog, whitepapers y contenido para redes sociales. Experiencia en SEO requerida.",
      presupuesto: "$400,000 - $600,000/mes",
      tipoPresupuesto: "Mensual",
      tiempoEstimado: "3-6 meses",
      ubicacion: "Remoto",
      categoria: "writing",
      habilidades: ["SEO", "WordPress", "Copywriting", "Investigación"],
      postulaciones: 20,
      verificado: true,
      tiempoPublicacion: "Hace 1 día",
      urgencia: "low"
    },
    {
      id: 6,
      titulo: "Editor de Video para Canal de YouTube",
      empresa: "CreativeStudio",
      descripcion: "Necesitamos un editor de video para nuestro canal de YouTube. Debe tener experiencia en motion graphics, corrección de color y crear videos dinámicos y atractivos.",
      presupuesto: "$500,000 - $700,000/mes",
      tipoPresupuesto: "Mensual",
      tiempoEstimado: "Largo plazo",
      ubicacion: "Barranquilla",
      categoria: "video",
      habilidades: ["Premiere Pro", "After Effects", "Motion Graphics", "Color"],
      postulaciones: 9,
      verificado: false,
      tiempoPublicacion: "Hace 2 días",
      urgencia: "medium"
    }
  ];

  /**
   * Función para filtrar trabajos según búsqueda y categoría
   * 
   * Esta función utiliza el método filter() de JavaScript para crear
   * un nuevo array con solo los trabajos que coinciden con los criterios.
   * 
   * Lógica de filtrado:
   * - Búsqueda: Coincide con título, empresa o descripción (case-insensitive)
   * - Categoría: Coincide exactamente con la categoría seleccionada
   * 
   * @returns Array filtrado de trabajos
   */
  const trabajosFiltrados = trabajos.filter(trabajo => {
    // Verificar si el trabajo coincide con la búsqueda
    const coincideBusqueda = trabajo.titulo.toLowerCase().includes(consultaBusqueda.toLowerCase()) ||
                             trabajo.empresa.toLowerCase().includes(consultaBusqueda.toLowerCase()) ||
                             trabajo.descripcion.toLowerCase().includes(consultaBusqueda.toLowerCase());
    
    // Verificar si el trabajo coincide con la categoría
    const coincideCategoria = categoriaSeleccionada === "all" || trabajo.categoria === categoriaSeleccionada;
    
    // Retornar true solo si coincide con ambos criterios
    return coincideBusqueda && coincideCategoria;
  });

  /**
   * Función para obtener el color de urgencia
   * 
   * Esta función helper retorna las clases CSS apropiadas
   * según el nivel de urgencia del trabajo.
   * 
   * @param urgencia - Nivel de urgencia (high, medium, low)
   * @returns String con las clases CSS para el color
   */
  const obtenerColorUrgencia = (urgencia: string) => {
    switch (urgencia) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  /**
   * Función para obtener el texto de urgencia
   * 
   * Esta función helper retorna el texto descriptivo
   * según el nivel de urgencia del trabajo.
   * 
   * @param urgencia - Nivel de urgencia (high, medium, low)
   * @returns String con el texto descriptivo
   */
  const obtenerTextoUrgencia = (urgencia: string) => {
    switch (urgencia) {
      case "high": return "Urgente";
      case "medium": return "Moderada";
      case "low": return "Sin prisa";
      default: return "Normal";
    }
  };

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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Oportunidades de Trabajo</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Encuentra proyectos que se adapten a tus habilidades y construye tu carrera freelance
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
                placeholder="Buscar trabajos o empresas..."
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
            {trabajosFiltrados.length} trabajos disponibles
          </p>
          <Select defaultValue="recent">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="budget-high">Mayor presupuesto</SelectItem>
              <SelectItem value="budget-low">Menor presupuesto</SelectItem>
              <SelectItem value="proposals">Menos postulaciones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de trabajos */}
        <div className="space-y-6">
          {trabajosFiltrados.map((trabajo) => (
            <Card key={trabajo.id} className="hover:shadow-lg transition-all duration-300 border-border/50">
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <CardTitle className="text-lg sm:text-xl hover:text-primary cursor-pointer transition-colors">
                        {trabajo.titulo}
                      </CardTitle>
                      {/* Badge de empresa verificada */}
                      {trabajo.verificado && (
                        <Badge variant="secondary" className="text-xs">
                          <Users className="mr-1 h-3 w-3" />
                          Verificado
                        </Badge>
                      )}
                      {/* Badge de urgencia */}
                      <Badge variant="outline" className={`text-xs ${obtenerColorUrgencia(trabajo.urgencia)}`}>
                        {obtenerTextoUrgencia(trabajo.urgencia)}
                      </Badge>
                    </div>
                    {/* Información de la empresa y ubicación */}
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="flex items-center">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {trabajo.empresa}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {trabajo.ubicacion}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {trabajo.tiempoPublicacion}
                      </span>
                    </CardDescription>
                  </div>
                  {/* Información de presupuesto */}
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-primary">{trabajo.presupuesto}</p>
                    <p className="text-sm text-muted-foreground">{trabajo.tipoPresupuesto}</p>
                  </div>
                </div>
              </CardHeader>
              
              {/* Contenido de la tarjeta */}
              <CardContent className="space-y-4">
                {/* Descripción del trabajo */}
                <p className="text-muted-foreground line-clamp-3">
                  {trabajo.descripcion}
                </p>

                {/* Habilidades requeridas */}
                <div className="flex flex-wrap gap-2">
                  {trabajo.habilidades.map((habilidad, indice) => (
                    <Badge key={indice} variant="outline" className="text-xs">
                      {habilidad}
                    </Badge>
                  ))}
                </div>

                {/* Información adicional y botones de acción */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {trabajo.postulaciones} postulaciones
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {trabajo.tiempoEstimado}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      Guardar
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90 flex-1 sm:flex-none">
                      Postularme
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cargar más */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Cargar más trabajos
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

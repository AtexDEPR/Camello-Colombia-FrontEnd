import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Plus, 
  Eye, 
  MessageSquare,
  Calendar,
  DollarSign
} from "lucide-react";

/**
 * Dashboard de Freelancer - Panel de control para profesionales independientes
 * 
 * Este componente muestra información relevante para freelancers:
 * - Estadísticas de servicios y ganancias
 * - Lista de servicios activos
 * - Actividad reciente
 * - Progreso del perfil
 * 
 * Conceptos de TypeScript utilizados:
 * - Arrays de objetos tipados
 * - Map function para renderizar listas
 * - Conditional rendering con operador ternario
 * - Template literals para strings dinámicos
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export function FreelancerDashboard() {
  return (
    <div className="space-y-6">
      {/* Encabezado de bienvenida */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">¡Hola, Juan!</h1>
          <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Crear Servicio
        </Button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 
          Tarjeta de Servicios Activos
          Card: Componente de tarjeta con sombra y bordes
          CardHeader: Encabezado de la tarjeta con título e icono
          CardContent: Contenido principal de la tarjeta
        */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+1</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Calificación */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              4.8
              {/* 
                Renderizado de estrellas usando Array.map()
                [...Array(5)]: Crea un array de 5 elementos
                map((_, i) => ...): Itera sobre cada elemento, i es el índice
              */}
              <div className="flex ml-2">
                {[...Array(5)].map((_, indice) => (
                  <Star 
                    key={indice} 
                    className={`h-3 w-3 ${indice < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Basado en 12 reseñas
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Trabajos Completados */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trabajos Completados</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2</span> este mes
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Ingresos */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+15%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sección de servicios y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mis Servicios */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Mis Servicios
            </CardTitle>
            <CardDescription>
              Gestiona tus servicios activos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 
              Array de servicios con estructura tipada
              Cada servicio tiene: título, precio, vistas y estado
            */}
            {[
              { titulo: "Diseño de Logo Profesional", precio: "$150,000", vistas: 45, estado: "Activo" },
              { titulo: "Desarrollo Web React", precio: "$800,000", vistas: 23, estado: "Activo" },
              { titulo: "Community Manager", precio: "$300,000", vistas: 67, estado: "Pausado" }
            ].map((servicio, indice) => (
              <div key={indice} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{servicio.titulo}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {servicio.precio}
                    </span>
                    <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {servicio.vistas} vistas
                    </span>
                  </div>
                </div>
                {/* 
                  Badge con variante condicional
                  Si el estado es "Activo", usa variante "default"
                  Si no, usa variante "secondary"
                */}
                <Badge variant={servicio.estado === "Activo" ? "default" : "secondary"}>
                  {servicio.estado}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver todos los servicios
            </Button>
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas interacciones y solicitudes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 
              Array de actividades con estructura tipada
              Cada actividad tiene: acción, cliente, proyecto, tiempo y tipo
            */}
            {[
              { 
                accion: "Nueva solicitud de trabajo", 
                cliente: "María González", 
                proyecto: "Diseño de logo",
                tiempo: "Hace 2 horas",
                tipo: "solicitud"
              },
              { 
                accion: "Mensaje recibido", 
                cliente: "Carlos Méndez", 
                proyecto: "Desarrollo web",
                tiempo: "Hace 5 horas",
                tipo: "mensaje"
              },
              { 
                accion: "Proyecto completado", 
                cliente: "Ana López", 
                proyecto: "Community manager",
                tiempo: "Hace 1 día",
                tipo: "completado"
              }
            ].map((actividad, indice) => (
              <div key={indice} className="flex items-start space-x-3">
                {/* 
                  Icono con color condicional basado en el tipo de actividad
                  Template literal: `texto ${variable} texto`
                */}
                <div className={`p-1 rounded-full ${
                  actividad.tipo === "solicitud" ? "bg-blue-100 text-blue-600" :
                  actividad.tipo === "mensaje" ? "bg-green-100 text-green-600" :
                  "bg-purple-100 text-purple-600"
                }`}>
                  {/* 
                    Renderizado condicional de iconos
                    Operador ternario anidado para mostrar el icono correcto
                  */}
                  {actividad.tipo === "solicitud" ? <User className="h-3 w-3" /> :
                   actividad.tipo === "mensaje" ? <MessageSquare className="h-3 w-3" /> :
                   <Calendar className="h-3 w-3" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{actividad.accion}</p>
                  <p className="text-sm text-muted-foreground">
                    {actividad.cliente} - {actividad.proyecto}
                  </p>
                  <p className="text-xs text-muted-foreground">{actividad.tiempo}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver toda la actividad
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Completar Perfil */}
      <Card className="border-border/50 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Completa tu Perfil
          </CardTitle>
          <CardDescription>
            Un perfil completo te ayuda a conseguir más clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progreso del perfil</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            {/* 
              Componente Progress para mostrar el progreso visual
              value: Porcentaje de completado (0-100)
            */}
            <Progress value={75} className="h-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  Información básica
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  Servicios publicados
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                  Portafolio (2/5)
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-gray-300 rounded-full mr-2"></div>
                  Certificaciones
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Button variant="outline" size="sm" className="w-full">
                  Completar perfil
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

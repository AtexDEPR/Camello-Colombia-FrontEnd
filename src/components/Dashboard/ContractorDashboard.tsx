import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Users, 
  ClipboardList, 
  Star, 
  TrendingUp,
  Search,
  Calendar,
  MessageSquare,
  DollarSign,
  Clock
} from "lucide-react";

/**
 * Dashboard de Contratante - Panel de control para empresas y contratantes
 * 
 * Este componente muestra información relevante para contratantes:
 * - Estadísticas de proyectos y freelancers
 * - Lista de proyectos activos
 * - Postulaciones recientes
 * - Acciones rápidas
 * 
 * Conceptos de TypeScript utilizados:
 * - Arrays de objetos tipados
 * - Map function para renderizar listas
 * - Conditional rendering con operador ternario
 * - Template literals para strings dinámicos
 * - Funciones helper para lógica reutilizable
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export function ContractorDashboard() {
  return (
    <div className="space-y-6">
      {/* Encabezado de bienvenida */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">¡Hola, María!</h1>
          <p className="text-muted-foreground">Gestiona tus proyectos y encuentra el mejor talento</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Buscar Freelancers
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Publicar Proyecto
          </Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta de Proyectos Activos */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2</span> este mes
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Freelancers Trabajando */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Freelancers Trabajando</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              En 5 proyectos diferentes
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Proyectos Completados */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Completados</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Presupuesto Invertido */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Invertido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,800,000</div>
            <p className="text-xs text-muted-foreground">
              Este trimestre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sección de proyectos y postulaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proyectos Activos */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="mr-2 h-5 w-5" />
              Proyectos Activos
            </CardTitle>
            <CardDescription>
              Seguimiento de tus proyectos en curso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 
              Array de proyectos con estructura tipada
              Cada proyecto tiene: título, freelancer, progreso, fecha límite y presupuesto
            */}
            {[
              { 
                titulo: "Desarrollo App Móvil", 
                freelancer: "Carlos Rodríguez", 
                progreso: 75, 
                fechaLimite: "En 5 días",
                presupuesto: "$1,200,000"
              },
              { 
                titulo: "Campaña Publicitaria", 
                freelancer: "Ana García", 
                progreso: 45, 
                fechaLimite: "En 12 días",
                presupuesto: "$600,000"
              },
              { 
                titulo: "Rediseño Web", 
                freelancer: "Luis Mendoza", 
                progreso: 90, 
                fechaLimite: "En 2 días",
                presupuesto: "$800,000"
              }
            ].map((proyecto, indice) => (
              <div key={indice} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{proyecto.titulo}</h4>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {proyecto.fechaLimite}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {proyecto.freelancer}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="mr-1 h-3 w-3" />
                    {proyecto.presupuesto}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progreso</span>
                    <span>{proyecto.progreso}%</span>
                  </div>
                  {/* 
                    Barra de progreso personalizada
                    style={{ width: `${progreso}%` }}: Estilo inline para el ancho dinámico
                  */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${proyecto.progreso}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver todos los proyectos
            </Button>
          </CardContent>
        </Card>

        {/* Postulaciones Recientes */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Postulaciones Recientes
            </CardTitle>
            <CardDescription>
              Freelancers interesados en tus proyectos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 
              Array de postulaciones con estructura tipada
              Cada postulación tiene: nombre, proyecto, calificación, precio, tiempo y especialidad
            */}
            {[
              { 
                nombre: "Jorge Martínez", 
                proyecto: "Sistema de Inventario",
                calificacion: 4.9, 
                precio: "$950,000",
                tiempo: "Hace 2 horas",
                especialidad: "Desarrollador Full Stack"
              },
              { 
                nombre: "Sandra López", 
                proyecto: "Estrategia Digital",
                calificacion: 4.7, 
                precio: "$400,000",
                tiempo: "Hace 4 horas",
                especialidad: "Marketing Digital"
              },
              { 
                nombre: "Miguel Torres", 
                proyecto: "Identidad Corporativa",
                calificacion: 4.8, 
                precio: "$350,000",
                tiempo: "Hace 1 día",
                especialidad: "Diseñador Gráfico"
              }
            ].map((postulacion, indice) => (
              <div key={indice} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{postulacion.nombre}</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground ml-1">{postulacion.calificacion}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{postulacion.especialidad}</p>
                  <p className="text-xs text-muted-foreground">{postulacion.proyecto} • {postulacion.tiempo}</p>
                </div>
                <div className="flex flex-col sm:text-right space-y-2 sm:space-y-1">
                  <p className="font-medium text-sm">{postulacion.precio}</p>
                  <div className="flex sm:justify-end space-x-2">
                    <Button size="sm" variant="outline" className="text-xs h-7 flex-1 sm:flex-none">
                      Ver
                    </Button>
                    <Button size="sm" className="text-xs h-7 flex-1 sm:flex-none">
                      Contratar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver todas las postulaciones
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <Card className="border-border/50 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Acciones Rápidas
          </CardTitle>
          <CardDescription>
            Tareas importantes que requieren tu atención
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 
              Botones de acción rápida
              Cada botón tiene un icono, texto y badge con información adicional
            */}
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Revisar Mensajes</span>
              <Badge variant="destructive" className="text-xs">3 nuevos</Badge>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Star className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Calificar Trabajos</span>
              <Badge variant="secondary" className="text-xs">2 pendientes</Badge>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Programar Reuniones</span>
              <Badge variant="outline" className="text-xs">Esta semana</Badge>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Revisar Pagos</span>
              <Badge variant="secondary" className="text-xs">1 pendiente</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Link } from "react-router-dom";
import { useMyServices } from "@/hooks/useServices";
import { useFreelancerStats, useRecentActivity } from "@/hooks/useDashboard";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const { data: servicesData, isLoading: servicesLoading } = useMyServices(0, 5);
  const { data: stats, isLoading: statsLoading } = useFreelancerStats();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();
  
  const services = servicesData?.content || [];
  const totalElements = servicesData?.totalElements || 0;

  // Usar estadísticas del backend o calcular desde servicios como fallback
  const activeServices = stats?.activeServices || services.filter(service => service.isActive).length;
  const totalViews = stats?.totalViews || services.reduce((sum, service) => sum + (service.viewsCount || 0), 0);
  const totalOrders = stats?.totalOrders || services.reduce((sum, service) => sum + (service.ordersCount || 0), 0);
  const averageRating = stats?.averageRating || (services.length > 0 
    ? services.reduce((sum, service) => sum + service.rating, 0) / services.length 
    : 0);

  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    return user.email.split('@')[0];
  };

  if (servicesLoading || statsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado de bienvenida */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            ¡Hola, {getUserDisplayName()}!
          </h1>
          <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto" asChild>
          <Link to="/services/create">
            <Plus className="mr-2 h-4 w-4" />
            Crear Servicio
          </Link>
        </Button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta de Servicios Activos */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeServices}</div>
            <p className="text-xs text-muted-foreground">
              Total de {totalElements} servicios
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
              {averageRating.toFixed(1)}
              <div className="flex ml-2">
                {[...Array(5)].map((_, indice) => (
                  <Star 
                    key={indice} 
                    className={`h-3 w-3 ${indice < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Promedio de servicios
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Vistas */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistas Totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              En todos tus servicios
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Órdenes */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Trabajos completados
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
            {services.length > 0 ? (
              services.slice(0, 3).map((servicio) => (
                <div key={servicio.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{servicio.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-3 w-3" />
                        ${servicio.price.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" />
                        {servicio.viewsCount} vistas
                      </span>
                    </div>
                  </div>
                  <Badge variant={servicio.isActive ? "default" : "secondary"}>
                    {servicio.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No tienes servicios aún</p>
                <p className="text-sm mb-4">Crea tu primer servicio para empezar a recibir clientes</p>
                <Button asChild>
                  <Link to="/services/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear mi primer servicio
                  </Link>
                </Button>
              </div>
            )}
            
            {services.length > 0 && (
              <Button variant="outline" className="w-full" asChild>
                <Link to="/services/my-services">
                  Ver todos los servicios ({totalElements})
                </Link>
              </Button>
            )}
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
            {activityLoading ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))
            ) : (
              recentActivity?.map((actividad) => (
                <div key={actividad.id} className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    actividad.type === "order" ? "bg-blue-100 text-blue-600" :
                    actividad.type === "message" ? "bg-green-100 text-green-600" :
                    actividad.type === "review" ? "bg-purple-100 text-purple-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {actividad.type === "order" ? <User className="h-3 w-3" /> :
                     actividad.type === "message" ? <MessageSquare className="h-3 w-3" /> :
                     actividad.type === "review" ? <Star className="h-3 w-3" /> :
                     <DollarSign className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{actividad.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {actividad.description}
                      {actividad.clientName && ` - ${actividad.clientName}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(actividad.timestamp).toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              )) || []
            )}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/notifications">
                Ver toda la actividad
              </Link>
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

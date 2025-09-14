import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Service } from "@/types/api";

interface ServiceCardProps {
  service: Service;
  showFavorite?: boolean;
  onFavoriteToggle?: (serviceId: string) => void;
}

export function ServiceCard({ service, showFavorite = true, onFavoriteToggle }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50">
      {/* Imagen del servicio */}
      <div className="relative">
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
          <img 
            src={service.imageUrl || "/placeholder.svg"} 
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {/* Botón de favorito */}
        {showFavorite && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle?.(service.id);
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Encabezado de la tarjeta */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {service.title}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span className="flex items-center">
            <MapPin className="mr-1 h-3 w-3" />
            {service.freelancerName || 'Freelancer'} • {service.location || 'Colombia'}
          </span>
        </CardDescription>
      </CardHeader>
      
      {/* Contenido de la tarjeta */}
      <CardContent className="space-y-3">
        {/* Calificación y vistas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{service.rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-sm">({service.reviewsCount || 0})</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Eye className="mr-1 h-3 w-3" />
            {service.viewsCount || 0}
          </div>
        </div>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-1">
          {service.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          )) || (
            <Badge variant="secondary" className="text-xs">
              {service.category}
            </Badge>
          )}
        </div>

        {/* Precio y botón de acción */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t gap-2">
          <div>
            <p className="font-semibold text-primary">
              ${service.price.toLocaleString('es-CO')}
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {service.deliveryTime || '3-5 días'}
            </p>
          </div>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto" asChild>
            <Link to={`/services/${service.id}`}>
              Ver Servicio
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
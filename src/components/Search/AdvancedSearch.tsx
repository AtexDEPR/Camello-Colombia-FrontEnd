import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Briefcase,
  User,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react";

interface SearchFilters {
  query: string;
  category: string;
  location: string;
  priceRange: [number, number];
  rating: number;
  deliveryTime: string;
  skills: string[];
  verified: boolean;
}

interface SearchResult {
  id: string;
  type: "service" | "freelancer" | "job";
  title: string;
  description: string;
  price?: number;
  rating: number;
  reviews: number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  location: string;
  deliveryTime?: string;
  skills: string[];
  image?: string;
}

export function AdvancedSearch() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    location: "",
    priceRange: [0, 1000000],
    rating: 0,
    deliveryTime: "",
    skills: [],
    verified: false
  });

  const categories = [
    "Diseño Gráfico",
    "Desarrollo Web",
    "Marketing Digital",
    "Redacción y Traducción",
    "Video y Animación",
    "Música y Audio",
    "Programación",
    "Consultoría",
    "Fotografía",
    "Community Manager"
  ];

  const locations = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Pereira",
    "Manizales",
    "Otras ciudades"
  ];

  const popularSkills = [
    "Adobe Illustrator",
    "Photoshop",
    "React",
    "WordPress",
    "SEO",
    "Social Media",
    "Branding",
    "UI/UX",
    "JavaScript",
    "Python"
  ];

  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "service",
      title: "Diseño de logo profesional y memorable",
      description: "Creo logos únicos que representen la esencia de tu marca con un estilo moderno y profesional.",
      price: 150000,
      rating: 4.9,
      reviews: 127,
      author: {
        name: "Ana Sofía Rodríguez",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "Diseño Gráfico",
      location: "Bogotá",
      deliveryTime: "3 días",
      skills: ["Adobe Illustrator", "Branding", "Logo Design"],
      image: "/placeholder.svg"
    },
    {
      id: "2",
      type: "service",
      title: "Desarrollo de sitio web responsive con React",
      description: "Desarrollo sitios web modernos, rápidos y optimizados para todos los dispositivos.",
      price: 800000,
      rating: 4.8,
      reviews: 89,
      author: {
        name: "Carlos Mendoza",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "Desarrollo Web",
      location: "Medellín",
      deliveryTime: "2 semanas",
      skills: ["React", "JavaScript", "CSS", "Node.js"],
      image: "/placeholder.svg"
    },
    {
      id: "3",
      type: "freelancer",
      title: "Especialista en Marketing Digital",
      description: "Experta en estrategias de marketing digital, SEO y gestión de redes sociales para empresas colombianas.",
      rating: 4.9,
      reviews: 156,
      author: {
        name: "María González",
        avatar: "/placeholder.svg",
        verified: true
      },
      category: "Marketing Digital",
      location: "Cali",
      skills: ["SEO", "Google Ads", "Social Media", "Analytics"]
    }
  ];

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "",
      location: "",
      priceRange: [0, 1000000],
      rating: 0,
      deliveryTime: "",
      skills: [],
      verified: false
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios, freelancers o trabajos..."
              className="pl-12 h-12 text-lg"
              value={filters.query}
              onChange={(e) => updateFilter("query", e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Panel */}
        {showFilters && (
          <div className="w-80 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filtros</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpiar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas las categorías</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las ubicaciones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas las ubicaciones</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label>Rango de Precio (COP)</Label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label>Calificación mínima</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant="ghost"
                        size="sm"
                        onClick={() => updateFilter("rating", rating)}
                        className="p-1"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            rating <= filters.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="space-y-2">
                  <Label>Tiempo de entrega</Label>
                  <Select value={filters.deliveryTime} onValueChange={(value) => updateFilter("deliveryTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Cualquier tiempo</SelectItem>
                      <SelectItem value="1">1 día</SelectItem>
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="7">1 semana</SelectItem>
                      <SelectItem value="14">2 semanas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Habilidades</Label>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map((skill) => (
                      <Button
                        key={skill}
                        variant={filters.skills.includes(skill) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSkill(skill)}
                        className="text-xs"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Verified */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => updateFilter("verified", !!checked)}
                  />
                  <Label htmlFor="verified">Solo usuarios verificados</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {mockResults.length} resultados encontrados
            </p>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Más relevantes</SelectItem>
                <SelectItem value="rating">Mejor calificados</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                <SelectItem value="recent">Más recientes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {mockResults.map((result) => (
              <Card key={result.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                {viewMode === "grid" ? (
                  <>
                    {result.image && (
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline">{result.category}</Badge>
                          {result.price && (
                            <p className="font-bold text-lg text-primary">
                              {formatPrice(result.price)}
                            </p>
                          )}
                        </div>
                        
                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {result.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={result.author.avatar} />
                              <AvatarFallback className="text-xs">
                                {result.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{result.author.name}</span>
                            {result.author.verified && (
                              <Badge variant="secondary" className="text-xs px-1">
                                ✓
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {result.rating} ({result.reviews})
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {result.location}
                          </div>
                        </div>
                        
                        {result.deliveryTime && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Entrega en {result.deliveryTime}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={result.author.avatar} />
                          <AvatarFallback>
                            {result.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {result.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              por {result.author.name}
                            </p>
                          </div>
                          {result.price && (
                            <p className="font-bold text-lg text-primary">
                              {formatPrice(result.price)}
                            </p>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {result.rating} ({result.reviews})
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {result.location}
                          </div>
                          {result.deliveryTime && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {result.deliveryTime}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {result.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

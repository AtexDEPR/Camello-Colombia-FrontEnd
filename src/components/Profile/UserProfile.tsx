import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Award, 
  MessageSquare,
  Share2,
  Heart,
  ThumbsUp,
  Eye,
  Users
} from "lucide-react";

interface UserProfileProps {
  userType: "freelancer" | "contractor";
}

export function UserProfile({ userType }: UserProfileProps) {
  const freelancerData = {
    name: "Ana Sofía Rodríguez",
    title: "Diseñadora Gráfica & Ilustradora",
    location: "Bogotá, Colombia",
    joinDate: "Marzo 2023",
    rating: 4.9,
    totalReviews: 47,
    completedJobs: 156,
    responseTime: "1 hora",
    skills: ["Illustrator", "Photoshop", "Branding", "Logo Design", "UI/UX"],
    description: "Soy una diseñadora gráfica apasionada con más de 5 años de experiencia creando identidades visuales memorables para marcas colombianas. Me especializo en branding, diseño de logos y experiencias digitales que conectan con las personas.",
    languages: ["Español (Nativo)", "Inglés (Intermedio)"],
    certifications: ["Certificación Adobe", "Google UX Design", "Diseño Thinking UNAL"]
  };

  const contractorData = {
    name: "Empresa TechColombia SAS",
    industry: "Tecnología",
    location: "Medellín, Colombia",
    joinDate: "Enero 2023",
    rating: 4.7,
    totalReviews: 23,
    activeProjects: 8,
    freelancersHired: 45,
    description: "Somos una empresa de desarrollo tecnológico enfocada en soluciones digitales para pymes colombianas. Trabajamos con los mejores freelancers del país para crear productos que impulsen el crecimiento de nuestros clientes.",
    teamSize: "10-50 empleados",
    website: "www.techcolombia.co"
  };

  const isFreelancer = userType === "freelancer";
  const userData = isFreelancer ? freelancerData : contractorData;

  const portfolioItems = [
    { title: "Branding para Café Local", image: "/placeholder.svg", likes: 24 },
    { title: "App UI para Startup", image: "/placeholder.svg", likes: 18 },
    { title: "Logo para Restaurante", image: "/placeholder.svg", likes: 32 },
  ];

  const reviews = [
    {
      client: "María González",
      rating: 5,
      comment: "Excelente trabajo, superó mis expectativas. Muy profesional y entregó a tiempo.",
      project: "Diseño de logo",
      date: "Hace 2 semanas"
    },
    {
      client: "Carlos Mendoza",
      rating: 5,
      comment: "Ana tiene un talento increíble para el diseño. Definitivamente la volvería a contratar.",
      project: "Branding completo",
      date: "Hace 1 mes"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Profile */}
      <Card className="border-border/50 shadow-elegant">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contactar
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                {isFreelancer && (
                  <p className="text-xl text-muted-foreground">{(userData as any).title}</p>
                )}
                {!isFreelancer && (
                  <p className="text-xl text-muted-foreground">{(userData as any).industry}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userData.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Miembro desde {userData.joinDate}
                </div>
                {isFreelancer && (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {(userData as any).completedJobs} trabajos completados
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(userData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">{userData.rating}</span>
                  <span className="ml-1 text-muted-foreground">({userData.totalReviews} reseñas)</span>
                </div>
                
                {isFreelancer && (
                  <Badge variant="secondary">
                    Responde en {(userData as any).responseTime}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {userData.description}
              </p>

              {isFreelancer && (
                <div className="flex flex-wrap gap-2">
                  {(userData as any).skills.map((skill: string) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          {isFreelancer && <TabsTrigger value="portfolio">Portafolio</TabsTrigger>}
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          <TabsTrigger value="about">Acerca de</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isFreelancer ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Trabajos completados</span>
                      <span className="font-semibold">{(userData as any).completedJobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tiempo de respuesta</span>
                      <span className="font-semibold">{(userData as any).responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Calificación</span>
                      <span className="font-semibold">{userData.rating}/5</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Proyectos activos</span>
                      <span className="font-semibold">{(userData as any).activeProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Freelancers contratados</span>
                      <span className="font-semibold">{(userData as any).freelancersHired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Calificación</span>
                      <span className="font-semibold">{userData.rating}/5</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {isFreelancer && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Idiomas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(userData as any).languages.map((lang: string) => (
                    <div key={lang} className="text-sm">{lang}</div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {isFreelancer ? "Certificaciones" : "Información"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {isFreelancer ? (
                  (userData as any).certifications.map((cert: string) => (
                    <div key={cert} className="flex items-center text-sm">
                      <Award className="h-3 w-3 mr-2 text-muted-foreground" />
                      {cert}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tamaño:</span> {(userData as any).teamSize}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Web:</span> {(userData as any).website}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isFreelancer && (
          <TabsContent value="portfolio" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Trabajos Destacados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-medium">{item.title}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Heart className="h-4 w-4 mr-1" />
                          {item.likes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="reviews" className="space-y-6">
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">{review.client}</p>
                      <p className="text-sm text-muted-foreground">{review.project} • {review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sobre {userData.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {userData.description}
              </p>
              <div className="pt-4">
                <h4 className="font-medium mb-2">Información adicional</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Miembro desde {userData.joinDate}</p>
                  <p>Ubicación: {userData.location}</p>
                  {isFreelancer && <p>Tiempo de respuesta promedio: {(userData as any).responseTime}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

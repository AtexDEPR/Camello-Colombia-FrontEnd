import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Upload, MapPin, User, Mail, Phone, Globe, Briefcase, GraduationCap, Languages } from "lucide-react";

/**
 * Página de Edición de Perfil - Actualizar información de usuario
 *
 * Esta página permite a los usuarios (freelancers y contratantes)
 * editar su información personal y profesional.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Conditional rendering basado en tipo de usuario
 * - Arrays de objetos tipados
 * 
 * @author Camello Colombia
 * @version 1.0.0
 */
export default function EditProfile() {
  // Estado para el tipo de usuario (en una app real vendría del contexto de autenticación)
  const [userType] = useState<"freelancer" | "contractor">("freelancer");
  
  // Estados para los campos comunes del perfil
  const [profileData, setProfileData] = useState({
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "+57 300 123 4567",
    location: "Bogotá",
    avatar: "/placeholder.svg",
    bio: "Desarrollador web con 5 años de experiencia en React, Node.js y diseño UI/UX. Especializado en crear experiencias digitales atractivas y funcionales."
  });
  
  // Estados específicos para freelancers
  const [freelancerData, setFreelancerData] = useState({
    title: "Desarrollador Web Full Stack",
    hourlyRate: "60000",
    skills: ["React", "Node.js", "TypeScript", "UI/UX", "Responsive Design"],
    languages: [
      { language: "Español", level: "nativo" },
      { language: "Inglés", level: "avanzado" }
    ],
    education: [
      { title: "Ingeniería de Sistemas", institution: "Universidad Nacional de Colombia", year: "2020" }
    ],
    certifications: [
      { title: "AWS Certified Developer", institution: "Amazon Web Services", year: "2022" }
    ],
    portfolio: true,
    availability: "full-time"
  });
  
  // Estados específicos para contratantes
  const [contractorData, setContractorData] = useState({
    companyName: "Tech Solutions SAS",
    industry: "Tecnología",
    website: "www.techsolutions.co",
    companySize: "11-50",
    foundedYear: "2018"
  });
  
  // Estado para habilidad actual (para agregar)
  const [currentSkill, setCurrentSkill] = useState("");
  
  // Función para actualizar campos del perfil general
  const updateProfileField = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  // Función para actualizar campos del perfil freelancer
  const updateFreelancerField = (field: string, value: any) => {
    setFreelancerData({
      ...freelancerData,
      [field]: value
    });
  };
  
  // Función para actualizar campos del perfil contratante
  const updateContractorField = (field: string, value: string) => {
    setContractorData({
      ...contractorData,
      [field]: value
    });
  };
  
  // Función para agregar una habilidad
  const addSkill = () => {
    if (currentSkill && !freelancerData.skills.includes(currentSkill)) {
      updateFreelancerField("skills", [...freelancerData.skills, currentSkill]);
      setCurrentSkill("");
    }
  };
  
  // Función para eliminar una habilidad
  const removeSkill = (skillToRemove: string) => {
    updateFreelancerField(
      "skills", 
      freelancerData.skills.filter(skill => skill !== skillToRemove)
    );
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear objeto con todos los datos del perfil
    const profileDataToSave = {
      ...profileData,
      ...(userType === "freelancer" ? freelancerData : contractorData)
    };
    
    // TODO: Enviar datos a la API
    console.log("Datos del perfil a guardar:", profileDataToSave);
    
    // Simulación de éxito
    alert("¡Perfil actualizado con éxito!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Editar Perfil</h1>
            <p className="text-muted-foreground">
              {userType === "freelancer" 
                ? "Actualiza tu información profesional para atraer más clientes" 
                : "Actualiza la información de tu empresa para encontrar mejores freelancers"}
            </p>
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Foto de perfil */}
            <Card>
              <CardHeader>
                <CardTitle>Foto de Perfil</CardTitle>
                <CardDescription>Una buena foto de perfil aumenta la confianza</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <Button type="button" variant="outline" className="w-full sm:w-auto">
                    <Upload className="mr-2 h-4 w-4" />
                    Subir nueva foto
                  </Button>
                  <p className="text-xs text-muted-foreground">Formatos: JPG, PNG. Máximo 2MB.</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Información personal */}
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Tus datos básicos de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nombre completo */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      className="pl-10"
                      value={profileData.name}
                      onChange={(e) => updateProfileField("name", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) => updateProfileField("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Teléfono */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) => updateProfileField("phone", e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Ubicación */}
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      className="pl-10"
                      value={profileData.location}
                      onChange={(e) => updateProfileField("location", e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Biografía */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    placeholder="Cuéntanos sobre ti..."
                    className="min-h-[120px]"
                    value={profileData.bio}
                    onChange={(e) => updateProfileField("bio", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Máximo 500 caracteres</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Información profesional - Condicional según tipo de usuario */}
            {userType === "freelancer" ? (
              <>
                {/* Perfil profesional - Freelancer */}
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil Profesional</CardTitle>
                    <CardDescription>Información sobre tu experiencia y servicios</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Título profesional */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Título profesional</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="title"
                          className="pl-10"
                          value={freelancerData.title}
                          onChange={(e) => updateFreelancerField("title", e.target.value)}
                          placeholder="Ej: Diseñador UX/UI Senior"
                        />
                      </div>
                    </div>
                    
                    {/* Tarifa por hora */}
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Tarifa por hora (COP)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={freelancerData.hourlyRate}
                        onChange={(e) => updateFreelancerField("hourlyRate", e.target.value)}
                        placeholder="Ej: 50000"
                      />
                      <p className="text-xs text-muted-foreground">Tarifa en pesos colombianos (COP)</p>
                    </div>
                    
                    {/* Habilidades */}
                    <div className="space-y-2">
                      <Label>Habilidades</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {freelancerData.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button
                              title="Remove skill"
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="h-4 w-4 rounded-full hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          placeholder="Añadir habilidad"
                          className="flex-1"
                        />
                        <Button type="button" size="sm" onClick={addSkill}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Disponibilidad */}
                    <div className="space-y-2">
                      <Label htmlFor="availability">Disponibilidad</Label>
                      <Select 
                        value={freelancerData.availability}
                        onValueChange={(value) => updateFreelancerField("availability", value)}
                      >
                        <SelectTrigger id="availability">
                          <SelectValue placeholder="Selecciona tu disponibilidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Tiempo completo</SelectItem>
                          <SelectItem value="part-time">Medio tiempo</SelectItem>
                          <SelectItem value="weekends">Fines de semana</SelectItem>
                          <SelectItem value="evenings">Tardes/Noches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Idiomas */}
                    <div className="space-y-2">
                      <Label>Idiomas</Label>
                      <div className="space-y-3">
                        {freelancerData.languages.map((lang, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Languages className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 font-medium">{lang.language}</div>
                            <Badge variant="outline">{lang.level}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Educación */}
                    <div className="space-y-2">
                      <Label>Educación</Label>
                      <div className="space-y-3">
                        {freelancerData.education.map((edu, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="font-medium">{edu.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {edu.institution}, {edu.year}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Portafolio */}
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="portfolio" 
                        checked={freelancerData.portfolio}
                        onCheckedChange={(checked) => updateFreelancerField("portfolio", checked)}
                      />
                      <Label htmlFor="portfolio">Mostrar portafolio en mi perfil público</Label>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Perfil de empresa - Contratante */}
                <Card>
                  <CardHeader>
                    <CardTitle>Información de la Empresa</CardTitle>
                    <CardDescription>Datos sobre tu organización</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Nombre de la empresa */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nombre de la empresa</Label>
                      <Input
                        id="companyName"
                        value={contractorData.companyName}
                        onChange={(e) => updateContractorField("companyName", e.target.value)}
                      />
                    </div>
                    
                    {/* Industria */}
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industria</Label>
                      <Select 
                        value={contractorData.industry}
                        onValueChange={(value) => updateContractorField("industry", value)}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Selecciona la industria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tecnología">Tecnología</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Educación">Educación</SelectItem>
                          <SelectItem value="Salud">Salud</SelectItem>
                          <SelectItem value="Finanzas">Finanzas</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Sitio web */}
                    <div className="space-y-2">
                      <Label htmlFor="website">Sitio web</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          className="pl-10"
                          value={contractorData.website}
                          onChange={(e) => updateContractorField("website", e.target.value)}
                          placeholder="www.ejemplo.com"
                        />
                      </div>
                    </div>
                    
                    {/* Tamaño de la empresa */}
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Tamaño de la empresa</Label>
                      <Select 
                        value={contractorData.companySize}
                        onValueChange={(value) => updateContractorField("companySize", value)}
                      >
                        <SelectTrigger id="companySize">
                          <SelectValue placeholder="Selecciona el tamaño" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 empleados</SelectItem>
                          <SelectItem value="11-50">11-50 empleados</SelectItem>
                          <SelectItem value="51-200">51-200 empleados</SelectItem>
                          <SelectItem value="201-500">201-500 empleados</SelectItem>
                          <SelectItem value="501+">501+ empleados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Año de fundación */}
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Año de fundación</Label>
                      <Input
                        id="foundedYear"
                        value={contractorData.foundedYear}
                        onChange={(e) => updateContractorField("foundedYear", e.target.value)}
                        placeholder="Ej: 2010"
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {/* Botones de acción */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">Cancelar</Button>
              <Button type="submit">Guardar cambios</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
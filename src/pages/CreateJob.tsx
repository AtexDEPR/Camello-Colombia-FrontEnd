import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, DollarSign, Clock, MapPin, Briefcase } from "lucide-react";

/**
 * Página de Creación de Trabajo - Publicar ofertas laborales
 *
 * Esta página permite a los contratantes crear y publicar ofertas
 * de trabajo para que los freelancers puedan aplicar.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Arrays de objetos tipados
 * - Funciones para manipular estado
 * 
 * @author Camello Colombia
 * @version 1.0.0
 */
export default function CreateJob() {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [budgetType, setBudgetType] = useState("fixed");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("remote");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState("");

  // Categorías disponibles
  const categories = [
    { id: "development", name: "Desarrollo Web" },
    { id: "design", name: "Diseño Gráfico" },
    { id: "marketing", name: "Marketing Digital" },
    { id: "writing", name: "Redacción y Contenido" },
    { id: "video", name: "Video y Animación" },
    { id: "photo", name: "Fotografía" },
    { id: "audio", name: "Audio y Música" },
    { id: "business", name: "Negocios" },
    { id: "lifestyle", name: "Estilo de Vida" },
  ];

  // Opciones de plazo
  const deadlineOptions = [
    { id: "1week", name: "1 semana" },
    { id: "2weeks", name: "2 semanas" },
    { id: "1month", name: "1 mes" },
    { id: "3months", name: "3 meses" },
    { id: "custom", name: "Personalizado" },
  ];

  // Función para agregar una habilidad
  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill("");
    }
  };

  // Función para eliminar una habilidad
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Función para agregar un requisito
  const addRequirement = () => {
    if (currentRequirement && !requirements.includes(currentRequirement)) {
      setRequirements([...requirements, currentRequirement]);
      setCurrentRequirement("");
    }
  };

  // Función para eliminar un requisito
  const removeRequirement = (reqToRemove: string) => {
    setRequirements(requirements.filter(req => req !== reqToRemove));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!title || !description || !category || !budgetMin || !deadline) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    
    // Crear objeto con datos del trabajo
    const jobData = {
      title,
      description,
      category,
      budget: {
        min: budgetMin,
        max: budgetMax || budgetMin,
        type: budgetType
      },
      deadline,
      location,
      skills,
      requirements
    };
    
    // TODO: Enviar datos a la API
    console.log("Datos del trabajo a publicar:", jobData);
    
    // Simulación de éxito
    alert("¡Trabajo publicado con éxito!");
    // Aquí iría la redirección a la página del trabajo creado
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Publicar Trabajo</h1>
            <p className="text-muted-foreground">Crea una oferta para encontrar el freelancer ideal para tu proyecto</p>
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Detalles principales de tu oferta de trabajo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título del trabajo <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Ej: Diseño de logo para emprendimiento de café"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                {/* Categoría */}
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría <span className="text-red-500">*</span></Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción detallada <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el trabajo, objetivos, entregables esperados y cualquier detalle relevante..."
                    className="min-h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Presupuesto y plazos */}
            <Card>
              <CardHeader>
                <CardTitle>Presupuesto y Plazos</CardTitle>
                <CardDescription>Define cuánto estás dispuesto a pagar y el tiempo de entrega</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tipo de presupuesto */}
                <div className="space-y-2">
                  <Label>Tipo de presupuesto</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={budgetType === "fixed" ? "default" : "outline"}
                      onClick={() => setBudgetType("fixed")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Proyecto completo
                    </Button>
                    <Button
                      type="button"
                      variant={budgetType === "hourly" ? "default" : "outline"}
                      onClick={() => setBudgetType("hourly")}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Por hora
                    </Button>
                  </div>
                </div>
                
                {/* Presupuesto */}
                <div className="space-y-2">
                  <Label>Presupuesto (COP) <span className="text-red-500">*</span></Label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Mínimo"
                        className="pl-10"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        required
                      />
                    </div>
                    <span className="text-muted-foreground">a</span>
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Máximo (opcional)"
                        className="pl-10"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Plazo de entrega */}
                <div className="space-y-2">
                  <Label htmlFor="deadline">Plazo de entrega <span className="text-red-500">*</span></Label>
                  <Select value={deadline} onValueChange={setDeadline} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      {deadlineOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Ubicación */}
                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={location === "remote" ? "default" : "outline"}
                      onClick={() => setLocation("remote")}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Remoto
                    </Button>
                    <Button
                      type="button"
                      variant={location === "onsite" ? "default" : "outline"}
                      onClick={() => setLocation("onsite")}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Presencial
                    </Button>
                    <Button
                      type="button"
                      variant={location === "hybrid" ? "default" : "outline"}
                      onClick={() => setLocation("hybrid")}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Híbrido
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Habilidades y requisitos */}
            <Card>
              <CardHeader>
                <CardTitle>Habilidades y Requisitos</CardTitle>
                <CardDescription>Define qué habilidades debe tener el freelancer ideal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Habilidades */}
                <div className="space-y-4">
                  <Label>Habilidades requeridas</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ej: React, Diseño UX, Copywriting..."
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1">
                          {skill}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator />
                
                {/* Requisitos */}
                <div className="space-y-4">
                  <Label>Requisitos específicos</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ej: Experiencia mínima de 2 años..."
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                    />
                    <Button type="button" onClick={addRequirement} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {requirements.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <span>{req}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => removeRequirement(req)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Botones de acción */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Guardar borrador
              </Button>
              <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                Publicar trabajo
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
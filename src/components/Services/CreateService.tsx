import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCreateService } from "@/hooks/useServices";
import { toast } from "@/hooks/use-toast";
import { X, Plus, Upload, DollarSign, Clock, Loader2 } from "lucide-react";

const categories = [
  { value: "design", label: "Diseño Gráfico" },
  { value: "development", label: "Desarrollo Web" },
  { value: "marketing", label: "Marketing Digital" },
  { value: "writing", label: "Redacción y Traducción" },
  { value: "video", label: "Video y Animación" },
  { value: "audio", label: "Música y Audio" },
  { value: "programming", label: "Programación" },
  { value: "consulting", label: "Consultoría" },
  { value: "photography", label: "Fotografía" },
  { value: "social-media", label: "Community Manager" }
];

export function CreateService() {
  const navigate = useNavigate();
  const createServiceMutation = useCreateService();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!title || !description || !category || !price || !deliveryTime) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      toast({
        title: "Precio inválido",
        description: "Por favor ingresa un precio válido",
        variant: "destructive",
      });
      return;
    }

    try {
      await createServiceMutation.mutateAsync({
        title,
        description,
        category,
        price: priceNumber,
        deliveryTime,
        tags,
        imageUrl: images[0] || null,
      });

      toast({
        title: "Servicio creado",
        description: "Tu servicio ha sido publicado exitosamente",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Crear Nuevo Servicio</h1>
        <p className="text-muted-foreground">Comparte tu talento con la comunidad Camello</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Describe tu servicio de manera clara y atractiva</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Servicio</Label>
              <Input
                id="title"
                placeholder="Ej: Diseño de logo profesional para tu empresa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe en detalle qué incluye tu servicio, tu experiencia y qué puede esperar el cliente..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precio y Entrega</CardTitle>
            <CardDescription>Define las condiciones comerciales de tu servicio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (COP)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="150000"
                    className="pl-10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Tiempo de Entrega</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Select value={deliveryTime} onValueChange={setDeliveryTime} required>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Seleccionar tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 día</SelectItem>
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="7">1 semana</SelectItem>
                      <SelectItem value="14">2 semanas</SelectItem>
                      <SelectItem value="30">1 mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags y Palabras Clave</CardTitle>
            <CardDescription>Ayuda a los clientes a encontrar tu servicio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Agregar tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Galería del Servicio</CardTitle>
            <CardDescription>Muestra ejemplos de tu trabajo (opcional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Arrastra imágenes aquí o</p>
              <Button type="button" variant="outline">Seleccionar archivos</Button>
              <p className="text-sm text-muted-foreground mt-2">
                Máximo 5 imágenes, formato JPG/PNG
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-gradient-primary hover:opacity-90"
            disabled={createServiceMutation.isPending}
          >
            {createServiceMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              'Publicar Servicio'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
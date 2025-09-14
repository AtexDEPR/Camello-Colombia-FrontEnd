import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Code, 
  Megaphone, 
  PenTool, 
  Camera, 
  TrendingUp,
  Music,
  Video,
  Globe,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    icon: Palette,
    name: "Diseño Gráfico",
    description: "Logos, branding, ilustraciones",
    projects: "120+ proyectos",
    gradient: "from-pink-500 to-orange-500",
    slug: "design"
  },
  {
    icon: Code,
    name: "Desarrollo Web",
    description: "Sitios web, apps, e-commerce",
    projects: "89+ proyectos",
    gradient: "from-blue-500 to-cyan-500",
    slug: "development"
  },
  {
    icon: Megaphone,
    name: "Marketing Digital",
    description: "Redes sociales, SEO, publicidad",
    projects: "156+ proyectos",
    gradient: "from-green-500 to-emerald-500",
    slug: "marketing"
  },
  {
    icon: PenTool,
    name: "Redacción",
    description: "Contenido, copywriting, blogs",
    projects: "94+ proyectos",
    gradient: "from-purple-500 to-indigo-500",
    slug: "writing"
  },
  {
    icon: Camera,
    name: "Fotografía",
    description: "Producto, eventos, retratos",
    projects: "67+ proyectos",
    gradient: "from-yellow-500 to-orange-500",
    slug: "photography"
  },
  {
    icon: TrendingUp,
    name: "Consultoría",
    description: "Negocios, estrategia, finanzas",
    projects: "43+ proyectos",
    gradient: "from-red-500 to-pink-500",
    slug: "consulting"
  },
  {
    icon: Music,
    name: "Audio",
    description: "Locución, música, podcasts",
    projects: "32+ proyectos",
    gradient: "from-indigo-500 to-purple-500",
    slug: "audio"
  },
  {
    icon: Video,
    name: "Video",
    description: "Edición, animación, motion",
    projects: "78+ proyectos",
    gradient: "from-teal-500 to-blue-500",
    slug: "video"
  },
  {
    icon: Globe,
    name: "Traducción",
    description: "Inglés, francés, portugués",
    projects: "25+ proyectos",
    gradient: "from-orange-500 to-red-500",
    slug: "translation"
  }
];

export function CategoriesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Explora nuestras
            <span className="bg-gradient-primary bg-clip-text text-transparent"> categorías</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Encuentra el servicio perfecto para tu proyecto o ofrece tus habilidades 
            en las categorías más demandadas del mercado colombiano.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/explore?category=${category.slug}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-xl p-6 shadow-camello-sm hover:shadow-camello-lg transition-all duration-300 border">
                {/* Icono con gradiente */}
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${category.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-7 w-7" />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground mb-3 text-sm">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-medium">
                    {category.projects}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="shadow-camello-sm hover:shadow-camello-md" asChild>
            <Link to="/explore">
              Ver todas las categorías
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

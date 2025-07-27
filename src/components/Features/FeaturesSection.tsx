import { motion } from "framer-motion";
import { Shield, CreditCard, Users, Zap, MapPin, Heart } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "100% Colombiano",
    description: "Plataforma diseñada para el mercado local con soporte en español y pagos en pesos.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Seguro y Confiable",
    description: "Verificación de perfiles, sistema de calificaciones y protección en cada transacción.",
    color: "text-success"
  },
  {
    icon: CreditCard,
    title: "Pagos Fáciles",
    description: "Cobra en pesos colombianos con métodos de pago locales como PSE, Nequi y Daviplata.",
    color: "text-warning"
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete a una comunidad de freelancers y empresas colombianas que crecen juntas.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Respuesta Rápida",
    description: "Encuentra proyectos o talento en minutos. Comunicación directa sin intermediarios.",
    color: "text-secondary"
  },
  {
    icon: Heart,
    title: "Hecho con Amor",
    description: "Creado por colombianos para colombianos. Impulsamos el talento nacional.",
    color: "text-destructive"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            ¿Por qué elegir
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Camello</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos más que una plataforma freelance. Somos el puente que conecta 
            el talento colombiano con las oportunidades que merecen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl p-6 shadow-camello-sm hover:shadow-camello-md transition-all duration-300 border"
            >
              <div className="mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-card ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Star, Flag, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-illustration.jpg";

export function HeroSection() {
  const { user, isAuthenticated } = useAuth();

  const handleFreelancerClick = () => {
    if (isAuthenticated) {
      // Si está autenticado, ir al dashboard
      window.location.href = '/dashboard';
    } else {
      // Si no está autenticado, ir al registro como freelancer
      window.location.href = '/register?role=freelancer';
    }
  };

  const handleContractorClick = () => {
    if (isAuthenticated) {
      // Si está autenticado, ir a explorar servicios
      window.location.href = '/explore';
    } else {
      // Si no está autenticado, ir al registro como contratante
      window.location.href = '/register?role=contractor';
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Flag className="h-4 w-4" />
              <span className="ml-2">100% Colombiano</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Conecta tu talento con
              <span className="bg-gradient-primary bg-clip-text text-transparent"> oportunidades reales</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              La primera plataforma freelance colombiana que conecta profesionales locales 
              con empresas que buscan talento digital. Trabaja desde cualquier lugar, 
              cobra en pesos colombianos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-camello-md"
                onClick={handleFreelancerClick}
              >
                {isAuthenticated ? 'Mi Dashboard' : 'Soy Freelancer'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="shadow-camello-sm"
                onClick={handleContractorClick}
              >
                {isAuthenticated ? 'Explorar Servicios' : 'Necesito talento'}
              </Button>
            </motion.div>

            {/* Estadísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 text-center lg:text-left"
            >
              <div>
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-foreground">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Freelancers</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Briefcase className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-foreground">1K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Proyectos</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-foreground">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">Calificación</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Ilustración */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                src={heroImage}
                alt="Plataforma Freelance Camello"
                className="w-full h-auto rounded-2xl shadow-camello-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Elementos flotantes */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium shadow-camello-md flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Verificado
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card text-card-foreground px-4 py-2 rounded-lg shadow-camello-md"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">En línea</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Efectos de fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-xl"></div>
      </div>
    </section>
  );
}

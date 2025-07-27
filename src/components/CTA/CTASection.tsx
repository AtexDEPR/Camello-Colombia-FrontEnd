"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Briefcase } from "lucide-react"

/**
 * Componente CTASection - Sección de Call-to-Action
 *
 * Sección final de la landing page que invita a los usuarios a registrarse.
 * Incluye:
 * - Mensaje motivacional para freelancers colombianos
 * - Botones diferenciados para freelancers y contratantes
 * - Indicadores de confianza (gratis, soporte 24/7, seguridad)
 * - Efectos visuales de fondo con gradientes
 * - Animaciones de entrada con Framer Motion
 *
 * Diseño:
 * - Fondo con gradiente primario de Camello
 * - Texto en colores contrastantes para accesibilidad
 * - Botones con hover effects y animaciones
 * - Efectos decorativos de fondo con círculos difuminados
 */
export function CTASection() {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Contenido principal con animación de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Título principal */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            ¿Listo para comenzar tu
            <span className="block">aventura freelance?</span>
          </h2>

          {/* Descripción motivacional */}
          <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Únete a la comunidad de freelancers colombianos más grande del país. Encuentra proyectos, construye tu
            reputación y haz crecer tu negocio.
          </p>

          {/* Botones de acción principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            {/* Botón para Freelancers */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-camello-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Soy Freelancer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Botón para Contratantes */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Necesito talento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Indicadores de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
          >
            {/* Indicador: Gratis */}
            <div className="text-primary-foreground/90">
              <div className="text-2xl font-bold mb-1">Gratis</div>
              <div className="text-sm">Registro sin costo</div>
            </div>

            {/* Indicador: Soporte 24/7 */}
            <div className="text-primary-foreground/90">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm">Soporte disponible</div>
            </div>

            {/* Indicador: Seguridad */}
            <div className="text-primary-foreground/90">
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-sm">Verificado y seguro</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Efectos decorativos de fondo */}
      <div className="absolute inset-0">
        {/* Círculo decorativo superior izquierdo */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        {/* Círculo decorativo inferior derecho */}
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>

        {/* Círculo decorativo central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}

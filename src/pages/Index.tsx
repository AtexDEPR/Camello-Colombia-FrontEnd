import { Header } from "@/components/Layout/Header"
import { Footer } from "@/components/Layout/Footer"
import { HeroSection } from "@/components/Hero/HeroSection"
import { FeaturesSection } from "@/components/Features/FeaturesSection"
import { CategoriesSection } from "@/components/Categories/CategoriesSection"
import { CTASection } from "@/components/CTA/CTASection"

/**
 * Página Index - Landing Page Principal de Camello
 *
 * Esta es la página de inicio que ven los visitantes cuando llegan a Camello.
 * Está diseñada para:
 * - Presentar la propuesta de valor de la plataforma
 * - Explicar cómo funciona Camello
 * - Mostrar las categorías de servicios disponibles
 * - Convertir visitantes en usuarios registrados
 *
 * Estructura de la página:
 * 1. Header: Navegación y botones de autenticación
 * 2. HeroSection: Mensaje principal y call-to-action
 * 3. FeaturesSection: Características y beneficios
 * 4. CategoriesSection: Categorías de servicios disponibles
 * 5. CTASection: Llamada final a la acción para registro
 * 6. Footer: Enlaces adicionales e información de contacto
 *
 * Optimizaciones:
 * - Diseño responsive para todos los dispositivos
 * - Animaciones suaves con Framer Motion
 * - SEO optimizado con meta tags apropiados
 * - Carga rápida con lazy loading de imágenes
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header con navegación principal */}
      <Header />

      {/* Contenido principal de la landing page */}
      <main>
        {/* Sección hero - Primera impresión y mensaje principal */}
        <HeroSection />

        {/* Sección de características - Por qué elegir Camello */}
        <FeaturesSection />

        {/* Sección de categorías - Servicios disponibles */}
        <CategoriesSection />

        {/* Sección CTA - Llamada final a la acción */}
        <CTASection />
      </main>

      {/* Footer con enlaces adicionales */}
      <Footer />
    </div>
  )
}

export default Index

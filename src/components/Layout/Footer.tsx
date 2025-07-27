import { Heart, MapPin } from "lucide-react"
import { CamelloLogo } from "@/components/ui/camello-logo"

/**
 * Componente Footer - Pie de página de Camello
 * 
 * Este componente proporciona información de contacto, enlaces útiles
 * y detalles legales en el pie de página de la aplicación.
 * 
 * Características principales:
 * - Logo de Camello y descripción de la empresa
 * - Enlaces de navegación organizados por categorías
 * - Información de contacto y ubicación
 * - Enlaces a redes sociales
 * - Información legal y de privacidad
 * - Diseño responsive y accesible
 * 
 * Responsive:
 * - Layout adaptativo para diferentes tamaños de pantalla
 * - Enlaces organizados en columnas responsivas
 * - Información de contacto optimizada para móviles
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export function Footer() {
  return (
    <footer className="bg-background border-t">
      {/* 
        Contenedor principal del footer
        container: Centra el contenido y establece un ancho máximo
        mx-auto: Margen automático horizontal para centrar
        px-4 sm:px-6 lg:px-8: Padding horizontal responsivo
        py-12: Padding vertical de 3rem (48px)
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 
          Grid principal del footer
          grid: Contenedor de grid CSS
          grid-cols-1 md:grid-cols-2 lg:grid-cols-4: Columnas responsivas
          gap-8: Espaciado de 2rem (32px) entre elementos
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sección de información de la empresa */}
          <div className="space-y-4">
            {/* Logo y nombre de la empresa */}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <CamelloLogo className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Camello</span>
            </div>
            
            {/* Descripción de la empresa */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              La primera plataforma freelance 100% colombiana. Conecta tu talento 
              con oportunidades reales, cobra en pesos, trabaja desde cualquier lugar.
            </p>
            
            {/* Información de contacto */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Bogotá, Colombia</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>📧 hola@camello.co</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>📞 +57 300 123 4567</span>
              </div>
            </div>
          </div>

          {/* Enlaces de navegación - Para Freelancers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Para Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <a href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Explorar Servicios
                </a>
              </li>
              <li>
                <a href="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Encontrar Trabajos
                </a>
              </li>
              <li>
                <a href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mi Perfil
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/earnings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mis Ganancias
                </a>
              </li>
            </ul>
          </div>

          {/* Enlaces de navegación - Para Contratantes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Para Contratantes</h3>
            <ul className="space-y-2">
              <li>
                <a href="/post-job" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Publicar Trabajo
                </a>
              </li>
              <li>
                <a href="/find-freelancers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Encontrar Freelancers
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="/enterprise" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Soluciones Empresariales
                </a>
              </li>
              <li>
                <a href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Soporte
                </a>
              </li>
            </ul>
          </div>

          {/* Enlaces de soporte y legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Soporte & Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 
          Línea divisoria
          border-t: Borde superior
          mt-8: Margen superior de 2rem (32px)
          pt-8: Padding superior de 2rem (32px)
        */}
        <div className="border-t mt-8 pt-8">
          {/* 
            Contenedor de la sección inferior
            flex flex-col md:flex-row: Apila verticalmente en móvil, horizontalmente en desktop
            items-center: Centra verticalmente los elementos
            justify-between: Distribuye el espacio entre los elementos
            gap-4: Espaciado de 1rem entre elementos
          */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Información de copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 Camello. Todos los derechos reservados.</span>
              <span>•</span>
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>en Colombia</span>
            </div>
            
            {/* Enlaces de redes sociales */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://twitter.com/camello_co" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Síguenos en Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a 
                href="https://linkedin.com/company/camello-co" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Síguenos en LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="https://instagram.com/camello_co" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

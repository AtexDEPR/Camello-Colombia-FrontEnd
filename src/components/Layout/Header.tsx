import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CamelloLogo } from "@/components/ui/camello-logo"
import { User, Briefcase, Search, Bell } from "lucide-react"

/**
 * Componente Header - Barra de navegación principal de Camello
 * 
 * Este componente proporciona la navegación principal de la aplicación.
 * Incluye el logo, enlaces de navegación, botones de acción y el alternador de temas.
 * 
 * Características principales:
 * - Logo de Camello con enlace al inicio
 * - Navegación principal (Explorar, Trabajos)
 * - Botón de notificaciones
 * - Alternador de temas (claro/oscuro/noche)
 * - Botones de autenticación (Ingresar/Registrarse)
 * - Diseño sticky que permanece visible al hacer scroll
 * - Backdrop blur para efecto moderno
 * 
 * Responsive:
 * - Navegación oculta en móviles (se puede expandir con menú hamburguesa)
 * - Botones adaptados para diferentes tamaños de pantalla
 * - Logo y texto ocultos en pantallas pequeñas para ahorrar espacio
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      {/* 
        Contenedor principal del header
        container: Centra el contenido y establece un ancho máximo
        mx-auto: Margen automático horizontal para centrar
        px-4 sm:px-6 lg:px-8: Padding horizontal responsivo
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
          Contenedor flex para organizar los elementos del header
          h-16: Altura fija de 4rem (64px)
          items-center: Centra verticalmente los elementos
          justify-between: Distribuye el espacio entre los elementos
        */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo de Camello */}
          <div className="flex items-center space-x-2">
            {/* 
              Contenedor del logo con gradiente
              h-8 w-8: Dimensiones de 2rem x 2rem (32px x 32px)
              bg-gradient-primary: Fondo con gradiente personalizado
              rounded-lg: Bordes redondeados
            */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <CamelloLogo className="h-4 w-4 text-primary-foreground" />
            </div>
            {/* 
              Nombre de la marca
              hidden sm:block: Oculta en móviles, muestra en pantallas pequeñas y mayores
              text-xl: Tamaño de texto extra large
              font-bold: Peso de fuente bold
              text-primary: Color primario de la marca
            */}
            <span className="hidden sm:block text-xl font-bold text-primary">Camello</span>
          </div>

          {/* 
            Navegación principal - Oculta en móviles
            hidden md:flex: Oculta en móviles, muestra en pantallas medianas y mayores
            items-center: Centra verticalmente los elementos
            space-x-6: Espaciado horizontal de 1.5rem (24px) entre elementos
          */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Enlace a Explorar */}
            <Button variant="ghost" className="text-sm font-medium" asChild>
              <a href="/explore">
                <Search className="mr-2 h-4 w-4" />
                Explorar
              </a>
            </Button>

            {/* Enlace a Trabajos */}
            <Button variant="ghost" className="text-sm font-medium" asChild>
              <a href="/jobs">
                <Briefcase className="mr-2 h-4 w-4" />
                Trabajos
              </a>
            </Button>
          </nav>

          {/* 
            Acciones del usuario
            flex: Contenedor flex para organizar los botones
            items-center: Centra verticalmente los elementos
            space-x-1 sm:space-x-2: Espaciado horizontal responsivo
          */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* 
              Botón de notificaciones
              hidden sm:flex: Oculta en móviles, muestra en pantallas pequeñas y mayores
              variant="ghost": Variante de botón sin fondo
              size="sm": Tamaño pequeño
            */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="h-4 w-4" />
            </Button>

            {/* 
              Alternador de temas
              Componente personalizado que maneja el cambio entre temas
            */}
            <ThemeToggle />

            {/* 
              Botón de inicio de sesión
              hidden sm:flex: Oculta en móviles, muestra en pantallas pequeñas y mayores
              variant="outline": Variante de botón con borde
              size="sm": Tamaño pequeño
              asChild: Permite que el botón se comporte como un enlace
            */}
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <a href="/login">
                <User className="mr-2 h-4 w-4" />
                Ingresar
              </a>
            </Button>

            {/* 
              Botón de registro con gradiente
              size="sm": Tamaño pequeño
              bg-gradient-primary: Fondo con gradiente personalizado
              hover:opacity-90: Efecto hover con opacidad
              asChild: Permite que el botón se comporte como un enlace
            */}
            <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
              <a href="/register">Registrarse</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

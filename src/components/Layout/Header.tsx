import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CamelloLogo } from "@/components/ui/camello-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, Briefcase, Search, Bell, LogOut, Settings, MessageSquare, FileText } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth, useRole } from "@/contexts/AuthContext"

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
  const { isAuthenticated, user, logout } = useAuth()
  const { isFreelancer, isContractor, isAdmin } = useRole()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    return user.email.charAt(0).toUpperCase()
  }

  const getUserDisplayName = () => {
    if (!user) return 'Usuario'
    return user.email.split('@')[0]
  }

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
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <CamelloLogo className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-xl font-bold text-primary">Camello</span>
          </Link>

          {/* Navegación principal */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-sm font-medium" asChild>
                <Link to="/explore">
                  <Search className="mr-2 h-4 w-4" />
                  Explorar
                </Link>
              </Button>

              <Button variant="ghost" className="text-sm font-medium" asChild>
                <Link to="/jobs">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Trabajos
                </Link>
              </Button>

              {isContractor && (
                <Button variant="ghost" className="text-sm font-medium" asChild>
                  <Link to="/jobs/create">
                    Publicar Trabajo
                  </Link>
                </Button>
              )}
            </nav>
          )}

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* Notificaciones */}
                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                  <Link to="/notifications">
                    <Bell className="h-4 w-4" />
                  </Link>
                </Button>

                {/* Mensajes */}
                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                  <Link to="/messages">
                    <MessageSquare className="h-4 w-4" />
                  </Link>
                </Button>

                {/* Menú de usuario */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={getUserDisplayName()} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {isFreelancer && 'Freelancer'}
                          {isContractor && 'Contratante'}
                          {isAdmin && 'Administrador'}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile/edit">
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/contracts">
                        <FileText className="mr-2 h-4 w-4" />
                        Contratos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin">
                            <Settings className="mr-2 h-4 w-4" />
                            Panel Admin
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Botones para usuarios no autenticados */}
                <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                  <Link to="/login">
                    <User className="mr-2 h-4 w-4" />
                    Ingresar
                  </Link>
                </Button>

                <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
                  <Link to="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

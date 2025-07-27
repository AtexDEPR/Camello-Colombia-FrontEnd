// Importaciones de componentes de UI y utilidades
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

// Importaciones para manejo de estado y navegación
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Importaciones de páginas de la aplicación
import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Explore from "./pages/Explore"
import Jobs from "./pages/Jobs"
import AdminPanel from "./pages/AdminPanel"
import Messages from "./pages/Messages"
import NotFound from "./pages/NotFound"

/**
 * Cliente de React Query para manejo de estado del servidor
 * Configuración básica para cache y sincronización de datos
 */
const queryClient = new QueryClient()

/**
 * Componente principal de la aplicación Camello
 *
 * Este componente configura:
 * - Proveedores de contexto globales (QueryClient, Tooltips)
 * - Sistema de notificaciones (Toaster, Sonner)
 * - Enrutamiento de la aplicación con React Router
 *
 * Estructura de rutas:
 * - "/" : Landing page pública
 * - "/login" : Página de inicio de sesión
 * - "/register" : Página de registro de usuarios
 * - "/dashboard" : Panel principal del usuario autenticado
 * - "/explore" : Explorar freelancers y servicios
 * - "/jobs" : Ofertas de trabajo disponibles
 * - "/messages" : Sistema de mensajería
 * - "/admin" : Panel administrativo
 * - "*" : Página 404 para rutas no encontradas
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Proveedor de tooltips para toda la aplicación */}
    <TooltipProvider>
      {/* Sistemas de notificaciones */}
      <Toaster />
      <Sonner />

      {/* Configuración del enrutador */}
      <BrowserRouter>
        <Routes>
          {/* Ruta pública - Landing page */}
          <Route path="/" element={<Index />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas - requieren autenticación */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/messages" element={<Messages />} />

          {/* Ruta administrativa - requiere permisos especiales */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* IMPORTANTE: Mantener la ruta "*" al final para capturar rutas no definidas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App

// Importaciones de componentes de UI y utilidades
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

// Importaciones para manejo de estado y navegación
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Importaciones de contextos
import { AuthProvider, ProtectedRoute } from "@/contexts/AuthContext"

// Importaciones de páginas de la aplicación
import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import Dashboard from "./pages/Dashboard"
import Explore from "./pages/Explore"
import Jobs from "./pages/Jobs"
import CreateJob from "./pages/CreateJob"
import JobDetail from "./pages/JobDetail"
import ServiceDetail from "./pages/ServiceDetail"
import CreateService from "./pages/CreateService"
import Contracts from "./pages/Contracts"
import Messages from "./pages/Messages"
import Notifications from "./pages/Notifications"
import Settings from "./pages/Settings"
import EditProfile from "./pages/EditProfile"
import PaymentMethods from "./pages/PaymentMethods"
import AdminPanel from "./pages/AdminPanel"
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
 * - "/forgot-password" : Recuperación de contraseña
 * - "/dashboard" : Panel principal del usuario autenticado
 * - "/explore" : Explorar freelancers y servicios
 * - "/jobs" : Ofertas de trabajo disponibles
 * - "/jobs/create" : Crear nueva oferta de trabajo
 * - "/jobs/:id" : Detalle de trabajo específico
 * - "/services/:id" : Detalle de servicio específico
 * - "/contracts" : Gestión de contratos
 * - "/messages" : Sistema de mensajería
 * - "/notifications" : Notificaciones del usuario
 * - "/settings" : Configuración de la cuenta
 * - "/profile/edit" : Editar perfil de usuario
 * - "/payment-methods" : Métodos de pago
 * - "/admin" : Panel administrativo
 * - "*" : Página 404 para rutas no encontradas
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Proveedor de autenticación para toda la aplicación */}
    <AuthProvider>
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
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Rutas protegidas - requieren autenticación */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/explore" element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } />
            
            {/* Rutas de trabajos */}
            <Route path="/jobs" element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs/create" element={
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id" element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            } />
            
            {/* Rutas de servicios */}
            <Route path="/services/create" element={
              <ProtectedRoute>
                <CreateService />
              </ProtectedRoute>
            } />
            <Route path="/services/:id" element={
              <ProtectedRoute>
                <ServiceDetail />
              </ProtectedRoute>
            } />
            
            {/* Rutas de gestión */}
            <Route path="/contracts" element={
              <ProtectedRoute>
                <Contracts />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            
            {/* Rutas de perfil y configuración */}
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } />
            <Route path="/payment-methods" element={
              <ProtectedRoute>
                <PaymentMethods />
              </ProtectedRoute>
            } />

            {/* Ruta administrativa - requiere permisos especiales */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />

            {/* IMPORTANTE: Mantener la ruta "*" al final para capturar rutas no definidas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App

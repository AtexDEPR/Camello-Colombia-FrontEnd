"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CamelloLogo } from "@/components/ui/camello-logo"
import { Mail, Lock, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"

/**
 * Página de Inicio de Sesión - Autenticación de usuarios en Camello
 *
 * Esta página permite a los usuarios iniciar sesión en la plataforma.
 * Utiliza React Hooks para manejar el estado del formulario.
 * 
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - React.FormEvent: Tipo para eventos de formulario
 * - Objetos tipados: formData tiene una estructura específica
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export default function PaginaInicioSesion() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth()

  /**
   * Estado del formulario de inicio de sesión
   */
  const [datosFormulario, establecerDatosFormulario] = useState({
    email: "",
    password: "",
  })

  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [enviando, setEnviando] = useState(false)

  /**
   * Redirigir si ya está autenticado
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  /**
   * Limpiar errores cuando el usuario empiece a escribir
   */
  useEffect(() => {
    if (error) {
      clearError()
    }
  }, [datosFormulario.email, datosFormulario.password])

  /**
   * Manejador del envío del formulario
   */
  const manejarEnvio = async (evento: React.FormEvent) => {
    evento.preventDefault()
    
    // Validaciones básicas
    if (!datosFormulario.email || !datosFormulario.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    if (!datosFormulario.email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      })
      return
    }

    try {
      setEnviando(true)
      await login({
        email: datosFormulario.email,
        password: datosFormulario.password,
      })
      
      // El redirect se maneja en el useEffect
    } catch (error) {
      // El error se maneja en el AuthContext
      console.error('Error en login:', error)
    } finally {
      setEnviando(false)
    }
  }

  /**
   * Manejar cambios en los inputs
   */
  const manejarCambio = (campo: string) => (evento: React.ChangeEvent<HTMLInputElement>) => {
    establecerDatosFormulario(prev => ({
      ...prev,
      [campo]: evento.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Enlace de navegación de regreso */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Logo de Camello */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <CamelloLogo className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">Camello</span>
          </div>
        </div>

        {/* Tarjeta principal de inicio de sesión */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">Ingresa a tu cuenta para acceder a la plataforma</CardDescription>
          </CardHeader>

          <CardContent>
            {/* 
              Formulario de inicio de sesión
              onSubmit: Se ejecuta cuando se envía el formulario
              className: Clases de Tailwind CSS para estilos
            */}
            <form onSubmit={manejarEnvio} className="space-y-4">
              {/* Campo de correo electrónico */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={datosFormulario.email}
                    onChange={manejarCambio('email')}
                    disabled={enviando || isLoading}
                    required
                  />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={datosFormulario.password}
                    onChange={manejarCambio('password')}
                    disabled={enviando || isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Mostrar error si existe */}
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Enlace de recuperación de contraseña */}
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón de envío */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={enviando || isLoading}
              >
                {enviando || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            {/* Enlace a registro */}
            <div className="mt-6 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

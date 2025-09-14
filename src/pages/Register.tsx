"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CamelloLogo } from "@/components/ui/camello-logo"
import { Mail, Lock, User, ArrowLeft, Briefcase, Users, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { UserRole } from "@/types/api"
import { toast } from "@/hooks/use-toast"

/**
 * Página de Registro - Crear cuenta en Camello
 *
 * Esta página permite a los usuarios registrarse como freelancer o contratante.
 * Utiliza React Hooks y componentes de UI para crear un formulario interactivo.
 *
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Union Types: "freelancer" | "contractor"
 * - React.FormEvent: Tipo para eventos de formulario
 * - Objetos tipados: formData tiene una estructura específica
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export default function PaginaRegistro() {
  const navigate = useNavigate()
  const { register, isAuthenticated, isLoading, error, clearError } = useAuth()
  
  // Obtener parámetros de URL
  const urlParams = new URLSearchParams(window.location.search);
  const roleFromUrl = urlParams.get('role') as "freelancer" | "contractor" | null;

  const [tipoUsuario, establecerTipoUsuario] = useState<"freelancer" | "contractor">(
    roleFromUrl || "freelancer"
  )
  const [datosFormulario, establecerDatosFormulario] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
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
   * Validaciones del formulario
   */
  const validarFormulario = () => {
    if (!datosFormulario.email || !datosFormulario.password || !datosFormulario.confirmPassword) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return false
    }

    if (!datosFormulario.email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      })
      return false
    }

    if (datosFormulario.password.length < 6) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      })
      return false
    }

    if (datosFormulario.password !== datosFormulario.confirmPassword) {
      toast({
        title: "Contraseñas no coinciden",
        description: "Las contraseñas ingresadas no son iguales",
        variant: "destructive",
      })
      return false
    }

    if (!aceptaTerminos) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  /**
   * Manejador del envío del formulario
   */
  const manejarEnvio = async (evento: React.FormEvent) => {
    evento.preventDefault()
    
    if (!validarFormulario()) {
      return
    }

    try {
      setEnviando(true)
      await register({
        email: datosFormulario.email,
        password: datosFormulario.password,
        confirmPassword: datosFormulario.confirmPassword,
        role: tipoUsuario === "freelancer" ? UserRole.FREELANCER : UserRole.CONTRACTOR,
        acceptTerms: aceptaTerminos,
      })
      
      // El redirect se maneja en el useEffect
    } catch (error) {
      // El error se maneja en el AuthContext
      console.error('Error en registro:', error)
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
        {/* Navegación de regreso */}
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

        {/* Tarjeta principal de registro */}
        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">Únete a la comunidad freelance colombiana</CardDescription>
          </CardHeader>

          <CardContent>
            {/* 
              Formulario de registro
              onSubmit: Se ejecuta cuando se envía el formulario
              className: Clases de Tailwind CSS para estilos
            */}
            <form onSubmit={manejarEnvio} className="space-y-4">
              {/* Selección de tipo de usuario */}
              <div className="space-y-3">
                <Label>¿Cómo quieres usar Camello?</Label>
                {/* 
                  RadioGroup: Componente para selección única
                  value: Valor actual seleccionado
                  onValueChange: Función que se ejecuta al cambiar la selección
                */}
                <RadioGroup
                  value={tipoUsuario}
                  onValueChange={(valor) => establecerTipoUsuario(valor as "freelancer" | "contractor")}
                >
                  {/* Opción Freelancer */}
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="freelancer" id="freelancer" />
                    <Label htmlFor="freelancer" className="flex items-center cursor-pointer flex-1">
                      <User className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">Soy Freelancer</div>
                        <div className="text-sm text-muted-foreground">Quiero ofrecer mis servicios</div>
                      </div>
                    </Label>
                  </div>

                  {/* Opción Contratante */}
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="contractor" id="contractor" />
                    <Label htmlFor="contractor" className="flex items-center cursor-pointer flex-1">
                      <Briefcase className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">Soy Contratante</div>
                        <div className="text-sm text-muted-foreground">Quiero contratar talento</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

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
                <p className="text-xs text-muted-foreground">
                  Mínimo 6 caracteres
                </p>
              </div>

              {/* Campo de confirmación de contraseña */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={mostrarConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={datosFormulario.confirmPassword}
                    onChange={manejarCambio('confirmPassword')}
                    disabled={enviando || isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                  >
                    {mostrarConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={aceptaTerminos}
                  onCheckedChange={setAceptaTerminos}
                  disabled={enviando || isLoading}
                />
                <Label htmlFor="terms" className="text-sm">
                  Acepto los{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    política de privacidad
                  </Link>
                </Label>
              </div>

              {/* Mostrar error si existe */}
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Botón de registro */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={enviando || isLoading}
              >
                {enviando || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </Button>
            </form>

            {/* Enlace a inicio de sesión */}
            <div className="mt-6 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

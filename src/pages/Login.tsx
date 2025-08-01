"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CamelloLogo } from "@/components/ui/camello-logo"
import { Mail, Lock, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

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
  /**
   * Estado del formulario de inicio de sesión
   * 
   * useState es un Hook de React que permite agregar estado a componentes funcionales.
   * El primer elemento es el valor actual del estado, el segundo es una función para actualizarlo.
   * 
   * Tipos de TypeScript:
   * - { email: string, password: string }: Define la estructura del objeto
   * - useState<...>: Especifica el tipo del estado
   */
  const [datosFormulario, establecerDatosFormulario] = useState({
    email: "",
    contraseña: "",
  })

  /**
   * Manejador del envío del formulario
   *
   * Esta función se ejecuta cuando el usuario envía el formulario.
   * Previene el comportamiento por defecto del navegador y procesa los datos.
   * 
   * @param evento - Evento del formulario (tipo React.FormEvent)
   *
   * TODO: Implementar lógica real de autenticación
   * - Validar datos del formulario
   * - Enviar petición al backend
   * - Manejar respuesta (éxito/error)
   * - Redirigir al dashboard si es exitoso
   * - Mostrar errores si falla
   */
  const manejarEnvio = (evento: React.FormEvent) => {
    // Prevenir el comportamiento por defecto del formulario
    evento.preventDefault()

    // Placeholder - reemplazar con lógica real
    console.log("Intento de inicio de sesión:", datosFormulario)

    // Aquí iría la lógica de autenticación:
    // 1. Validar campos
    // 2. Enviar petición POST a /api/auth/login
    // 3. Guardar token JWT en localStorage
    // 4. Actualizar contexto de autenticación
    // 5. Redirigir a dashboard
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
                  {/* Icono dentro del input */}
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10" // Padding left para el icono
                    value={datosFormulario.email}
                    onChange={(e) => establecerDatosFormulario({ 
                      ...datosFormulario, 
                      email: e.target.value 
                    })}
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
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={datosFormulario.contraseña}
                    onChange={(e) => establecerDatosFormulario({ 
                      ...datosFormulario, 
                      contraseña: e.target.value 
                    })}
                    required
                  />
                </div>
              </div>

              {/* Enlace de recuperación de contraseña */}
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón de envío */}
              <Button type="submit" className="w-full">
                Iniciar Sesión
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

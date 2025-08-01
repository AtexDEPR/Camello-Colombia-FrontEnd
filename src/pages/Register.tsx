"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CamelloLogo } from "@/components/ui/camello-logo"
import { Mail, Lock, User, ArrowLeft, Briefcase, Users } from "lucide-react"
import { Link } from "react-router-dom"

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
  /**
   * Estado para el tipo de usuario seleccionado
   * 
   * Union Type en TypeScript: "freelancer" | "contractor"
   * Esto significa que userType solo puede tener uno de estos dos valores.
   * 
   * useState<"freelancer" | "contractor">: Especifica el tipo exacto del estado
   */
  const [tipoUsuario, establecerTipoUsuario] = useState<"freelancer" | "contractor">("freelancer")

  /**
   * Estado del formulario de registro
   * 
   * Objeto tipado que define la estructura exacta de los datos del formulario.
   * Cada propiedad tiene un tipo específico (string).
   * 
   * Tipos de TypeScript:
   * - { name: string, email: string, ... }: Define la estructura del objeto
   * - useState<...>: Especifica el tipo del estado
   */
  const [datosFormulario, establecerDatosFormulario] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  })

  /**
   * Manejador del envío del formulario de registro
   *
   * Esta función se ejecuta cuando el usuario envía el formulario.
   * Incluye validación básica de contraseñas y prepara los datos para el backend.
   * 
   * @param evento - Evento del formulario (tipo React.FormEvent)
   *
   * TODO: Implementar lógica completa de registro
   * - Validar que las contraseñas coincidan
   * - Validar formato de email
   * - Validar fortaleza de contraseña
   * - Enviar datos al backend
   * - Manejar respuestas de error
   * - Redirigir a onboarding específico por tipo de usuario
   */
  const manejarEnvio = (evento: React.FormEvent) => {
    // Prevenir el comportamiento por defecto del formulario
    evento.preventDefault()

    // Validación básica de contraseñas
    if (datosFormulario.contraseña !== datosFormulario.confirmarContraseña) {
      alert("Las contraseñas no coinciden")
      return
    }

    // Placeholder - reemplazar con lógica real
    console.log("Intento de registro:", { ...datosFormulario, tipoUsuario })

    // Aquí iría la lógica de registro:
    // 1. Validar todos los campos
    // 2. Enviar petición POST a /api/auth/register
    // 3. Manejar respuesta del servidor
    // 4. Redirigir según el tipo de usuario:
    //    - Freelancer: a completar perfil profesional
    //    - Contratante: a configuración de empresa
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

              {/* Campo de nombre completo */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre completo"
                    className="pl-10"
                    value={datosFormulario.nombre}
                    onChange={(e) => establecerDatosFormulario({ 
                      ...datosFormulario, 
                      nombre: e.target.value 
                    })}
                    required
                  />
                </div>
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
                <Label htmlFor="contraseña">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contraseña"
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

              {/* Campo de confirmación de contraseña */}
              <div className="space-y-2">
                <Label htmlFor="confirmarContraseña">Confirmar contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmarContraseña"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={datosFormulario.confirmarContraseña}
                    onChange={(e) => establecerDatosFormulario({ 
                      ...datosFormulario, 
                      confirmarContraseña: e.target.value 
                    })}
                    required
                  />
                </div>
              </div>

              {/* Botón de registro */}
              <Button type="submit" className="w-full">
                Crear Cuenta
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

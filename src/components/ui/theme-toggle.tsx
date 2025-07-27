"use client"

import { Sun, Moon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

/**
 * Tipos de tema disponibles en Camello
 * 
 * Union Type en TypeScript que define los tres temas posibles:
 * - light: Tema claro (predeterminado) - colores cálidos y profesionales
 * - dark: Tema oscuro - para uso en ambientes con poca luz
 * - night: Tema noche - máximo contraste para uso nocturno
 */
type Tema = "light" | "dark" | "night"

/**
 * Componente ThemeToggle - Alternador de temas de Camello
 * 
 * Este componente permite a los usuarios cambiar entre diferentes temas visuales.
 * Utiliza React Hooks para manejar el estado y persistir la preferencia del usuario.
 * 
 * Funcionalidades:
 * - Cicla entre 3 temas: claro → oscuro → noche → claro
 * - Persiste la preferencia en localStorage
 * - Aplica el tema al elemento raíz del documento
 * - Muestra iconos apropiados para cada tema
 * - Incluye tooltips descriptivos
 * 
 * Conceptos de TypeScript utilizados:
 * - Union Types: "light" | "dark" | "night"
 * - useState: Hook para manejar estado local
 * - useEffect: Hook para efectos secundarios
 * - Funciones helper para lógica reutilizable
 * 
 * Uso:
 * <ThemeToggle />
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export function ThemeToggle() {
  /**
   * Estado local para el tema actual
   * 
   * useState es un Hook de React que permite agregar estado a componentes funcionales.
   * El primer elemento es el valor actual del estado, el segundo es una función para actualizarlo.
   * 
   * Tipos de TypeScript:
   * - Tema: Union type que define los temas posibles
   * - useState<Tema>: Especifica el tipo del estado
   */
  const [tema, establecerTema] = useState<Tema>("light")

  /**
   * Efecto para cargar el tema guardado al montar el componente
   * 
   * useEffect es un Hook de React que permite ejecutar efectos secundarios.
   * Se ejecuta una sola vez al cargar la página (array de dependencias vacío []).
   * 
   * En este caso:
   * - Recupera el tema guardado del localStorage
   * - Si existe, lo aplica al estado y al DOM
   * - Si no existe, mantiene el tema por defecto (light)
   */
  useEffect(() => {
    // Intentar recuperar el tema guardado del localStorage
    const temaGuardado = localStorage.getItem("camello-theme") as Tema
    if (temaGuardado) {
      establecerTema(temaGuardado)
      aplicarTema(temaGuardado)
    }
  }, [])

  /**
   * Función para aplicar el tema al DOM
   * 
   * Esta función modifica las clases CSS del elemento raíz del documento
   * para cambiar los estilos globales de la aplicación.
   * 
   * @param nuevoTema - El tema a aplicar (tipo Tema)
   */
  const aplicarTema = (nuevoTema: Tema) => {
    // Obtener el elemento raíz del documento (html)
    const raiz = document.documentElement

    // Remover todas las clases de tema existentes
    raiz.classList.remove("light", "dark", "night")

    // Aplicar la nueva clase de tema
    raiz.classList.add(nuevoTema)
  }

  /**
   * Función para ciclar entre temas
   * 
   * Esta función cambia al siguiente tema en la secuencia:
   * light → dark → night → light
   * 
   * Utiliza el operador módulo (%) para ciclar de vuelta al inicio
   * cuando se llega al final del array.
   */
  const ciclarTema = () => {
    // Array con todos los temas disponibles
    const temas: Tema[] = ["light", "dark", "night"]
    
    // Encontrar el índice del tema actual
    const indiceActual = temas.indexOf(tema)

    // Calcular el siguiente tema usando módulo para ciclar
    const siguienteTema = temas[(indiceActual + 1) % temas.length]

    // Actualizar estado y aplicar cambios
    establecerTema(siguienteTema)
    aplicarTema(siguienteTema)

    // Guardar preferencia en localStorage para persistencia
    localStorage.setItem("camello-theme", siguienteTema)
  }

  /**
   * Función para obtener el icono apropiado según el tema actual
   * 
   * Esta función utiliza un switch statement para retornar
   * el componente de icono correcto según el tema actual.
   * 
   * @returns Componente de icono de Lucide React
   */
  const obtenerIcono = () => {
    switch (tema) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "night":
        return <Star className="h-4 w-4" />
    }
  }

  /**
   * Función para obtener el texto del tooltip según el tema actual
   * 
   * Esta función utiliza un switch statement para retornar
   * el texto descriptivo apropiado para el tooltip.
   * 
   * @returns Texto descriptivo para el tooltip
   */
  const obtenerTooltip = () => {
    switch (tema) {
      case "light":
        return "Cambiar a modo oscuro"
      case "dark":
        return "Cambiar a modo noche"
      case "night":
        return "Cambiar a modo claro"
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={ciclarTema}
      className="relative h-9 w-9 rounded-full hover:bg-primary/10 transition-all duration-300"
      title={obtenerTooltip()}
    >
      {/* 
        Contenedor con animación de escala al hover
        transform: Habilita transformaciones CSS
        transition-transform: Aplica transición solo a transformaciones
        duration-300: Duración de 300ms
        hover:scale-110: Escala al 110% en hover
      */}
      <div className="transform transition-transform duration-300 hover:scale-110">
        {obtenerIcono()}
      </div>
    </Button>
  )
}

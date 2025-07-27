import { Header } from "@/components/Layout/Header";
import { FreelancerDashboard } from "@/components/Dashboard/FreelancerDashboard";
import { ContractorDashboard } from "@/components/Dashboard/ContractorDashboard";
import { useState } from "react";

/**
 * Página Principal del Dashboard - Panel de control de usuarios
 * 
 * Esta página actúa como un router que muestra diferentes dashboards
 * según el tipo de usuario (freelancer o contratante).
 * 
 * Conceptos de TypeScript utilizados:
 * - useState: Hook para manejar estado local
 * - Union Types: "freelancer" | "contractor"
 * - Conditional Rendering: Renderizado condicional basado en el tipo de usuario
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
export default function PaginaDashboard() {
  /**
   * Estado para el tipo de usuario actual
   * 
   * TODO: Obtener el tipo de usuario desde el contexto de autenticación
   * Por ahora está hardcodeado como "freelancer" para demostración.
   * 
   * Union Type en TypeScript: "freelancer" | "contractor"
   * Esto significa que tipoUsuario solo puede tener uno de estos dos valores.
   */
  const [tipoUsuario] = useState<"freelancer" | "contractor">("freelancer");

  return (
    <div className="min-h-screen bg-background">
      {/* 
        Header: Componente de navegación superior
        Se mantiene fijo en todas las páginas del dashboard
      */}
      <Header />
      
      {/* 
        Contenido principal del dashboard
        container: Centra el contenido y establece un ancho máximo
        mx-auto: Margen automático horizontal para centrar
        px-4: Padding horizontal de 1rem (16px)
        py-8: Padding vertical de 2rem (32px)
      */}
      <main className="container mx-auto px-4 py-8">
        {/* 
          Renderizado condicional basado en el tipo de usuario
          Si tipoUsuario es "freelancer", muestra FreelancerDashboard
          Si tipoUsuario es "contractor", muestra ContractorDashboard
          
          Sintaxis: {condicion ? valorSiVerdadero : valorSiFalso}
        */}
        {tipoUsuario === "freelancer" ? <FreelancerDashboard /> : <ContractorDashboard />}
      </main>
    </div>
  );
}

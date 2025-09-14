import { Header } from "@/components/Layout/Header";
import { FreelancerDashboard } from "@/components/Dashboard/FreelancerDashboard";
import { ContractorDashboard } from "@/components/Dashboard/ContractorDashboard";
import { useAuth, useRole } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { user, isLoading } = useAuth();
  const { isFreelancer, isContractor } = useRole();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {isFreelancer && <FreelancerDashboard />}
        {isContractor && <ContractorDashboard />}
        {!isFreelancer && !isContractor && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Completa tu perfil</h2>
            <p className="text-muted-foreground mb-6">
              Para acceder al dashboard, necesitas completar tu perfil.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

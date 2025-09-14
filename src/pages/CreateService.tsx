import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { CreateService } from "@/components/Services/CreateService";
import { useAuth, useRole } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function CreateServicePage() {
  const { isAuthenticated } = useAuth();
  const { isFreelancer } = useRole();

  // Redirigir si no está autenticado o no es freelancer
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isFreelancer) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CreateService />
      </main>
      <Footer />
    </div>
  );
}
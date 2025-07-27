import { Header } from "@/components/Layout/Header";
import { ChatSystem } from "@/components/Messages/ChatSystem";

export default function Messages() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Mensajes</h1>
          <p className="text-muted-foreground">Gestiona tus conversaciones con clientes y freelancers</p>
        </div>
        <ChatSystem />
      </main>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CamelloLogo } from "@/components/ui/camello-logo";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  DollarSign,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Shield,
  LogOut
} from "lucide-react";

export default function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      title: "Total Usuarios",
      value: "2,847",
      change: "+12%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Freelancers Activos",
      value: "1,234",
      change: "+8%",
      icon: Briefcase,
      trend: "up"
    },
    {
      title: "Proyectos Completados",
      value: "456",
      change: "+23%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Ingresos Generados",
      value: "$45,230,000",
      change: "+18%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const users = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos@email.com",
      type: "Freelancer",
      status: "Activo",
      joinDate: "2024-01-15",
      projects: 12,
      verified: true
    },
    {
      id: 2,
      name: "María González",
      email: "maria@empresa.com",
      type: "Contratante",
      status: "Activo",
      joinDate: "2024-02-03",
      projects: 5,
      verified: true
    },
    {
      id: 3,
      name: "Luis Mendoza",
      email: "luis@email.com",
      type: "Freelancer",
      status: "Suspendido",
      joinDate: "2024-01-28",
      projects: 3,
      verified: false
    },
    {
      id: 4,
      name: "Ana López",
      email: "ana@startup.co",
      type: "Contratante",
      status: "Activo",
      joinDate: "2024-03-10",
      projects: 8,
      verified: true
    }
  ];

  const reports = [
    {
      id: 1,
      type: "Usuario",
      subject: "Carlos Rodríguez",
      reason: "Contenido inapropiado",
      reporter: "María González",
      date: "2024-03-15",
      status: "Pendiente"
    },
    {
      id: 2,
      type: "Servicio",
      subject: "Diseño de Logo Barato",
      reason: "Precios sospechosos",
      reporter: "Sistema automático",
      date: "2024-03-14",
      status: "Revisado"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Suspendido": return "bg-red-100 text-red-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Revisado": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                  <CamelloLogo className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">Camello Admin</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                <Shield className="mr-1 h-3 w-3" />
                Panel Administrativo
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona usuarios, servicios y mantén la plataforma segura</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-border/50 shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success">{stat.change}</span> desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Usuarios</CardTitle>
                    <CardDescription>
                      Administra freelancers y contratantes registrados
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuarios..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead>Proyectos</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{user.name}</span>
                              {user.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {user.joinDate}
                          </span>
                        </TableCell>
                        <TableCell>{user.projects}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Reportes y Moderación
                </CardTitle>
                <CardDescription>
                  Revisa reportes de usuarios y contenido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Sujeto</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Reportado por</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{report.subject}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Revisar
                            </Button>
                            <Button variant="destructive" size="sm">
                              Suspender
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Gestión de Servicios</CardTitle>
                <CardDescription>
                  Modera y administra servicios publicados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="mx-auto h-12 w-12 mb-4" />
                  <p>Funcionalidad de gestión de servicios en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Analytics y Reportes</CardTitle>
                <CardDescription>
                  Estadísticas detalladas de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="mx-auto h-12 w-12 mb-4" />
                  <p>Dashboard de analytics en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Eye, EyeOff, Lock, LogOut, Shield, Bell, Mail, Globe, UserPlus, MessageSquare, Calendar, Download } from "lucide-react";

import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  // Estado para preferencias de notificaciones
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newMessages: true,
    contractUpdates: true,
    newReviews: true,
    marketingEmails: false
  });
  
  // Estado para mostrar/ocultar contraseñas
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Estado para datos de cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Estado para configuración de privacidad
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showAvailability: true,
    showCompletedJobs: true,
    dataDownload: false,
    accountDeletion: false
  });
  
  // Estado para configuración de idioma y región
  const [localeSettings, setLocaleSettings] = useState({
    language: "es",
    region: "CO",
    timezone: "America/Bogota",
    dateFormat: "DD/MM/YYYY"
  });
  
  // Actualizar preferencia de notificación
  const updateNotificationPreference = (key: string, value: boolean) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: value
    });
  };
  
  // Actualizar campo de contraseña
  const updatePasswordField = (field: string, value: string) => {
    setPasswordData({
      ...passwordData,
      [field]: value
    });
  };
  
  // Actualizar configuración de privacidad
  const updatePrivacySetting = (key: string, value: boolean) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: value
    });
  };
  
  // Actualizar configuración de idioma y región
  const updateLocaleSetting = (key: string, value: string) => {
    setLocaleSettings({
      ...localeSettings,
      [key]: value
    });
  };
  
  // Manejar cambio de contraseña
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Validar que las contraseñas coincidan
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    // TODO: Enviar datos a la API
    console.log("Datos de cambio de contraseña:", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword
    });
    
    // Simulación de éxito
    alert("¡Contraseña actualizada con éxito!");
  };
  
  // Función para guardar preferencias
  const savePreferences = () => {
    // TODO: Enviar datos a la API
    console.log("Preferencias de notificaciones:", notificationPreferences);
    console.log("Configuración de privacidad:", privacySettings);
    
    // Simulación de éxito
    alert("¡Preferencias guardadas con éxito!");
  };

  // Función para solicitar datos personales
  const requestDataDownload = () => {
    // TODO: Enviar solicitud a la API
    console.log("Solicitando descarga de datos personales");
    
    // Simulación de éxito
    alert("Hemos recibido tu solicitud. Recibirás un correo con tus datos en las próximas 48 horas.");
  };
  
  // Función para solicitar eliminación de cuenta
  const requestAccountDeletion = () => {
    // Confirmación del usuario
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer y perderás todo tu historial, contratos y valoraciones."
    );
    
    if (confirmed) {
      // TODO: Enviar solicitud a la API
      console.log("Solicitando eliminación de cuenta");
      
      // Simulación de éxito
      alert("Hemos recibido tu solicitud. Tu cuenta será eliminada en los próximos 30 días.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
            <p className="text-muted-foreground">Administra las preferencias de tu cuenta</p>
          </div>
          
          {/* Tabs de configuración */}
          <Tabs defaultValue="notifications" className="mb-8">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="privacy">Privacidad</TabsTrigger>
              <TabsTrigger value="locale">Idioma y Región</TabsTrigger>
            </TabsList>
            
            {/* Contenido de notificaciones */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Canales de notificación */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Canales de notificación</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">Notificaciones por correo</Label>
                        <p className="text-sm text-muted-foreground">Recibe actualizaciones en tu correo electrónico</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationPreferences.emailNotifications}
                        onCheckedChange={(checked) => updateNotificationPreference("emailNotifications", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="pushNotifications">Notificaciones push</Label>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones en tu navegador</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notificationPreferences.pushNotifications}
                        onCheckedChange={(checked) => updateNotificationPreference("pushNotifications", checked)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Tipos de notificaciones */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tipos de notificaciones</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newMessages">Nuevos mensajes</Label>
                        <p className="text-sm text-muted-foreground">Cuando recibes un nuevo mensaje</p>
                      </div>
                      <Switch
                        id="newMessages"
                        checked={notificationPreferences.newMessages}
                        onCheckedChange={(checked) => updateNotificationPreference("newMessages", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="contractUpdates">Actualizaciones de contratos</Label>
                        <p className="text-sm text-muted-foreground">Cambios en el estado de tus contratos</p>
                      </div>
                      <Switch
                        id="contractUpdates"
                        checked={notificationPreferences.contractUpdates}
                        onCheckedChange={(checked) => updateNotificationPreference("contractUpdates", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newReviews">Nuevas valoraciones</Label>
                        <p className="text-sm text-muted-foreground">Cuando recibes una nueva valoración</p>
                      </div>
                      <Switch
                        id="newReviews"
                        checked={notificationPreferences.newReviews}
                        onCheckedChange={(checked) => updateNotificationPreference("newReviews", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails">Correos de marketing</Label>
                        <p className="text-sm text-muted-foreground">Noticias, actualizaciones y ofertas de Camello</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationPreferences.marketingEmails}
                        onCheckedChange={(checked) => updateNotificationPreference("marketingEmails", checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={savePreferences}>Guardar preferencias</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contenido de seguridad */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad de la Cuenta</CardTitle>
                  <CardDescription>Administra tu contraseña y la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Cambio de contraseña */}
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => updatePasswordField("currentPassword", e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground"
                          onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => updatePasswordField("newPassword", e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground"
                          onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, incluyendo una letra mayúscula y un número</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => updatePasswordField("confirmPassword", e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground"
                          onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Cambiar contraseña</Button>
                    </div>
                  </form>
                  
                  <Separator />
                  
                  {/* Sesiones activas */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sesiones activas</h3>
                    <Alert>
                      <Lock className="h-4 w-4" />
                      <AlertTitle>Información de seguridad</AlertTitle>
                      <AlertDescription>
                        Tu cuenta está actualmente activa en este dispositivo. Si detectas actividad sospechosa, cambia tu contraseña inmediatamente.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar todas las sesiones
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contenido de privacidad */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Privacidad</CardTitle>
                  <CardDescription>Controla quién puede ver tu información</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Visibilidad del perfil */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Visibilidad del perfil</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="profileVisible">Perfil público</Label>
                        <p className="text-sm text-muted-foreground">Tu perfil es visible para todos los usuarios</p>
                      </div>
                      <Switch
                        id="profileVisible"
                        checked={privacySettings.profileVisible}
                        onCheckedChange={(checked) => updatePrivacySetting("profileVisible", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showEmail">Mostrar correo electrónico</Label>
                        <p className="text-sm text-muted-foreground">Tu correo electrónico es visible en tu perfil</p>
                      </div>
                      <Switch
                        id="showEmail"
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => updatePrivacySetting("showEmail", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showPhone">Mostrar teléfono</Label>
                        <p className="text-sm text-muted-foreground">Tu número de teléfono es visible en tu perfil</p>
                      </div>
                      <Switch
                        id="showPhone"
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => updatePrivacySetting("showPhone", checked)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Interacciones */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Interacciones</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allowMessages">Permitir mensajes</Label>
                        <p className="text-sm text-muted-foreground">Otros usuarios pueden enviarte mensajes directos</p>
                      </div>
                      <Switch
                        id="allowMessages"
                        checked={privacySettings.allowMessages}
                        onCheckedChange={(checked) => updatePrivacySetting("allowMessages", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showAvailability">Mostrar disponibilidad</Label>
                        <p className="text-sm text-muted-foreground">Tu disponibilidad es visible en tu perfil</p>
                      </div>
                      <Switch
                        id="showAvailability"
                        checked={privacySettings.showAvailability}
                        onCheckedChange={(checked) => updatePrivacySetting("showAvailability", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showCompletedJobs">Mostrar trabajos completados</Label>
                        <p className="text-sm text-muted-foreground">Tu historial de trabajos es visible en tu perfil</p>
                      </div>
                      <Switch
                        id="showCompletedJobs"
                        checked={privacySettings.showCompletedJobs}
                        onCheckedChange={(checked) => updatePrivacySetting("showCompletedJobs", checked)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Datos personales */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Datos personales</h3>
                    
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>Protección de datos</AlertTitle>
                      <AlertDescription>
                        Tus datos personales están protegidos de acuerdo con nuestra política de privacidad y la legislación vigente.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Descargar mis datos</h4>
                          <p className="text-sm text-muted-foreground">Obtén una copia de tus datos personales</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={requestDataDownload}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Solicitar datos
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-destructive">Eliminar mi cuenta</h4>
                          <p className="text-sm text-muted-foreground">Elimina permanentemente tu cuenta y todos tus datos</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={requestAccountDeletion}
                        >
                          Eliminar cuenta
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={savePreferences}>Guardar preferencias</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contenido de idioma y región */}
            <TabsContent value="locale">
              <Card>
                <CardHeader>
                  <CardTitle>Idioma y Región</CardTitle>
                  <CardDescription>Configura tus preferencias de idioma y formato regional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Idioma */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Idioma</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma de la plataforma</Label>
                      <Select 
                        value={localeSettings.language} 
                        onValueChange={(value) => updateLocaleSetting("language", value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Región */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Región</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">País o región</Label>
                      <Select 
                        value={localeSettings.region} 
                        onValueChange={(value) => updateLocaleSetting("region", value)}
                      >
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Selecciona un país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CO">Colombia</SelectItem>
                          <SelectItem value="MX">México</SelectItem>
                          <SelectItem value="AR">Argentina</SelectItem>
                          <SelectItem value="CL">Chile</SelectItem>
                          <SelectItem value="PE">Perú</SelectItem>
                          <SelectItem value="ES">España</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona horaria</Label>
                      <Select 
                        value={localeSettings.timezone} 
                        onValueChange={(value) => updateLocaleSetting("timezone", value)}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Selecciona una zona horaria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                          <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                          <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                          <SelectItem value="America/Santiago">Santiago (GMT-4)</SelectItem>
                          <SelectItem value="America/Lima">Lima (GMT-5)</SelectItem>
                          <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Formatos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Formatos</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Formato de fecha</Label>
                      <Select 
                        value={localeSettings.dateFormat} 
                        onValueChange={(value) => updateLocaleSetting("dateFormat", value)}
                      >
                        <SelectTrigger id="dateFormat">
                          <SelectValue placeholder="Selecciona un formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/AAAA (31/12/2023)</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/AAAA (12/31/2023)</SelectItem>
                          <SelectItem value="YYYY-MM-DD">AAAA-MM-DD (2023-12-31)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={savePreferences}>Guardar preferencias</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
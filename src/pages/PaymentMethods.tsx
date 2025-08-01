import { useState } from "react";
import { CreditCard, Plus, Trash2, Check, AlertCircle } from "lucide-react";

import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "bank_account";
  name: string;
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
}

export default function PaymentMethods() {
  // Estado para métodos de pago
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      type: "credit_card",
      name: "Visa terminada en 4242",
      last4: "4242",
      expiryDate: "12/25",
      isDefault: true
    },
    {
      id: "card-2",
      type: "debit_card",
      name: "Mastercard terminada en 5678",
      last4: "5678",
      expiryDate: "09/24",
      isDefault: false
    }
  ]);
  
  // Estado para el formulario de nueva tarjeta
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    cardType: "credit_card"
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Actualizar campo del formulario
  const updateCardField = (field: string, value: string) => {
    setNewCard({
      ...newCard,
      [field]: value
    });
  };
  
  // Agregar nuevo método de pago
  const addPaymentMethod = () => {
    setIsProcessing(true);
    
    // Simulación de procesamiento
    setTimeout(() => {
      const last4 = newCard.cardNumber.slice(-4);
      const newPaymentMethod: PaymentMethod = {
        id: `card-${Date.now()}`,
        type: newCard.cardType as "credit_card" | "debit_card",
        name: `${newCard.cardType === "credit_card" ? "Tarjeta de crédito" : "Tarjeta de débito"} terminada en ${last4}`,
        last4,
        expiryDate: newCard.expiryDate,
        isDefault: paymentMethods.length === 0
      };
      
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setNewCard({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        cardType: "credit_card"
      });
      
      setIsProcessing(false);
      setIsDialogOpen(false);
      setSuccessMessage("Método de pago agregado correctamente");
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };
  
  // Eliminar método de pago
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    setSuccessMessage("Método de pago eliminado correctamente");
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  
  // Establecer método de pago predeterminado
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    
    setSuccessMessage("Método de pago predeterminado actualizado");
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Métodos de Pago</h1>
            <p className="text-muted-foreground">Administra tus métodos de pago para contratos y servicios</p>
          </div>
          
          {/* Mensaje de éxito */}
          {successMessage && (
            <Alert className="mb-6">
              <Check className="h-4 w-4" />
              <AlertTitle>¡Éxito!</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          
          {/* Tarjetas guardadas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Métodos de pago guardados</CardTitle>
              <CardDescription>Administra tus tarjetas y cuentas bancarias</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentMethods.length === 0 ? (
                <div className="text-center py-6">
                  <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No hay métodos de pago</h3>
                  <p className="text-muted-foreground mb-4">Agrega tu primera tarjeta o cuenta bancaria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {method.expiryDate && `Expira: ${method.expiryDate}`}
                            {method.isDefault && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                Predeterminado
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDefaultPaymentMethod(method.id)}
                          >
                            Predeterminado
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removePaymentMethod(method.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar método de pago
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar método de pago</DialogTitle>
                    <DialogDescription>
                      Ingresa los detalles de tu tarjeta para agregarla a tu cuenta
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardType">Tipo de tarjeta</Label>
                      <Select 
                        value={newCard.cardType} 
                        onValueChange={(value) => updateCardField("cardType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">Tarjeta de crédito</SelectItem>
                          <SelectItem value="debit_card">Tarjeta de débito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={newCard.cardNumber}
                        onChange={(e) => updateCardField("cardNumber", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input
                        id="cardName"
                        placeholder="NOMBRE APELLIDO"
                        value={newCard.cardName}
                        onChange={(e) => updateCardField("cardName", e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Fecha de expiración</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/AA"
                          value={newCard.expiryDate}
                          onChange={(e) => updateCardField("expiryDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          value={newCard.cvv}
                          onChange={(e) => updateCardField("cvv", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Tu información de pago está segura y encriptada
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={addPaymentMethod} disabled={isProcessing}>
                      {isProcessing ? "Procesando..." : "Agregar tarjeta"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          {/* Información de facturación */}
          <Card>
            <CardHeader>
              <CardTitle>Información de facturación</CardTitle>
              <CardDescription>Administra tus datos fiscales para facturas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billingName">Nombre o razón social</Label>
                <Input id="billingName" placeholder="Nombre completo o empresa" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxId">NIT / Documento fiscal</Label>
                <Input id="taxId" placeholder="Número de identificación tributaria" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Dirección de facturación</Label>
                <Input id="billingAddress" placeholder="Dirección completa" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingCity">Ciudad</Label>
                  <Input id="billingCity" placeholder="Ciudad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingZip">Código postal</Label>
                  <Input id="billingZip" placeholder="Código postal" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Guardar información de facturación</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
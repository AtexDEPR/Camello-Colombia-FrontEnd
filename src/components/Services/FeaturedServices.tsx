import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Check, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type BillingPeriod = "monthly" | "annual";

export function FeaturedServices() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const annualDiscount = 0.2; // 20% descuento anual

  const plans = [
    {
      id: "basic",
      name: "Básico",
      popular: false,
      monthlyPrice: 0,
      cta: { label: "Comenzar gratis", to: "/register" },
      features: [
        { label: "Perfil de freelancer y portafolio", info: "Crea tu perfil y añade proyectos" },
        { label: "Aplicación a proyectos limitados", info: "Hasta 5 postulaciones por mes" },
        { label: "Mensajería básica", info: "Chat 1:1 con clientes potenciales" },
        { label: "Comisiones estándar", info: "Estructura estándar por transacción" },
      ],
    },
    {
      id: "pro",
      name: "Profesional",
      popular: true,
      monthlyPrice: 20,
      cta: { label: "Suscribirse Pro", to: "/payments" },
      features: [
        { label: "Prioridad en búsqueda y ranking", info: "Tu perfil aparece más arriba" },
        { label: "Postulaciones ilimitadas", info: "Sin límite mensual" },
        { label: "Certificaciones y verificación avanzada", info: "Sellos de confianza" },
        { label: "Analytics de perfil", info: "Vistas, tasa de respuesta y más" },
        { label: "Soporte preferencial", info: "Atención rápida y dedicada" },
      ],
    },
    {
      id: "enterprise",
      name: "Empresas",
      popular: false,
      monthlyPrice: 20,
      cta: { label: "Contactar ventas", to: "/contact" },
      features: [
        { label: "Gestión de equipos y roles", info: "Invita miembros y define permisos" },
        { label: "Contratos y facturación integrada", info: "Herramientas de contratación y pagos" },
        { label: "Integraciones API", info: "Conecta con tus sistemas" },
        { label: "SLA empresarial", info: "Acuerdos de nivel de servicio" },
        { label: "Onboarding y capacitación", info: "Sesiones guiadas para tu equipo" },
      ],
    },
  ];

  const displayPrice = (monthlyPrice: number) => {
    if (billing === "monthly") return monthlyPrice;
    return Math.round(monthlyPrice * 12 * (1 - annualDiscount));
  };

  return (
    <section className="py-20 bg-muted/30" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Planes de suscripción
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Escoge el plan que mejor se ajuste a tus necesidades. Destacamos el plan recomendado para maximizar resultados.
          </p>
        </motion.div>

        {/* Selector de periodo de facturación */}
        <div className="flex items-center justify-center gap-3 mb-10" aria-label="Selector de periodo de facturación">
          <span className={`text-sm ${billing === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Mensual</span>
          <Switch
            checked={billing === "annual"}
            onCheckedChange={(checked) => setBilling(checked ? "annual" : "monthly")}
            aria-label="Alternar facturación mensual o anual"
          />
          <span className={`text-sm ${billing === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
            Anual
          </span>
          <Badge variant="secondary" className="ml-2">{Math.round(annualDiscount * 100)}% dcto</Badge>
        </div>

        {/* Tarjetas de planes */}
        <TooltipProvider>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative shadow-camello-sm ${plan.popular ? "border-primary ring-1 ring-primary/20" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="shadow" variant="default">Más popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.name}</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label={`Más información sobre ${plan.name}`}>
                          <Info className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="top">
                        <p className="text-sm text-muted-foreground">
                          Beneficios y características pensadas para {plan.name.toLowerCase()}.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </CardTitle>
                  <div className="mt-2">
                    {plan.monthlyPrice === 0 ? (
                      <p className="text-3xl font-bold">Gratis</p>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold">
                          ${displayPrice(plan.monthlyPrice)}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          {billing === "monthly" ? "/mes" : "/año"}
                        </span>
                      </div>
                    )}
                    {billing === "annual" && plan.monthlyPrice > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Precio mensual: ${plan.monthlyPrice} • antes del descuento anual
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <span>{f.label}</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-muted-foreground" aria-label={`Detalles: ${f.label}`}>
                                  <Info className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{f.info}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="w-full shadow-camello-sm" variant={plan.popular ? "default" : "secondary"}>
                      <Link to={plan.cta.to} aria-label={`Acción: ${plan.cta.label}`}>
                        {plan.cta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TooltipProvider>

        {/* Comparación clara entre planes */}
        <Tabs defaultValue="features">
          <TabsList className="mb-4">
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="limits">Límites y soporte</TabsTrigger>
          </TabsList>
          <TabsContent value="features">
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left">Característica</th>
                    <th className="p-3 text-center">Básico</th>
                    <th className="p-3 text-center">Profesional</th>
                    <th className="p-3 text-center">Empresas</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    "Prioridad en búsqueda",
                    "Postulaciones ilimitadas",
                    "Certificaciones avanzadas",
                    "Analytics de perfil",
                    "Gestión de equipo",
                    "Integraciones API",
                  ].map((row) => (
                    <tr key={row}>
                      <td className="p-3 text-sm">{row}</td>
                      <td className="p-3 text-center">{["Gestión de equipo", "Integraciones API"].includes(row) ? "—" : row === "Prioridad en búsqueda" ? "Básica" : row === "Certificaciones avanzadas" ? "—" : "Limitado"}</td>
                      <td className="p-3 text-center">{["Gestión de equipo", "Integraciones API"].includes(row) ? "—" : <Check className="inline h-5 w-5 text-primary" />}</td>
                      <td className="p-3 text-center">{["Prioridad en búsqueda"].includes(row) ? <Check className="inline h-5 w-5 text-primary" /> : <Check className="inline h-5 w-5 text-primary" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="limits">
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left">Aspecto</th>
                    <th className="p-3 text-center">Básico</th>
                    <th className="p-3 text-center">Profesional</th>
                    <th className="p-3 text-center">Empresas</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[{ a: "Postulaciones/mes", b: "5", p: "Ilimitadas", e: "Ilimitadas" }, { a: "Soporte", b: "Estándar", p: "Preferencial", e: "SLA" }, { a: "Roles de equipo", b: "—", p: "—", e: "Incluido" }].map((row) => (
                    <tr key={row.a}>
                      <td className="p-3 text-sm">{row.a}</td>
                      <td className="p-3 text-center">{row.b}</td>
                      <td className="p-3 text-center">{row.p}</td>
                      <td className="p-3 text-center">{row.e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
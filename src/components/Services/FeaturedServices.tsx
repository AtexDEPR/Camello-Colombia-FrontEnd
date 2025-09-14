import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCard } from "./ServiceCard";
import { useFeaturedServices } from "@/hooks/useServices";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedServices() {
  const { data: servicesData, isLoading } = useFeaturedServices(0, 6);
  const services = servicesData?.content || [];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Servicios
            <span className="bg-gradient-primary bg-clip-text text-transparent"> destacados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre los servicios más populares y mejor calificados de nuestra comunidad de freelancers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            // Skeleton loading
            [...Array(6)].map((_, index) => (
              <div key={index} className="border rounded-xl p-6 shadow-sm">
                <div className="aspect-video bg-muted rounded-lg mb-4">
                  <Skeleton className="w-full h-full" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-1 mb-4">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard service={service} showFavorite={false} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No hay servicios destacados disponibles</p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="shadow-camello-sm hover:shadow-camello-md" asChild>
            <Link to="/explore">
              Ver todos los servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
/**
 * Componentes de Loading - Camello Platform
 * 
 * Componentes reutilizables para mostrar estados de carga
 * con animaciones suaves y diseño consistente.
 */

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================================================
// LOADING SPINNER
// ============================================================================

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary",
        sizeClasses[size],
        className
      )} 
    />
  )
}

// ============================================================================
// LOADING OVERLAY
// ============================================================================

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  message?: string
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  className,
  message = "Cargando..." 
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// LOADING CARD
// ============================================================================

interface LoadingCardProps {
  message?: string
  className?: string
}

export function LoadingCard({ 
  message = "Cargando...", 
  className 
}: LoadingCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 space-y-4 border rounded-lg bg-card",
      className
    )}>
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}

// ============================================================================
// LOADING DOTS
// ============================================================================

interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 bg-primary rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s"
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// LOADING SKELETON VARIANTS
// ============================================================================

export function ServiceCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-muted rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="h-32 bg-muted rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-8 bg-muted rounded w-16" />
      </div>
    </div>
  )
}

export function JobCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
        <div className="h-6 bg-muted rounded w-16" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-4/5" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-4 bg-muted rounded w-24" />
        <div className="h-4 bg-muted rounded w-16" />
      </div>
    </div>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-2 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-4 w-4 bg-muted rounded" />
          </div>
          <div className="h-8 bg-muted rounded w-16" />
          <div className="h-3 bg-muted rounded w-32" />
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// LOADING PAGE
// ============================================================================

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = "Cargando página..." }: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <h2 className="text-lg font-semibold">{message}</h2>
        <LoadingDots />
      </div>
    </div>
  )
}
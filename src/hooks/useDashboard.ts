/**
 * Hooks personalizados para gestión del dashboard
 */

import { useQuery } from '@tanstack/react-query'
import { dashboardService, DashboardStats, RecentActivity } from '@/services/dashboardService'

// ============================================================================
// QUERY KEYS
// ============================================================================

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  freelancerStats: () => [...dashboardKeys.stats(), 'freelancer'] as const,
  contractorStats: () => [...dashboardKeys.stats(), 'contractor'] as const,
  activity: () => [...dashboardKeys.all, 'activity'] as const,
}

// ============================================================================
// HOOKS DE CONSULTA
// ============================================================================

/**
 * Hook para obtener estadísticas del freelancer
 */
export const useFreelancerStats = () => {
  return useQuery({
    queryKey: dashboardKeys.freelancerStats(),
    queryFn: () => dashboardService.getFreelancerStats(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener estadísticas del contratante
 */
export const useContractorStats = () => {
  return useQuery({
    queryKey: dashboardKeys.contractorStats(),
    queryFn: () => dashboardService.getContractorStats(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener actividad reciente
 */
export const useRecentActivity = () => {
  return useQuery({
    queryKey: dashboardKeys.activity(),
    queryFn: () => dashboardService.getRecentActivity(),
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}
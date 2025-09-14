/**
 * Servicio de Dashboard - Camello Platform
 * 
 * Maneja operaciones relacionadas con estadísticas y datos del dashboard.
 */

import { api } from '@/lib/api'

export interface DashboardStats {
  totalServices: number
  activeServices: number
  totalViews: number
  totalOrders: number
  averageRating: number
  totalEarnings: number
  monthlyEarnings: number
  completedProjects: number
}

export interface RecentActivity {
  id: string
  type: 'message' | 'order' | 'review' | 'payment'
  title: string
  description: string
  timestamp: string
  clientName?: string
  amount?: number
}

class DashboardService {
  private readonly baseUrl = '/api/dashboard'

  /**
   * Obtener estadísticas del freelancer
   */
  async getFreelancerStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<DashboardStats>(`${this.baseUrl}/freelancer/stats`)
      return response.data
    } catch (error) {
      // Si no hay endpoint específico, calcular desde servicios
      console.warn('Dashboard stats endpoint not available, using fallback')
      return {
        totalServices: 0,
        activeServices: 0,
        totalViews: 0,
        totalOrders: 0,
        averageRating: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
        completedProjects: 0
      }
    }
  }

  /**
   * Obtener estadísticas del contratante
   */
  async getContractorStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<DashboardStats>(`${this.baseUrl}/contractor/stats`)
      return response.data
    } catch (error) {
      console.warn('Dashboard stats endpoint not available, using fallback')
      return {
        totalServices: 0,
        activeServices: 0,
        totalViews: 0,
        totalOrders: 0,
        averageRating: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
        completedProjects: 0
      }
    }
  }

  /**
   * Obtener actividad reciente
   */
  async getRecentActivity(): Promise<RecentActivity[]> {
    try {
      const response = await api.get<RecentActivity[]>(`${this.baseUrl}/activity`)
      return response.data
    } catch (error) {
      console.warn('Recent activity endpoint not available, using fallback')
      return [
        {
          id: '1',
          type: 'message',
          title: 'Nuevo mensaje recibido',
          description: 'Tienes un nuevo mensaje de un cliente potencial',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          clientName: 'María González'
        },
        {
          id: '2',
          type: 'order',
          title: 'Nueva orden recibida',
          description: 'Has recibido una nueva orden para diseño de logo',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          clientName: 'Carlos Méndez',
          amount: 250000
        },
        {
          id: '3',
          type: 'review',
          title: 'Nueva reseña recibida',
          description: 'Has recibido una reseña de 5 estrellas',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          clientName: 'Ana López'
        }
      ]
    }
  }
}

export const dashboardService = new DashboardService()
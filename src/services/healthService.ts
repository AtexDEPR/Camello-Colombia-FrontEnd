/**
 * Servicio de Health Check - Camello Platform
 * 
 * Servicio para verificar la conectividad con el backend
 */

import { api } from '@/lib/api'

class HealthService {
  /**
   * Verificar si el backend está disponible
   */
  async checkHealth(): Promise<boolean> {
    try {
      // Intentar endpoint público primero
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      return response.ok
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  }

  /**
   * Verificar autenticación
   */
  async checkAuth(): Promise<boolean> {
    try {
      const response = await api.get('/auth/verify')
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  /**
   * Obtener información del servidor
   */
  async getServerInfo(): Promise<any> {
    try {
      const response = await api.get('/public/info')
      return response.data
    } catch (error) {
      console.error('Server info failed:', error)
      return null
    }
  }
}

export const healthService = new HealthService()
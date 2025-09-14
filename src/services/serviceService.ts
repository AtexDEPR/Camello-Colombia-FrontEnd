/**
 * Servicio de Servicios - Camello Platform
 * 
 * Maneja operaciones relacionadas con los servicios que ofrecen los freelancers.
 */

import { api } from '@/lib/api'
import { Service, CreateServiceRequest, PagedResponse, SearchParams } from '@/types/api'

class ServiceService {
  private readonly baseUrl = '/api/services'

  /**
   * Crear nuevo servicio
   */
  async createService(serviceData: CreateServiceRequest): Promise<Service> {
    const response = await api.post<Service>(this.baseUrl, serviceData)
    return response.data
  }

  /**
   * Obtener todos los servicios activos
   */
  async getAllServices(page = 0, size = 10): Promise<PagedResponse<Service>> {
    const response = await api.get<PagedResponse<Service>>(this.baseUrl, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener servicios por freelancer
   */
  async getServicesByFreelancer(freelancerId: string, page = 0, size = 10): Promise<PagedResponse<Service>> {
    const response = await api.get<PagedResponse<Service>>(`${this.baseUrl}/freelancer/${freelancerId}`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener mis servicios (freelancer autenticado)
   */
  async getMyServices(page = 0, size = 10): Promise<PagedResponse<Service>> {
    const response = await api.get<PagedResponse<Service>>(`${this.baseUrl}/my-services`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener servicio por ID
   */
  async getServiceById(id: string): Promise<Service> {
    const response = await api.get<Service>(`${this.baseUrl}/${id}`)
    return response.data
  }

  /**
   * Actualizar servicio
   */
  async updateService(id: string, serviceData: CreateServiceRequest): Promise<Service> {
    const response = await api.put<Service>(`${this.baseUrl}/${id}`, serviceData)
    return response.data
  }

  /**
   * Eliminar servicio (soft delete)
   */
  async deleteService(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`)
  }

  /**
   * Buscar servicios
   */
  async searchServices(params: SearchParams): Promise<PagedResponse<Service>> {
    const response = await api.get<PagedResponse<Service>>(`${this.baseUrl}/search`, {
      params
    })
    return response.data
  }

  /**
   * Obtener servicios destacados
   */
  async getFeaturedServices(page = 0, size = 10): Promise<PagedResponse<Service>> {
    const response = await api.get<PagedResponse<Service>>(`${this.baseUrl}/featured`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener servicios por categoría
   */
  async getServicesByCategory(categoryId: string, page = 0, size = 10): Promise<PagedResponse<Service>> {
    const response = await api.get<PagedResponse<Service>>(`${this.baseUrl}/category/${categoryId}`, {
      params: { page, size }
    })
    return response.data
  }
}

export const serviceService = new ServiceService()
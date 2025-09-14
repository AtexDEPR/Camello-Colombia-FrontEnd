/**
 * Servicio de Usuarios - Camello Platform
 * 
 * Maneja operaciones relacionadas con perfiles de usuarios,
 * tanto freelancers como contratantes.
 */

import { api } from '@/lib/api'
import { 
  FreelancerProfile, 
  ContractorProfile, 
  PagedResponse,
  SearchParams 
} from '@/types/api'

// ============================================================================
// TIPOS ESPECÍFICOS PARA REQUESTS
// ============================================================================

export interface UpdateFreelancerProfileRequest {
  firstName: string
  lastName: string
  profilePicture?: string
  title: string
  description: string
  location: string
  phone?: string
  skills: string[]
  portfolioUrls: string[]
  hourlyRate: number
  availability: string
}

export interface UpdateContractorProfileRequest {
  companyName: string
  contactName: string
  profilePicture?: string
  description: string
  location: string
  phone?: string
  website?: string
  industry: string
  companySize: string
}

// ============================================================================
// SERVICIO DE FREELANCERS
// ============================================================================

class FreelancerService {
  private readonly baseUrl = '/api/freelancers'

  /**
   * Crear perfil de freelancer
   */
  async createProfile(profileData: UpdateFreelancerProfileRequest): Promise<FreelancerProfile> {
    const response = await api.post<FreelancerProfile>(`${this.baseUrl}/profile`, profileData)
    return response.data
  }

  /**
   * Obtener perfil propio
   */
  async getMyProfile(): Promise<FreelancerProfile> {
    const response = await api.get<FreelancerProfile>(`${this.baseUrl}/profile`)
    return response.data
  }

  /**
   * Obtener perfil por ID
   */
  async getProfileById(id: string): Promise<FreelancerProfile> {
    const response = await api.get<FreelancerProfile>(`${this.baseUrl}/${id}`)
    return response.data
  }

  /**
   * Actualizar perfil propio
   */
  async updateProfile(profileData: UpdateFreelancerProfileRequest): Promise<FreelancerProfile> {
    const response = await api.put<FreelancerProfile>(`${this.baseUrl}/profile`, profileData)
    return response.data
  }

  /**
   * Buscar freelancers
   */
  async searchFreelancers(params: SearchParams): Promise<PagedResponse<FreelancerProfile>> {
    const response = await api.get<PagedResponse<FreelancerProfile>>(`${this.baseUrl}/search`, {
      params
    })
    return response.data
  }

  /**
   * Obtener freelancers mejor calificados
   */
  async getTopRated(page = 0, size = 10): Promise<PagedResponse<FreelancerProfile>> {
    const response = await api.get<PagedResponse<FreelancerProfile>>(`${this.baseUrl}/top-rated`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener estadísticas del dashboard
   */
  async getDashboardStats(): Promise<any> {
    const response = await api.get(`${this.baseUrl}/dashboard/stats`)
    return response.data
  }
}

// ============================================================================
// SERVICIO DE CONTRATANTES
// ============================================================================

class ContractorService {
  private readonly baseUrl = '/api/contractors'

  /**
   * Crear perfil de contratante
   */
  async createProfile(profileData: UpdateContractorProfileRequest): Promise<ContractorProfile> {
    const response = await api.post<ContractorProfile>(`${this.baseUrl}/profile`, profileData)
    return response.data
  }

  /**
   * Obtener perfil propio
   */
  async getMyProfile(): Promise<ContractorProfile> {
    const response = await api.get<ContractorProfile>(`${this.baseUrl}/profile`)
    return response.data
  }

  /**
   * Obtener perfil por ID
   */
  async getProfileById(id: string): Promise<ContractorProfile> {
    const response = await api.get<ContractorProfile>(`${this.baseUrl}/${id}`)
    return response.data
  }

  /**
   * Actualizar perfil propio
   */
  async updateProfile(profileData: UpdateContractorProfileRequest): Promise<ContractorProfile> {
    const response = await api.put<ContractorProfile>(`${this.baseUrl}/profile`, profileData)
    return response.data
  }

  /**
   * Buscar contratantes
   */
  async searchContractors(params: SearchParams): Promise<PagedResponse<ContractorProfile>> {
    const response = await api.get<PagedResponse<ContractorProfile>>(`${this.baseUrl}/search`, {
      params
    })
    return response.data
  }

  /**
   * Obtener estadísticas del dashboard
   */
  async getDashboardStats(): Promise<any> {
    const response = await api.get(`${this.baseUrl}/dashboard/stats`)
    return response.data
  }
}

// ============================================================================
// EXPORTAR INSTANCIAS
// ============================================================================

export const freelancerService = new FreelancerService()
export const contractorService = new ContractorService()
/**
 * Servicio de Trabajos - Camello Platform
 * 
 * Maneja operaciones relacionadas con ofertas de trabajo y aplicaciones.
 */

import { api } from '@/lib/api'
import { 
  JobOffer, 
  CreateJobOfferRequest, 
  JobApplication, 
  PagedResponse, 
  SearchParams,
  ApplicationStatus 
} from '@/types/api'

// ============================================================================
// SERVICIO DE OFERTAS DE TRABAJO
// ============================================================================

class JobOfferService {
  private readonly baseUrl = '/api/job-offers'

  /**
   * Crear nueva oferta de trabajo
   */
  async createJobOffer(jobData: CreateJobOfferRequest): Promise<JobOffer> {
    const response = await api.post<JobOffer>(this.baseUrl, jobData)
    return response.data
  }

  /**
   * Obtener todas las ofertas activas
   */
  async getAllJobOffers(page = 0, size = 10): Promise<PagedResponse<JobOffer>> {
    const response = await api.get<PagedResponse<JobOffer>>(this.baseUrl, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener ofertas por contratante
   */
  async getJobOffersByContractor(contractorId: string, page = 0, size = 10): Promise<PagedResponse<JobOffer>> {
    const response = await api.get<PagedResponse<JobOffer>>(`${this.baseUrl}/contractor/${contractorId}`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener mis ofertas (contratante autenticado)
   */
  async getMyJobOffers(page = 0, size = 10): Promise<PagedResponse<JobOffer>> {
    const response = await api.get<PagedResponse<JobOffer>>(`${this.baseUrl}/my-offers`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener oferta por ID
   */
  async getJobOfferById(id: string): Promise<JobOffer> {
    const response = await api.get<JobOffer>(`${this.baseUrl}/${id}`)
    return response.data
  }

  /**
   * Actualizar oferta de trabajo
   */
  async updateJobOffer(id: string, jobData: CreateJobOfferRequest): Promise<JobOffer> {
    const response = await api.put<JobOffer>(`${this.baseUrl}/${id}`, jobData)
    return response.data
  }

  /**
   * Eliminar oferta de trabajo (soft delete)
   */
  async deleteJobOffer(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`)
  }

  /**
   * Buscar ofertas de trabajo
   */
  async searchJobOffers(params: SearchParams): Promise<PagedResponse<JobOffer>> {
    const response = await api.get<PagedResponse<JobOffer>>(`${this.baseUrl}/search`, {
      params
    })
    return response.data
  }

  /**
   * Obtener ofertas destacadas
   */
  async getFeaturedJobOffers(page = 0, size = 10): Promise<PagedResponse<JobOffer>> {
    const response = await api.get<PagedResponse<JobOffer>>(`${this.baseUrl}/featured`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener ofertas por categoría
   */
  async getJobOffersByCategory(categoryId: string, page = 0, size = 10): Promise<PagedResponse<JobOffer>> {
    const response = await api.get<PagedResponse<JobOffer>>(`${this.baseUrl}/category/${categoryId}`, {
      params: { page, size }
    })
    return response.data
  }
}

// ============================================================================
// SERVICIO DE APLICACIONES A TRABAJOS
// ============================================================================

class JobApplicationService {
  private readonly baseUrl = '/api/job-applications'

  /**
   * Aplicar a una oferta de trabajo
   */
  async applyToJob(
    jobOfferId: string, 
    coverLetter: string, 
    proposedPrice: number, 
    estimatedDeliveryDays: number
  ): Promise<JobApplication> {
    const response = await api.post<JobApplication>(`${this.baseUrl}/apply`, {
      jobOfferId,
      coverLetter,
      proposedPrice,
      estimatedDeliveryDays
    })
    return response.data
  }

  /**
   * Obtener aplicaciones por oferta de trabajo
   */
  async getApplicationsByJobOffer(jobOfferId: string, page = 0, size = 10): Promise<PagedResponse<JobApplication>> {
    const response = await api.get<PagedResponse<JobApplication>>(`${this.baseUrl}/job-offer/${jobOfferId}`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Obtener mis aplicaciones (freelancer autenticado)
   */
  async getMyApplications(page = 0, size = 10): Promise<PagedResponse<JobApplication>> {
    const response = await api.get<PagedResponse<JobApplication>>(`${this.baseUrl}/my-applications`, {
      params: { page, size }
    })
    return response.data
  }

  /**
   * Actualizar estado de aplicación (contratante)
   */
  async updateApplicationStatus(applicationId: string, status: ApplicationStatus): Promise<JobApplication> {
    const response = await api.patch<JobApplication>(`${this.baseUrl}/${applicationId}/status`, {
      status
    })
    return response.data
  }

  /**
   * Retirar aplicación (freelancer)
   */
  async withdrawApplication(applicationId: string): Promise<void> {
    await api.patch(`${this.baseUrl}/${applicationId}/withdraw`)
  }

  /**
   * Obtener aplicación por ID
   */
  async getApplicationById(id: string): Promise<JobApplication> {
    const response = await api.get<JobApplication>(`${this.baseUrl}/${id}`)
    return response.data
  }
}

// ============================================================================
// EXPORTAR INSTANCIAS
// ============================================================================

export const jobOfferService = new JobOfferService()
export const jobApplicationService = new JobApplicationService()
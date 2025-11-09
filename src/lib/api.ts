/**
 * API Client Configuration - Camello Platform
 * 
 * Este archivo configura Axios para comunicarse con el backend de Spring Boot.
 * Incluye interceptores para autenticación, manejo de errores y logging.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import mockApi from './mockApi'

// Configuración base de la API
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000, // Aumentar timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Evitar problemas de CORS
}

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create(API_CONFIG)

// Determinar si usamos mock
const USE_MOCK = import.meta.env.VITE_MOCK_API === 'true'

// Interceptor de Request - Agregar token de autenticación
if (!USE_MOCK) {
  apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('camello-token')
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log de requests en desarrollo
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      })
    }

    return config
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
  )

// Interceptor de Response - Manejo de respuestas y errores
  apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log de responses exitosas en desarrollo
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    return response
  },
  (error: AxiosError) => {
    // Manejo de errores específicos
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Token expirado o inválido
          localStorage.removeItem('camello-token')
          localStorage.removeItem('camello-user')
          window.location.href = '/login'
          break
        
        case 403:
          // Sin permisos
          console.error('❌ Acceso denegado')
          break
        
        case 404:
          // Recurso no encontrado
          console.error('❌ Recurso no encontrado')
          break
        
        case 500:
          // Error del servidor
          console.error('❌ Error interno del servidor')
          break
        
        default:
          console.error('❌ Error de API:', data)
      }
    } else if (error.request) {
      // Error de red
      console.error('❌ Error de conexión:', error.message)
      console.error('🔍 Verificar que el backend esté corriendo en:', API_CONFIG.baseURL)
    } else {
      // Error de configuración
      console.error('❌ Error de configuración:', error.message)
    }

    return Promise.reject(error)
  }
  )
}

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T = any> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

// Funciones helper para requests comunes
export const api = USE_MOCK ? mockApi : {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
}

export default USE_MOCK ? (mockApi as any) : apiClient
/**
 * Servicio de Autenticación - Camello Platform
 * 
 * Maneja todas las operaciones relacionadas con autenticación:
 * login, registro, refresh token, verificación, etc.
 */

import { api } from '@/lib/api'
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types/api'

class AuthService {
  private readonly baseUrl = '/api/auth'

  /**
   * Iniciar sesión
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      return response.data
    } catch (error: any) {
      // Mejorar el manejo de errores
      if (error.response?.status === 500) {
        throw new Error('Error interno del servidor. Verifica que la base de datos esté conectada.')
      } else if (error.response?.status === 401) {
        throw new Error('Credenciales incorrectas')
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('No se puede conectar al servidor. Verifica que el backend esté corriendo.')
      }
      throw error
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`${this.baseUrl}/register`, userData)
    return response.data
  }

  /**
   * Refrescar token de acceso
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('camello-refresh-token')
    
    if (!refreshToken) {
      throw new Error('No hay refresh token disponible')
    }

    const response = await api.post<AuthResponse>(`${this.baseUrl}/refresh`, {
      refreshToken
    })

    // Guardar nuevo refresh token si viene en la respuesta
    if (response.data.refreshToken) {
      localStorage.setItem('camello-refresh-token', response.data.refreshToken)
    }

    return response.data
  }

  /**
   * Verificar si el token actual es válido
   */
  async verifyToken(): Promise<User> {
    const response = await api.get<User>(`${this.baseUrl}/verify`)
    return response.data
  }

  /**
   * Cerrar sesión (invalidar token en el servidor)
   */
  async logout(): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/logout`)
    } catch (error) {
      // Ignorar errores de logout, limpiar localmente de todas formas
      console.warn('Error al hacer logout en el servidor:', error)
    } finally {
      // Limpiar tokens locales
      localStorage.removeItem('camello-token')
      localStorage.removeItem('camello-refresh-token')
      localStorage.removeItem('camello-user')
    }
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(email: string): Promise<void> {
    await api.post(`${this.baseUrl}/forgot-password`, { email })
  }

  /**
   * Restablecer contraseña con token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post(`${this.baseUrl}/reset-password`, {
      token,
      newPassword
    })
  }

  /**
   * Cambiar contraseña (usuario autenticado)
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post(`${this.baseUrl}/change-password`, {
      currentPassword,
      newPassword
    })
  }

  /**
   * Verificar email con token
   */
  async verifyEmail(token: string): Promise<void> {
    await api.post(`${this.baseUrl}/verify-email`, { token })
  }

  /**
   * Reenviar email de verificación
   */
  async resendVerificationEmail(): Promise<void> {
    await api.post(`${this.baseUrl}/resend-verification`)
  }
}

export const authService = new AuthService()
/**
 * Context de Autenticación - Camello Platform
 * 
 * Maneja el estado global de autenticación, incluyendo login, logout,
 * registro y persistencia de sesión.
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { User, AuthResponse, LoginRequest, RegisterRequest, UserRole } from '@/types/api'
import { authService } from '@/services/authService'
import { toast } from '@/hooks/use-toast'

// ============================================================================
// TIPOS DEL CONTEXT
// ============================================================================

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => void
  clearError: () => void
  refreshToken: () => Promise<void>
}

// ============================================================================
// ACCIONES DEL REDUCER
// ============================================================================

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }

// ============================================================================
// REDUCER
// ============================================================================

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state
  }
}

// ============================================================================
// ESTADO INICIAL
// ============================================================================

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

// ============================================================================
// CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================================================
// PROVIDER
// ============================================================================

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // ============================================================================
  // EFECTOS
  // ============================================================================

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Primero verificar conectividad con el backend
        console.log('🔍 Verificando conexión con backend...')
        
        const token = localStorage.getItem('camello-token')
        const userStr = localStorage.getItem('camello-user')

        if (token && userStr && userStr !== 'undefined') {
          try {
            const user = JSON.parse(userStr)
            
            // Verificar si el token sigue siendo válido
            try {
              await authService.verifyToken()
              dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
              console.log('✅ Token válido, usuario autenticado')
            } catch (error) {
              // Token inválido, limpiar storage
              console.log('❌ Token inválido, limpiando sesión')
              localStorage.removeItem('camello-token')
              localStorage.removeItem('camello-user')
              dispatch({ type: 'AUTH_LOGOUT' })
            }
          } catch (parseError) {
            // Error parsing JSON, limpiar storage
            console.log('❌ Error parsing user data, limpiando sesión')
            localStorage.removeItem('camello-token')
            localStorage.removeItem('camello-user')
            dispatch({ type: 'AUTH_LOGOUT' })
          }
        } else {
          console.log('ℹ️ No hay sesión previa')
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('❌ Error inicializando autenticación:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    initializeAuth()
  }, [])

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================================================

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' })

      const response = await authService.login(credentials)
      
      // Verificar si la respuesta es exitosa
      if (!response.success || !response.token || !response.user) {
        throw new Error(response.message || 'Error en la autenticación')
      }

      const { user, token } = response

      // Guardar en localStorage
      localStorage.setItem('camello-token', token)
      localStorage.setItem('camello-user', JSON.stringify(user))

      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })

      toast({
        title: '¡Bienvenido!',
        description: `Hola ${getUserDisplayName(user)}, has iniciado sesión correctamente.`,
      })
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage })
      
      toast({
        title: 'Error de autenticación',
        description: errorMessage,
        variant: 'destructive',
      })
      
      throw error
    }
  }

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' })

      const response = await authService.register(userData)
      const { user, token } = response

      // Guardar en localStorage
      localStorage.setItem('camello-token', token)
      localStorage.setItem('camello-user', JSON.stringify(user))

      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })

      toast({
        title: '¡Registro exitoso!',
        description: `Bienvenido a Camello, ${getUserDisplayName(user)}. Tu cuenta ha sido creada.`,
      })
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al registrarse'
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage })
      
      toast({
        title: 'Error de registro',
        description: errorMessage,
        variant: 'destructive',
      })
      
      throw error
    }
  }

  const logout = (): void => {
    try {
      // Limpiar localStorage
      localStorage.removeItem('camello-token')
      localStorage.removeItem('camello-user')

      dispatch({ type: 'AUTH_LOGOUT' })

      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente.',
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const refreshToken = async (): Promise<void> => {
    try {
      const response = await authService.refreshToken()
      const { user, token } = response

      // Actualizar localStorage
      localStorage.setItem('camello-token', token)
      localStorage.setItem('camello-user', JSON.stringify(user))

      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
    } catch (error) {
      console.error('Error al refrescar token:', error)
      logout()
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // ============================================================================
  // FUNCIONES HELPER
  // ============================================================================

  const getUserDisplayName = (user: User): string => {
    // Esta función se puede mejorar cuando tengamos los perfiles
    if (!user || !user.email) {
      return 'Usuario'
    }
    return user.email.split('@')[0]
  }

  // ============================================================================
  // VALOR DEL CONTEXT
  // ============================================================================

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    refreshToken,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// ============================================================================
// HOOK PERSONALIZADO
// ============================================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  
  return context
}

// ============================================================================
// HOOK PARA VERIFICAR ROLES
// ============================================================================

export const useRole = () => {
  const { user } = useAuth()
  
  return {
    isFreelancer: user?.role === UserRole.FREELANCER,
    isContractor: user?.role === UserRole.CONTRACTOR,
    isAdmin: user?.role === UserRole.ADMIN,
    role: user?.role,
  }
}

// ============================================================================
// COMPONENTE PARA RUTAS PROTEGIDAS
// ============================================================================

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole
  fallback?: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback = <div>No tienes permisos para acceder a esta página</div>,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!isAuthenticated) {
    return <div>Debes iniciar sesión para acceder a esta página</div>
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
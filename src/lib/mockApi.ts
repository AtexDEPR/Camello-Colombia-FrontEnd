import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { categories, services, jobOffers, dashboardStats, paginate, recentActivities } from '@/mocks/data'
import users from '@/mocks/users.json'

// Modo mock: autenticación local basada en JSON de usuarios
const NETWORK_DELAY_MS = 300
const ERROR_MODE: 'none' | '401' | '403' | '404' | '500' | 'offline' = 'none'

function getStoredUser(): any | null {
  const userStr = localStorage.getItem('camello-user')
  if (!userStr) return null
  try { return JSON.parse(userStr) } catch { return null }
}

function getMockTokenForRole(role: string): string {
  return `mock-token-${role}-${Date.now()}`
}

function seedMockAuthStorage(user: any) {
  const token = getMockTokenForRole(user.role)
  localStorage.setItem('camello-token', token)
  localStorage.setItem('camello-user', JSON.stringify(user))
  localStorage.setItem('camello-refresh-token', token)
}

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), NETWORK_DELAY_MS))
}

function maybeThrow(): void {
  const mode = ERROR_MODE
  if (mode === 'none') return
  const err: any = new Error(`Mock error ${mode}`)
  err.response = { status: parseInt(mode, 10) || 500, data: { message: `Error ${mode}` } }
  throw err
}

function ok<T>(url: string, data: T, status = 200): AxiosResponse<T> {
  return { data, status, statusText: 'OK', headers: {}, config: { url } as AxiosRequestConfig }
}

function match(path: string, pattern: RegExp) { return pattern.test(path) }

// Minimal router for existing services
async function routeGet(url: string): Promise<AxiosResponse<any>> {
  maybeThrow()

  // Auth verify
  if (match(url, /\/api\/auth\/verify/)) {
    const user = getStoredUser()
    if (user) {
      return delay(ok(url, user))
    }
    // No hay sesión válida
    return delay({ data: { message: 'No autorizado' }, status: 401, statusText: 'Unauthorized', headers: {}, config: { url } as AxiosRequestConfig })
  }

  // Public categories
  if (match(url, /\/api\/public\/categories/)) {
    return delay(ok(url, categories))
  }

  // Services list (paged)
  if (match(url, /\/api\/services(\?.*)?$/)) {
    const paged = paginate(services, 0, 10)
    return delay(ok(url, paged))
  }

  // Service detail
  const svcDetail = url.match(/\/api\/services\/(.+)$/)
  if (svcDetail) {
    const id = svcDetail[1]
    const found = services.find(s => s.id === id)
    return delay(ok(url, found || services[0]))
  }

  // Dashboard stats
  if (match(url, /\/api\/dashboard\/stats/)) {
    return delay(ok(url, dashboardStats))
  }

  // Dashboard freelancer stats (mínimos compatibles)
  if (match(url, /\/api\/dashboard\/freelancer\/stats/)) {
    const stats = {
      totalServices: services.length,
      activeServices: services.filter((s: any) => s.isActive || s.active).length,
      totalViews: services.reduce((sum: number, s: any) => sum + (s.viewsCount || 0), 0),
      totalOrders: services.reduce((sum: number, s: any) => sum + (s.ordersCount || 0), 0),
      averageRating: services.length ? (services.reduce((sum: number, s: any) => sum + (s.rating || 0), 0) / services.length) : 0,
      totalEarnings: 3200000,
      monthlyEarnings: 900000,
      completedProjects: 12,
    }
    return delay(ok(url, stats))
  }

  // Dashboard activity
  if (match(url, /\/api\/dashboard\/activity/)) {
    return delay(ok(url, recentActivities))
  }

  // Job offers (list)
  if (match(url, /\/api\/jobs(\?.*)?$/)) {
    const paged = paginate(jobOffers, 0, 10)
    return delay(ok(url, paged))
  }

  // Fallback
  return delay(ok(url, {}))
}

async function routePost(url: string, body?: any): Promise<AxiosResponse<any>> {
  maybeThrow()

  // Auth login
  if (match(url, /\/api\/auth\/login/)) {
    const { email, password } = body || {}
    const found = (users as any[]).find(u => u.email === email)
    if (!found) {
      return delay(ok(url, { success: false, message: 'Usuario no encontrado' }))
    }
    if (found.password !== password) {
      return delay(ok(url, { success: false, message: 'Credenciales incorrectas' }))
    }
    // Login exitoso
    const token = getMockTokenForRole(found.role)
    seedMockAuthStorage(found)
    return delay(ok(url, { success: true, token, refreshToken: token, user: found }))
  }

  // Auth register
  if (match(url, /\/api\/auth\/register/)) {
    // Registro deshabilitado en modo demo
    return delay(ok(url, { success: false, message: 'Registro deshabilitado en modo demo' }))
  }

  // Refresh
  if (match(url, /\/api\/auth\/refresh/)) {
    const user = getStoredUser()
    const token = user ? getMockTokenForRole(user.role) : getMockTokenForRole('ANON')
    if (!user) {
      return delay(ok(url, { success: false, message: 'No hay sesión' }))
    }
    seedMockAuthStorage(user)
    return delay(ok(url, { success: true, token, refreshToken: token, user }))
  }

  // Logout
  if (match(url, /\/api\/auth\/logout/)) {
    return delay(ok(url, { success: true }))
  }

  // Create service
  if (match(url, /\/api\/freelancers\/services/)) {
    const newService = {
      id: `srv-${services.length + 1}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: true,
    }
    services.push(newService)
    return delay(ok(url, newService))
  }

  // Fallback
  return delay(ok(url, { success: true }))
}

async function routePut(url: string, body?: any): Promise<AxiosResponse<any>> {
  maybeThrow()
  // Update service
  const m = url.match(/\/api\/services\/(.+)$/)
  if (m) {
    const id = m[1]
    const idx = services.findIndex(s => s.id === id)
    if (idx >= 0) {
      services[idx] = { ...services[idx], ...body, updatedAt: new Date().toISOString() }
      return delay(ok(url, services[idx]))
    }
  }
  return delay(ok(url, { success: true }))
}

async function routePatch(url: string, body?: any): Promise<AxiosResponse<any>> {
  maybeThrow()
  return delay(ok(url, { success: true }))
}

async function routeDelete(url: string): Promise<AxiosResponse<any>> {
  maybeThrow()
  return delay(ok(url, { success: true }))
}

export const mockApi = {
  get: (url: string, _config?: AxiosRequestConfig) => routeGet(url),
  post: (url: string, data?: any, _config?: AxiosRequestConfig) => routePost(url, data),
  put: (url: string, data?: any, _config?: AxiosRequestConfig) => routePut(url, data),
  patch: (url: string, data?: any, _config?: AxiosRequestConfig) => routePatch(url, data),
  delete: (url: string, _config?: AxiosRequestConfig) => routeDelete(url),
}

export default mockApi
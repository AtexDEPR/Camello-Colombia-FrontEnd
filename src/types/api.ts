/**
 * Tipos TypeScript para la API de Camello
 * 
 * Estos tipos corresponden a las entidades y DTOs del backend Spring Boot
 */

// ============================================================================
// TIPOS BASE
// ============================================================================

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// ============================================================================
// USUARIO Y AUTENTICACIÓN
// ============================================================================

export interface User extends BaseEntity {
  email: string
  role: UserRole
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
}

export enum UserRole {
  FREELANCER = 'FREELANCER',
  CONTRACTOR = 'CONTRACTOR',
  ADMIN = 'ADMIN'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  role: UserRole
  acceptTerms: boolean
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
  expiresIn: number
}

// ============================================================================
// PERFILES
// ============================================================================

export interface FreelancerProfile extends BaseEntity {
  userId: string
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
  availability: Availability
  rating: number
  totalReviews: number
  totalEarnings: number
}

export interface ContractorProfile extends BaseEntity {
  userId: string
  companyName: string
  contactName: string
  profilePicture?: string
  description: string
  location: string
  phone?: string
  website?: string
  industry: string
  companySize: CompanySize
  rating: number
  totalReviews: number
  totalSpent: number
}

export enum Availability {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  UNAVAILABLE = 'UNAVAILABLE'
}

export enum CompanySize {
  STARTUP = 'STARTUP',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

// ============================================================================
// SERVICIOS
// ============================================================================

export interface Service extends BaseEntity {
  id: string
  freelancerId: string
  freelancerName: string
  freelancerProfilePicture?: string
  categoryId: string
  categoryName: string
  title: string
  description: string
  price: number
  deliveryTime: number
  revisionsIncluded: number
  images: string[]
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  viewsCount: number
  ordersCount: number
  rating: number
}

export interface CreateServiceRequest {
  categoryId: string
  title: string
  description: string
  price: number
  deliveryTime: number
  revisionsIncluded: number
  images: string[]
  tags: string[]
}

// ============================================================================
// OFERTAS DE TRABAJO
// ============================================================================

export interface JobOffer extends BaseEntity {
  id: string
  contractorId: string
  contractorName: string
  contractorProfilePicture?: string
  categoryId: string
  categoryName: string
  title: string
  description: string
  budgetMin: number
  budgetMax: number
  deadline: string
  requiredSkills: string[]
  experienceLevel: ExperienceLevel
  projectType: ProjectType
  isActive: boolean
  isFeatured: boolean
  applicationsCount: number
}

export interface CreateJobOfferRequest {
  categoryId: string
  title: string
  description: string
  budgetMin: number
  budgetMax: number
  deadline: string
  requiredSkills: string[]
  experienceLevel: string
  projectType: string
}

export enum ExperienceLevel {
  ENTRY = 'ENTRY',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT'
}

export enum ProjectType {
  FIXED = 'FIXED',
  HOURLY = 'HOURLY'
}

// ============================================================================
// APLICACIONES A TRABAJOS
// ============================================================================

export interface JobApplication extends BaseEntity {
  id: string
  jobOfferId: string
  freelancerId: string
  coverLetter: string
  proposedPrice: number
  estimatedDeliveryDays: number
  status: ApplicationStatus
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

// ============================================================================
// CATEGORÍAS
// ============================================================================

export interface Category extends BaseEntity {
  name: string
  description: string
  icon: string
  isActive: boolean
}

// ============================================================================
// MENSAJERÍA
// ============================================================================

export interface Message extends BaseEntity {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  attachments: string[]
  isRead: boolean
  sentAt: string
}

export interface Conversation extends BaseEntity {
  id: string
  participant1Id: string
  participant1Name: string
  participant2Id: string
  participant2Name: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

export interface SendMessageRequest {
  recipientId: string
  content: string
  attachments?: string[]
}

// ============================================================================
// RESEÑAS
// ============================================================================

export interface Review extends BaseEntity {
  id: string
  contractId: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment: string
  reviewerType: ReviewerType
}

export enum ReviewerType {
  FREELANCER = 'FREELANCER',
  CONTRACTOR = 'CONTRACTOR'
}

// ============================================================================
// NOTIFICACIONES
// ============================================================================

export interface Notification extends BaseEntity {
  id: string
  userId: string
  type: string
  title: string
  message: string
  isRead: boolean
  data?: any
}

// ============================================================================
// RESPUESTAS PAGINADAS
// ============================================================================

export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

// ============================================================================
// PARÁMETROS DE BÚSQUEDA
// ============================================================================

export interface SearchParams {
  query?: string
  category?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  page?: number
  size?: number
  sort?: string
}

// ============================================================================
// ESTADÍSTICAS DEL DASHBOARD
// ============================================================================

export interface DashboardStats {
  totalServices?: number
  totalEarnings?: number
  totalReviews?: number
  averageRating?: number
  activeContracts?: number
  completedProjects?: number
}

// ============================================================================
// RESPUESTAS DE ERROR
// ============================================================================

export interface ApiError {
  message: string
  code: string
  details?: any
  timestamp: string
}
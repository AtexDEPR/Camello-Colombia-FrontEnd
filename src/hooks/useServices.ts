/**
 * Hooks personalizados para gestión de servicios con React Query
 * 
 * Estos hooks proporcionan una interfaz reactiva para interactuar
 * con los servicios del backend, incluyendo cache, loading states,
 * y sincronización automática.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceService } from '@/services/serviceService'
import { Service, CreateServiceRequest, PagedResponse, SearchParams } from '@/types/api'
import { toast } from '@/hooks/use-toast'

// ============================================================================
// QUERY KEYS
// ============================================================================

export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (params: any) => [...serviceKeys.lists(), params] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
  myServices: () => [...serviceKeys.all, 'my-services'] as const,
  featured: () => [...serviceKeys.all, 'featured'] as const,
  search: (params: SearchParams) => [...serviceKeys.all, 'search', params] as const,
}

// ============================================================================
// HOOKS DE CONSULTA (QUERIES)
// ============================================================================

/**
 * Hook para obtener todos los servicios
 */
export const useServices = (page = 0, size = 10) => {
  return useQuery({
    queryKey: serviceKeys.list({ page, size }),
    queryFn: () => serviceService.getAllServices(page, size),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener un servicio específico
 */
export const useService = (id: string) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => serviceService.getServiceById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

/**
 * Hook para obtener mis servicios (freelancer autenticado)
 */
export const useMyServices = (page = 0, size = 10) => {
  return useQuery({
    queryKey: serviceKeys.myServices(),
    queryFn: () => serviceService.getMyServices(page, size),
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

/**
 * Hook para obtener servicios destacados
 */
export const useFeaturedServices = (page = 0, size = 10) => {
  return useQuery({
    queryKey: serviceKeys.featured(),
    queryFn: () => serviceService.getFeaturedServices(page, size),
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

/**
 * Hook para buscar servicios
 */
export const useSearchServices = (params: SearchParams) => {
  return useQuery({
    queryKey: serviceKeys.search(params),
    queryFn: () => serviceService.searchServices(params),
    enabled: !!(params.query || params.category),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener servicios por freelancer
 */
export const useServicesByFreelancer = (freelancerId: string, page = 0, size = 10) => {
  return useQuery({
    queryKey: serviceKeys.list({ freelancerId, page, size }),
    queryFn: () => serviceService.getServicesByFreelancer(freelancerId, page, size),
    enabled: !!freelancerId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener servicios por categoría
 */
export const useServicesByCategory = (categoryId: string, page = 0, size = 10) => {
  return useQuery({
    queryKey: serviceKeys.list({ categoryId, page, size }),
    queryFn: () => serviceService.getServicesByCategory(categoryId, page, size),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// ============================================================================
// HOOKS DE MUTACIÓN (MUTATIONS)
// ============================================================================

/**
 * Hook para crear un nuevo servicio
 */
export const useCreateService = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (serviceData: CreateServiceRequest) => 
      serviceService.createService(serviceData),
    onSuccess: (newService) => {
      // Invalidar y refetch queries relacionadas
      queryClient.invalidateQueries({ queryKey: serviceKeys.myServices() })
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() })
      
      toast({
        title: "Servicio creado",
        description: "Tu servicio ha sido publicado exitosamente",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error al crear servicio",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        variant: "destructive",
      })
    },
  })
}

/**
 * Hook para actualizar un servicio
 */
export const useUpdateService = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, serviceData }: { id: string; serviceData: CreateServiceRequest }) =>
      serviceService.updateService(id, serviceData),
    onSuccess: (updatedService) => {
      // Actualizar cache específico
      queryClient.setQueryData(
        serviceKeys.detail(updatedService.id),
        updatedService
      )
      
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: serviceKeys.myServices() })
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() })
      
      toast({
        title: "Servicio actualizado",
        description: "Los cambios han sido guardados exitosamente",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error al actualizar servicio",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        variant: "destructive",
      })
    },
  })
}

/**
 * Hook para eliminar un servicio
 */
export const useDeleteService = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => serviceService.deleteService(id),
    onSuccess: (_, deletedId) => {
      // Remover del cache
      queryClient.removeQueries({ queryKey: serviceKeys.detail(deletedId) })
      
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: serviceKeys.myServices() })
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() })
      
      toast({
        title: "Servicio eliminado",
        description: "El servicio ha sido eliminado exitosamente",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error al eliminar servicio",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        variant: "destructive",
      })
    },
  })
}

// ============================================================================
// HOOKS COMPUESTOS
// ============================================================================

/**
 * Hook que combina datos de servicios con estado de loading
 */
export const useServicesWithLoading = (page = 0, size = 10) => {
  const { data, isLoading, error, refetch } = useServices(page, size)
  
  return {
    services: data?.content || [],
    totalElements: data?.totalElements || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.number || 0,
    isLoading,
    error,
    refetch,
    hasNextPage: data ? !data.last : false,
    hasPreviousPage: data ? !data.first : false,
  }
}

/**
 * Hook para gestión completa de servicios (CRUD)
 */
export const useServiceManagement = () => {
  const createService = useCreateService()
  const updateService = useUpdateService()
  const deleteService = useDeleteService()

  return {
    createService: createService.mutate,
    updateService: updateService.mutate,
    deleteService: deleteService.mutate,
    isCreating: createService.isPending,
    isUpdating: updateService.isPending,
    isDeleting: deleteService.isPending,
    isLoading: createService.isPending || updateService.isPending || deleteService.isPending,
  }
}
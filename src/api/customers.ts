import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from './client'
import { Customer, ApiResponse, PaginatedResponse } from '@/types'
import { useToast } from '@/hooks/use-toast'

interface CustomerFilters {
  page?: number
  limit?: number
  search?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

interface CreateCustomerRequest {
  name: string
  email: string
  phone: string
  address: string
}

interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {
  id: string
}

export const useCustomers = (filters?: CustomerFilters) => {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: async (): Promise<PaginatedResponse<Customer>> => {
      const response = await apiClient.get('/customers', { params: filters })
      return response.data
    },
  })
}

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: async (): Promise<Customer> => {
      const response = await apiClient.get(`/customers/${id}`)
      return response.data.data
    },
    enabled: !!id,
  })
}

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (data: CreateCustomerRequest): Promise<Customer> => {
      const response = await apiClient.post('/customers', data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast({
        title: 'Berhasil',
        description: 'Customer baru berhasil ditambahkan',
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: error.response?.data?.message || 'Terjadi kesalahan saat menambah customer',
      })
    },
  })
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateCustomerRequest): Promise<Customer> => {
      const response = await apiClient.put(`/customers/${id}`, data)
      return response.data.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customers', data.id] })
      toast({
        title: 'Berhasil',
        description: 'Data customer berhasil diperbarui',
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui customer',
      })
    },
  })
}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`/customers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast({
        title: 'Berhasil',
        description: 'Customer berhasil dihapus',
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: error.response?.data?.message || 'Terjadi kesalahan saat menghapus customer',
      })
    },
  })
}
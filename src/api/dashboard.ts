import { useQuery } from '@tanstack/react-query'
import apiClient from './client'
import { DashboardStats } from '@/types'

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await apiClient.get('/dashboard/stats')
      return response.data.data
    },
  })
}

export const useRevenueChart = (period: 'week' | 'month' | 'year' = 'month') => {
  return useQuery({
    queryKey: ['dashboard', 'revenue', period],
    queryFn: async () => {
      const response = await apiClient.get(`/dashboard/revenue?period=${period}`)
      return response.data.data
    },
  })
}

export const useServiceChart = () => {
  return useQuery({
    queryKey: ['dashboard', 'services'],
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/services-chart')
      return response.data.data
    },
  })
}
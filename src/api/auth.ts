import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from './client'
import { AuthResponse, User } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/authStore'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  name: string
  email: string
  password: string
  role: 'customer' | 'technician'
  phone?: string
  address?: string
  specialization?: string
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/login', data)
      return response.data
    },
    onSuccess: (data) => {
      // Simpan token dan user data ke localStorage
      localStorage.setItem('access_token', data.data.tokens.access_token)
      localStorage.setItem('refresh_token', data.data.tokens.refresh_token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      
      // Update auth store state
      setUser(data.data.user)
      queryClient.setQueryData(['user'], data.data.user)
      
      toast({
        title: 'Login Berhasil',
        description: `Selamat datang kembali, ${data.data.user.name}!`,
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: error.response?.data?.message || 'Terjadi kesalahan saat login',
      })
    },
  })
}

export const useRegister = () => {
  const { toast } = useToast()
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/register', data)
      return response.data
    },
    onSuccess: (data) => {
      // Simpan token dan user data ke localStorage
      localStorage.setItem('access_token', data.data.tokens.access_token)
      localStorage.setItem('refresh_token', data.data.tokens.refresh_token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      
      // Update auth store state
      setUser(data.data.user)
      
      toast({
        title: 'Registrasi Berhasil',
        description: `Selamat datang, ${data.data.user.name}!`,
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Registrasi Gagal',
        description: error.response?.data?.message || 'Terjadi kesalahan saat registrasi',
      })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await apiClient.post('/auth/logout')
    },
    onSuccess: () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      
      queryClient.clear()
      
      toast({
        title: 'Logout Berhasil',
        description: 'Anda telah keluar dari sistem',
      })
    },
    onError: () => {
      // Force logout even if API call fails
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      
      queryClient.clear()
    },
  })
}

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token')
}
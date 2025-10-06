export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'technician' | 'customer'
  phone?: string
  address?: string
  specialization?: string // for technicians
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  created_at: string
  updated_at: string
}

export interface Technician {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  experience_years: number
  rating: number
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration_hours: number
  category: 'installation' | 'maintenance' | 'repair' | 'cleaning'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Schedule {
  id: string
  customer_id: string
  technician_id: string
  service_id: string
  scheduled_date: string
  scheduled_time: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  customer: Customer
  technician: Technician
  service: Service
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  schedule_id: string
  customer_id: string
  invoice_number: string
  total_amount: number
  status: 'unpaid' | 'paid' | 'overdue' | 'cancelled'
  issued_date: string
  due_date: string
  paid_date?: string
  notes?: string
  schedule: Schedule
  customer: Customer
  invoice_items: InvoiceItem[]
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  service_id: string
  description: string
  quantity: number
  unit_price: number
  total_price: number
  service: Service
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
}

export interface DashboardStats {
  total_customers: number
  total_technicians: number
  total_services: number
  pending_invoices: number
  monthly_revenue: number
  completed_schedules: number
}
import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { useAuthStore } from '@/store/authStore'

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

// Dashboard
import DashboardPage from '@/pages/dashboard/DashboardPage'

// Customer Pages
import CustomersPage from '@/pages/customers/CustomersPage'
import CustomerDetailPage from '@/pages/customers/CustomerDetailPage'

// Technician Pages
import TechniciansPage from '@/pages/technicians/TechniciansPage'
import TechnicianDetailPage from '@/pages/technicians/TechnicianDetailPage'

// Service Pages
import ServicesPage from '@/pages/services/ServicesPage'

// Schedule Pages
import SchedulesPage from '@/pages/schedules/SchedulesPage'

// Invoice Pages
import InvoicesPage from '@/pages/invoices/InvoicesPage'
import InvoiceDetailPage from '@/pages/invoices/InvoiceDetailPage'

// Layouts
import AdminLayout from '@/layouts/AdminLayout'
import TechnicianLayout from '@/layouts/TechnicianLayout'
import CustomerLayout from '@/layouts/CustomerLayout'

// Error Pages
import NotFoundPage from '@/pages/NotFoundPage'
import UnauthorizedPage from '@/pages/UnauthorizedPage'

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuthStore()

  // Redirect authenticated users away from auth pages
  const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />
    }
    return <>{children}</>
  }

  // Get layout based on user role
  const getLayout = () => {
    if (!user) return AdminLayout
    
    switch (user.role) {
      case 'admin':
        return AdminLayout
      case 'technician':
        return TechnicianLayout
      case 'customer':
        return CustomerLayout
      default:
        return AdminLayout
    }
  }

  const Layout = getLayout()

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="/register"
        element={
          <AuthGuard>
            <RegisterPage />
          </AuthGuard>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Admin & Technician Routes */}
      <Route
        path="/customers"
        element={
          <PrivateRoute allowedRoles={['admin', 'technician']}>
            <Layout>
              <CustomersPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/customers/:id"
        element={
          <PrivateRoute allowedRoles={['admin', 'technician']}>
            <Layout>
              <CustomerDetailPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Admin Only Routes */}
      <Route
        path="/technicians"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout>
              <TechniciansPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/technicians/:id"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout>
              <TechnicianDetailPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/services"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout>
              <ServicesPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* All Roles Routes */}
      <Route
        path="/schedules"
        element={
          <PrivateRoute>
            <Layout>
              <SchedulesPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <PrivateRoute>
            <Layout>
              <InvoicesPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/invoices/:id"
        element={
          <PrivateRoute>
            <Layout>
              <InvoiceDetailPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/404" element={<NotFoundPage />} />

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
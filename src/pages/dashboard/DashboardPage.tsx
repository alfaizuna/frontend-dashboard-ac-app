import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Wrench,
  Settings,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDashboardStats, useRevenueChart } from '@/api/dashboard'
import { useAuthStore } from '@/store/authStore'
import { formatCurrency } from '@/lib/utils'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

const DashboardPage = () => {
  const { user } = useAuthStore()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: revenueData, isLoading: revenueLoading } = useRevenueChart()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Selamat Pagi'
    if (hour < 18) return 'Selamat Siang'
    return 'Selamat Malam'
  }

  const isAdmin = user?.role === 'admin'

  const adminStats = [
    {
      title: 'Total Customers',
      value: stats?.total_customers || 0,
      icon: Users,
      description: 'Customer terdaftar',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Technicians',
      value: stats?.total_technicians || 0,
      icon: Wrench,
      description: 'Teknisi aktif',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Services',
      value: stats?.total_services || 0,
      icon: Settings,
      description: 'Layanan tersedia',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Pending Invoices',
      value: stats?.pending_invoices || 0,
      icon: FileText,
      description: 'Invoice pending',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(stats?.monthly_revenue || 0),
      icon: DollarSign,
      description: 'Revenue bulan ini',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Completed Jobs',
      value: stats?.completed_schedules || 0,
      icon: Calendar,
      description: 'Pekerjaan selesai',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  // Mock data for charts (replace with real data from API)
  const mockRevenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ]

  const mockServicesData = [
    { name: 'Installation', value: 45 },
    { name: 'Maintenance', value: 30 },
    { name: 'Repair', value: 20 },
    { name: 'Cleaning', value: 5 },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          {getGreeting()}, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.role === 'admin' && 'Kelola bisnis TukangAC Anda dengan mudah'}
          {user?.role === 'technician' && 'Lihat jadwal dan pekerjaan Anda hari ini'}
          {user?.role === 'customer' && 'Pantau layanan AC Anda'}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {(isAdmin ? adminStats : adminStats.slice(0, 4)).map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {statsLoading ? '...' : stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Charts Section */}
      {isAdmin && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  Revenue bulanan dalam 6 bulan terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueLoading ? [] : mockRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>
                  Distribusi jenis layanan (%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockServicesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Akses cepat ke fitur yang sering digunakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user?.role === 'admin' && (
                <>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <Users className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold">Manage Customers</h3>
                    <p className="text-sm text-gray-600">Add or edit customers</p>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <Wrench className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-semibold">Manage Technicians</h3>
                    <p className="text-sm text-gray-600">Add or edit technicians</p>
                  </div>
                </>
              )}
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Calendar className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold">
                  {user?.role === 'customer' ? 'My Bookings' : 'Schedules'}
                </h3>
                <p className="text-sm text-gray-600">
                  {user?.role === 'customer' ? 'View my bookings' : 'Manage schedules'}
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <FileText className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-semibold">
                  {user?.role === 'customer' ? 'My Invoices' : 'Invoices'}
                </h3>
                <p className="text-sm text-gray-600">
                  {user?.role === 'customer' ? 'View my invoices' : 'Manage invoices'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default DashboardPage
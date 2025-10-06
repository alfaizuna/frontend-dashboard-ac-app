import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/authStore'

const SchedulesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuthStore()
  
  // Mock data - replace with real API call
  const schedules = [
    {
      id: '1',
      customer_name: 'John Doe',
      technician_name: 'Ahmad Subandi',
      service_name: 'AC Installation - Split',
      scheduled_date: '2024-03-15',
      scheduled_time: '09:00',
      status: 'confirmed' as const,
      notes: 'Ruang tamu lt. 2',
      customer: { id: '1', name: 'John Doe', phone: '08123456789' },
      technician: { id: '1', name: 'Ahmad Subandi', phone: '08234567890' },
      service: { id: '1', name: 'AC Installation - Split', price: 2500000 },
    },
    {
      id: '2',
      customer_name: 'Jane Smith',
      technician_name: 'Budi Santoso',
      service_name: 'AC Maintenance',
      scheduled_date: '2024-03-16',
      scheduled_time: '14:00',
      status: 'pending' as const,
      notes: 'Service rutin bulanan',
      customer: { id: '2', name: 'Jane Smith', phone: '08345678901' },
      technician: { id: '2', name: 'Budi Santoso', phone: '08456789012' },
      service: { id: '2', name: 'AC Maintenance', price: 150000 },
    },
    {
      id: '3',
      customer_name: 'Bob Johnson',
      technician_name: 'Ahmad Subandi',
      service_name: 'AC Repair - Major',
      scheduled_date: '2024-03-17',
      scheduled_time: '10:30',
      status: 'in_progress' as const,
      notes: 'Kompressor rusak',
      customer: { id: '3', name: 'Bob Johnson', phone: '08567890123' },
      technician: { id: '1', name: 'Ahmad Subandi', phone: '08234567890' },
      service: { id: '3', name: 'AC Repair - Major', price: 750000 },
    },
    {
      id: '4',
      customer_name: 'Alice Brown',
      technician_name: 'Citra Dewi',
      service_name: 'AC Deep Cleaning',
      scheduled_date: '2024-03-14',
      scheduled_time: '11:00',
      status: 'completed' as const,
      notes: 'Sudah selesai dengan baik',
      customer: { id: '4', name: 'Alice Brown', phone: '08678901234' },
      technician: { id: '3', name: 'Citra Dewi', phone: '08789012345' },
      service: { id: '4', name: 'AC Deep Cleaning', price: 300000 },
    },
    {
      id: '5',
      customer_name: 'Charlie Wilson',
      technician_name: 'Budi Santoso',
      service_name: 'AC Installation - Split',
      scheduled_date: '2024-03-18',
      scheduled_time: '08:00',
      status: 'cancelled' as const,
      notes: 'Customer tidak bisa hadir',
      customer: { id: '5', name: 'Charlie Wilson', phone: '08890123456' },
      technician: { id: '2', name: 'Budi Santoso', phone: '08456789012' },
      service: { id: '1', name: 'AC Installation - Split', price: 2500000 },
    },
  ]

  // Filter schedules based on user role
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = 
      schedule.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.technician_name.toLowerCase().includes(searchTerm.toLowerCase())

    if (user?.role === 'technician') {
      return matchesSearch && schedule.technician_name === user.name
    }
    if (user?.role === 'customer') {
      return matchesSearch && schedule.customer_name === user.name
    }
    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        icon: AlertCircle, 
        className: 'bg-yellow-100 text-yellow-800',
        label: 'Menunggu'
      },
      confirmed: { 
        icon: CheckCircle, 
        className: 'bg-blue-100 text-blue-800',
        label: 'Dikonfirmasi'
      },
      in_progress: { 
        icon: PlayCircle, 
        className: 'bg-purple-100 text-purple-800',
        label: 'Dalam Proses'
      },
      completed: { 
        icon: CheckCircle, 
        className: 'bg-green-100 text-green-800',
        label: 'Selesai'
      },
      cancelled: { 
        icon: XCircle, 
        className: 'bg-red-100 text-red-800',
        label: 'Dibatalkan'
      },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon
    
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getPageTitle = () => {
    switch (user?.role) {
      case 'technician':
        return 'My Schedules'
      case 'customer':
        return 'My Bookings'
      default:
        return 'Schedules'
    }
  }

  const getPageDescription = () => {
    switch (user?.role) {
      case 'technician':
        return 'Jadwal pekerjaan yang ditugaskan kepada Anda'
      case 'customer':
        return 'Riwayat booking layanan AC Anda'
      default:
        return 'Kelola jadwal layanan dan teknisi'
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600 mt-2">{getPageDescription()}</p>
        </div>
        {user?.role !== 'technician' && (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {user?.role === 'customer' ? 'Book Service' : 'Tambah Schedule'}
          </Button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari schedule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Schedules List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {schedule.service_name}
                      </h3>
                      <p className="text-sm text-gray-600">#{schedule.id}</p>
                    </div>
                    {getStatusBadge(schedule.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {/* Date & Time */}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>
                        {new Date(schedule.scheduled_date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>{schedule.scheduled_time}</span>
                    </div>
                    
                    {/* Customer (for non-customer users) */}
                    {user?.role !== 'customer' && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-purple-600" />
                        <span>{schedule.customer_name}</span>
                      </div>
                    )}
                    
                    {/* Technician (for non-technician users) */}
                    {user?.role !== 'technician' && (
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-orange-600" />
                        <span>{schedule.technician_name}</span>
                      </div>
                    )}
                  </div>

                  {schedule.notes && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="font-medium">Catatan:</span> {schedule.notes}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      {schedule.service.price.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      })}
                    </div>
                  </div>
                  
                  {user?.role === 'technician' && schedule.status === 'confirmed' && (
                    <Button size="sm" className="w-full">
                      Start Job
                    </Button>
                  )}
                  
                  {user?.role === 'technician' && schedule.status === 'in_progress' && (
                    <Button size="sm" variant="outline" className="w-full">
                      Complete
                    </Button>
                  )}
                  
                  {user?.role === 'admin' && (
                    <div className="flex flex-col gap-1">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {filteredSchedules.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                {searchTerm ? 'Tidak ada schedule yang cocok dengan pencarian' : 'Belum ada schedule'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default SchedulesPage
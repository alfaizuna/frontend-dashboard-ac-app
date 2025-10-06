import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/authStore'
import { formatCurrency, formatDate } from '@/lib/utils'

const InvoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuthStore()
  
  // Mock data - replace with real API call
  const invoices = [
    {
      id: '1',
      invoice_number: 'INV-2024-001',
      customer_name: 'John Doe',
      total_amount: 2500000,
      status: 'paid' as const,
      issued_date: '2024-03-01',
      due_date: '2024-03-15',
      paid_date: '2024-03-10',
      notes: 'Instalasi AC split ruang tamu',
      schedule: {
        id: '1',
        service_name: 'AC Installation - Split',
        technician_name: 'Ahmad Subandi'
      },
      customer: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '08123456789'
      }
    },
    {
      id: '2',
      invoice_number: 'INV-2024-002',
      customer_name: 'Jane Smith',
      total_amount: 150000,
      status: 'unpaid' as const,
      issued_date: '2024-03-05',
      due_date: '2024-03-20',
      notes: 'Service AC rutin bulanan',
      schedule: {
        id: '2',
        service_name: 'AC Maintenance',
        technician_name: 'Budi Santoso'
      },
      customer: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '08234567890'
      }
    },
    {
      id: '3',
      invoice_number: 'INV-2024-003',
      customer_name: 'Bob Johnson',
      total_amount: 750000,
      status: 'overdue' as const,
      issued_date: '2024-02-15',
      due_date: '2024-03-01',
      notes: 'Perbaikan kompressor AC',
      schedule: {
        id: '3',
        service_name: 'AC Repair - Major',
        technician_name: 'Ahmad Subandi'
      },
      customer: {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '08345678901'
      }
    },
    {
      id: '4',
      invoice_number: 'INV-2024-004',
      customer_name: 'Alice Brown',
      total_amount: 300000,
      status: 'cancelled' as const,
      issued_date: '2024-03-10',
      due_date: '2024-03-25',
      notes: 'Dibatalkan atas permintaan customer',
      schedule: {
        id: '4',
        service_name: 'AC Deep Cleaning',
        technician_name: 'Citra Dewi'
      },
      customer: {
        id: '4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        phone: '08456789012'
      }
    },
  ]

  // Filter invoices based on user role
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.schedule.service_name.toLowerCase().includes(searchTerm.toLowerCase())

    if (user?.role === 'customer') {
      return matchesSearch && invoice.customer_name === user.name
    }
    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      unpaid: { 
        icon: Clock, 
        className: 'bg-yellow-100 text-yellow-800',
        label: 'Belum Bayar'
      },
      paid: { 
        icon: CheckCircle, 
        className: 'bg-green-100 text-green-800',
        label: 'Lunas'
      },
      overdue: { 
        icon: AlertTriangle, 
        className: 'bg-red-100 text-red-800',
        label: 'Terlambat'
      },
      cancelled: { 
        icon: XCircle, 
        className: 'bg-gray-100 text-gray-800',
        label: 'Dibatalkan'
      },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.unpaid
    const Icon = config.icon
    
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getPageTitle = () => {
    return user?.role === 'customer' ? 'My Invoices' : 'Invoices'
  }

  const getPageDescription = () => {
    return user?.role === 'customer' 
      ? 'Tagihan layanan AC Anda' 
      : 'Kelola invoice dan pembayaran'
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
        {user?.role !== 'customer' && (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buat Invoice
          </Button>
        )}
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredInvoices.length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lunas</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredInvoices.filter(inv => inv.status === 'paid').length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredInvoices.filter(inv => inv.status === 'unpaid').length}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredInvoices.filter(inv => inv.status === 'overdue').length}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari invoice..."
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

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {invoice.invoice_number}
                      </h3>
                      <p className="text-sm text-gray-600">{invoice.schedule.service_name}</p>
                    </div>
                    {getStatusBadge(invoice.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {/* Customer (for non-customer users) */}
                    {user?.role !== 'customer' && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span>{invoice.customer_name}</span>
                      </div>
                    )}
                    
                    {/* Issued Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>Dibuat: {formatDate(invoice.issued_date)}</span>
                    </div>
                    
                    {/* Due Date */}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Jatuh tempo: {formatDate(invoice.due_date)}</span>
                    </div>
                    
                    {invoice.paid_date && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Dibayar: {formatDate(invoice.paid_date)}</span>
                      </div>
                    )}
                  </div>

                  {invoice.notes && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="font-medium">Catatan:</span> {invoice.notes}
                    </div>
                  )}
                </div>

                {/* Amount & Actions */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(invoice.total_amount)}
                    </div>
                    {invoice.schedule.technician_name && (
                      <div className="text-sm text-gray-600">
                        Teknisi: {invoice.schedule.technician_name}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Detail
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    
                    {user?.role !== 'customer' && invoice.status === 'unpaid' && (
                      <Button size="sm" className="w-full">
                        Mark as Paid
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {filteredInvoices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                {searchTerm ? 'Tidak ada invoice yang cocok dengan pencarian' : 'Belum ada invoice'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default InvoicesPage
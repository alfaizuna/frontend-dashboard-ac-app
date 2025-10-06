import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Printer as Print, CreditCard as Edit, CheckCircle, User, Calendar, Phone, Mail, MapPin, Settings, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // Mock data - replace with real API call
  const invoice = {
    id: '1',
    invoice_number: 'INV-2024-001',
    total_amount: 2500000,
    status: 'paid' as const,
    issued_date: '2024-03-01',
    due_date: '2024-03-15',
    paid_date: '2024-03-10',
    notes: 'Instalasi AC split ruang tamu lantai 2',
    schedule: {
      id: '1',
      service_name: 'AC Installation - Split',
      technician_name: 'Ahmad Subandi',
      scheduled_date: '2024-02-28',
      scheduled_time: '09:00'
    },
    customer: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '08123456789',
      address: 'Jl. Contoh No. 123, Jakarta'
    },
    invoice_items: [
      {
        id: '1',
        description: 'AC Split 1 PK - Daikin',
        quantity: 1,
        unit_price: 2000000,
        total_price: 2000000
      },
      {
        id: '2',
        description: 'Biaya Instalasi',
        quantity: 1,
        unit_price: 400000,
        total_price: 400000
      },
      {
        id: '3',
        description: 'Pipa & Aksesories',
        quantity: 1,
        unit_price: 100000,
        total_price: 100000
      }
    ]
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      unpaid: { className: 'bg-yellow-100 text-yellow-800', label: 'Belum Bayar' },
      paid: { className: 'bg-green-100 text-green-800', label: 'Lunas' },
      overdue: { className: 'bg-red-100 text-red-800', label: 'Terlambat' },
      cancelled: { className: 'bg-gray-100 text-gray-800', label: 'Dibatalkan' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.unpaid
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/invoices')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{invoice.invoice_number}</h1>
            <p className="text-gray-600">Detail invoice dan informasi pembayaran</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
          {user?.role !== 'customer' && (
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Invoice Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Informasi Invoice</CardTitle>
                {getStatusBadge(invoice.status)}
              </div>
              <CardDescription>Detail pembayaran dan tanggal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Nomor Invoice</p>
                    <p className="font-semibold">{invoice.invoice_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Dibuat</p>
                    <p className="font-semibold">{formatDate(invoice.issued_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jatuh Tempo</p>
                    <p className="font-semibold">{formatDate(invoice.due_date)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {invoice.paid_date && (
                    <div>
                      <p className="text-sm text-gray-600">Tanggal Bayar</p>
                      <p className="font-semibold text-green-600">{formatDate(invoice.paid_date)}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(invoice.total_amount)}
                    </p>
                  </div>
                </div>
              </div>
              
              {invoice.notes && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Catatan</p>
                  <p className="text-sm bg-gray-50 p-3 rounded">{invoice.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Layanan</CardTitle>
              <CardDescription>Informasi layanan yang dikerjakan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Settings className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Layanan</p>
                    <p className="font-semibold">{invoice.schedule.service_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teknisi</p>
                    <p className="font-semibold">{invoice.schedule.technician_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Layanan</p>
                    <p className="font-semibold">{formatDate(invoice.schedule.scheduled_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Waktu</p>
                    <p className="font-semibold">{invoice.schedule.scheduled_time}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle>Rincian Biaya</CardTitle>
              <CardDescription>Detail item dan biaya layanan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoice.invoice_items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.description}</h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x {formatCurrency(item.unit_price)}
                      </p>
                    </div>
                    <div className="font-semibold">
                      {formatCurrency(item.total_price)}
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{formatCurrency(invoice.total_amount)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nama</p>
                  <p className="font-semibold">{invoice.customer.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{invoice.customer.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Phone className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telepon</p>
                  <p className="font-semibold">{invoice.customer.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="font-semibold">{invoice.customer.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Actions */}
          {user?.role !== 'customer' && invoice.status !== 'paid' && (
            <Card>
              <CardHeader>
                <CardTitle>Aksi Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Paid
                </Button>
                <Button variant="outline" className="w-full">
                  Send Payment Reminder
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Payment Status */}
          {invoice.status === 'paid' && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-600">Lunas</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Dibayar pada {formatDate(invoice.paid_date!)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default InvoiceDetailPage
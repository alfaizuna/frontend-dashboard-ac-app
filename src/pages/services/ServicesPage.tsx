import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, CreditCard as Edit, Trash2, Eye, Settings, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - replace with real API call
  const services = [
    {
      id: '1',
      name: 'AC Installation - Split',
      description: 'Instalasi AC split untuk rumah dan kantor',
      price: 2500000,
      duration_hours: 4,
      category: 'installation',
      is_active: true,
      created_at: '2024-01-15',
    },
    {
      id: '2',
      name: 'AC Maintenance',
      description: 'Perawatan rutin AC meliputi cleaning dan service',
      price: 150000,
      duration_hours: 2,
      category: 'maintenance',
      is_active: true,
      created_at: '2024-01-20',
    },
    {
      id: '3',
      name: 'AC Repair - Major',
      description: 'Perbaikan AC dengan penggantian spare part utama',
      price: 750000,
      duration_hours: 3,
      category: 'repair',
      is_active: true,
      created_at: '2024-02-01',
    },
    {
      id: '4',
      name: 'AC Deep Cleaning',
      description: 'Pembersihan menyeluruh AC termasuk evaporator dan kondensor',
      price: 300000,
      duration_hours: 3,
      category: 'cleaning',
      is_active: false,
      created_at: '2024-02-10',
    },
  ]

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryBadge = (category: string) => {
    const variants = {
      installation: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-green-100 text-green-800',
      repair: 'bg-orange-100 text-orange-800',
      cleaning: 'bg-purple-100 text-purple-800',
    }
    return variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      installation: Settings,
      maintenance: Clock,
      repair: Settings,
      cleaning: Settings,
    }
    const Icon = icons[category as keyof typeof icons] || Settings
    return <Icon className="h-4 w-4" />
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
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">
            Kelola layanan dan paket yang tersedia
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Service
        </Button>
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
            placeholder="Cari service..."
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

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      {service.is_active ? (
                        <Badge className="bg-green-100 text-green-800">
                          Aktif
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Nonaktif
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    
                    {/* Category Badge */}
                    <Badge className={getCategoryBadge(service.category)}>
                      {getCategoryIcon(service.category)}
                      <span className="ml-1 capitalize">{service.category}</span>
                    </Badge>
                  </div>
                </div>

                {/* Price & Duration */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {service.price.toLocaleString('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR',
                        minimumFractionDigits: 0 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration_hours} jam</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Dibuat {new Date(service.created_at).toLocaleDateString('id-ID', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                {searchTerm ? 'Tidak ada service yang cocok dengan pencarian' : 'Belum ada service'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {services.filter(s => s.category === 'installation').length}
            </div>
            <div className="text-sm text-gray-600">Installation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.category === 'maintenance').length}
            </div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {services.filter(s => s.category === 'repair').length}
            </div>
            <div className="text-sm text-gray-600">Repair</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {services.filter(s => s.category === 'cleaning').length}
            </div>
            <div className="text-sm text-gray-600">Cleaning</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ServicesPage
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Star, CheckCircle, XCircle, CreditCard as Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const TechniciansPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - replace with real API call
  const technicians = [
    {
      id: '1',
      name: 'Ahmad Subandi',
      email: 'ahmad@example.com',
      phone: '08123456789',
      specialization: 'AC Split & Central',
      experience_years: 5,
      rating: 4.8,
      is_available: true,
      created_at: '2024-01-15',
    },
    {
      id: '2',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '08234567890',
      specialization: 'AC Window & Portable',
      experience_years: 3,
      rating: 4.5,
      is_available: false,
      created_at: '2024-02-20',
    },
    {
      id: '3',
      name: 'Citra Dewi',
      email: 'citra@example.com',
      phone: '08345678901',
      specialization: 'AC Industrial',
      experience_years: 7,
      rating: 4.9,
      is_available: true,
      created_at: '2024-01-10',
    },
  ]

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <h1 className="text-3xl font-bold text-gray-900">Technicians</h1>
          <p className="text-gray-600 mt-2">
            Kelola teknisi dan spesialisasi mereka
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Technician
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
            placeholder="Cari technician atau spesialisasi..."
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

      {/* Technicians Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredTechnicians.map((technician) => (
          <Card key={technician.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {technician.name}
                      </h3>
                      {technician.is_available ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Tersedia
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="h-3 w-3 mr-1" />
                          Sibuk
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{technician.specialization}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{technician.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    • {technician.experience_years} tahun pengalaman
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {technician.email}</p>
                  <p>📱 {technician.phone}</p>
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
                    Bergabung {new Date(technician.created_at).toLocaleDateString('id-ID', {
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

      {filteredTechnicians.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                {searchTerm ? 'Tidak ada technician yang cocok dengan pencarian' : 'Belum ada technician'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default TechniciansPage
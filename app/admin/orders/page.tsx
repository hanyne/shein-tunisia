'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiFilter, FiDownload, FiEye, FiPackage, FiTruck, FiCheck, FiX, FiClock, FiUser, FiMail, FiPhone, FiMapPin, FiShoppingBag } from 'react-icons/fi'

interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  size?: string
  color?: string
  price: number
}

interface Order {
  id: string
  orderNumber: string
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  postalCode?: string
  notes?: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  pending: { label: 'En Attente', color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800', icon: FiCheck },
  preparing: { label: 'En Préparation', color: 'bg-purple-100 text-purple-800', icon: FiPackage },
  shipped: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800', icon: FiTruck },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800', icon: FiCheck },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: FiX },
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Filtres
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    checkAuth()
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, orders])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      })
      if (!response.ok) {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log('Fetch orders response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Orders received:', data.length)
        setOrders(data)
        setFilteredOrders(data)
      } else {
        console.error('Failed to fetch orders:', response.status)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...orders]

    // Filtre par statut
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status)
    }

    // Filtre par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customerFirstName.toLowerCase().includes(searchLower) ||
        order.customerLastName.toLowerCase().includes(searchLower) ||
        order.customerEmail.toLowerCase().includes(searchLower) ||
        order.customerPhone.includes(searchLower)
      )
    }

    // Filtre par date de début
    if (filters.startDate) {
      filtered = filtered.filter(order =>
        new Date(order.createdAt) >= new Date(filters.startDate)
      )
    }

    // Filtre par date de fin
    if (filters.endDate) {
      filtered = filtered.filter(order =>
        new Date(order.createdAt) <= new Date(filters.endDate)
      )
    }

    setFilteredOrders(filtered)
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchOrders()
        if (selectedOrder && selectedOrder.id === orderId) {
          const updatedOrder = await response.json()
          setSelectedOrder(updatedOrder)
        }
      }
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const exportToCSV = () => {
    const headers = ['Numéro', 'Date', 'Client', 'Email', 'Téléphone', 'Ville', 'Total', 'Statut']
    const rows = filteredOrders.map(order => [
      order.orderNumber,
      new Date(order.createdAt).toLocaleDateString('fr-FR'),
      `${order.customerFirstName} ${order.customerLastName}`,
      order.customerEmail,
      order.customerPhone,
      order.city,
      `${order.total.toFixed(2)} TND`,
      statusConfig[order.status].label,
    ])

    // Utiliser point-virgule comme séparateur au lieu de virgule
    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.join(';'))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `commandes_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-white mb-4 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                Gestion des Commandes
              </h1>
              <p className="text-primary-100 text-lg flex items-center space-x-2">
                <FiPackage className="text-xl" />
                <span>{filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} trouvée{filteredOrders.length > 1 ? 's' : ''}</span>
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 hover:scale-105"
            >
              <FiDownload className="text-xl" />
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* Filtres - Design amélioré */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <FiFilter className="text-white text-lg" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Filtres Avancés</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🔍 Rechercher
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Numéro, nom, email..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-all shadow-sm hover:shadow-md"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📊 Statut
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-all shadow-sm hover:shadow-md font-semibold"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">🟡 En Attente</option>
                <option value="confirmed">🔵 Confirmée</option>
                <option value="preparing">🟣 En Préparation</option>
                <option value="shipped">🔷 Expédiée</option>
                <option value="delivered">🟢 Livrée</option>
                <option value="cancelled">🔴 Annulée</option>
              </select>
            </div>

            {/* Date début */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📅 Date début
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Date fin */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📅 Date fin
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          {/* Bouton réinitialiser */}
          {(filters.search || filters.status !== 'all' || filters.startDate || filters.endDate) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({ status: 'all', search: '', startDate: '', endDate: '' })}
                className="px-6 py-2 text-sm text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
              >
                ✨ Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Liste des commandes - Design amélioré */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-primary-50 border-b-2 border-primary-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    📦 Numéro
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    📅 Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    👤 Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    📍 Ville
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    💰 Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    📊 Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ⚡ Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FiPackage className="text-3xl text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucune commande trouvée</p>
                        <p className="text-sm text-gray-400">Essayez de modifier vos filtres</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status].icon
                    return (
                      <tr key={order.id} className="hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-pink-50/50 transition-all">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                              <FiPackage className="text-primary-600" />
                            </div>
                            <span className="font-mono text-sm font-bold text-gray-900">
                              {order.orderNumber}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                              {order.customerFirstName.charAt(0)}{order.customerLastName.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900">
                                {order.customerFirstName} {order.customerLastName}
                              </div>
                              <div className="text-xs text-gray-500">{order.customerPhone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <FiMapPin className="text-primary-500" />
                            <span className="text-sm font-semibold text-gray-700">{order.city}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-primary-600">
                            {order.total.toFixed(2)} TND
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm ${statusConfig[order.status].color}`}>
                            <StatusIcon className="text-sm" />
                            <span>{statusConfig[order.status].label}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
                          >
                            <FiEye />
                            <span>Voir</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal détails commande - Version Améliorée */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop avec blur */}
            <div
              className="fixed inset-0 transition-all bg-gray-900 bg-opacity-50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Modal Content */}
            <div className="inline-block align-bottom bg-gradient-to-br from-white to-gray-50 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full animate-slide-up">
              {/* Header avec gradient */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <FiPackage className="text-3xl text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-white">
                        {selectedOrder.orderNumber}
                      </h3>
                      <p className="text-primary-100 mt-1 flex items-center space-x-2">
                        <FiClock className="text-sm" />
                        <span>
                          {new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-primary-100 transition-colors bg-white/20 rounded-full p-2 hover:bg-white/30"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>

              <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
                {/* Statut Badge Large */}
                <div className="mb-6">
                  <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusConfig[selectedOrder.status].color}`}>
                          {(() => {
                            const StatusIcon = statusConfig[selectedOrder.status].icon
                            return <StatusIcon className="text-2xl" />
                          })()}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Statut Actuel</p>
                          <p className="text-xl font-bold text-gray-900">{statusConfig[selectedOrder.status].label}</p>
                        </div>
                      </div>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                        className="px-6 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none font-semibold text-gray-900 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <option value="pending">🟡 En Attente</option>
                        <option value="confirmed">🔵 Confirmée</option>
                        <option value="preparing">🟣 En Préparation</option>
                        <option value="shipped">🔷 Expédiée</option>
                        <option value="delivered">🟢 Livrée</option>
                        <option value="cancelled">🔴 Annulée</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Informations client - Design amélioré */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                        <FiUser className="text-white text-lg" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Informations Client</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-600 font-bold">👤</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Nom complet</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedOrder.customerFirstName} {selectedOrder.customerLastName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiMail className="text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Email</p>
                          <p className="text-sm font-semibold text-gray-900 break-all">{selectedOrder.customerEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiPhone className="text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Téléphone</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedOrder.customerPhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Adresse de livraison - Design amélioré */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                        <FiMapPin className="text-white text-lg" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Adresse de Livraison</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-br from-primary-50 to-pink-50 rounded-xl border-2 border-primary-100">
                        <p className="text-sm font-semibold text-gray-900 mb-2">{selectedOrder.address}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <span className="font-medium">{selectedOrder.city}</span>
                          {selectedOrder.postalCode && (
                            <>
                              <span>•</span>
                              <span>{selectedOrder.postalCode}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">💰</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Mode de paiement</p>
                          <p className="text-sm font-semibold text-gray-900">Paiement à la livraison</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes du client */}
                {selectedOrder.notes && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6 shadow-md">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-yellow-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📝</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Notes du client</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedOrder.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Produits commandés - Design amélioré */}
                <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                      <FiShoppingBag className="text-white text-lg" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Produits Commandés ({selectedOrder.items.length})</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-primary-50/30 rounded-xl border-2 border-gray-100 hover:border-primary-200 transition-all hover:shadow-md">
                        <div className="relative">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">{item.productName}</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.size && (
                              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                                📏 {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                                🎨 {item.color}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary-600">{(item.price * item.quantity).toFixed(2)} TND</p>
                          <p className="text-xs text-gray-500">{item.price.toFixed(2)} TND × {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Récapitulatif financier - Design amélioré */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-white/90">
                      <span className="font-medium">Sous-total</span>
                      <span className="font-bold text-lg">{selectedOrder.subtotal.toFixed(2)} TND</span>
                    </div>
                    <div className="flex justify-between items-center text-white/90">
                      <span className="font-medium">Livraison</span>
                      <span className="font-bold text-lg text-green-300">
                        {selectedOrder.shippingCost === 0 ? '✨ Gratuite' : `${selectedOrder.shippingCost.toFixed(2)} TND`}
                      </span>
                    </div>
                    <div className="border-t-2 border-white/20 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">Total</span>
                        <span className="text-3xl font-bold text-white">{selectedOrder.total.toFixed(2)} TND</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer avec actions */}
              <div className="bg-gray-50 px-8 py-4 border-t-2 border-gray-100">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <div className="flex space-x-3">
                    <button className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg flex items-center space-x-2">
                      <FiDownload />
                      <span>Imprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

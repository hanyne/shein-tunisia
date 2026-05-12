'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiLogOut } from 'react-icons/fi'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState<any>(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  })

  useEffect(() => {
    checkAuth()
    loadStats()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include', // Important: include cookies
      })
      
      console.log('Auth check response:', response.status)
      
      if (!response.ok) {
        console.log('Not authenticated, redirecting to login')
        router.push('/admin/login')
        return
      }
      
      const data = await response.json()
      console.log('Authenticated as:', data.admin)
      setAdmin(data.admin)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      // Load products
      const productsResponse = await fetch('/api/products', {
        credentials: 'include',
      })
      const products = await productsResponse.json()
      
      // Load orders stats
      const ordersResponse = await fetch('/api/orders/stats', {
        credentials: 'include',
      })
      const ordersStats = await ordersResponse.json()
      
      setStats({
        totalProducts: products.length,
        totalOrders: ordersStats.total || 0,
        totalRevenue: ordersStats.totalRevenue || 0,
        totalCustomers: ordersStats.total || 0, // Nombre de commandes uniques
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'include',
    })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient">
                She in Admin
              </h1>
              <p className="text-gray-600">Bienvenue, {admin?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                Voir le site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <FiLogOut />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <FiShoppingBag className="text-2xl text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.totalProducts}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Produits</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <FiPackage className="text-2xl text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.totalOrders}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Commandes</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <FiDollarSign className="text-2xl text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.totalRevenue} TND</span>
            </div>
            <h3 className="text-gray-600 font-medium">Revenus</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <FiUsers className="text-2xl text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Clients</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/products"
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiShoppingBag className="text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gérer les Produits</h2>
            <p className="text-gray-600">Ajouter, modifier ou supprimer des produits</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiPackage className="text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gérer les Commandes</h2>
            <p className="text-gray-600">Voir et gérer toutes les commandes</p>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiUsers className="text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages de Contact</h2>
            <p className="text-gray-600">Gérer les messages des clients</p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiUsers className="text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h2>
            <p className="text-gray-600">Modifier votre mot de passe</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

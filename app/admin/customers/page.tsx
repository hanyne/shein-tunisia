'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiUsers } from 'react-icons/fi'

export default function AdminCustomersPage() {
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FiArrowLeft className="text-2xl" />
            </Link>
            <h1 className="text-3xl font-display font-bold text-gradient">
              Gestion des Clients
            </h1>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="bg-white rounded-2xl p-12 text-center shadow-md">
          <FiUsers className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Gestion des Clients
          </h2>
          <p className="text-gray-600 mb-6">
            Cette fonctionnalité sera bientôt disponible
          </p>
          <Link href="/admin/dashboard" className="btn-primary inline-block">
            Retour au Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi'

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    loadProducts()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      })
      if (!response.ok) {
        console.log('Not authenticated, redirecting to login')
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        credentials: 'include',
      })
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
        alert('Produit supprimé avec succès')
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
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
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FiArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-3xl font-display font-bold text-gradient">
                Gestion des Produits
              </h1>
            </div>
            <Link href="/admin/products/new" className="btn-primary flex items-center space-x-2">
              <FiPlus />
              <span>Nouveau Produit</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <FiPlus className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun produit</h2>
            <p className="text-gray-600 mb-6">Commencez par ajouter votre premier produit</p>
            <Link href="/admin/products/new" className="btn-primary inline-block">
              Ajouter un Produit
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Nom</th>
                  <th className="px-6 py-4 text-left">Catégorie</th>
                  <th className="px-6 py-4 text-left">Prix</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-gray-200 hover:bg-primary-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-primary-600">
                      {product.price} TND
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.inStock
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.inStock ? 'En stock' : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import ImageUploader from '@/components/admin/ImageUploader'
import SizeSelector from '@/components/admin/SizeSelector'
import ColorSelector from '@/components/admin/ColorSelector'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    images: [] as string[],
    category: 'Robes',
    sizes: [] as string[],
    colors: [] as string[],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  })

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`, {
        credentials: 'include',
      })
      if (response.ok) {
        const product = await response.json()
        setFormData({
          name: product.name,
          price: product.price.toString(),
          description: product.description,
          images: product.images,
          category: product.category,
          sizes: product.sizes,
          colors: product.colors,
          inStock: product.inStock,
          isNew: product.isNew || false,
          isBestSeller: product.isBestSeller || false,
        })
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.images.length === 0) {
      alert('Veuillez ajouter au moins une image')
      return
    }
    if (formData.sizes.length === 0) {
      alert('Veuillez sélectionner au moins une taille')
      return
    }
    if (formData.colors.length === 0) {
      alert('Veuillez sélectionner au moins une couleur')
      return
    }

    setSaving(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      }

      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        alert('Produit modifié avec succès!')
        router.push('/admin/products')
      } else {
        const data = await response.json()
        alert(data.error || 'Erreur lors de la modification du produit')
      }
    } catch (error) {
      alert('Erreur lors de la modification du produit')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
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
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/products"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FiArrowLeft className="text-2xl" />
            </Link>
            <h1 className="text-3xl font-display font-bold text-gradient">
              Modifier le Produit
            </h1>
          </div>
        </div>
      </header>

      <div className="container-custom py-8 max-w-5xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
              Informations de Base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du Produit *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prix (TND) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                >
                  <option value="Robes">Robes</option>
                  <option value="Sacs">Sacs</option>
                  <option value="Chaussures">Chaussures</option>
                  <option value="Accessoires">Accessoires</option>
                  <option value="Maquillage">Maquillage</option>
                  <option value="Ensembles">Ensembles</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
              Images
            </h2>
            <ImageUploader
              images={formData.images}
              onChange={(images) => setFormData(prev => ({ ...prev, images }))}
            />
          </div>

          {/* Sizes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
              Tailles
            </h2>
            <SizeSelector
              sizes={formData.sizes}
              onChange={(sizes) => setFormData(prev => ({ ...prev, sizes }))}
            />
          </div>

          {/* Colors */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
              Couleurs
            </h2>
            <ColorSelector
              colors={formData.colors}
              onChange={(colors) => setFormData(prev => ({ ...prev, colors }))}
            />
          </div>

          {/* Options */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
              Options
            </h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <div>
                  <span className="text-gray-900 font-medium">En stock</span>
                  <p className="text-xs text-gray-600">Le produit est disponible à la vente</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <div>
                  <span className="text-gray-900 font-medium">Nouveau produit</span>
                  <p className="text-xs text-gray-600">Affiche le badge "NOUVEAU" et apparaît dans la section Nouveautés</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <div>
                  <span className="text-gray-900 font-medium">Best-seller</span>
                  <p className="text-xs text-gray-600">Affiche le badge "BEST-SELLER" et apparaît dans la section Best-Sellers</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4 pt-6 border-t-2 border-gray-200">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave />
              <span>{saving ? 'Enregistrement...' : 'Enregistrer les Modifications'}</span>
            </button>
            <Link href="/admin/products" className="btn-secondary">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiX, FiSearch, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi'
import ProductCard from '@/components/products/ProductCard'

interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  rating?: number
  reviews?: number
  createdAt: string
  image: string  // Required for ProductCard
}

export default function ShopPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'Toutes', icon: '🛍️' },
    { id: 'robes', name: 'Robes', icon: '👗' },
    { id: 'sacs', name: 'Sacs', icon: '👜' },
    { id: 'chaussures', name: 'Chaussures', icon: '👠' },
    { id: 'accessoires', name: 'Accessoires', icon: '💍' },
    { id: 'maquillage', name: 'Maquillage', icon: '💄' },
    { id: 'ensembles', name: 'Ensembles', icon: '👔' },
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Rose', hex: '#FFC0CB' },
    { name: 'Blanc', hex: '#FFFFFF' },
    { name: 'Noir', hex: '#000000' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Bleu', hex: '#4A90E2' },
    { name: 'Rouge', hex: '#E74C3C' },
    { name: 'Vert', hex: '#2ECC71' },
    { name: 'Jaune', hex: '#F1C40F' },
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.map((p: any) => ({
        ...p,
        image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.png',
      })))
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p =>
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => selectedSizes.includes(size))
      )
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors.some(color => selectedColors.includes(color))
      )
    }

    // Price filter
    filtered = filtered.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // New products filter
    if (showOnlyNew) {
      filtered = filtered.filter(p => p.isNew)
    }

    // In stock filter
    if (showOnlyInStock) {
      filtered = filtered.filter(p => p.inStock)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - show best sellers first, then new products
        filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1
          if (!a.isBestSeller && b.isBestSeller) return 1
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        })
    }

    return filtered
  }, [products, searchQuery, selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, showOnlyNew, showOnlyInStock])

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 500])
    setSearchQuery('')
    setShowOnlyNew(false)
    setShowOnlyInStock(false)
    setSortBy('featured')
  }

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[1] !== 500 ? 1 : 0) +
    (showOnlyNew ? 1 : 0) +
    (showOnlyInStock ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
          <span>🔍</span>
          <span>Rechercher</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nom du produit..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
          <span>⚡</span>
          <span>Filtres Rapides</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={showOnlyNew}
              onChange={(e) => setShowOnlyNew(e.target.checked)}
              className="w-5 h-5 text-primary-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
            <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors font-medium">
              ✨ Nouveautés uniquement
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={showOnlyInStock}
              onChange={(e) => setShowOnlyInStock(e.target.checked)}
              className="w-5 h-5 text-primary-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
            <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors font-medium">
              ✅ En stock uniquement
            </span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
          <span>📂</span>
          <span>Catégories</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm flex items-center justify-center space-x-2 ${
                selectedCategory === category.id
                  ? 'border-primary-500 bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
          <span>📏</span>
          <span>Tailles</span>
          {selectedSizes.length > 0 && (
            <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              {selectedSizes.length}
            </span>
          )}
        </label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-5 py-3 rounded-xl border-2 transition-all font-bold ${
                selectedSizes.includes(size)
                  ? 'border-primary-500 bg-primary-500 text-white shadow-md scale-105'
                  : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:bg-primary-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
          <span>🎨</span>
          <span>Couleurs</span>
          {selectedColors.length > 0 && (
            <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              {selectedColors.length}
            </span>
          )}
        </label>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`relative group`}
              title={color.name}
            >
              <div
                className={`w-12 h-12 rounded-xl transition-all ${
                  selectedColors.includes(color.name)
                    ? 'ring-4 ring-primary-500 scale-110 shadow-lg'
                    : 'ring-2 ring-gray-300 hover:ring-primary-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {selectedColors.includes(color.name) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-primary-600 text-lg">✓</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center font-medium">{color.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span>💰</span>
            <span>Prix (TND)</span>
          </span>
          <span className="text-primary-600 font-bold">{priceRange[1]} TND</span>
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-3 bg-gradient-to-r from-primary-200 to-primary-500 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #FFC0CB 0%, #FF69B4 ${(priceRange[1] / 500) * 100}%, #E5E7EB ${(priceRange[1] / 500) * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>0 TND</span>
            <span>500 TND</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center space-x-2 border-2 border-gray-300"
        >
          <FiRefreshCw />
          <span>Réinitialiser les Filtres ({activeFiltersCount})</span>
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-pink-500 py-16 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4 animate-bounce">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🛍️</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 animate-fade-in">
              Notre Boutique
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Découvrez notre collection de produits tendance importés
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="h-1 w-20 bg-white/50 rounded-full"></div>
              <div className="h-1 w-10 bg-white/30 rounded-full"></div>
              <div className="h-1 w-5 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <FiFilter className="text-primary-600" />
                  <span>Filtres</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="bg-gradient-to-r from-primary-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <p className="text-gray-600">
                    <span className="font-bold text-2xl text-gradient">{filteredProducts.length}</span>
                    <span className="ml-2 text-gray-500">produit{filteredProducts.length > 1 ? 's' : ''}</span>
                  </p>
                  {activeFiltersCount > 0 && (
                    <span className="text-sm text-primary-600 font-medium">
                      ({activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid'
                          ? 'bg-white text-primary-600 shadow-md'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Vue grille"
                    >
                      <FiGrid className="text-xl" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list'
                          ? 'bg-white text-primary-600 shadow-md'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Vue liste"
                    >
                      <FiList className="text-xl" />
                    </button>
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none font-medium bg-white"
                  >
                    <option value="featured">⭐ En vedette</option>
                    <option value="price-low">💰 Prix: Bas → Élevé</option>
                    <option value="price-high">💎 Prix: Élevé → Bas</option>
                    <option value="newest">✨ Plus récent</option>
                    <option value="name">🔤 Nom A-Z</option>
                  </select>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden relative px-4 py-2 bg-gradient-to-r from-primary-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <FiFilter />
                    <span>Filtres</span>
                    {activeFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-gray-600 text-lg font-medium">Chargement des produits...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">😔</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos filtres ou de réinitialiser la recherche
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center space-x-2"
                  >
                    <FiRefreshCw />
                    <span>Réinitialiser les Filtres</span>
                  </button>
                )}
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto z-50 lg:hidden"
            >
              <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-pink-500 p-6 z-10">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center space-x-2">
                      <FiFilter />
                      <span>Filtres</span>
                    </h3>
                    {activeFiltersCount > 0 && (
                      <p className="text-sm text-white/80 mt-1">
                        {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <FilterContent />
              </div>
              <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 p-6">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                >
                  Voir {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

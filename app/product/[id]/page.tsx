'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiStar, FiTruck, FiShield } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import ProductCard from '@/components/products/ProductCard'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const addToCart = useCartStore((state) => state.addItem)
  const { isInWishlist, toggleItem } = useWishlistStore()

  // Mock product data
  const product = {
    id: params.id,
    name: 'Robe Fleurie Élégante',
    price: 89.99,
    description: 'Magnifique robe fleurie parfaite pour toutes les occasions. Fabriquée avec des matériaux de haute qualité importés directement de nos partenaires internationaux. Cette robe combine élégance et confort pour un look sophistiqué.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    ],
    category: 'Robes',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rose', 'Blanc', 'Bleu'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  }

  const relatedProducts = [
    {
      id: '2',
      name: 'Sac à Main Luxe',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
      category: 'Sacs',
    },
    {
      id: '3',
      name: 'Ensemble Chic 2 Pièces',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&q=80',
      category: 'Ensembles',
    },
    {
      id: '4',
      name: 'Talons Hauts Nude',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
      category: 'Chaussures',
    },
  ]

  const reviews = [
    {
      name: 'Amira B.',
      rating: 5,
      date: '15 Mars 2024',
      comment: 'Magnifique robe ! La qualité est excellente et la taille correspond parfaitement.',
    },
    {
      name: 'Yasmine T.',
      rating: 5,
      date: '10 Mars 2024',
      comment: 'J\'adore cette robe ! Reçue rapidement et bien emballée. Je recommande !',
    },
    {
      name: 'Salma G.',
      rating: 4,
      date: '5 Mars 2024',
      comment: 'Très belle robe, conforme à la description. Livraison rapide.',
    },
  ]

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Veuillez sélectionner une taille et une couleur')
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    })

    alert('Produit ajouté au panier !')
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-primary-500">Accueil</a>
          <span>/</span>
          <a href="/shop" className="hover:text-primary-500">Boutique</a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary-500'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => toggleItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                })}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  inWishlist
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-white'
                }`}
              >
                <FiHeart className={inWishlist ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-gold-500 fill-gold-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary-600">{product.price} TND</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Taille</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Couleur</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Quantité</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-primary-500 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-primary-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
            >
              <FiShoppingBag />
              <span>Ajouter au Panier</span>
            </button>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-xl">
                <FiTruck className="text-2xl text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Livraison Rapide</p>
                  <p className="text-xs text-gray-600">24-48h en Tunisie</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-xl">
                <FiShield className="text-2xl text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Paiement Sécurisé</p>
                  <p className="text-xs text-gray-600">À la livraison</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Avis Clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} className="text-gold-500 fill-gold-500 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{review.date}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Produits Similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

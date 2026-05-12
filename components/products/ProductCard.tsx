'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
  isBestSeller?: boolean
  rating?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isInWishlist, toggleItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
              NOUVEAU
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full">
              BEST-SELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-primary-500 text-white'
              : 'bg-white/90 text-gray-700 hover:bg-primary-500 hover:text-white'
          }`}
        >
          <FiHeart className={inWishlist ? 'fill-current' : ''} />
        </button>

        {/* Quick Add to Cart */}
        {isHovered && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 bg-white text-primary-600 font-bold py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-primary-600 hover:text-white transition-all transform translate-y-0 opacity-100 animate-slide-up"
          >
            <FiShoppingBag />
            <span>Ajouter au Panier</span>
          </button>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating!)
                    ? 'text-gold-500 fill-gold-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-2">({product.rating})</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary-600">{product.price} TND</p>
        </div>
      </div>
    </Link>
  )
}

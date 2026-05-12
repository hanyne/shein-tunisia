'use client'

import Link from 'next/link'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Votre liste de souhaits est vide
          </h2>
          <p className="text-gray-600 mb-8">
            Ajoutez vos produits préférés à votre liste de souhaits
          </p>
          <Link href="/shop" className="btn-primary inline-block">
            Découvrir la Boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white py-12">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          Ma Liste de <span className="text-gradient">Souhaits</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <FiHeart className="fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xl font-bold text-primary-600 mb-4">
                  {item.price} TND
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <FiShoppingBag />
                  <span>Ajouter au Panier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

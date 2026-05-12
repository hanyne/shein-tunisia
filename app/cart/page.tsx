'use client'

import Link from 'next/link'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez notre collection et ajoutez des produits à votre panier
          </p>
          <Link href="/shop" className="btn-primary inline-block">
            Continuer vos Achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white py-12">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          Mon <span className="text-gradient">Panier</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-gray-600">Taille: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-600">Couleur: {item.color}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary-500 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary-500 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-2xl font-bold text-primary-600">
                        {(item.price * item.quantity).toFixed(2)} TND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Résumé de la Commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Sous-total</span>
                  <span className="font-semibold">{getTotalPrice().toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {getTotalPrice().toFixed(2)} TND
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full block text-center mb-4">
                Passer la Commande
              </Link>

              <Link
                href="/shop"
                className="btn-secondary w-full block text-center"
              >
                Continuer vos Achats
              </Link>

              <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">🚚 Livraison rapide:</span> 24-48h partout en Tunisie
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">💳 Paiement:</span> À la livraison
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

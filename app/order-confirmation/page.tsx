'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiCheck, FiPackage } from 'react-icons/fi'

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string>('')

  useEffect(() => {
    // Récupérer le numéro de commande depuis sessionStorage
    const savedOrderNumber = sessionStorage.getItem('lastOrderNumber')
    if (savedOrderNumber) {
      setOrderNumber(savedOrderNumber)
      // Nettoyer après récupération
      sessionStorage.removeItem('lastOrderNumber')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white flex items-center justify-center py-12">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-4xl text-white" />
          </div>

          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Commande Confirmée !
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Merci pour votre commande. Vous recevrez un email de confirmation avec les détails de votre commande et le numéro de suivi.
          </p>

          <div className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FiPackage className="text-3xl text-primary-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Numéro de Commande</p>
                <p className="text-2xl font-bold text-primary-600">
                  {orderNumber || 'Chargement...'}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Conservez ce numéro pour suivre votre commande
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Livraison estimée</span>
              <span className="font-bold text-gray-900">24-48h</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Mode de paiement</span>
              <span className="font-bold text-gray-900">À la livraison</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track-order" className="btn-primary">
              Suivre ma Commande
            </Link>
            <Link href="/shop" className="btn-secondary">
              Continuer vos Achats
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <p className="text-sm text-gray-600">
              Des questions ? <a href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">Contactez-nous</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

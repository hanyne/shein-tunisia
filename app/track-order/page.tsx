'use client'

import { useState } from 'react'
import { FiPackage, FiTruck, FiCheck } from 'react-icons/fi'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [tracking, setTracking] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tracking data
    setTracking({
      orderNumber: orderNumber,
      status: 'in_transit',
      estimatedDelivery: '15 Mars 2024',
      steps: [
        { status: 'confirmed', label: 'Commande Confirmée', date: '13 Mars 2024, 10:30', completed: true },
        { status: 'processing', label: 'En Préparation', date: '13 Mars 2024, 14:00', completed: true },
        { status: 'shipped', label: 'Expédiée', date: '14 Mars 2024, 09:00', completed: true },
        { status: 'in_transit', label: 'En Transit', date: '14 Mars 2024, 15:00', completed: true },
        { status: 'delivered', label: 'Livrée', date: '', completed: false },
      ],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8 text-center">
          Suivre ma <span className="text-gradient">Commande</span>
        </h1>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Numéro de Commande
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ex: SHE-2024-001234"
                required
                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
              />
              <button type="submit" className="btn-primary">
                Suivre
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Vous trouverez votre numéro de commande dans l'email de confirmation
            </p>
          </form>
        </div>

        {/* Tracking Results */}
        {tracking && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Commande #{tracking.orderNumber}
                </h2>
                <p className="text-gray-600">
                  Livraison estimée: <span className="font-semibold text-primary-600">{tracking.estimatedDelivery}</span>
                </p>
              </div>
              <div className="text-5xl text-primary-500">
                <FiTruck />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {tracking.steps.map((step: any, index: number) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step.completed ? <FiCheck className="text-xl" /> : <FiPackage className="text-xl" />}
                    </div>
                    {index < tracking.steps.length - 1 && (
                      <div
                        className={`w-0.5 h-16 ${
                          step.completed ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        step.completed ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </h3>
                    {step.date && (
                      <p className="text-sm text-gray-600">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-8 p-6 bg-primary-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-700 mb-4">
                Notre équipe est disponible pour répondre à vos questions
              </p>
              <a href="/contact" className="btn-secondary inline-block">
                Contacter le Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

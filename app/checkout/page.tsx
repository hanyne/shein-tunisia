'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiCheck } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  })
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    // Validation prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères'
    }

    // Validation nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères'
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    // Validation téléphone (format tunisien)
    const phoneRegex = /^(\+216)?[2-9]\d{7}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide (ex: 20123456 ou +21620123456)'
    }

    // Validation adresse
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise'
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'L\'adresse doit contenir au moins 10 caractères'
    }

    // Validation ville
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Préparer les données de commande
      const orderData = {
        customerFirstName: formData.firstName,
        customerLastName: formData.lastName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        notes: formData.notes,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          productImage: item.image,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
        })),
        subtotal: getTotalPrice(),
        shippingCost: 0,
        total: getTotalPrice(),
        paymentMethod: 'cash_on_delivery',
      }

      console.log('📦 Creating order:', orderData)

      // Envoyer la commande à l'API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      console.log('📦 Order response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Order creation failed:', errorData)
        throw new Error('Failed to create order')
      }

      const order = await response.json()
      console.log('✅ Order created:', order)
      
      // Sauvegarder le numéro de commande pour la page de confirmation
      sessionStorage.setItem('lastOrderNumber', order.orderNumber)
      
      // Vider le panier
      clearCart()
      
      // Rediriger vers la page de confirmation
      router.push('/order-confirmation')
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }))
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white py-12">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          <span className="text-gradient">Finaliser</span> votre Commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-800 font-semibold mb-2">⚠️ Veuillez corriger les erreurs suivantes :</p>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {Object.values(errors).map((error: any, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de Livraison
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-primary-500 focus:outline-none transition-colors`}
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-primary-500 focus:outline-none transition-colors`}
                    placeholder="Votre nom"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-primary-500 focus:outline-none transition-colors`}
                    placeholder="votre.email@exemple.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:border-primary-500 focus:outline-none transition-colors`}
                    placeholder="20123456 ou +21620123456"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-500 focus:outline-none transition-colors`}
                  placeholder="Rue, numéro, bâtiment..."
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange as any}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    } focus:border-primary-500 focus:outline-none transition-colors`}
                  >
                    <option value="">Sélectionnez une ville</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Ben Arous">Ben Arous</option>
                    <option value="Manouba">Manouba</option>
                    <option value="Nabeul">Nabeul</option>
                    <option value="Zaghouan">Zaghouan</option>
                    <option value="Bizerte">Bizerte</option>
                    <option value="Béja">Béja</option>
                    <option value="Jendouba">Jendouba</option>
                    <option value="Kef">Kef</option>
                    <option value="Siliana">Siliana</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Kairouan">Kairouan</option>
                    <option value="Kasserine">Kasserine</option>
                    <option value="Sidi Bouzid">Sidi Bouzid</option>
                    <option value="Gabès">Gabès</option>
                    <option value="Medenine">Medenine</option>
                    <option value="Tataouine">Tataouine</option>
                    <option value="Gafsa">Gafsa</option>
                    <option value="Tozeur">Tozeur</option>
                    <option value="Kebili">Kebili</option>
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Code Postal
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes de Commande (optionnel) ({formData.notes.length}/500)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Instructions spéciales pour la livraison..."
                />
              </div>

              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Mode de Paiement</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                    <FiCheck className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Paiement à la Livraison</p>
                    <p className="text-sm text-gray-600">
                      Payez en espèces lors de la réception de votre commande
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Traitement en cours...' : 'Confirmer la Commande'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Votre Commande
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {item.size && `Taille: ${item.size}`}
                        {item.color && ` | Couleur: ${item.color}`}
                      </p>
                      <p className="text-sm text-gray-700">
                        {item.quantity} x {item.price} TND
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Sous-total</span>
                  <span className="font-semibold">{getTotalPrice().toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {getTotalPrice().toFixed(2)} TND
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">🚚 Livraison:</span> 24-48h après confirmation
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">📞 Support:</span> Disponible 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

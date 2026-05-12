'use client'

import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiSend, FiCheckCircle } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Le nom ne peut pas dépasser 50 caractères'
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    // Validation du sujet
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Le sujet doit contenir au moins 3 caractères'
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Le sujet ne peut pas dépasser 100 caractères'
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Le message ne peut pas dépasser 1000 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      setShowSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error: any) {
      alert(error.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white">
      {/* Hero Section with Decorative Elements */}
      <section className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-pink-500 py-20 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container-custom text-center relative z-10">
          <div className="inline-block mb-6 animate-bounce">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
              <FiMail className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="h-1 w-20 bg-white/50 rounded-full"></div>
            <div className="h-1 w-10 bg-white/30 rounded-full"></div>
            <div className="h-1 w-5 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 right-4 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
            <FiCheckCircle className="text-2xl" />
            <div>
              <p className="font-bold">Message envoyé avec succès !</p>
              <p className="text-sm text-green-100">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          </div>
        </div>
      )}

      <section className="section-padding -mt-16 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 transform hover:-translate-y-1">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FiMapPin className="text-3xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">📍 Notre Adresse</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Rue Habib Thamer, Korba<br />
                  En face Merry House Make Up<br />
                  <span className="text-primary-600 font-semibold">Nabeul, Tunisie</span>
                </p>
              </div>

              {/* Phone Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gold-200 transform hover:-translate-y-1">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FiPhone className="text-3xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">📞 Téléphone</h3>
                <a 
                  href="tel:+21626316003" 
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg font-semibold block"
                >
                  +216 26 316 003
                </a>
                <p className="text-sm text-gray-500 mt-2">Lun - Sam: 9h - 18h</p>
              </div>

              {/* Email Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 transform hover:-translate-y-1">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FiMail className="text-3xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">✉️ Email</h3>
                <a 
                  href="mailto:contact@shein.tn" 
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg font-semibold block break-all"
                >
                  contact@shein.tn
                </a>
                <p className="text-sm text-gray-500 mt-2">Réponse sous 24h</p>
              </div>

              {/* Social Media Card */}
              <div className="bg-gradient-to-br from-primary-500 to-pink-500 rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">✨ Suivez-nous</h3>
                <p className="text-white/90 mb-6">Restez connectés pour nos dernières nouveautés</p>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <FiInstagram className="text-2xl" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <FiFacebook className="text-2xl" />
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <FaTiktok className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100">
                <div className="mb-8">
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-3">
                    💌 Envoyez-nous un Message
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                        <span>👤</span>
                        <span>Nom Complet *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all text-lg`}
                        placeholder="Votre nom complet"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <span>⚠️</span>
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                        <span>📧</span>
                        <span>Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all text-lg`}
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <span>⚠️</span>
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                      <span>📝</span>
                      <span>Sujet *</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className={`w-full px-5 py-4 rounded-xl border-2 ${
                        errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all text-lg`}
                      placeholder="Objet de votre message"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span>💬</span>
                        <span>Message *</span>
                      </span>
                      <span className={`text-xs ${formData.message.length > 900 ? 'text-red-600' : 'text-gray-500'}`}>
                        {formData.message.length}/1000
                      </span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={6}
                      className={`w-full px-5 py-4 rounded-xl border-2 ${
                        errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all text-lg resize-none`}
                      placeholder="Écrivez votre message ici..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-500 to-pink-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="text-xl" />
                        <span>Envoyer le Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    🔒 Vos informations sont sécurisées et ne seront jamais partagées
                  </p>
                </form>
              </div>

              {/* Additional Info */}
              <div className="mt-6 bg-gradient-to-r from-primary-50 to-pink-50 rounded-2xl p-6 border-2 border-primary-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiCheckCircle className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Temps de réponse rapide</h3>
                    <p className="text-gray-600">
                      Notre équipe s'engage à vous répondre dans les <span className="font-bold text-primary-600">24 heures</span> suivant la réception de votre message.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - can be added later) */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">📍 Trouvez-nous facilement</h2>
          <p className="text-gray-600 mb-8">
            Rue Habib Thamer, Korba - En face Merry House Make Up
          </p>
          <div className="bg-gradient-to-br from-primary-100 to-pink-100 rounded-3xl p-12 border-2 border-primary-200">
            <p className="text-gray-700 text-lg">
              🗺️ Carte interactive disponible prochainement
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

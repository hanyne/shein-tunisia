'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setEmail('')
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMail className="text-4xl" />
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Restez à la Mode
          </h2>
          <p className="text-lg md:text-xl mb-8 text-primary-50">
            Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande + les dernières tendances en exclusivité
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-all transform hover:scale-105 shadow-lg"
              >
                S'inscrire
              </button>
            </div>
          </form>

          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-white font-medium"
            >
              ✨ Merci ! Vérifiez votre email pour votre code promo
            </motion.p>
          )}

          <p className="mt-6 text-sm text-primary-100">
            En vous inscrivant, vous acceptez de recevoir nos emails marketing. Vous pouvez vous désabonner à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

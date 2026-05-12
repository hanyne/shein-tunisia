'use client'

import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Amira Ben Salem',
      location: 'Tunis',
      rating: 5,
      comment: 'Qualité exceptionnelle ! Les produits sont exactement comme sur les photos. Livraison ultra rapide en 24h. Je recommande vivement She in !',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
    {
      name: 'Yasmine Trabelsi',
      location: 'Sousse',
      rating: 5,
      comment: 'Enfin une boutique qui importe les dernières tendances en Tunisie ! Service client au top et prix très raisonnables. Ma nouvelle boutique préférée 💖',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    },
    {
      name: 'Salma Gharbi',
      location: 'Sfax',
      rating: 5,
      comment: 'J\'adore ! Les robes sont magnifiques et la qualité est au rendez-vous. Livraison soignée et rapide. Merci She in pour cette expérience shopping unique !',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    },
  ]

  return (
    <section className="section-padding gradient-pink">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Ce Que Disent Nos <span className="text-gradient">Clientes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des milliers de femmes nous font confiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-gold-500 fill-gold-500" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{testimonial.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

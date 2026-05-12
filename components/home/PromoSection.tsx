'use client'

import { motion } from 'framer-motion'
import { FiTruck, FiShield, FiCreditCard, FiHeadphones } from 'react-icons/fi'

export default function PromoSection() {
  const features = [
    {
      icon: <FiTruck />,
      title: 'Livraison Rapide',
      description: '24-48h partout en Tunisie',
    },
    {
      icon: <FiShield />,
      title: 'Paiement Sécurisé',
      description: 'À la livraison',
    },
    {
      icon: <FiCreditCard />,
      title: 'Retours Faciles',
      description: 'Sous 7 jours',
    },
    {
      icon: <FiHeadphones />,
      title: 'Support 24/7',
      description: 'Service client disponible',
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-pink-50 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

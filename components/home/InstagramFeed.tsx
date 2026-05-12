'use client'

import { motion } from 'framer-motion'
import { FiInstagram } from 'react-icons/fi'

export default function InstagramFeed() {
  const images = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Suivez-nous sur <span className="text-gradient">Instagram</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Rejoignez notre communauté et découvrez les looks de nos clientes
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-lg"
          >
            <FiInstagram className="text-2xl" />
            <span>@shein.tunisia</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FiInstagram className="text-white text-4xl" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

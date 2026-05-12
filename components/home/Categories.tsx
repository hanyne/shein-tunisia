'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Categories() {
  const categories = [
    {
      name: 'Robes',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
      href: '/shop?category=dresses',
      color: 'from-primary-400 to-primary-600',
    },
    {
      name: 'Sacs',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      href: '/shop?category=bags',
      color: 'from-gold-400 to-gold-600',
    },
    {
      name: 'Chaussures',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
      href: '/shop?category=shoes',
      color: 'from-nude-400 to-nude-600',
    },
    {
      name: 'Accessoires',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
      href: '/shop?category=accessories',
      color: 'from-primary-500 to-pink-600',
    },
    {
      name: 'Maquillage',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
      href: '/shop?category=makeup',
      color: 'from-gold-500 to-primary-500',
    },
    {
      name: 'Ensembles',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      href: '/shop?category=sets',
      color: 'from-nude-500 to-primary-500',
    },
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
            Nos <span className="text-gradient">Catégories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez notre sélection de produits tendance importés spécialement pour vous
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium`}>
                    Découvrir →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

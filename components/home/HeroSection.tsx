'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden gradient-pink">
      <div className="container-custom h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
            >
              <span className="text-primary-600 font-semibold text-sm">
                ✨ Nouvelle Collection Printemps 2024
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            >
              <span className="text-gradient">She in</span>
              <br />
              <span className="text-gray-800">Your Style,</span>
              <br />
              <span className="text-gray-800">Your Story</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Découvrez les dernières tendances mode importées directement de SHEIN, Zalando et des boutiques internationales. Livraison rapide partout en Tunisie.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/shop" className="btn-primary text-center">
                Découvrir la Collection
              </Link>
              <Link href="/shop?filter=new" className="btn-secondary text-center">
                Nouveautés
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">500+</p>
                <p className="text-sm text-gray-600">Produits</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">1000+</p>
                <p className="text-sm text-gray-600">Clientes Satisfaites</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">24-48h</p>
                <p className="text-sm text-gray-600">Livraison</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              <div className="absolute top-0 right-0 w-80 h-96 bg-gradient-to-br from-primary-300 to-primary-500 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="absolute top-10 right-10 w-80 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                  alt="Fashion Model"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-32 w-64 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                  alt="Fashion Model"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gold-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary-300 rounded-full opacity-20 blur-xl"></div>
    </section>
  )
}

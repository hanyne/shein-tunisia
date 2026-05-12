'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      const newProducts = data
        .filter((p: any) => p.isNew)
        .slice(0, 4)
        .map((p: any) => ({
          ...p,
          image: p.images[0],
        }))
      setProducts(newProducts)
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

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
            <span className="text-gradient">Nouveautés</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les dernières tendances fraîchement arrivées pour vous
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="/shop?filter=new" className="btn-primary inline-block">
            Voir Toutes les Nouveautés
          </a>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const totalItems = useCartStore((state) => state.getTotalItems())
  const wishlistItems = useWishlistStore((state) => state.items.length)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Nouveautés', href: '/shop?filter=new' },
    { name: 'Meilleures Ventes', href: '/shop?filter=bestsellers' },
    { name: 'À Propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-sm">
        <p className="font-medium">
          ✨ Livraison gratuite pour toute commande supérieure à 200 TND | Livraison 24h-48h partout en Tunisie 🚚
        </p>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-2xl text-gray-700 hover:text-primary-500 transition-colors"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="She in Logo" 
                className="h-12 md:h-14 w-auto"
              />
              <div className="text-2xl md:text-3xl font-display font-bold">
                
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-xl text-gray-700 hover:text-primary-500 transition-colors"
              >
                <FiSearch />
              </button>

              {/* Removed account link - only admin has account */}

              <Link
                href="/wishlist"
                className="relative text-xl text-gray-700 hover:text-primary-500 transition-colors"
              >
                <FiHeart />
                {wishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistItems}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative text-xl text-gray-700 hover:text-primary-500 transition-colors"
              >
                <FiShoppingBag />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 animate-slide-up">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  className="w-full px-6 py-3 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:outline-none transition-colors"
                  autoFocus
                />
                <FiSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-gradient">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-gray-700"
                >
                  <FiX />
                </button>
              </div>
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg text-gray-700 hover:text-primary-500 font-medium transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Removed account link - only admin has account */}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

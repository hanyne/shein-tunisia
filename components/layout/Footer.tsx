import Link from 'next/link'
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-50 via-pink-50 to-nude-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="She in Logo" 
                className="h-16 w-auto"
              />
              <h3 className="text-3xl font-display font-bold text-gradient">
                She in
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              La première boutique en ligne en Tunisie spécialisée dans l'importation de produits de mode tendance.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FiInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FiFacebook />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-500 transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Suivre ma Commande
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Service Client</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Modes de Paiement
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Contactez-nous</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-600">
                <FiMapPin className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  Rue Habib Thamer, Korba<br />
                  En face Merry House Make Up<br />
                  Nabeul, Tunisie
                </span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <FiPhone className="text-primary-500 flex-shrink-0" />
                <a href="tel:+21626316003" className="hover:text-primary-600 transition-colors font-medium">
                  +216 26 316 003
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <FiMail className="text-primary-500 flex-shrink-0" />
                <a href="mailto:contact@shein.tn" className="hover:text-primary-600 transition-colors">
                  contact@shein.tn
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-sm border border-primary-100">
              <p className="text-sm font-bold text-gray-900 mb-1">
                🚚 Livraison Rapide
              </p>
              <p className="text-xs text-gray-600">
                24h-48h partout en Tunisie
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © 2024 She in. Tous droits réservés. Fait avec 💖 en Tunisie
            </p>
            <div className="flex items-center space-x-4">
             
              <span className="text-sm text-gray-600 font-medium">
                Paiement à la livraison
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Comment passer une commande ?',
      answer: 'Pour passer une commande, parcourez notre boutique, ajoutez les produits souhaités à votre panier, puis cliquez sur "Passer la commande". Remplissez vos informations de livraison et confirmez votre commande.',
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Nous livrons partout en Tunisie en 24-48h après confirmation de votre commande. Vous recevrez un SMS de confirmation avec le numéro de suivi.',
    },
    {
      question: 'Quels sont les modes de paiement acceptés ?',
      answer: 'Nous acceptons le paiement à la livraison (Cash on Delivery). Vous payez en espèces lors de la réception de votre commande.',
    },
    {
      question: 'Puis-je retourner un produit ?',
      answer: 'Oui, vous pouvez retourner un produit dans les 7 jours suivant la réception si vous n\'êtes pas satisfaite. Le produit doit être dans son état d\'origine avec les étiquettes.',
    },
    {
      question: 'Les frais de livraison sont-ils gratuits ?',
      answer: 'Oui, la livraison est gratuite pour toute commande supérieure à 200 TND. Pour les commandes inférieures, des frais de 7 TND s\'appliquent.',
    },
    {
      question: 'Comment suivre ma commande ?',
      answer: 'Après confirmation de votre commande, vous recevrez un numéro de suivi par SMS et email. Vous pouvez suivre votre commande sur notre page "Suivre ma Commande".',
    },
    {
      question: 'Les produits sont-ils authentiques ?',
      answer: 'Oui, tous nos produits sont importés directement de SHEIN, Zalando et d\'autres boutiques internationales officielles. Nous garantissons l\'authenticité de tous nos articles.',
    },
    {
      question: 'Puis-je échanger un produit ?',
      answer: 'Oui, les échanges sont possibles dans les 7 jours suivant la réception. Contactez notre service client pour organiser l\'échange.',
    },
    {
      question: 'Comment contacter le service client ?',
      answer: 'Vous pouvez nous contacter par téléphone au +216 XX XXX XXX, par email à contact@shein.tn, ou via nos réseaux sociaux (Instagram, Facebook, TikTok).',
    },
    {
      question: 'Les tailles correspondent-elles aux standards tunisiens ?',
      answer: 'Nos produits suivent les tailles internationales. Nous fournissons un guide des tailles détaillé sur chaque page produit pour vous aider à choisir la bonne taille.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white">
      {/* Hero */}
      <section className="bg-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Questions <span className="text-gradient">Fréquentes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <FiChevronUp className="text-2xl text-primary-600 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="text-2xl text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-display font-bold mb-4">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-lg mb-6 text-primary-50">
              Notre équipe est là pour vous aider
            </p>
            <a href="/contact" className="btn-gold inline-block">
              Contactez-nous
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

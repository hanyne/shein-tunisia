import { FiHeart, FiTruck, FiStar, FiUsers } from 'react-icons/fi'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-pink py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            À Propos de <span className="text-gradient">She in</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La première boutique en ligne en Tunisie spécialisée dans l'importation de produits de mode tendance
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                She in est née d'une passion pour la mode et d'un désir de rendre les dernières tendances internationales accessibles aux femmes tunisiennes. Nous importons soigneusement des produits de qualité depuis les plus grandes plateformes de mode comme SHEIN, Zalando et d'autres boutiques internationales renommées.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Notre mission est simple : offrir à chaque femme tunisienne la possibilité de s'exprimer à travers la mode, avec des produits tendance, de qualité et à des prix accessibles.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Avec une livraison rapide partout en Tunisie et un service client dédié, nous nous engageons à vous offrir une expérience shopping exceptionnelle.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Fashion Store"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding gradient-pink">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-gray-900 text-center mb-12">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                Nous aimons la mode et nous nous engageons à vous offrir les meilleures tendances
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Qualité</h3>
              <p className="text-gray-600">
                Chaque produit est soigneusement sélectionné pour garantir votre satisfaction
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rapidité</h3>
              <p className="text-gray-600">
                Livraison express en 24-48h partout en Tunisie
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Communauté</h3>
              <p className="text-gray-600">
                Une communauté de femmes passionnées de mode et de style
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-gradient mb-2">500+</p>
              <p className="text-gray-600">Produits</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-gradient mb-2">1000+</p>
              <p className="text-gray-600">Clientes Satisfaites</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-gradient mb-2">24-48h</p>
              <p className="text-gray-600">Livraison</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-gradient mb-2">4.9/5</p>
              <p className="text-gray-600">Note Moyenne</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

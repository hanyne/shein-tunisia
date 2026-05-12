'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiLock, FiMail } from 'react-icons/fi'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('Attempting login with:', email)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: include cookies
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log('Login response:', data)

      if (response.ok) {
        console.log('Login successful, redirecting to dashboard')
        // Small delay to ensure cookie is set
        setTimeout(() => {
          router.push('/admin/dashboard')
          router.refresh()
        }, 100)
      } else {
        console.log('Login failed:', data.error)
        setError(data.error || 'Erreur de connexion')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold text-white mb-2">
            She in
          </h1>
          <p className="text-primary-100 text-lg">Administration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Connexion Admin
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="admin@shein.tn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-primary-50 rounded-xl">
            <p className="text-sm text-gray-700 font-semibold mb-2">
              Identifiants par défaut:
            </p>
            <p className="text-xs text-gray-600">
              Email: <span className="font-mono">admin@shein.tn</span>
            </p>
            <p className="text-xs text-gray-600">
              Mot de passe: <span className="font-mono">admin123</span>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-white hover:text-primary-100 transition-colors">
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  )
}

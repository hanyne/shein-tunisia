'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      })
      if (!response.ok) {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Le mot de passe actuel est requis'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères'
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins une majuscule'
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins une minuscule'
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins un chiffre'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSuccess(false)

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la modification')
      }

      setSuccess(true)
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error: any) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-white py-12">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <FiLock className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Paramètres du Compte
              </h1>
              <p className="text-gray-600">Modifier votre mot de passe</p>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center space-x-3">
              <FiCheck className="text-green-600 text-2xl" />
              <p className="text-green-800 font-semibold">Mot de passe modifié avec succès!</p>
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-800 font-semibold">❌ {errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Mot de passe actuel *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, currentPassword: e.target.value })
                    setErrors({ ...errors, currentPassword: '' })
                  }}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-500 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, newPassword: e.target.value })
                    setErrors({ ...errors, newPassword: '' })
                  }}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-500 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
              )}
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>Le mot de passe doit contenir:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Au moins 8 caractères</li>
                  <li>Au moins une majuscule</li>
                  <li>Au moins une minuscule</li>
                  <li>Au moins un chiffre</li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Confirmer le nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    setErrors({ ...errors, confirmPassword: '' })
                  }}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-500 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Modification...' : 'Modifier le mot de passe'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

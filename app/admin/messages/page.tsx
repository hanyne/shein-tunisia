'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiFilter, FiMail, FiEye, FiX, FiClock, FiCheck, FiArchive, FiMessageSquare } from 'react-icons/fi'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-800', icon: FiMail },
  read: { label: 'Lu', color: 'bg-yellow-100 text-yellow-800', icon: FiEye },
  replied: { label: 'Répondu', color: 'bg-green-100 text-green-800', icon: FiCheck },
  archived: { label: 'Archivé', color: 'bg-gray-100 text-gray-800', icon: FiArchive },
}

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    checkAuth()
    fetchMessages()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, messages])

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

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
        setFilteredMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...messages]

    if (filters.status !== 'all') {
      filtered = filtered.filter(m => m.status === filters.status)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(searchLower) ||
        m.email.toLowerCase().includes(searchLower) ||
        m.subject.toLowerCase().includes(searchLower) ||
        m.message.toLowerCase().includes(searchLower)
      )
    }

    if (filters.startDate) {
      filtered = filtered.filter(m =>
        new Date(m.createdAt) >= new Date(filters.startDate)
      )
    }

    if (filters.endDate) {
      filtered = filtered.filter(m =>
        new Date(m.createdAt) <= new Date(filters.endDate)
      )
    }

    setFilteredMessages(filtered)
  }

  const updateMessageStatus = async (messageId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchMessages()
        if (selectedMessage && selectedMessage.id === messageId) {
          const updatedMessage = await response.json()
          setSelectedMessage(updatedMessage)
        }
      }
    } catch (error) {
      console.error('Error updating message:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const viewMessageDetails = (message: ContactMessage) => {
    setSelectedMessage(message)
    setShowModal(true)
    
    // Mark as read if it's new
    if (message.status === 'new') {
      updateMessageStatus(message.id, 'read')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-white mb-4 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                Messages de Contact
              </h1>
              <p className="text-primary-100 text-lg flex items-center space-x-2">
                <FiMessageSquare className="text-xl" />
                <span>{filteredMessages.length} message{filteredMessages.length > 1 ? 's' : ''}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <FiFilter className="text-white text-lg" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">🔍 Rechercher</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Nom, email, sujet..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">📊 Statut</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="new">📧 Nouveau</option>
                <option value="read">👁️ Lu</option>
                <option value="replied">✅ Répondu</option>
                <option value="archived">📦 Archivé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">📅 Date début</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">📅 Date fin</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {(filters.search || filters.status !== 'all' || filters.startDate || filters.endDate) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({ status: 'all', search: '', startDate: '', endDate: '' })}
                className="px-6 py-2 text-sm text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                ✨ Réinitialiser
              </button>
            </div>
          )}
        </div>

        {/* Liste des messages */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-primary-50 border-b-2 border-primary-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">📅 Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">👤 Nom</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">📧 Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">📝 Sujet</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">📊 Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">⚡ Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <FiMessageSquare className="text-4xl text-gray-400" />
                        <p className="text-gray-500 font-medium">Aucun message trouvé</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((message) => {
                    const StatusIcon = statusConfig[message.status].icon
                    return (
                      <tr key={message.id} className="hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-pink-50/50 transition-all">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="font-semibold text-gray-900">
                            {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{message.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{message.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{message.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold ${statusConfig[message.status].color}`}>
                            <StatusIcon />
                            <span>{statusConfig[message.status].label}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => viewMessageDetails(message)}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                          >
                            <FiEye />
                            <span>Voir</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal détails */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            
            <div className="inline-block bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-3xl sm:w-full animate-slide-up relative">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedMessage.subject}</h3>
                    <p className="text-primary-100 flex items-center space-x-2">
                      <FiClock />
                      <span>{new Date(selectedMessage.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-white hover:text-primary-100 bg-white/20 rounded-full p-2">
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>

              <div className="px-8 py-6">
                <div className="mb-6">
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Statut actuel</p>
                        <p className="text-xl font-bold text-gray-900">{statusConfig[selectedMessage.status].label}</p>
                      </div>
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value)}
                        className="px-6 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none font-semibold"
                      >
                        <option value="new">📧 Nouveau</option>
                        <option value="read">👁️ Lu</option>
                        <option value="replied">✅ Répondu</option>
                        <option value="archived">📦 Archivé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Nom</p>
                    <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{selectedMessage.email}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-2xl p-6 border-2 border-primary-100">
                  <h4 className="font-bold text-gray-900 mb-3">Message</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 border-t-2 border-gray-100 flex justify-between">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                  Fermer
                </button>
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 flex items-center space-x-2">
                  <FiMail />
                  <span>Répondre par Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

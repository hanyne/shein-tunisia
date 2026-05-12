'use client'

import { useState } from 'react'

export default function TestAuthPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: 'admin@shein.tn',
          password: 'admin123',
        }),
      })
      const data = await response.json()
      setResult({ type: 'login', status: response.status, data })
    } catch (error: any) {
      setResult({ type: 'login', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testSession = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      })
      const data = await response.json()
      setResult({ type: 'session', status: response.status, data })
    } catch (error: any) {
      setResult({ type: 'session', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products', {
        credentials: 'include',
      })
      const data = await response.json()
      setResult({ type: 'products', status: response.status, data })
    } catch (error: any) {
      setResult({ type: 'products', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Authentication</h1>

        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={testLogin}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Test Login
            </button>
            <button
              onClick={testSession}
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Test Session
            </button>
            <button
              onClick={testProducts}
              disabled={loading}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
            >
              Test Products API
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Result: {result.type}</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

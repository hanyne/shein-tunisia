'use client'

import { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

interface SizeSelectorProps {
  sizes: string[]
  onChange: (sizes: string[]) => void
}

const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Unique']

export default function SizeSelector({ sizes, onChange }: SizeSelectorProps) {
  const [customSize, setCustomSize] = useState('')

  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      onChange(sizes.filter(s => s !== size))
    } else {
      onChange([...sizes, size])
    }
  }

  const addCustomSize = () => {
    if (customSize.trim() && !sizes.includes(customSize.trim())) {
      onChange([...sizes, customSize.trim()])
      setCustomSize('')
    }
  }

  const removeSize = (size: string) => {
    onChange(sizes.filter(s => s !== size))
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Tailles Disponibles *
      </label>

      {/* Common Sizes */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Tailles courantes:</p>
        <div className="flex flex-wrap gap-2">
          {commonSizes.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                sizes.includes(size)
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-primary-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Size Input */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Ajouter une taille personnalisée:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSize())}
            placeholder="Ex: 38, 40, 42..."
            className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={addCustomSize}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
          >
            <FiPlus />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* Selected Sizes */}
      {sizes.length > 0 && (
        <div>
          <p className="text-xs text-gray-600 mb-2">Tailles sélectionnées:</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <div
                key={size}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full flex items-center space-x-2 group"
              >
                <span className="font-medium">{size}</span>
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {sizes.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          Veuillez sélectionner au moins une taille
        </div>
      )}
    </div>
  )
}

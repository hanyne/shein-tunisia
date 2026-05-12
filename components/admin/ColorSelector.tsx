'use client'

import { useState } from 'react'
import { FiPlus, FiX, FiCheck } from 'react-icons/fi'

interface ColorSelectorProps {
  colors: string[]
  onChange: (colors: string[]) => void
}

const commonColors = [
  { name: 'Noir', hex: '#000000' },
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Rouge', hex: '#EF4444' },
  { name: 'Rose', hex: '#EC4899' },
  { name: 'Bleu', hex: '#3B82F6' },
  { name: 'Vert', hex: '#10B981' },
  { name: 'Jaune', hex: '#F59E0B' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Violet', hex: '#8B5CF6' },
  { name: 'Beige', hex: '#D4B5A0' },
  { name: 'Marron', hex: '#92400E' },
  { name: 'Gris', hex: '#6B7280' },
]

export default function ColorSelector({ colors, onChange }: ColorSelectorProps) {
  const [customColor, setCustomColor] = useState('')

  const toggleColor = (colorName: string) => {
    if (colors.includes(colorName)) {
      onChange(colors.filter(c => c !== colorName))
    } else {
      onChange([...colors, colorName])
    }
  }

  const addCustomColor = () => {
    if (customColor.trim() && !colors.includes(customColor.trim())) {
      onChange([...colors, customColor.trim()])
      setCustomColor('')
    }
  }

  const removeColor = (color: string) => {
    onChange(colors.filter(c => c !== color))
  }

  const getColorHex = (colorName: string) => {
    const found = commonColors.find(c => c.name === colorName)
    return found?.hex || '#CCCCCC'
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Couleurs Disponibles *
      </label>

      {/* Common Colors */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Couleurs courantes:</p>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {commonColors.map(color => {
            const isSelected = colors.includes(color.name)
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <div
                  className={`w-full aspect-square rounded-md mb-2 ${
                    color.name === 'Blanc' ? 'border border-gray-300' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiCheck
                        className={`text-2xl ${
                          color.name === 'Blanc' || color.name === 'Jaune'
                            ? 'text-gray-800'
                            : 'text-white'
                        }`}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 text-center">
                  {color.name}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Color Input */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Ajouter une couleur personnalisée:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomColor())}
            placeholder="Ex: Turquoise, Corail..."
            className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={addCustomColor}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
          >
            <FiPlus />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* Selected Colors */}
      {colors.length > 0 && (
        <div>
          <p className="text-xs text-gray-600 mb-2">Couleurs sélectionnées:</p>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <div
                key={color}
                className="px-3 py-2 bg-white border-2 border-gray-200 rounded-lg flex items-center space-x-2 group hover:border-primary-300 transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-full ${
                    color === 'Blanc' ? 'border border-gray-300' : ''
                  }`}
                  style={{ backgroundColor: getColorHex(color) }}
                />
                <span className="font-medium text-gray-700">{color}</span>
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {colors.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          Veuillez sélectionner au moins une couleur
        </div>
      )}
    </div>
  )
}

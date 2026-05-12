'use client'

import { useState, useRef } from 'react'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('images', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        onChange([...images, ...data.urls])
      } else {
        alert('Erreur lors du téléchargement des images')
      }
    } catch (error) {
      alert('Erreur lors du téléchargement des images')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Images du Produit *
      </label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <FiUpload className="text-4xl text-gray-400 mx-auto mb-3" />
        
        {uploading ? (
          <div>
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600">Téléchargement en cours...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 font-medium mb-1">
              Cliquez pour sélectionner ou glissez-déposez vos images
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, WEBP jusqu'à 10MB
            </p>
          </div>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <FiX />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs font-bold rounded">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
          <FiImage className="text-yellow-600 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800 font-medium">
              Aucune image ajoutée
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Ajoutez au moins une image pour votre produit
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

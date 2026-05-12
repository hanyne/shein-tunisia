import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value

  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Aucune image fournie' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    
    // Create upload directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedUrls: string[] = []

    for (const file of files) {
      if (file.size === 0) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(7)
      const extension = file.name.split('.').pop()
      const filename = `${timestamp}_${randomString}.${extension}`

      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)

      // Return URL path
      uploadedUrls.push(`/uploads/products/${filename}`)
    }

    return NextResponse.json({ 
      success: true, 
      urls: uploadedUrls 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Erreur lors du téléchargement' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await db.products.getById(params.id)
  
  if (!product) {
    return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
  }

  return NextResponse.json(product)
}

// UPDATE product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value

  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const updates = await request.json()
    const updatedProduct = await db.products.update(params.id, updates)

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value

  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const success = await db.products.delete(params.id)

  if (!success) {
    return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}

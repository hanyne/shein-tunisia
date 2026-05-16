import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// GET all products
export async function GET() {
  const products = await db.products.getAll()
  return NextResponse.json(products)
}

// CREATE new product (admin only)
export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value

  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const productData = await request.json()
    const newProduct = await db.products.create(productData)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

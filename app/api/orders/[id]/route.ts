import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// GET - Get order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = await db.orders.getById(params.id)
  
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json(order)
}

// PUT - Update order (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const order = await db.orders.update(params.id, body)
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

// DELETE - Delete order (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const success = await db.orders.delete(params.id)
  
  if (!success) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'Order deleted successfully' })
}

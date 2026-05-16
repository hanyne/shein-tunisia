import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// GET - Get all orders (admin only) or search with filters
export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  console.log('📦 Orders API GET - Session ID:', sessionId)
  console.log('📦 Orders API GET - All cookies:', request.cookies.getAll())
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    console.log('❌ Orders API - Unauthorized')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('✅ Orders API - Authorized')

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') || undefined
  const searchTerm = searchParams.get('search') || undefined
  const startDate = searchParams.get('startDate') || undefined
  const endDate = searchParams.get('endDate') || undefined

  const orders = await db.orders.search({
    status,
    searchTerm,
    startDate,
    endDate,
  })

  console.log('📦 Orders API - Returning', orders.length, 'orders')
  
  const response = NextResponse.json(orders)
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    console.log('📦 Orders API POST - Creating new order')
    const body = await request.json()
    console.log('📦 Order data received:', body)
    
    const {
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
      address,
      city,
      postalCode,
      notes,
      items,
      subtotal,
      shippingCost,
      total,
      paymentMethod,
    } = body

    // Validation
    if (!customerFirstName || !customerLastName || !customerEmail || !customerPhone || !address || !city || !items || items.length === 0) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('✅ Validation passed, creating order...')

    const order = await db.orders.create({
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
      address,
      city,
      postalCode,
      notes,
      items,
      subtotal,
      shippingCost: shippingCost || 0,
      total,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      status: 'pending',
    })

    console.log('✅ Order created successfully:', order.orderNumber)
    const allOrders = await db.orders.getAll()
    console.log('📊 Total orders in DB:', allOrders.length)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('❌ Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

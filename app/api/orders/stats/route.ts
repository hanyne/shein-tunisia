import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// GET - Get order statistics (admin only)
export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  console.log('📊 Stats API - Session ID:', sessionId)
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    console.log('❌ Stats API - Unauthorized')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('✅ Stats API - Authorized')
  const stats = await db.orders.getStats()
  console.log('📊 Stats:', stats)
  
  const response = NextResponse.json(stats)
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

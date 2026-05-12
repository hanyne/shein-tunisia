import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value

  console.log('🔍 Session check, Cookie:', sessionId)

  if (!sessionId) {
    console.log('❌ No session cookie found')
    return NextResponse.json({ authenticated: false, reason: 'No session cookie' }, { status: 401 })
  }

  const session = auth.getSession(sessionId)

  if (!session) {
    console.log('❌ Invalid session:', sessionId)
    return NextResponse.json({ authenticated: false, reason: 'Invalid session' }, { status: 401 })
  }

  console.log('✅ Session valid:', session.email)

  return NextResponse.json({
    authenticated: true,
    admin: {
      email: session.email,
      name: session.name,
      role: session.role,
    },
  })
}

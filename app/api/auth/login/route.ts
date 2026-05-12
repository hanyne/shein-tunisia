import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('🔐 Login attempt:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    const sessionId = auth.login(email, password)

    if (!sessionId) {
      console.log('❌ Login failed for:', email)
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    console.log('✅ Login successful:', email, 'Session:', sessionId)

    const response = NextResponse.json({ 
      success: true,
      sessionId: sessionId // Return session ID for debugging
    })
    
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: false, // Set to false for localhost
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value

  if (sessionId) {
    auth.logout(sessionId)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_session')

  return response
}

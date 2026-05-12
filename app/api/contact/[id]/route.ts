import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { logger, rbac } from '@/lib/security'

// GET - Get message by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const message = db.contactMessages.getById(params.id)
  
  if (!message) {
    return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 })
  }

  return NextResponse.json(message)
}

// PUT - Update message status (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const session = auth.getSession(sessionId)
  if (!session || !rbac.canAccessResource(session.role, 'messages', 'write')) {
    logger.security('Unauthorized access attempt to update message', { sessionId })
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const message = db.contactMessages.update(params.id, body)
    
    if (!message) {
      return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 })
    }

    logger.info('Contact message updated', { id: params.id, updates: body })
    return NextResponse.json(message)
  } catch (error) {
    logger.error('Error updating contact message', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Delete message (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const session = auth.getSession(sessionId)
  if (!session || !rbac.canAccessResource(session.role, 'messages', 'delete')) {
    logger.security('Unauthorized delete attempt on message', { sessionId })
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const success = db.contactMessages.delete(params.id)
  
  if (!success) {
    return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 })
  }

  logger.info('Contact message deleted', { id: params.id })
  return NextResponse.json({ message: 'Message supprimé avec succès' })
}

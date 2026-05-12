import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { validation, logger, rateLimit } from '@/lib/security'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const session = auth.getSession(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session invalide' }, { status: 401 })
  }

  // Rate limiting
  if (!rateLimit.check(`change-password:${session.adminId}`, 3, 3600000)) {
    logger.warn('Rate limit exceeded for password change', { adminId: session.adminId })
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 1 heure.' },
      { status: 429 }
    )
  }

  try {
    const { currentPassword, newPassword } = await request.json()

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validate new password
    const passwordValidation = validation.password(newPassword)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join(', ') },
        { status: 400 }
      )
    }

    // Get admin
    const admins = await db.admins.getAll()
    const admin = admins.find(a => a.id === session.adminId)
    if (!admin) {
      return NextResponse.json({ error: 'Admin non trouvé' }, { status: 404 })
    }

    // Verify current password
    if (admin.password !== currentPassword) {
      logger.security('Failed password change attempt - wrong current password', { adminId: admin.id })
      return NextResponse.json(
        { error: 'Mot de passe actuel incorrect' },
        { status: 400 }
      )
    }

    // Update password using MongoDB
    await db.admins.updatePassword(admin.email, newPassword)
    logger.info('Password changed successfully', { adminId: admin.id })
    
    return NextResponse.json({ message: 'Mot de passe modifié avec succès' })
  } catch (error) {
    logger.error('Error changing password', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

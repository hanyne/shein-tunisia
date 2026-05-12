import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { validation, rateLimit, logger } from '@/lib/security'

// GET - Get all contact messages (admin only)
export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('admin_session')?.value
  
  if (!sessionId || !auth.isAuthenticated(sessionId)) {
    logger.security('Unauthorized access attempt to contact messages')
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') || undefined
  const searchTerm = searchParams.get('search') || undefined
  const startDate = searchParams.get('startDate') || undefined
  const endDate = searchParams.get('endDate') || undefined

  const messages = db.contactMessages.search({
    status,
    searchTerm,
    startDate,
    endDate,
  })

  logger.info(`Admin retrieved ${messages.length} contact messages`)
  return NextResponse.json(messages)
}

// POST - Create new contact message
export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting: 5 messages per hour per IP
    if (!rateLimit.check(`contact:${clientIp}`, 5, 3600000)) {
      const remainingTime = rateLimit.getRemainingTime(`contact:${clientIp}`)
      logger.warn(`Rate limit exceeded for contact form`, { ip: clientIp })
      return NextResponse.json(
        { error: `Trop de messages envoyés. Réessayez dans ${remainingTime} secondes.` },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validate email
    if (!validation.email(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: validation.sanitizeString(name),
      email: validation.sanitizeEmail(email),
      subject: validation.sanitizeString(subject),
      message: validation.sanitizeString(message),
      status: 'new' as const,
    }

    // Length validation
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 50) {
      return NextResponse.json(
        { error: 'Le nom doit contenir entre 2 et 50 caractères' },
        { status: 400 }
      )
    }

    if (sanitizedData.subject.length < 3 || sanitizedData.subject.length > 100) {
      return NextResponse.json(
        { error: 'Le sujet doit contenir entre 3 et 100 caractères' },
        { status: 400 }
      )
    }

    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 1000) {
      return NextResponse.json(
        { error: 'Le message doit contenir entre 10 et 1000 caractères' },
        { status: 400 }
      )
    }

    const contactMessage = db.contactMessages.create(sanitizedData)

    logger.info('New contact message received', {
      id: contactMessage.id,
      email: sanitizedData.email,
      ip: clientIp,
    })

    return NextResponse.json(contactMessage, { status: 201 })
  } catch (error) {
    logger.error('Error creating contact message', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}

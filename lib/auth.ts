import { db } from './db'

export interface Session {
  adminId: string
  email: string
  name: string
  role: string
  expiresAt: number
}

// Global session storage that persists across requests
// In production, use Redis or a proper session store
if (!(global as any).sessions) {
  (global as any).sessions = new Map<string, Session>()
}

const sessions = (global as any).sessions as Map<string, Session>

export const auth = {
  login: async (email: string, password: string): Promise<string | null> => {
    const admin = await db.admins.getByEmail(email)
    
    if (!admin || admin.password !== password) {
      return null
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const session: Session = {
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    sessions.set(sessionId, session)
    console.log('✅ Session created:', sessionId, 'Total sessions:', sessions.size)
    return sessionId
  },

  logout: (sessionId: string): boolean => {
    const deleted = sessions.delete(sessionId)
    console.log('🚪 Logout:', sessionId, 'Success:', deleted)
    return deleted
  },

  getSession: (sessionId: string): Session | null => {
    if (!sessionId) {
      return null
    }

    const session = sessions.get(sessionId)
    
    if (!session) {
      console.log('❌ Session not found:', sessionId)
      return null
    }

    if (session.expiresAt < Date.now()) {
      sessions.delete(sessionId)
      console.log('⏰ Session expired:', sessionId)
      return null
    }

    console.log('✅ Session valid:', sessionId, session.email)
    return session
  },

  isAuthenticated: (sessionId: string): boolean => {
    const isAuth = auth.getSession(sessionId) !== null
    console.log('🔐 Auth check:', sessionId, 'Result:', isAuth)
    return isAuth
  },

  getAllSessions: (): number => {
    return sessions.size
  }
}

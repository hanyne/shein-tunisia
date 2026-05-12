// Security utilities for the application

// Rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Input validation utilities
export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  phone: (phone: string): boolean => {
    // Tunisian phone format: 20123456 or +21620123456
    const phoneRegex = /^(\+216)?[2-9]\d{7}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  },

  password: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une minuscule')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  },

  sanitizeString: (input: string): string => {
    // Remove HTML tags and dangerous characters
    return input
      .replace(/<[^>]*>/g, '')
      .replace(/[<>'"]/g, '')
      .trim()
  },

  sanitizeEmail: (email: string): string => {
    return email.toLowerCase().trim()
  },
}

// Rate limiting
export const rateLimit = {
  check: (identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
    const now = Date.now()
    const record = rateLimitStore.get(identifier)

    if (!record || now > record.resetTime) {
      // Create new record or reset expired one
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      })
      return true
    }

    if (record.count >= maxRequests) {
      return false // Rate limit exceeded
    }

    // Increment count
    record.count++
    return true
  },

  getRemainingTime: (identifier: string): number => {
    const record = rateLimitStore.get(identifier)
    if (!record) return 0
    
    const remaining = record.resetTime - Date.now()
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0
  },

  reset: (identifier: string): void => {
    rateLimitStore.delete(identifier)
  },
}

// Logging utility
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '')
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '')
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '')
  },

  security: (message: string, data?: any) => {
    console.log(`[SECURITY] ${new Date().toISOString()} - ${message}`, data || '')
  },
}

// Simple password hashing (in production, use bcrypt)
export const hashPassword = (password: string): string => {
  // This is a simple hash for development
  // In production, use bcrypt or argon2
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

export const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash
}

// RBAC (Role-Based Access Control)
export const rbac = {
  roles: {
    super_admin: ['all'],
    admin: ['read', 'write', 'delete'],
    viewer: ['read'],
  },

  hasPermission: (role: string, permission: string): boolean => {
    const permissions = rbac.roles[role as keyof typeof rbac.roles]
    if (!permissions) return false
    return permissions.includes('all') || permissions.includes(permission)
  },

  canAccessResource: (role: string, resource: string, action: string): boolean => {
    // Super admin can access everything
    if (role === 'super_admin') return true

    // Define resource permissions
    const resourcePermissions: Record<string, string[]> = {
      products: ['admin', 'super_admin'],
      orders: ['admin', 'super_admin'],
      messages: ['admin', 'super_admin'],
      settings: ['super_admin'],
    }

    const allowedRoles = resourcePermissions[resource]
    return allowedRoles ? allowedRoles.includes(role) : false
  },
}

// Cache utility
interface CacheEntry {
  data: any
  expiry: number
}

const cache = new Map<string, CacheEntry>()

export const smartCache = {
  set: (key: string, data: any, ttlSeconds: number = 300): void => {
    cache.set(key, {
      data,
      expiry: Date.now() + (ttlSeconds * 1000),
    })
  },

  get: (key: string): any | null => {
    const entry = cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiry) {
      cache.delete(key)
      return null
    }

    return entry.data
  },

  delete: (key: string): void => {
    cache.delete(key)
  },

  clear: (): void => {
    cache.clear()
  },

  invalidatePattern: (pattern: string): void => {
    const keys = Array.from(cache.keys())
    for (const key of keys) {
      if (key.includes(pattern)) {
        cache.delete(key)
      }
    }
  },
}

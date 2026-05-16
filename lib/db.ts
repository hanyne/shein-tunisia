// Simple in-memory database (for development)
// In production, replace with a real database like MongoDB, PostgreSQL, etc.

export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  rating?: number
  reviews?: number
  createdAt: string
  updatedAt: string
}

export interface Admin {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'super_admin'
  createdAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  size?: string
  color?: string
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  postalCode?: string
  notes?: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  updatedAt: string
}

// Global storage that persists across requests
// In production, use a real database like MongoDB, PostgreSQL, etc.
if (!(global as any).dbStorage) {
  (global as any).dbStorage = {
    products: [
      {
        id: '1',
        name: 'Robe Fleurie Élégante',
        price: 89.99,
        description: 'Magnifique robe fleurie parfaite pour toutes les occasions.',
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'],
        category: 'Robes',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Rose', 'Blanc', 'Bleu'],
        inStock: true,
        isNew: true,
        rating: 4.8,
        reviews: 124,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Sac à Main Luxe',
        price: 129.99,
        description: 'Sac à main élégant en cuir synthétique de haute qualité.',
        images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'],
        category: 'Sacs',
        sizes: ['Unique'],
        colors: ['Noir', 'Beige', 'Rose'],
        inStock: true,
        isNew: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    admins: [
      {
        id: '1',
        email: 'admin@shein.tn',
        password: 'admin123', // In production, this should be hashed!
        name: 'Admin She in',
        role: 'super_admin',
        createdAt: new Date().toISOString(),
      },
    ],
    orders: [],
    contactMessages: [],
  }
}

const storage = (global as any).dbStorage

// Ensure contactMessages array exists
if (!storage.contactMessages) {
  storage.contactMessages = []
}

let products: Product[] = storage.products
let admins: Admin[] = storage.admins
let orders: Order[] = storage.orders
let contactMessages: ContactMessage[] = storage.contactMessages

// Product CRUD operations
export const db = {
  products: {
    getAll: () => products,
    getById: (id: string) => products.find(p => p.id === id),
    create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      products.push(newProduct)
      return newProduct
    },
    update: (id: string, updates: Partial<Product>) => {
      const index = products.findIndex(p => p.id === id)
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        return products[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = products.findIndex(p => p.id === id)
      if (index !== -1) {
        products.splice(index, 1)
        return true
      }
      return false
    },
  },
  admins: {
    getAll: () => admins,
    getByEmail: (email: string) => admins.find(a => a.email === email),
    create: (admin: Omit<Admin, 'id' | 'createdAt'>) => {
      const newAdmin: Admin = {
        ...admin,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      admins.push(newAdmin)
      return newAdmin
    },
    updatePassword: (email: string, newPassword: string) => {
      const admin = admins.find(a => a.email === email)
      if (admin) {
        admin.password = newPassword
        return admin
      }
      return null
    },
  },
  orders: {
    getAll: () => orders,
    getById: (id: string) => orders.find(o => o.id === id),
    getByOrderNumber: (orderNumber: string) => orders.find(o => o.orderNumber === orderNumber),
    getByStatus: (status: string) => orders.filter(o => o.status === status),
    search: (filters: {
      status?: string
      searchTerm?: string
      startDate?: string
      endDate?: string
    }) => {
      let filtered = [...orders]
      
      if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(o => o.status === filters.status)
      }
      
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        filtered = filtered.filter(o => 
          o.orderNumber.toLowerCase().includes(term) ||
          o.customerFirstName.toLowerCase().includes(term) ||
          o.customerLastName.toLowerCase().includes(term) ||
          o.customerEmail.toLowerCase().includes(term) ||
          o.customerPhone.includes(term)
        )
      }
      
      if (filters.startDate) {
        filtered = filtered.filter(o => new Date(o.createdAt) >= new Date(filters.startDate!))
      }
      
      if (filters.endDate) {
        filtered = filtered.filter(o => new Date(o.createdAt) <= new Date(filters.endDate!))
      }
      
      return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    },
    create: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
      const orderNumber = `SHE${Date.now().toString().slice(-8)}`
      const newOrder: Order = {
        ...order,
        id: Date.now().toString(),
        orderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      orders.push(newOrder)
      return newOrder
    },
    update: (id: string, updates: Partial<Order>) => {
      const index = orders.findIndex(o => o.id === id)
      if (index !== -1) {
        orders[index] = {
          ...orders[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        return orders[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = orders.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.splice(index, 1)
        return true
      }
      return false
    },
    getStats: () => {
      return {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        totalRevenue: orders
          .filter(o => o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.total, 0),
      }
    },
  },
  contactMessages: {
    getAll: () => contactMessages,
    getById: (id: string) => contactMessages.find(m => m.id === id),
    getByStatus: (status: string) => contactMessages.filter(m => m.status === status),
    search: (filters: {
      status?: string
      searchTerm?: string
      startDate?: string
      endDate?: string
    }) => {
      let filtered = [...contactMessages]
      
      if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(m => m.status === filters.status)
      }
      
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        filtered = filtered.filter(m => 
          m.name.toLowerCase().includes(term) ||
          m.email.toLowerCase().includes(term) ||
          m.subject.toLowerCase().includes(term) ||
          m.message.toLowerCase().includes(term)
        )
      }
      
      if (filters.startDate) {
        filtered = filtered.filter(m => new Date(m.createdAt) >= new Date(filters.startDate!))
      }
      
      if (filters.endDate) {
        filtered = filtered.filter(m => new Date(m.createdAt) <= new Date(filters.endDate!))
      }
      
      return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    },
    create: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newMessage: ContactMessage = {
        ...message,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      contactMessages.push(newMessage)
      return newMessage
    },
    update: (id: string, updates: Partial<ContactMessage>) => {
      const index = contactMessages.findIndex(m => m.id === id)
      if (index !== -1) {
        contactMessages[index] = {
          ...contactMessages[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        return contactMessages[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = contactMessages.findIndex(m => m.id === id)
      if (index !== -1) {
        contactMessages.splice(index, 1)
        return true
      }
      return false
    },
    getStats: () => {
      return {
        total: contactMessages.length,
        new: contactMessages.filter(m => m.status === 'new').length,
        read: contactMessages.filter(m => m.status === 'read').length,
        replied: contactMessages.filter(m => m.status === 'replied').length,
        archived: contactMessages.filter(m => m.status === 'archived').length,
      }
    },
  },
}

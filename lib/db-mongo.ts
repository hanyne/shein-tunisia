import connectDB from './mongodb'
import { Product, Admin, Order, ContactMessage, IProduct, IAdmin, IOrder, IContactMessage } from './models'

// Helper function to convert MongoDB document to plain object
const toPlainObject = (doc: any) => {
  if (!doc) return null
  const obj = doc.toObject ? doc.toObject() : doc
  return {
    ...obj,
    id: obj._id.toString(),
    _id: undefined,
  }
}

// Initialize default admin if not exists
async function initializeAdmin() {
  await connectDB()
  const adminExists = await Admin.findOne({ email: 'admin@shein.tn' })
  
  if (!adminExists) {
    await Admin.create({
      email: 'admin@shein.tn',
      password: 'admin123', // In production, hash this!
      name: 'Admin She in',
      role: 'super_admin',
    })
    console.log('✅ Default admin created')
  }
}

// Initialize default products if none exist
async function initializeProducts() {
  await connectDB()
  const productCount = await Product.countDocuments()
  
  if (productCount === 0) {
    await Product.insertMany([
      {
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
      },
      {
        name: 'Sac à Main Luxe',
        price: 129.99,
        description: 'Sac à main élégant en cuir synthétique de haute qualité.',
        images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'],
        category: 'Sacs',
        sizes: ['Unique'],
        colors: ['Noir', 'Beige', 'Rose'],
        inStock: true,
        isNew: true,
      },
    ])
    console.log('✅ Default products created')
  }
}

// Initialize database
export async function initializeDatabase() {
  try {
    await initializeAdmin()
    await initializeProducts()
  } catch (error) {
    console.error('❌ Database initialization error:', error)
  }
}

// Products CRUD
export const db = {
  products: {
    getAll: async () => {
      await connectDB()
      const products = await Product.find().sort({ createdAt: -1 })
      return products.map(toPlainObject)
    },

    getById: async (id: string) => {
      await connectDB()
      const product = await Product.findById(id)
      return toPlainObject(product)
    },

    create: async (productData: Partial<IProduct>) => {
      await connectDB()
      const product = await Product.create(productData)
      return toPlainObject(product)
    },

    update: async (id: string, updates: Partial<IProduct>) => {
      await connectDB()
      const product = await Product.findByIdAndUpdate(id, updates, { new: true })
      return toPlainObject(product)
    },

    delete: async (id: string) => {
      await connectDB()
      await Product.findByIdAndDelete(id)
      return true
    },
  },

  admins: {
    getAll: async () => {
      await connectDB()
      const admins = await Admin.find()
      return admins.map(toPlainObject)
    },

    getByEmail: async (email: string) => {
      await connectDB()
      const admin = await Admin.findOne({ email })
      return toPlainObject(admin)
    },

    create: async (adminData: Partial<IAdmin>) => {
      await connectDB()
      const admin = await Admin.create(adminData)
      return toPlainObject(admin)
    },

    updatePassword: async (email: string, newPassword: string) => {
      await connectDB()
      const admin = await Admin.findOneAndUpdate(
        { email },
        { password: newPassword },
        { new: true }
      )
      return toPlainObject(admin)
    },
  },

  orders: {
    getAll: async () => {
      await connectDB()
      const orders = await Order.find().sort({ createdAt: -1 })
      return orders.map(toPlainObject)
    },

    getById: async (id: string) => {
      await connectDB()
      const order = await Order.findById(id)
      return toPlainObject(order)
    },

    getByOrderNumber: async (orderNumber: string) => {
      await connectDB()
      const order = await Order.findOne({ orderNumber })
      return toPlainObject(order)
    },

    getByStatus: async (status: string) => {
      await connectDB()
      const orders = await Order.find({ status }).sort({ createdAt: -1 })
      return orders.map(toPlainObject)
    },

    search: async (filters: {
      status?: string
      searchTerm?: string
      startDate?: string
      endDate?: string
    }) => {
      await connectDB()
      const query: any = {}

      if (filters.status && filters.status !== 'all') {
        query.status = filters.status
      }

      if (filters.searchTerm) {
        const term = filters.searchTerm
        query.$or = [
          { orderNumber: { $regex: term, $options: 'i' } },
          { customerFirstName: { $regex: term, $options: 'i' } },
          { customerLastName: { $regex: term, $options: 'i' } },
          { customerEmail: { $regex: term, $options: 'i' } },
          { customerPhone: { $regex: term, $options: 'i' } },
        ]
      }

      if (filters.startDate) {
        query.createdAt = { ...query.createdAt, $gte: new Date(filters.startDate) }
      }

      if (filters.endDate) {
        query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) }
      }

      const orders = await Order.find(query).sort({ createdAt: -1 })
      return orders.map(toPlainObject)
    },

    create: async (orderData: Partial<IOrder>) => {
      await connectDB()
      const orderNumber = `SHE${Date.now().toString().slice(-8)}`
      const order = await Order.create({
        ...orderData,
        orderNumber,
      })
      return toPlainObject(order)
    },

    update: async (id: string, updates: Partial<IOrder>) => {
      await connectDB()
      const order = await Order.findByIdAndUpdate(id, updates, { new: true })
      return toPlainObject(order)
    },

    delete: async (id: string) => {
      await connectDB()
      await Order.findByIdAndDelete(id)
      return true
    },

    getStats: async () => {
      await connectDB()
      const orders = await Order.find()
      
      return {
        total: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
        confirmed: orders.filter((o) => o.status === 'confirmed').length,
        preparing: orders.filter((o) => o.status === 'preparing').length,
        shipped: orders.filter((o) => o.status === 'shipped').length,
        delivered: orders.filter((o) => o.status === 'delivered').length,
        cancelled: orders.filter((o) => o.status === 'cancelled').length,
        totalRevenue: orders
          .filter((o) => o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.total, 0),
      }
    },
  },

  contactMessages: {
    getAll: async () => {
      await connectDB()
      const messages = await ContactMessage.find().sort({ createdAt: -1 })
      return messages.map(toPlainObject)
    },

    getById: async (id: string) => {
      await connectDB()
      const message = await ContactMessage.findById(id)
      return toPlainObject(message)
    },

    getByStatus: async (status: string) => {
      await connectDB()
      const messages = await ContactMessage.find({ status }).sort({ createdAt: -1 })
      return messages.map(toPlainObject)
    },

    search: async (filters: {
      status?: string
      searchTerm?: string
      startDate?: string
      endDate?: string
    }) => {
      await connectDB()
      const query: any = {}

      if (filters.status && filters.status !== 'all') {
        query.status = filters.status
      }

      if (filters.searchTerm) {
        const term = filters.searchTerm
        query.$or = [
          { name: { $regex: term, $options: 'i' } },
          { email: { $regex: term, $options: 'i' } },
          { subject: { $regex: term, $options: 'i' } },
          { message: { $regex: term, $options: 'i' } },
        ]
      }

      if (filters.startDate) {
        query.createdAt = { ...query.createdAt, $gte: new Date(filters.startDate) }
      }

      if (filters.endDate) {
        query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) }
      }

      const messages = await ContactMessage.find(query).sort({ createdAt: -1 })
      return messages.map(toPlainObject)
    },

    create: async (messageData: Partial<IContactMessage>) => {
      await connectDB()
      const message = await ContactMessage.create(messageData)
      return toPlainObject(message)
    },

    update: async (id: string, updates: Partial<IContactMessage>) => {
      await connectDB()
      const message = await ContactMessage.findByIdAndUpdate(id, updates, { new: true })
      return toPlainObject(message)
    },

    delete: async (id: string) => {
      await connectDB()
      await ContactMessage.findByIdAndDelete(id)
      return true
    },

    getStats: async () => {
      await connectDB()
      const messages = await ContactMessage.find()
      
      return {
        total: messages.length,
        new: messages.filter((m) => m.status === 'new').length,
        read: messages.filter((m) => m.status === 'read').length,
        replied: messages.filter((m) => m.status === 'replied').length,
        archived: messages.filter((m) => m.status === 'archived').length,
      }
    },
  },
}

// Initialize on import
initializeDatabase().catch(console.error)

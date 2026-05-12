import mongoose, { Schema, Model } from 'mongoose'

// Product Interface
export interface IProduct {
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
  createdAt: Date
  updatedAt: Date
}

// Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    inStock: { type: Boolean, default: true },
    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

// Admin Interface
export interface IAdmin {
  email: string
  password: string
  name: string
  role: 'admin' | 'super_admin'
  createdAt: Date
}

// Admin Schema
const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'super_admin'], default: 'admin' },
  },
  {
    timestamps: true,
  }
)

// Order Interface
export interface IOrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  size?: string
  color?: string
  price: number
}

export interface IOrder {
  orderNumber: string
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  postalCode?: string
  notes?: string
  items: IOrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

// Order Schema
const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String },
    notes: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        productImage: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

// Contact Message Interface
export interface IContactMessage {
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: Date
  updatedAt: Date
}

// Contact Message Schema
const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

// Export Models
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema)

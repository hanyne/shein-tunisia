# She in - Premium Fashion E-commerce Platform

![She in](https://img.shields.io/badge/She%20in-Fashion%20Boutique-ff69b4)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

**She in** is Tunisia's first online boutique specialized in importing trendy fashion products from platforms like SHEIN, Zalando, and other international fashion boutiques. Built with modern web technologies, it offers a premium, elegant, and feminine shopping experience.

## ✨ Features

### 🏠 Home Page
- Beautiful hero banner with trendy fashion collections
- Promotional sections highlighting key features
- "New Arrivals" and "Best Sellers" sections
- Customer testimonials
- Product categories (dresses, bags, shoes, makeup, accessories, sets)
- Instagram-style visuals and smooth animations
- Newsletter subscription

### 🛍️ Shop / Products Page
- Product grid with elegant cards
- Advanced filters (category, size, color, price)
- Search functionality
- Wishlist integration
- Quick add-to-cart feature
- Sorting options (featured, price, newest)
- Responsive design

### 📦 Product Detail Page
- Large product image gallery
- Detailed product description
- Size and color selection
- Quantity selector
- Add to cart functionality
- Delivery information (24-48h delivery across Tunisia)
- Customer reviews and ratings
- Related products suggestions

### 🛒 Shopping Cart & Checkout
- Smooth cart experience with quantity management
- Order summary with pricing breakdown
- Delivery information form
- Cash on Delivery (COD) payment option
- Secure order confirmation
- Order tracking system

### 📄 Additional Pages
- **About Us**: Company story and values
- **Contact**: Contact form and information
- **FAQ**: Frequently asked questions
- **Order Tracking**: Real-time order status
- **Wishlist**: Save favorite products
- **Account**: User profile and order history

## 🔐 Admin Dashboard

### Access Admin Panel

**URL:** `http://localhost:3000/admin/login`

**Default Credentials:**
- Email: `admin@shein.tn`
- Password: `admin123`

⚠️ **Important:** Change these credentials in production!

### Admin Features

#### 📊 Dashboard
- Real-time statistics (products, orders, revenue, customers)
- Quick access to management sections
- Admin profile and logout

#### 🛍️ Product Management
- **View All Products:** See all products in a table format
- **Add New Product:** Complete form with all product details
  - Name, price, description
  - Multiple images (comma-separated URLs)
  - Sizes and colors
  - Category selection
  - Stock status
  - New/Best-seller badges
- **Edit Product:** Modify existing product information
- **Delete Product:** Remove products from the catalog

#### 🔄 Dynamic Product Display
- Products added via admin automatically appear on:
  - Home page (New Arrivals & Best Sellers sections)
  - Shop page (with filters)
  - Product detail pages
- Real-time updates across the entire site

### API Endpoints

```
GET    /api/products          - Get all products
POST   /api/products          - Create product (admin only)
GET    /api/products/[id]     - Get single product
PUT    /api/products/[id]     - Update product (admin only)
DELETE /api/products/[id]     - Delete product (admin only)

POST   /api/auth/login        - Admin login
POST   /api/auth/logout       - Admin logout
GET    /api/auth/session      - Check session
```

### Security Features

- Session-based authentication
- Protected admin routes
- HttpOnly cookies
- 24-hour session expiration
- Authorization checks on all admin endpoints

📖 **For detailed admin instructions, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)**

---

## 🎨 Design Features

- **Color Palette**: Soft pink, white, nude, and gold tones
- **Typography**: Elegant Playfair Display for headings, Inter for body text
- **Animations**: Framer Motion for smooth transitions and interactions
- **Responsive**: Fully responsive for mobile, tablet, and desktop
- **Modern UI/UX**: Instagram-inspired, luxury fashion brand aesthetic

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Image Slider**: Swiper

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd she-in-boutique
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
she-in-boutique/
├── app/
│   ├── about/              # About page
│   ├── account/            # User account
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout process
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── order-confirmation/ # Order confirmation
│   ├── product/[id]/       # Product detail page
│   ├── shop/               # Shop/products listing
│   ├── track-order/        # Order tracking
│   ├── wishlist/           # Wishlist page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── home/               # Home page components
│   ├── layout/             # Layout components (Header, Footer)
│   └── products/           # Product components
├── store/
│   ├── useCartStore.ts     # Cart state management
│   └── useWishlistStore.ts # Wishlist state management
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎯 Key Features Implementation

### State Management
- **Cart**: Persistent cart using Zustand with localStorage
- **Wishlist**: Persistent wishlist with localStorage
- **Real-time updates**: Automatic UI updates on state changes

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized images for different screen sizes

### Performance
- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized animations with Framer Motion

## 🚚 Delivery Information

- **Coverage**: Livraison partout en Tunisie
- **Delivery Time**: 24h-48h after order confirmation
- **Shipping**: Free shipping on orders over 200 TND
- **Payment**: Cash on Delivery (COD)

## 🛠️ Admin Dashboard (To Be Implemented)

The admin dashboard will include:
- Product management (add, edit, delete)
- Order management and tracking
- Customer management
- Inventory/stock management
- Analytics and reports
- Settings and configuration

## 📱 Social Media Integration

- Instagram feed integration
- Facebook page link
- TikTok profile link
- Social sharing capabilities

## 🔐 Security Features

- Secure checkout process
- Data validation
- Protected routes
- HTTPS enforcement (production)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📈 Future Enhancements

- [ ] User authentication and registration
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS notifications for order updates
- [ ] Product reviews and ratings system
- [ ] Advanced search with filters
- [ ] Multi-language support (French/Arabic)
- [ ] Live chat support
- [ ] Loyalty program
- [ ] Gift cards
- [ ] Size guide
- [ ] Virtual try-on (AR)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For any inquiries, please contact:
- **Email**: contact@shein.tn
- **Phone**: +216 XX XXX XXX
- **Instagram**: @shein.tunisia

---

Made with 💖 in Tunisia by the She in Team

# 🛍️ Shaya Modestwear - E-Commerce Platform

A full-stack MERN e-commerce website for modest fashion clothing.

**Live Site:** https://shayamodestwear.com

---

## 🏗️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Styling:** CSS
- **Image Upload:** Multer

---

## 📁 Project Structure

```
shaya-modestwear/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── admin/    # Admin panel components
│   │   ├── user/     # Customer-facing pages
│   │   ├── components/  # Shared components
│   │   └── utils/    # Axios configuration
│   └── dist/         # Build output
│
├── backend/          # Express backend
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── middleware/   # Auth & upload middleware
│   └── uploads/      # Uploaded files
│
└── DEPLOYMENT_GUIDE.md  # Deployment instructions
```

---

## 🚀 Local Development

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Backend Setup
```bash
cd backend
npm install

# Create .env file
MONGO_URL=mongodb://localhost:27017/shaya-modestwear
JWT_SECRET=your-secret-key
PORT=5000

npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🌐 Deployment (FREE)

**Follow our deployment guides:**
- 📖 [QUICK_START.md](QUICK_START.md) - Fast deployment (45 min)
- 📚 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Detailed guide with troubleshooting

**Services Used (All FREE):**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Domain: shayamodestwear.com

---

## 🔑 Key Features

### For Customers
- Browse products by category
- Product details and images
- Shopping cart
- User authentication (signup/login)
- Place orders
- Order tracking
- Payment proof upload

### For Admins
- Admin dashboard
- Add/Edit/Delete products
- Manage inventory
- View and manage orders
- Sales management
- User management

---

## 🛣️ API Routes

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id` - Update order status (Admin)

---

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend
API URL is configured in `src/utils/axiosInstance.js`

---

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- multer - File upload
- cors - Cross-origin requests
- dotenv - Environment variables

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- vite - Build tool

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

**Website:** https://shayamodestwear.com

---

## 🙏 Acknowledgments

- Built with MERN stack
- Deployed on free tier services
- Made with ❤️ for modest fashion

---

## 🐛 Known Issues & Solutions

### Issue: Backend sleeps after 15 minutes (Render free tier)
**Solution:** First request takes 30-60 seconds to wake up. Consider upgrading to paid plan or use alternative hosting.

### Issue: Uploaded images disappear (Render ephemeral storage)
**Solution:** Integrate Cloudinary for persistent image storage. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for instructions.

---

## 📝 Notes

- Free tier limitations apply
- Backend may experience cold starts
- Consider upgrading for production use
- Regular backups recommended

---

Made with ❤️ in India 🇮🇳

# 🚀 Deployment Checklist for Shaya Modestwear

## 1. Push Code to GitHub
- [ ] Initialize git repo if needed
- [ ] Commit all changes
- [ ] Push to GitHub main branch

## 2. Deploy Backend to Render
- [ ] Create free Render.com account
- [ ] New Web Service → Connect GitHub repo
- [ ] Root Directory: backend
- [ ] Build Command: npm install
- [ ] Start Command: npm start
- [ ] Add environment variables (MONGO_URL, JWT_SECRET, etc.)
- [ ] Deploy and copy backend URL

## 3. Deploy Frontend to Vercel
- [ ] Create free Vercel.com account
- [ ] Import GitHub repo
- [ ] Root Directory: frontend
- [ ] Framework: Vite
- [ ] Output Directory: dist
- [ ] Deploy and copy frontend URL

## 4. Connect Domain to Vercel
- [ ] Add www.shayamodestwear.com in Vercel Domains
- [ ] Update DNS at your registrar as Vercel instructs

## 5. Update Frontend API URL
- [ ] In frontend/src/utils/axiosInstance.js, set baseURL to your Render backend URL
- [ ] Commit and push changes

## 6. Test Everything
- [ ] Visit your domain and test all features
- [ ] Check MongoDB Atlas for live data

---

**Done? Your site is live and FREE!**

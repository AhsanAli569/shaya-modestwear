# 🚀 Quick Start - Deploy Now!

Follow these steps in order:

## ✅ Step 1: MongoDB Atlas (10 minutes)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create FREE account
3. Create FREE cluster (M0)
4. Add database user with password
5. Allow access from anywhere (0.0.0.0/0)
6. Copy connection string and save it

## ✅ Step 2: Create .env File (2 minutes)
Create `backend/.env` file:
```env
MONGO_URL=your_mongodb_connection_string_here
JWT_SECRET=create-a-long-random-secret-key-here
PORT=5000
NODE_ENV=production
```

## ✅ Step 3: Push to GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shaya-modestwear.git
git push -u origin main
```

## ✅ Step 4: Deploy Backend to Render (10 minutes)
1. Go to https://render.com
2. Sign up with GitHub
3. New Web Service → Connect your repo
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from your .env file
5. Deploy!
6. **COPY your backend URL** (like: https://shaya-backend.onrender.com)

## ✅ Step 5: Update Frontend (2 minutes)
Edit `frontend/src/utils/axiosInstance.js`:
```javascript
const axiosInstance = axios.create({
  baseURL: "https://YOUR-BACKEND-URL.onrender.com/api",  // ← Paste your backend URL
});
```

Push changes:
```bash
git add .
git commit -m "Update API URL"
git push
```

## ✅ Step 6: Deploy Frontend to Vercel (5 minutes)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Settings:
   - Root Directory: `frontend`
   - Framework: Vite
5. Deploy!

## ✅ Step 7: Connect Your Domain (10 minutes)
1. In Vercel → Settings → Domains
2. Add: `shayamodestwear.com`
3. Follow DNS instructions at your domain registrar

## 🎉 Done!
Your website is live at https://shayamodestwear.com

---

**Total Time: ~45 minutes**
**Total Cost: ₹0/month** (FREE!)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions and troubleshooting.

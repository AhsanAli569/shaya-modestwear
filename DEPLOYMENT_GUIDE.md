# 🚀 Free Deployment Guide for Shaya Modestwear

## Overview
This guide will help you deploy your MERN stack website completely FREE using:
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Free Tier)
- **Domain**: shayamodestwear.com (you already own)

---

## STEP 1: Setup MongoDB Atlas (Database) ☁️

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email (FREE)
3. Choose **FREE tier** (M0 Sandbox - 512MB storage)

### 1.2 Create Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE Shared Cluster**
3. Select cloud provider: **AWS**
4. Region: Choose closest to you (e.g., Mumbai for India)
5. Cluster Name: `shaya-modestwear` (or any name)
6. Click **"Create"**

### 1.3 Setup Database Access
1. **Create Database User:**
   - Click **"Database Access"** in left sidebar
   - Click **"Add New Database User"**
   - Authentication: **Password**
   - Username: `shaya-admin` (remember this)
   - Password: Click **"Autogenerate Secure Password"** (COPY IT!)
   - User Privileges: **"Read and write to any database"**
   - Click **"Add User"**

### 1.4 Setup Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://shaya-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT**: Replace `<password>` with your actual password
6. Add database name: Change to:
   ```
   mongodb+srv://shaya-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/shaya-modestwear?retryWrites=true&w=majority
   ```

---

## STEP 2: Prepare Your Code 📝

### 2.1 Create Backend .env File
Create `backend/.env` file with:
```env
MONGO_URL=mongodb+srv://shaya-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/shaya-modestwear?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
PORT=5000
NODE_ENV=production
```

### 2.2 Update Backend server.js
Add this at the top (after dotenv.config()):
```javascript
const PORT = process.env.PORT || 5000;

// CORS configuration for production
app.use(cors({
  origin: ['http://localhost:5173', 'https://shayamodestwear.com', 'https://www.shayamodestwear.com'],
  credentials: true
}));
```

And change the listen line:
```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2.3 Add Backend Scripts
Update `backend/package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

---

## STEP 3: Deploy Backend to Render 🔧

### 3.1 Create GitHub Repository
1. Go to https://github.com
2. Create new repository: `shaya-modestwear`
3. **Important**: Make it **Public** (required for Render free tier)
4. Don't initialize with README

### 3.2 Push Code to GitHub
Open terminal in your project folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shaya-modestwear.git
git push -u origin main
```

### 3.3 Deploy to Render
1. Go to https://render.com
2. Sign up with **GitHub** (FREE)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `shaya-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **FREE**

6. **Environment Variables** (Click "Add Environment Variable"):
   ```
   MONGO_URL = mongodb+srv://shaya-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/shaya-modestwear?retryWrites=true&w=majority
   JWT_SECRET = your-super-secret-jwt-key-change-this
   NODE_ENV = production
   ```

7. Click **"Create Web Service"**
8. Wait 5-10 minutes for deployment
9. **COPY YOUR BACKEND URL**: e.g., `https://shaya-backend.onrender.com`

### 3.4 Important Notes
- Render free tier sleeps after 15 min of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free (enough for one service running 24/7)

---

## STEP 4: Deploy Frontend to Vercel 🎨

### 4.1 Update Frontend API URL
Update `frontend/src/utils/axiosInstance.js`:
```javascript
const axiosInstance = axios.create({
  baseURL: "https://shaya-backend.onrender.com/api",  // Your Render URL
});
```

### 4.2 Create Vercel Config
Create `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 4.3 Build Test (Optional)
```bash
cd frontend
npm install
npm run build
```

### 4.4 Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with **GitHub** (FREE)
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. You'll get URL like: `https://shaya-modestwear.vercel.app`

---

## STEP 5: Connect Your Domain 🌐

### 5.1 Update Frontend Domain in Vercel
1. In Vercel project, go to **"Settings"** → **"Domains"**
2. Add domain: `shayamodestwear.com`
3. Add domain: `www.shayamodestwear.com`
4. Vercel will show DNS records you need to add

### 5.2 Update DNS Records
Go to your domain registrar (where you bought shayamodestwear.com):

**For Root Domain (shayamodestwear.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)

**For WWW subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### 5.3 Wait for DNS Propagation
- Can take 5 minutes to 48 hours
- Usually works in 30 minutes
- Check at: https://dnschecker.org

---

## STEP 6: Update Backend CORS 🔒

After domain is live, update `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://shayamodestwear.com',
    'https://www.shayamodestwear.com',
    'https://shaya-modestwear.vercel.app'
  ],
  credentials: true
}));
```

Commit and push to trigger redeploy:
```bash
git add .
git commit -m "Update CORS for production domain"
git push
```

---

## STEP 7: Testing 🧪

### 7.1 Test Backend
Visit: `https://shaya-backend.onrender.com/api/products`
- Should return products or empty array

### 7.2 Test Frontend
Visit: `https://shayamodestwear.com`
- Should load your website
- Try browsing products
- Try signup/login
- Try adding to cart

### 7.3 Common Issues

**Backend 502 Error:**
- Wait 60 seconds (Render is waking up from sleep)
- Refresh the page

**CORS Error:**
- Check backend CORS settings
- Make sure domain is added to allowed origins
- Redeploy backend

**Database Connection Error:**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check MONGO_URL in Render environment variables
- Check MongoDB user has correct password

---

## STEP 8: File Uploads Configuration 📁

### Important: Free Hosting Limitations
Render free tier has **ephemeral storage** - uploaded files are deleted when the server restarts.

### Solutions:

**Option A: Use Cloudinary (Recommended - FREE)**
1. Sign up at https://cloudinary.com (FREE tier)
2. Install: `npm install cloudinary multer-storage-cloudinary`
3. Update upload middleware to use Cloudinary

**Option B: Keep Local Storage**
- Works but files disappear on restart
- Good for testing
- Not recommended for production

---

## 📊 Free Tier Limits Summary

| Service | Free Tier Limits |
|---------|-----------------|
| **MongoDB Atlas** | 512MB storage, Shared cluster |
| **Render** | 750 hours/month, 512MB RAM, Sleeps after 15min |
| **Vercel** | 100GB bandwidth/month, Unlimited deployments |
| **Domain** | Already purchased ✅ |

---

## 🔄 Deployment Workflow

### When You Make Changes:

**Frontend Changes:**
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push
```
Vercel auto-deploys in 2-3 minutes

**Backend Changes:**
```bash
cd backend
git add .
git commit -m "Update backend"
git push
```
Render auto-deploys in 5-10 minutes

---

## 🎉 You're Live!

Your website will be accessible at:
- ✅ https://shayamodestwear.com
- ✅ https://www.shayamodestwear.com

**Total Cost: ₹0/month** (except domain renewal)

---

## 🆘 Need Help?

**MongoDB Issues:**
- Check connection string
- Verify IP whitelist
- Test connection: https://www.mongodb.com/docs/atlas/troubleshoot-connection/

**Render Issues:**
- Check logs: Render Dashboard → Your Service → Logs
- First load is slow (waking up)

**Vercel Issues:**
- Check build logs
- Verify environment variables
- Check routing rules

**Domain Issues:**
- DNS propagation takes time
- Use https://dnschecker.org to check
- Clear browser cache

---

## 📝 Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string copied and password updated
- [ ] Backend .env file created with MONGO_URL
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Backend environment variables set in Render
- [ ] Backend URL copied
- [ ] Frontend axiosInstance.js updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Custom domain added in Vercel
- [ ] DNS records updated at domain registrar
- [ ] CORS updated in backend with custom domain
- [ ] Website tested and working

---

Good luck with your deployment! 🚀

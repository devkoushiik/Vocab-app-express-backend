# Vercel Deployment Guide

## ✅ Setup Complete

Your backend is now configured and ready for Vercel deployment!

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Before deploying, make sure to set these environment variables in Vercel:
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` (optional) - Not needed for Vercel, but won't hurt if set

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from the backend directory
cd backend
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Choose your account)
# - Link to existing project? No (or Yes if you have one)
# - Project name? vocab-backend (or your preferred name)
# - Directory? ./
# - Override settings? No
```

#### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Set root directory to `backend`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
7. Click "Deploy"

### 3. Environment Variables Setup in Vercel Dashboard

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://koushikxahmed:1234@cluster0.yonmmq7.mongodb.net/?appName=Cluster0`
   - **Environment:** Production, Preview, Development (select all)
4. Save and redeploy

## 🔍 Testing After Deployment

Once deployed, test your API endpoints:

1. **Health Check:**
   ```
   GET https://your-app.vercel.app/api/health
   ```

2. **Get Vocabulary:**
   ```
   GET https://your-app.vercel.app/api/v1/vocabulary
   ```

3. **Create Vocabulary:**
   ```
   POST https://your-app.vercel.app/api/v1/vocabulary
   Content-Type: application/json
   
   {
     "name": "Test",
     "meaning": "পরীক্ষা",
     "sortType": "T",
     "month": 11,
     "year": 2025
   }
   ```

## 📁 Project Structure

```
backend/
├── api/
│   └── index.js          # Vercel serverless function handler
├── src/
│   ├── app.js            # Express app setup
│   ├── server.js         # Local server (not used in Vercel)
│   ├── config/
│   │   └── db.js         # MongoDB connection (optimized for serverless)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── validators/
├── vercel.json           # Vercel configuration
└── package.json
```

## 🔧 Key Features for Serverless

1. **Connection Caching:** MongoDB connection is cached and reused across invocations
2. **No Buffering:** Mongoose buffering is disabled for serverless compatibility
3. **Connection Middleware:** Ensures DB connection before each request
4. **Error Handling:** Proper error responses for connection failures

## 🐛 Troubleshooting

### Connection Timeout Errors
- Verify `MONGODB_URI` is correctly set in Vercel environment variables
- Check MongoDB Atlas IP whitelist (should allow all IPs or Vercel IPs)
- Ensure MongoDB cluster is running

### Build Errors
- Make sure `node_modules` is in `.gitignore`
- Verify all dependencies are listed in `package.json`
- Check Vercel build logs for specific errors

### Runtime Errors
- Check Vercel function logs for detailed error messages
- Verify all environment variables are set correctly
- Test the `/api/health` endpoint first

## 📝 Notes

- Local development: Use `npm run dev` (starts on port 4000)
- Vercel deployment: Uses `api/index.js` as the entry point
- Database connection is lazy-loaded (only connects when needed)
- Connection is reused across function invocations (optimized for serverless)


# 🚨 START YOUR SERVER NOW!

## The Problem
Your frontend is trying to connect to `http://localhost:5000` but **the server is not running**.

## ✅ Solution: Start the Server

### Method 1: Double-Click (Easiest) ⭐

1. **Go to:** `Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend`
2. **Double-click:** `start-backend.bat`
3. **Wait for:** `🚀 Server running on port 5000`
4. **Keep the window open!**

### Method 2: Terminal

1. **Open PowerShell or CMD**
2. **Type:**
   ```bash
   cd Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend
   npm run dev
   ```
3. **Wait for:** `🚀 Server running on port 5000`
4. **Keep the window open!**

## ✅ Verify It's Working

1. **Open browser**
2. **Go to:** `http://localhost:5000/api/health`
3. **Should see:**
   ```json
   {
     "success": true,
     "message": "API is healthy"
   }
   ```

## 🎯 After Server Starts

1. ✅ **DO NOT CLOSE the terminal window**
2. ✅ **Go back to your frontend**
3. ✅ **Refresh the page**
4. ✅ **Try registering** - It will work!

## 📋 Your .env File is Ready ✅

Your `.env` file already has:
- ✅ `MONGO_URI` - MongoDB Atlas connection
- ✅ `JWT_SECRET` - Secret key
- ✅ `PORT` - Set to 5000

**Everything is configured correctly!** You just need to **start the server**.

---

## ⚡ Quick Command

Just run this in your backend folder:
```bash
npm run dev
```

**That's it!** 🚀



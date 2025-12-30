# ⚠️ READ THIS FIRST: Start Your Backend Server

## 🚨 The Error You're Seeing

```
ERR_CONNECTION_REFUSED
POST http://localhost:5000/api/auth/register
```

**This means:** Your backend server is **NOT running**.

## ✅ SOLUTION: Start the Server (30 seconds)

### Option 1: Double-Click (EASIEST) ⭐

1. **Navigate to:** `Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend`
2. **Double-click:** `start-backend.bat`
3. **Wait for this message:**
   ```
   🚀 Server running on port 5000
   ✅ Backend is ready for frontend integration!
   ```
4. **Keep that window open!**

### Option 2: Terminal Command

1. **Open PowerShell** (Win + X, then press I)
2. **Type these commands:**
   ```bash
   cd Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend
   npm run dev
   ```
3. **Wait for:** `🚀 Server running on port 5000`
4. **Keep that window open!**

## ✅ Test It's Working

1. **Open browser**
2. **Go to:** `http://localhost:5000/api/health`
3. **You should see:**
   ```json
   {
     "success": true,
     "message": "API is healthy"
   }
   ```

## 🎯 Then Go Back to Frontend

1. ✅ **Keep the terminal window OPEN** (server must keep running)
2. ✅ **Refresh your frontend page**
3. ✅ **Try registering** - It will work now!

## 📋 What You Should See in Terminal

When server starts successfully:
```
✅ MongoDB connected
✅ Database indexes synced
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🔐 Auth endpoints: http://localhost:5000/api/auth
📰 Feed endpoints: http://localhost:5000/api/feed

✅ Backend is ready for frontend integration!
```

## ✅ Your Configuration is Already Correct!

Your `.env` file is already set up with:
- ✅ MongoDB Atlas connection string
- ✅ JWT secret key
- ✅ Port 5000

**You just need to START the server!**

---

## 🚀 Quick Start Command

**Just run this ONE command in your backend folder:**

```bash
npm run dev
```

**That's it!** The server will start and your frontend will work! 🎉

---

## ❓ Still Not Working?

1. **Check terminal for errors** - Look for red error messages
2. **Make sure MongoDB Atlas is accessible** - Check your internet connection
3. **Try:** `npm install` (if modules are missing)
4. **Check port 5000 is free:** `netstat -ano | findstr :5000`

---

**The server MUST be running for the frontend to work!** 🚀



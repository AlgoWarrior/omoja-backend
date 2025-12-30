# 🚨 URGENT: Start Your Backend Server

## The Error You're Seeing

```
POST http://localhost:5000/api/auth/register net::ERR_CONNECTION_REFUSED
```

**This means your backend server is NOT running!**

## ⚡ Quick Fix (3 Steps)

### Step 1: Open Terminal in Backend Folder
Navigate to: `Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend`

### Step 2: Create `.env` File (if not exists)

Create a file named `.env` in the backend root with:

```env
MONGO_URI=mongodb://localhost:27017/omoja
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**OR if using MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/omoja?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start the Server

```bash
npm run dev
```

## ✅ What You Should See

When server starts successfully, you'll see:

```
✅ MongoDB connected
✅ Database indexes synced
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🔐 Auth endpoints: http://localhost:5000/api/auth
📰 Feed endpoints: http://localhost:5000/api/feed

✅ Backend is ready for frontend integration!
```

## 🧪 Test It Works

After starting, open browser:
- `http://localhost:5000/api/health`

Should return:
```json
{
  "success": true,
  "message": "API is healthy"
}
```

## 🐛 Common Issues

### Issue: "MONGO_URI is not defined"
**Fix:** Create `.env` file (see Step 2 above)

### Issue: "Port 5000 already in use"
**Fix:** 
```bash
# Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Issue: "MongoDB connection failed"
**Fix:** 
- Check `MONGO_URI` in `.env` is correct
- Make sure MongoDB is running (if local)
- Check MongoDB Atlas credentials (if cloud)

### Issue: "Module not found"
**Fix:**
```bash
npm install
```

## 📋 Checklist

Before testing frontend:

- [ ] `.env` file exists in backend root
- [ ] `MONGO_URI` is set in `.env`
- [ ] `JWT_SECRET` is set in `.env`
- [ ] Server is running (`npm run dev`)
- [ ] Console shows "🚀 Server running on port 5000"
- [ ] Health check works: `http://localhost:5000/api/health`

## 🎯 Once Server is Running

1. **Keep the terminal open** - Don't close it!
2. **Refresh your frontend** - The error should disappear
3. **Try registering** - Should work now!

---

**The frontend is ready - you just need to start the backend server!** 🚀



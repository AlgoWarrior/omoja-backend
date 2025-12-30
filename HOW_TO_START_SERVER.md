# 🚀 HOW TO START YOUR BACKEND SERVER

## ⚠️ IMPORTANT: The server MUST be running for frontend to work!

The error `ERR_CONNECTION_REFUSED` means the backend server is **NOT running**.

## 🎯 EASIEST WAY: Double-Click the Script

### Option 1: Windows Batch File (Easiest)
1. **Double-click** `start-backend.bat` in the backend folder
2. A terminal window will open
3. Wait for: `🚀 Server running on port 5000`
4. **Keep this window open!**

### Option 2: PowerShell Script
1. **Right-click** `start-backend.ps1`
2. Select **"Run with PowerShell"**
3. Wait for: `🚀 Server running on port 5000`
4. **Keep this window open!**

## 📝 Manual Method: Using Terminal

### Step 1: Open Terminal
- Press `Win + R`
- Type: `powershell` or `cmd`
- Press Enter

### Step 2: Navigate to Backend Folder
```bash
cd Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend
```

### Step 3: Start Server
```bash
npm run dev
```

### Step 4: Wait for Success Message
You should see:
```
✅ MongoDB connected
✅ Database indexes synced
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🔐 Auth endpoints: http://localhost:5000/api/auth
📰 Feed endpoints: http://localhost:5000/api/feed

✅ Backend is ready for frontend integration!
```

## ✅ Verify Server is Running

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

1. ✅ **Keep the terminal window OPEN** - Don't close it!
2. ✅ **Go back to your frontend**
3. ✅ **Refresh the page**
4. ✅ **Try registering again** - Should work now!

## 🐛 Common Issues

### Issue: "MONGO_URI is not defined"
**Solution:**
1. Create `.env` file in backend folder
2. Add this content:
   ```env
   MONGO_URI=mongodb://localhost:27017/omoja
   JWT_SECRET=your_secret_key_12345
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill it (replace <PID> with the number from above)
taskkill /PID <PID> /F
```

### Issue: "MongoDB connection failed"
**Solution:**
- Check `MONGO_URI` in `.env` is correct
- Make sure MongoDB is running (if local)
- Check MongoDB Atlas credentials (if cloud)

### Issue: "Module not found"
**Solution:**
```bash
npm install
```

## 📋 Quick Checklist

Before testing frontend:

- [ ] `.env` file exists in `Q:\CONFIDATIAL_PROJECTS\Omoja\omoja-backend`
- [ ] `MONGO_URI` is set in `.env`
- [ ] `JWT_SECRET` is set in `.env`
- [ ] Server is running (`npm run dev` or double-click `start-backend.bat`)
- [ ] Console shows "🚀 Server running on port 5000"
- [ ] Health check works: `http://localhost:5000/api/health`
- [ ] **Terminal window is still open** (server is running)

## 🎉 Success!

Once you see `🚀 Server running on port 5000` in the terminal:
- ✅ Backend is ready
- ✅ Frontend can connect
- ✅ Registration/Login will work

**Just keep that terminal window open while using the frontend!**

---

**Need help?** Check the console output for error messages!



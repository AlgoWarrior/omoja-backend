# 🔧 Fix MongoDB Atlas Connection Error

## ❌ The Error

```
❌ MongoDB connection failed: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## ✅ Solution: Whitelist Your IP in MongoDB Atlas

### Step 1: Go to MongoDB Atlas

1. **Login** to: https://cloud.mongodb.com
2. **Select** your cluster
3. **Click** "Network Access" (left sidebar)

### Step 2: Add Your IP Address

**Option A: Add Current IP (Recommended for Security)**
1. Click **"Add IP Address"**
2. Click **"Add Current IP Address"**
3. Click **"Confirm"**

**Option B: Allow All IPs (For Development Only)**
1. Click **"Add IP Address"**
2. Enter: `0.0.0.0/0`
3. Click **"Confirm"**
4. ⚠️ **Warning:** This allows access from anywhere (only for development!)

### Step 3: Wait 1-2 Minutes

MongoDB Atlas takes 1-2 minutes to update the whitelist.

### Step 4: Start Your Server Again

```bash
npm run dev
```

## ✅ Verify Connection

After whitelisting, you should see:
```
✅ MongoDB connected
✅ Database indexes synced
🚀 Server running on port 5000
```

## 🐛 Still Not Working?

### Check 1: Verify MONGO_URI
Make sure your `.env` file has:
```env
MONGO_URI=mongodb+srv://omoja123_db_user:RbAVM6IKIL4Hpbjx@omoja.onrvqyp.mongodb.net/omoja_database?retryWrites=true&w=majority
```

### Check 2: Verify Database User
1. Go to MongoDB Atlas → Database Access
2. Make sure user `omoja123_db_user` exists
3. Make sure password is correct

### Check 3: Check Network Access
1. Go to MongoDB Atlas → Network Access
2. Make sure your IP is listed
3. Status should be "Active"

## 📋 Quick Checklist

- [ ] Logged into MongoDB Atlas
- [ ] Went to Network Access
- [ ] Added current IP address (or 0.0.0.0/0 for dev)
- [ ] Waited 1-2 minutes
- [ ] Started server: `npm run dev`
- [ ] See "✅ MongoDB connected"

## 🎯 After Fixing

Once MongoDB connects:
1. ✅ Server will start successfully
2. ✅ Frontend can connect
3. ✅ Registration/Login will work

---

**Need help?** Check MongoDB Atlas dashboard for connection details!



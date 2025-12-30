# ⚡ Quick Start - Omoja Backend

## 🚀 Start Backend in 3 Steps

### 1. Create `.env` file
```bash
# Copy this into .env file
MONGO_URI=mongodb://localhost:27017/omoja
JWT_SECRET=your_secret_key_here_change_this
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 2. Install & Start
```bash
npm install
npm run dev
```

### 3. Verify It's Working
Open browser: `http://localhost:5000/api/health`

Should see:
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "..."
}
```

## ✅ What You Should See in Console

```
✅ MongoDB connected
✅ Database indexes synced
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🔐 Auth endpoints: http://localhost:5000/api/auth
📰 Feed endpoints: http://localhost:5000/api/feed

✅ Backend is ready for frontend integration!
```

## 🧪 Test Authentication

### Register a User:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 🐛 If You See Errors

**"MONGO_URI is not defined"**
→ Create `.env` file with `MONGO_URI=...`

**"Port 5000 already in use"**
→ Kill the process using port 5000 or change PORT in `.env`

**"MongoDB connection failed"**
→ Check your `MONGO_URI` is correct

## 📚 Full Documentation

- `SETUP_GUIDE.md` - Complete setup guide
- `FRONTEND_INTEGRATION.md` - Frontend integration details
- `README.md` - Full API documentation

---

**That's it! Your backend is ready! 🎉**



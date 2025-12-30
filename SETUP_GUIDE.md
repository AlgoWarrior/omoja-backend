# 🚀 Omoja Backend Setup Guide

## Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create `.env` File
Create a `.env` file in the root directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/omoja
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/omoja?retryWrites=true&w=majority

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

### Step 4: Verify Server is Running
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

### Step 5: Test Backend
Open browser: `http://localhost:5000/api/health`

Should return:
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## ✅ Pre-Flight Checklist

Before connecting frontend, verify:

- [ ] ✅ Server is running (`npm run dev`)
- [ ] ✅ MongoDB is connected (see "✅ MongoDB connected" in console)
- [ ] ✅ Port 5000 is accessible
- [ ] ✅ Health check returns success: `http://localhost:5000/api/health`
- [ ] ✅ `.env` file exists with `MONGO_URI` and `JWT_SECRET`

## 🧪 Test Authentication Endpoints

### Test Registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "788123456",
    "countryCode": "+250"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "Test User",
      "email": "test@example.com"
    }
  }
}
```

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

## 🐛 Troubleshooting

### Error: `MONGO_URI is not defined`
**Solution:** Create `.env` file with `MONGO_URI=your_connection_string`

### Error: `EADDRINUSE: address already in use :::5000`
**Solution:** Port 5000 is already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Error: `MongoDB connection failed`
**Solutions:**
1. Check `MONGO_URI` in `.env` is correct
2. Make sure MongoDB is running (if local)
3. Check MongoDB Atlas credentials (if cloud)
4. Verify network/firewall allows connection

### Error: `Module not found`
**Solution:** Install dependencies
```bash
npm install
```

### Frontend gets `ERR_CONNECTION_REFUSED`
**Solutions:**
1. ✅ Make sure backend is running (`npm run dev`)
2. ✅ Check backend console for errors
3. ✅ Verify port is 5000 (check console output)
4. ✅ Test `http://localhost:5000/api/health` in browser

## 📋 All Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Feed
- `GET /api/feed` - Home feed (protected)
- `GET /api/feed/trending` - Trending feed (protected)
- `GET /api/feed/nearby` - Nearby feed (protected)
- `GET /api/feed/search` - Search feed (protected)
- `GET /api/feed/category/:slug` - Category feed (protected)

### Posts
- `POST /api/posts/:id/like` - Like/unlike (protected)
- `GET /api/posts/:id/comments` - Get comments
- `POST /api/posts/:id/comments` - Add comment (protected)
- `POST /api/posts/:id/bookmark` - Bookmark (protected)
- `POST /api/posts/:id/share` - Share post

### Categories
- `GET /api/categories` - Get all categories

## 🔧 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | ✅ Yes | - | MongoDB connection string |
| `JWT_SECRET` | ✅ Yes | - | Secret key for JWT tokens |
| `PORT` | ❌ No | `5000` | Server port |
| `FRONTEND_URL` | ❌ No | `http://localhost:5173` | Frontend URL for CORS |

## 🎯 Frontend Integration

Once backend is running:

1. **Frontend should use:** `http://localhost:5000` as API base URL
2. **CORS is configured** for `http://localhost:5173` (Vite default)
3. **All endpoints return** consistent format:
   ```json
   {
     "success": true,
     "data": { ... }
   }
   ```

## 📞 Need Help?

1. Check backend console for error messages
2. Verify `.env` file exists and has correct values
3. Test health endpoint: `http://localhost:5000/api/health`
4. Check MongoDB connection is working
5. Ensure all dependencies are installed: `npm install`

## ✅ Success Indicators

You'll know everything is working when:

- ✅ Server console shows: "🚀 Server running on port 5000"
- ✅ MongoDB console shows: "✅ MongoDB connected"
- ✅ Health check returns: `{"success": true, "message": "API is healthy"}`
- ✅ Frontend can make API calls without `ERR_CONNECTION_REFUSED`
- ✅ Registration/Login endpoints return tokens

---

**Ready to connect frontend!** 🎉



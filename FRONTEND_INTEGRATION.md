# Frontend Integration Guide - Omoja Backend

## ✅ Authentication Endpoints (READY)

### POST `/api/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "788123456",  // optional
  "countryCode": "+250"   // optional, defaults to "+250"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "788123456",
      "display_name": "John Doe",
      "avatar_url": null,
      "is_verified": false
    }
  }
}
```

**Error Responses:**
- `400` - Validation error or user exists
- `500` - Server error

### POST `/api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "788123456",
      "display_name": "John Doe",
      "avatar_url": null,
      "is_verified": false
    }
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

### GET `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "788123456",
    "display_name": "John Doe",
    "avatar_url": null,
    "is_verified": false,
    "district": null
  }
}
```

## 🔐 Authentication Flow

1. **Register/Login** → Get `token` from response
2. **Store token** in localStorage: `localStorage.setItem('authToken', token)`
3. **Send token** in headers for protected routes:
   ```
   Authorization: Bearer <token>
   ```
4. **On 401/403** → Clear token and redirect to login

## 📡 All Endpoints Summary

### Authentication
- ✅ `POST /api/auth/register` - Register user
- ✅ `POST /api/auth/login` - Login user
- ✅ `GET /api/auth/me` - Get current user (protected)

### Feed
- ✅ `GET /api/feed` - Home feed (protected)
- ✅ `GET /api/feed/trending` - Trending feed (protected)
- ✅ `GET /api/feed/nearby` - Nearby feed (protected)
- ✅ `GET /api/feed/search` - Search feed (protected)
- ✅ `GET /api/feed/category/:slug` - Category feed (protected)

### Posts
- ✅ `POST /api/posts/:id/like` - Like/unlike (protected)
- ✅ `GET /api/posts/:id/comments` - Get comments (public)
- ✅ `POST /api/posts/:id/comments` - Add comment (protected)
- ✅ `POST /api/posts/:id/bookmark` - Bookmark/unbookmark (protected)
- ✅ `POST /api/posts/:id/share` - Share post (public)

### Categories
- ✅ `GET /api/categories` - Get all categories (public)

## 🌐 CORS Configuration

Backend is configured to accept requests from:
- `http://localhost:5173` (Vite default)
- Or set `FRONTEND_URL` in backend `.env` for custom frontend URL

## 📝 Error Response Format

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` - Invalid input data
- `USER_EXISTS` - User already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `AUTH_ERROR` - Authentication required or invalid token
- `SERVER_ERROR` - Internal server error

## 🚀 Quick Integration Example

```javascript
// API Client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('authToken');
      // Redirect to login
    }
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// Register
const register = async (userData) => {
  return apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Login
const login = async (email, password) => {
  const response = await apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.success && response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response;
};

// Get Feed
const getFeed = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/api/feed?${query}`);
};
```

## ✅ Testing Checklist

- [ ] Register new user → Returns token and user data
- [ ] Register with duplicate email → Returns error
- [ ] Login with correct credentials → Returns token
- [ ] Login with wrong password → Returns error
- [ ] Get feed with valid token → Returns posts
- [ ] Get feed without token → Returns 401
- [ ] Like post → Toggles like status
- [ ] Add comment → Adds comment and updates count

## 🐛 Troubleshooting

**Issue: CORS error**
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default is `http://localhost:5173` for Vite

**Issue: 401 Unauthorized**
- Check token is being sent: `Authorization: Bearer <token>`
- Check token is valid (not expired)
- Check `JWT_SECRET` is set in backend `.env`

**Issue: 500 Server Error**
- Check MongoDB connection (`MONGO_URI` in backend `.env`)
- Check backend logs for detailed error


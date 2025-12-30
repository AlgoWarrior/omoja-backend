# Omoja Backend API - Home Feed

RESTful API backend for the HOME FEED feature of Omoja social marketplace app.

## Tech Stack

- Node.js (v18+)
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Express-validator for validation
- CORS enabled

## Features

### Authentication Endpoints

1. **Register User** - `POST /api/auth/register`
   - Register a new user account
   - Body: `{ "name", "email", "password", "phone" (optional), "countryCode" (optional) }`
   - Returns: `{ "success": true, "data": { "token", "user" } }`
   - Public endpoint

2. **Login User** - `POST /api/auth/login`
   - Login with email and password
   - Body: `{ "email", "password" }`
   - Returns: `{ "success": true, "data": { "token", "user" } }`
   - Public endpoint

3. **Get Current User** - `GET /api/auth/me`
   - Get authenticated user profile
   - Returns: `{ "success": true, "data": { "user" } }`
   - Requires authentication

### Feed Endpoints

1. **Get Home Feed** - `GET /api/feed`
   - Personalized feed: Posts from followed users + trending posts
   - Query params: `page`, `limit`, `category`, `sort` (newest, popular)
   - Requires authentication

2. **Get Trending Feed** - `GET /api/feed/trending`
   - Most liked/commented posts in last 7 days
   - Query params: `page`, `limit`
   - Requires authentication

3. **Get Nearby Feed** - `GET /api/feed/nearby`
   - Posts within radius (default 5km)
   - Query params: `lat`, `lng`, `radius` (in meters), `page`, `limit`
   - Requires authentication

4. **Search Feed** - `GET /api/feed/search`
   - Search in title, description, hashtags
   - Query params: `q` (search query), `page`, `limit`
   - Requires authentication

5. **Get Feed by Category** - `GET /api/feed/category/:slug`
   - Get posts by category
   - Query params: `page`, `limit`
   - Requires authentication

### Post Interaction Endpoints

1. **Like/Unlike Post** - `POST /api/posts/:id/like`
   - Toggle like status
   - Requires authentication

2. **Get Post Comments** - `GET /api/posts/:id/comments`
   - Get comments for a post
   - Query params: `page`, `limit`
   - Public endpoint

3. **Add Comment** - `POST /api/posts/:id/comments`
   - Add a comment to a post
   - Body: `{ "content": "comment text" }`
   - Requires authentication

4. **Bookmark/Unbookmark Post** - `POST /api/posts/:id/bookmark`
   - Toggle bookmark status
   - Requires authentication

5. **Share Post** - `POST /api/posts/:id/share`
   - Increment share count
   - Public endpoint

### Category Endpoints

1. **Get All Categories** - `GET /api/categories`
   - Get all categories for filtering
   - Public endpoint

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Initialize Database (Optional but Recommended)

This will create all indexes and verify the connection:

```bash
node scripts/initDatabase.js
```

### 4. Seed Default Categories

```bash
node scripts/seedCategories.js
```

### 5. Start Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "hasMore": true
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Post Object Structure

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "price": 10000,
  "currency": "RWF",
  "condition": "new",
  "location": {
    "lat": -1.9441,
    "lng": 30.0619
  },
  "district": "Kigali",
  "sector": "Gasabo",
  "category": {
    "id": "uuid",
    "name": "Electronics",
    "slug": "electronics"
  },
  "user": {
    "id": "uuid",
    "display_name": "John Doe",
    "avatar_url": "url",
    "is_verified": true
  },
  "images": ["url1", "url2"],
  "hashtags": ["tag1", "tag2"],
  "like_count": 42,
  "comment_count": 9,
  "share_count": 5,
  "view_count": 120,
  "is_liked": false,
  "is_bookmarked": false,
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Authentication

All feed endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The JWT payload should contain a user `id` field:
```json
{
  "id": "user_id_here"
}
```

## Database Models

The following MongoDB collections are used:

- `users` - User information
- `posts` - Post content
- `categories` - Post categories
- `postmedia` - Post images/media
- `hashtags` - Hashtag definitions
- `posthashtags` - Post-hashtag relationships
- `likes` - Post likes
- `comments` - Post comments
- `bookmarks` - User bookmarks
- `follows` - User follow relationships

### Collection Creation

**Collections are created automatically** when you first insert data. You don't need to manually create them. However, running `node scripts/initDatabase.js` will:
- Verify your MongoDB connection
- Create all indexes defined in the models
- Show you which collections exist

Indexes are also created automatically when models are first used, but running the init script ensures everything is set up correctly.

## Project Structure

```
src/
  models/          # MongoDB models
  routes/          # Express routes
  controllers/     # Route controllers
  services/        # Business logic
  middleware/      # Auth and validation
  utils/           # Helper functions
  scripts/         # Utility scripts
  config/          # Database configuration
```

## Notes

- Pagination: Maximum 50 items per page
- Location queries use MongoDB geospatial indexes
- Text search uses MongoDB text indexes
- Like/comment counts are updated automatically
- All timestamps are in ISO 8601 format


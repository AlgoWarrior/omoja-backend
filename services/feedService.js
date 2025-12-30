const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");
const PostMedia = require("../models/PostMedia");
const PostHashtag = require("../models/PostHashtag");
const Hashtag = require("../models/Hashtag");
const Like = require("../models/Like");
const Bookmark = require("../models/Bookmark");
const Follow = require("../models/Follow");
const { getNearbyQuery, calculateDistance } = require("../utils/location");

/**
 * Convert string ID to ObjectId
 */
const toObjectId = (id) => {
  if (!id) return null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    return typeof id === "string" ? new mongoose.Types.ObjectId(id) : id;
  }
  return null;
};

/**
 * Format post data for API response
 */
const formatPost = async (post, userId = null) => {
  // Get user info
  const user = await User.findById(post.user_id).select(
    "display_name avatar_url is_verified"
  );

  // Get category info
  const category = post.category_id
    ? await Category.findById(post.category_id).select("name slug")
    : null;

  // Get images
  const media = await PostMedia.find({ post_id: post._id })
    .sort({ sort_order: 1 })
    .select("media_url");
  const images = media.map((m) => m.media_url);

  // Get hashtags
  const postHashtags = await PostHashtag.find({ post_id: post._id }).populate(
    "hashtag_id",
    "name"
  );
  const hashtags = postHashtags.map((ph) => ph.hashtag_id.name);

  // Check user interactions
  let is_liked = false;
  let is_bookmarked = false;
  if (userId) {
    const userIdObj = toObjectId(userId);
    if (userIdObj) {
      is_liked = !!(await Like.findOne({
        user_id: userIdObj,
        post_id: post._id,
      }));
      is_bookmarked = !!(await Bookmark.findOne({
        user_id: userIdObj,
        post_id: post._id,
      }));
    }
  }

  return {
    id: post._id,
    title: post.title,
    description: post.description,
    price: post.price,
    currency: post.currency,
    condition: post.condition,
    location: post.location?.coordinates
      ? {
          lat: post.location.coordinates[1],
          lng: post.location.coordinates[0],
        }
      : null,
    district: post.district,
    sector: post.sector,
    category: category
      ? {
          id: category._id,
          name: category.name,
          slug: category.slug,
        }
      : null,
    user: user
      ? {
          id: user._id,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
          is_verified: user.is_verified || false,
        }
      : null,
    images,
    hashtags,
    like_count: post.like_count || 0,
    comment_count: post.comment_count || 0,
    share_count: post.share_count || 0,
    view_count: post.view_count || 0,
    is_liked,
    is_bookmarked,
    created_at: post.createdAt,
  };
};

/**
 * Get personalized home feed
 */
const getHomeFeed = async (userId, options = {}) => {
  const { page = 1, limit = 20, category, sort = "newest" } = options;
  const skip = (page - 1) * limit;

  // Build query
  const query = {
    is_deleted: false,
    is_available: true,
  };

  if (category) {
    const categoryDoc = await Category.findOne({ slug: category });
    if (categoryDoc) {
      query.category_id = categoryDoc._id;
    }
  }

  // Get followed users
  const userIdObj = toObjectId(userId);
  const follows = userIdObj
    ? await Follow.find({ follower_id: userIdObj }).select("following_id")
    : [];
  const followingIds = follows.map((f) => f.following_id);

  // Build feed query: posts from followed users OR trending posts
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Trending posts condition
  const trendingCondition = {
    createdAt: { $gte: sevenDaysAgo },
    $expr: {
      $gt: [
        { $add: ["$like_count", "$comment_count"] },
        0,
      ],
    },
  };

  // Build final query
  let feedQuery;
  if (followingIds.length > 0) {
    // Include posts from followed users OR trending posts
    feedQuery = {
      ...query,
      $or: [
        { user_id: { $in: followingIds } },
        trendingCondition,
      ],
    };
  } else {
    // No follows, just show trending posts
    feedQuery = {
      ...query,
      ...trendingCondition,
    };
  }

  let posts;
  if (sort === "popular") {
    // Sort by popularity (like_count + comment_count)
    posts = await Post.find(feedQuery)
      .sort({ like_count: -1, comment_count: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);
  } else {
    // Sort by newest (default)
    posts = await Post.find(feedQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  const total = await Post.countDocuments(feedQuery);

  // Format posts
  const formattedPosts = await Promise.all(
    posts.map((post) => formatPost(post, userId))
  );

  return {
    posts: formattedPosts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + limit < total,
    },
  };
};

/**
 * Get trending feed
 */
const getTrendingFeed = async (userId, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const query = {
    is_deleted: false,
    is_available: true,
    createdAt: { $gte: sevenDaysAgo },
  };

  const posts = await Post.find(query)
    .sort({ like_count: -1, comment_count: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);

  const formattedPosts = await Promise.all(
    posts.map((post) => formatPost(post, userId))
  );

  return {
    posts: formattedPosts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + limit < total,
    },
  };
};

/**
 * Get nearby feed
 */
const getNearbyFeed = async (userId, options = {}) => {
  const { lat, lng, radius = 5000, page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  if (!lat || !lng) {
    throw new Error("Latitude and longitude are required");
  }

  const query = {
    is_deleted: false,
    is_available: true,
    location: { $exists: true, $ne: null },
    ...getNearbyQuery(lat, lng, radius),
  };

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);

  // Format posts and add distance
  const formattedPosts = await Promise.all(
    posts.map(async (post) => {
      const postData = await formatPost(post, userId);
      if (post.location?.coordinates) {
        postData.distance_km = calculateDistance(
          lat,
          lng,
          post.location.coordinates[1],
          post.location.coordinates[0]
        );
      }
      return postData;
    })
  );

  // Sort by distance
  formattedPosts.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));

  return {
    posts: formattedPosts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + limit < total,
    },
  };
};

/**
 * Search feed
 */
const searchFeed = async (userId, options = {}) => {
  const { q, page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  if (!q || q.trim().length === 0) {
    throw new Error("Search query is required");
  }

  const query = {
    is_deleted: false,
    is_available: true,
    $or: [
      { $text: { $search: q } },
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  };

  // Also search in hashtags
  const hashtags = await Hashtag.find({
    name: { $regex: q, $options: "i" },
  }).select("_id");
  const hashtagIds = hashtags.map((h) => h._id);

  if (hashtagIds.length > 0) {
    const postHashtags = await PostHashtag.find({
      hashtag_id: { $in: hashtagIds },
    }).select("post_id");
    const postIds = postHashtags.map((ph) => ph.post_id);

    if (postIds.length > 0) {
      query.$or.push({ _id: { $in: postIds } });
    }
  }

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);

  const formattedPosts = await Promise.all(
    posts.map((post) => formatPost(post, userId))
  );

  return {
    posts: formattedPosts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + limit < total,
    },
  };
};

/**
 * Get feed by category
 */
const getFeedByCategory = async (userId, categorySlug, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const category = await Category.findOne({ slug: categorySlug });
  if (!category) {
    throw new Error("Category not found");
  }

  const query = {
    is_deleted: false,
    is_available: true,
    category_id: category._id,
  };

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);

  const formattedPosts = await Promise.all(
    posts.map((post) => formatPost(post, userId))
  );

  return {
    posts: formattedPosts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + limit < total,
    },
  };
};

module.exports = {
  getHomeFeed,
  getTrendingFeed,
  getNearbyFeed,
  searchFeed,
  getFeedByCategory,
};


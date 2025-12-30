const mongoose = require("mongoose");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Bookmark = require("../models/Bookmark");
const User = require("../models/User");

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
 * Like or unlike a post
 */
const toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post || post.is_deleted) {
    throw new Error("Post not found");
  }

  const userIdObj = toObjectId(userId);
  if (!userIdObj) {
    throw new Error("Invalid user ID");
  }

  const existingLike = await Like.findOne({
    post_id: postId,
    user_id: userIdObj,
  });

  if (existingLike) {
    // Unlike
    await Like.deleteOne({ _id: existingLike._id });
    await Post.updateOne(
      { _id: postId },
      { $inc: { like_count: -1 } }
    );
    return { liked: false };
  } else {
    // Like
    await Like.create({
      post_id: postId,
      user_id: userIdObj,
    });
    await Post.updateOne(
      { _id: postId },
      { $inc: { like_count: 1 } }
    );
    return { liked: true };
  }
};

/**
 * Get post comments
 */
const getComments = async (postId, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const post = await Post.findById(postId);
  if (!post || post.is_deleted) {
    throw new Error("Post not found");
  }

  const comments = await Comment.find({
    post_id: postId,
    is_deleted: false,
  })
    .populate("user_id", "display_name avatar_url is_verified")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Comment.countDocuments({
    post_id: postId,
    is_deleted: false,
  });

  const formattedComments = comments.map((comment) => ({
    id: comment._id,
    content: comment.content,
    user: {
      id: comment.user_id._id,
      display_name: comment.user_id.display_name,
      avatar_url: comment.user_id.avatar_url,
      is_verified: comment.user_id.is_verified || false,
    },
    created_at: comment.createdAt,
  }));

  return {
    comments: formattedComments,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + limit < total,
    },
  };
};

/**
 * Add a comment to a post
 */
const addComment = async (postId, userId, content) => {
  const post = await Post.findById(postId);
  if (!post || post.is_deleted) {
    throw new Error("Post not found");
  }

  if (!content || content.trim().length === 0) {
    throw new Error("Comment content is required");
  }

  const userIdObj = toObjectId(userId);
  if (!userIdObj) {
    throw new Error("Invalid user ID");
  }

  const comment = await Comment.create({
    post_id: postId,
    user_id: userIdObj,
    content: content.trim(),
  });

  // Update comment count
  await Post.updateOne(
    { _id: postId },
    { $inc: { comment_count: 1 } }
  );

  // Populate user info
  await comment.populate("user_id", "display_name avatar_url is_verified");

  return {
    id: comment._id,
    content: comment.content,
    user: {
      id: comment.user_id._id,
      display_name: comment.user_id.display_name,
      avatar_url: comment.user_id.avatar_url,
      is_verified: comment.user_id.is_verified || false,
    },
    created_at: comment.createdAt,
  };
};

/**
 * Bookmark or unbookmark a post
 */
const toggleBookmark = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post || post.is_deleted) {
    throw new Error("Post not found");
  }

  const userIdObj = toObjectId(userId);
  if (!userIdObj) {
    throw new Error("Invalid user ID");
  }

  const existingBookmark = await Bookmark.findOne({
    post_id: postId,
    user_id: userIdObj,
  });

  if (existingBookmark) {
    // Unbookmark
    await Bookmark.deleteOne({ _id: existingBookmark._id });
    return { bookmarked: false };
  } else {
    // Bookmark
    await Bookmark.create({
      post_id: postId,
      user_id: userIdObj,
    });
    return { bookmarked: true };
  }
};

/**
 * Share a post (increment share count)
 */
const sharePost = async (postId) => {
  const post = await Post.findById(postId);
  if (!post || post.is_deleted) {
    throw new Error("Post not found");
  }

  await Post.updateOne(
    { _id: postId },
    { $inc: { share_count: 1 } }
  );

  return { shared: true };
};

module.exports = {
  toggleLike,
  getComments,
  addComment,
  toggleBookmark,
  sharePost,
};


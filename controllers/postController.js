const postService = require("../services/postService");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * Like/Unlike a post
 */
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return errorResponse(res, "Authentication required", "AUTH_ERROR", 401);
    }

    const result = await postService.toggleLike(id, userId);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to like post", "LIKE_ERROR", 500);
  }
};

/**
 * Get post comments
 */
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    };

    const result = await postService.getComments(id, options);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch comments", "COMMENTS_ERROR", 500);
  }
};

/**
 * Add a comment
 */
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;
    const { content } = req.body;

    if (!userId) {
      return errorResponse(res, "Authentication required", "AUTH_ERROR", 401);
    }

    const result = await postService.addComment(id, userId, content);
    return successResponse(res, result, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to add comment", "COMMENT_ERROR", 500);
  }
};

/**
 * Bookmark/Unbookmark a post
 */
const toggleBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return errorResponse(res, "Authentication required", "AUTH_ERROR", 401);
    }

    const result = await postService.toggleBookmark(id, userId);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to bookmark post", "BOOKMARK_ERROR", 500);
  }
};

/**
 * Share a post
 */
const sharePost = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await postService.sharePost(id);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to share post", "SHARE_ERROR", 500);
  }
};

module.exports = {
  toggleLike,
  getComments,
  addComment,
  toggleBookmark,
  sharePost,
};


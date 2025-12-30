const feedService = require("../services/feedService");
const { successResponse, errorResponse } = require("../utils/response");
const { getPaginationParams } = require("../utils/pagination");

/**
 * Get home feed
 */
const getHomeFeed = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { page, limit, category, sort } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      category,
      sort: sort || "newest",
    };

    const result = await feedService.getHomeFeed(userId, options);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch home feed", "FEED_ERROR", 500);
  }
};

/**
 * Get trending feed
 */
const getTrendingFeed = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    };

    const result = await feedService.getTrendingFeed(userId, options);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch trending feed", "TRENDING_ERROR", 500);
  }
};

/**
 * Get nearby feed
 */
const getNearbyFeed = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { lat, lng, radius, page, limit } = req.query;

    const options = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      radius: parseInt(radius) || 5000,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    };

    const result = await feedService.getNearbyFeed(userId, options);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch nearby feed", "NEARBY_ERROR", 500);
  }
};

/**
 * Search feed
 */
const searchFeed = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { q, page, limit } = req.query;

    const options = {
      q: q.trim(),
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    };

    const result = await feedService.searchFeed(userId, options);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to search feed", "SEARCH_ERROR", 500);
  }
};

/**
 * Get feed by category
 */
const getFeedByCategory = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { slug } = req.params;
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    };

    const result = await feedService.getFeedByCategory(userId, slug, options);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch category feed", "CATEGORY_ERROR", 500);
  }
};

module.exports = {
  getHomeFeed,
  getTrendingFeed,
  getNearbyFeed,
  searchFeed,
  getFeedByCategory,
};


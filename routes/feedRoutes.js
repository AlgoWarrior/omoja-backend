const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");
const authenticateToken = require("../middleware/authMiddleware");
const {
  validateFeedQuery,
  validateNearbyFeed,
  validateSearchFeed,
  validateCategorySlug,
} = require("../middleware/validate");

// All feed routes require authentication
router.use(authenticateToken);

// Get home feed
router.get("/", validateFeedQuery, feedController.getHomeFeed);

// Get trending feed
router.get("/trending", validateFeedQuery, feedController.getTrendingFeed);

// Get nearby feed
router.get("/nearby", validateNearbyFeed, feedController.getNearbyFeed);

// Search feed
router.get("/search", validateSearchFeed, feedController.searchFeed);

// Get feed by category
router.get("/category/:slug", validateCategorySlug, validateFeedQuery, feedController.getFeedByCategory);

module.exports = router;


const { body, query, param, validationResult } = require("express-validator");

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
      code: "VALIDATION_ERROR",
      details: errors.array(),
    });
  }
  next();
};

/**
 * Feed query validation
 */
const validateFeedQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  query("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  query("sort")
    .optional()
    .isIn(["newest", "popular", "nearby"])
    .withMessage("Sort must be one of: newest, popular, nearby"),
  handleValidationErrors,
];

/**
 * Nearby feed validation
 */
const validateNearbyFeed = [
  query("lat")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  query("lng")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
  query("radius")
    .optional()
    .isInt({ min: 100, max: 50000 })
    .withMessage("Radius must be between 100 and 50000 meters"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  handleValidationErrors,
];

/**
 * Search feed validation
 */
const validateSearchFeed = [
  query("q")
    .notEmpty()
    .withMessage("Search query is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  handleValidationErrors,
];

/**
 * Post ID validation
 */
const validatePostId = [
  param("id")
    .notEmpty()
    .withMessage("Post ID is required")
    .isMongoId()
    .withMessage("Invalid post ID"),
  handleValidationErrors,
];

/**
 * Comment validation
 */
const validateComment = [
  body("content")
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters"),
  handleValidationErrors,
];

/**
 * Category slug validation
 */
const validateCategorySlug = [
  param("slug")
    .notEmpty()
    .withMessage("Category slug is required")
    .isString()
    .withMessage("Category slug must be a string"),
  handleValidationErrors,
];

module.exports = {
  validateFeedQuery,
  validateNearbyFeed,
  validateSearchFeed,
  validatePostId,
  validateComment,
  validateCategorySlug,
  handleValidationErrors,
};


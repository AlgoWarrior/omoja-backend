const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authMiddleware");
const {
  validatePostId,
  validateComment,
} = require("../middleware/validate");

// Like/Unlike post
router.post("/:id/like", authenticateToken, validatePostId, postController.toggleLike);

// Get post comments
router.get("/:id/comments", validatePostId, postController.getComments);

// Add comment
router.post("/:id/comments", authenticateToken, validatePostId, validateComment, postController.addComment);

// Bookmark/Unbookmark post
router.post("/:id/bookmark", authenticateToken, validatePostId, postController.toggleBookmark);

// Share post
router.post("/:id/share", validatePostId, postController.sharePost);

module.exports = router;


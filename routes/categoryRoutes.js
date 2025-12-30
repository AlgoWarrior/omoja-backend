const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Get all categories (public endpoint)
router.get("/", categoryController.getCategories);

module.exports = router;


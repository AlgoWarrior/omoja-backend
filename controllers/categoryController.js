const Category = require("../models/Category");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * Get all categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ sort_order: 1, name: 1 })
      .select("id name slug icon sort_order");

    const formattedCategories = categories.map((cat) => ({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      sort_order: cat.sort_order,
    }));

    return successResponse(res, { categories: formattedCategories });
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch categories", "CATEGORIES_ERROR", 500);
  }
};

module.exports = {
  getCategories,
};


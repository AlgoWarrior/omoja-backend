/**
 * Calculate pagination parameters
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Object} - Pagination object with skip, limit, and max limit
 */
const getPaginationParams = (page = 1, limit = 20) => {
  const maxLimit = 50;
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(maxLimit, Math.max(1, parseInt(limit) || 20));

  return {
    skip: (pageNum - 1) * limitNum,
    limit: limitNum,
    page: pageNum,
  };
};

/**
 * Format pagination response
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} - Pagination metadata
 */
const formatPagination = (page, limit, total) => {
  return {
    page,
    limit,
    total,
    hasMore: page * limit < total,
    totalPages: Math.ceil(total / limit),
  };
};

module.exports = {
  getPaginationParams,
  formatPagination,
};


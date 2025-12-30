/**
 * Format success response
 */
const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * Format error response
 */
const errorResponse = (res, error, code = "ERROR", statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error: error.message || error,
    code,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};


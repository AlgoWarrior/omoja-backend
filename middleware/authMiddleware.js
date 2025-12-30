const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return errorResponse(res, "No token provided", "AUTH_ERROR", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Support both 'id' and 'userId' from token
    req.user = {
      id: decoded.id || decoded.userId,
      userId: decoded.id || decoded.userId,
      ...decoded,
    };
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", "AUTH_ERROR", 403);
  }
};

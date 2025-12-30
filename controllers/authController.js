const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { name, email, phone, password, countryCode } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return errorResponse(
        res,
        "Missing required fields: name, email, and password are required",
        "VALIDATION_ERROR",
        400
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, "Invalid email format", "VALIDATION_ERROR", 400);
    }

    // Validate password length
    if (password.length < 6) {
      return errorResponse(
        res,
        "Password must be at least 6 characters",
        "VALIDATION_ERROR",
        400
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(
        res,
        "User with this email already exists",
        "USER_EXISTS",
        400
      );
    }

    // Check if phone exists (if provided)
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return errorResponse(
          res,
          "User with this phone number already exists",
          "USER_EXISTS",
          400
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || undefined,
      password: hashedPassword,
      countryCode: countryCode || "+250",
      display_name: name, // Set display_name to name by default
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString(), userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return response (without password)
    return successResponse(
      res,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || null,
          display_name: user.display_name,
          avatar_url: user.avatar_url || null,
          is_verified: user.is_verified,
        },
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return errorResponse(
        res,
        `User with this ${field} already exists`,
        "USER_EXISTS",
        400
      );
    }

    return errorResponse(
      res,
      error.message || "Registration failed",
      "SERVER_ERROR",
      500
    );
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return errorResponse(
        res,
        "Email and password are required",
        "VALIDATION_ERROR",
        400
      );
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return errorResponse(
        res,
        "Invalid email or password",
        "INVALID_CREDENTIALS",
        401
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return errorResponse(
        res,
        "Invalid email or password",
        "INVALID_CREDENTIALS",
        401
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString(), userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return response
    return successResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || null,
        display_name: user.display_name,
        avatar_url: user.avatar_url || null,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(
      res,
      error.message || "Login failed",
      "SERVER_ERROR",
      500
    );
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return errorResponse(res, "Authentication required", "AUTH_ERROR", 401);
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, "User not found", "USER_NOT_FOUND", 404);
    }

    return successResponse(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      display_name: user.display_name,
      avatar_url: user.avatar_url || null,
      is_verified: user.is_verified,
      district: user.district || null,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return errorResponse(
      res,
      error.message || "Failed to get profile",
      "SERVER_ERROR",
      500
    );
  }
};

module.exports = {
  register,
  login,
  getProfile,
};



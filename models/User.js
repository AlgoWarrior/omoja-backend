const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true, // unique: true automatically creates an index
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      default: "+250",
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't return password by default
    },
    display_name: {
      type: String,
      maxlength: 100,
    },
    avatar_url: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    district: {
      type: String,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes (email index already created by unique: true)
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);


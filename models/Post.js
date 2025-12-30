const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      default: "RWF",
      maxlength: 3,
    },
    condition: {
      type: String,
      enum: ["new", "like-new", "used"],
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
    sector: {
      type: String,
      maxlength: 100,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    view_count: {
      type: Number,
      default: 0,
    },
    like_count: {
      type: Number,
      default: 0,
    },
    comment_count: {
      type: Number,
      default: 0,
    },
    share_count: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
postSchema.index({ user_id: 1 });
postSchema.index({ category_id: 1 });
postSchema.index({ location: "2dsphere" });
postSchema.index({ created_at: -1 });
postSchema.index({ like_count: -1 });
postSchema.index({ created_at: -1, like_count: -1 });
postSchema.index({ title: "text", description: "text" }); // Text search index

module.exports = mongoose.model("Post", postSchema);


const mongoose = require("mongoose");

const postMediaSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    media_url: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
    },
    sort_order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postMediaSchema.index({ post_id: 1, sort_order: 1 });

module.exports = mongoose.model("PostMedia", postMediaSchema);


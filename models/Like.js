const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.index({ user_id: 1 });
likeSchema.index({ post_id: 1 });
likeSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);


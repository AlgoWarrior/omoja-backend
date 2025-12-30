const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

followSchema.index({ follower_id: 1 });
followSchema.index({ following_id: 1 });
followSchema.index({ follower_id: 1, following_id: 1 }, { unique: true });

// Prevent self-follow
followSchema.pre("save", function (next) {
  if (this.follower_id.toString() === this.following_id.toString()) {
    return next(new Error("Cannot follow yourself"));
  }
  next();
});

module.exports = mongoose.model("Follow", followSchema);


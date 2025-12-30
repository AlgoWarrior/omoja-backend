const mongoose = require("mongoose");

const postHashtagSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    hashtag_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hashtag",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postHashtagSchema.index({ post_id: 1 });
postHashtagSchema.index({ hashtag_id: 1 });
postHashtagSchema.index({ post_id: 1, hashtag_id: 1 }, { unique: true });

module.exports = mongoose.model("PostHashtag", postHashtagSchema);


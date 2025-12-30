const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      lowercase: true,
    },
    post_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// No need for manual index - unique: true already creates index

module.exports = mongoose.model("Hashtag", hashtagSchema);


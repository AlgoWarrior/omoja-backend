const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
    },
    icon: {
      type: String,
      maxlength: 50,
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

// No need for manual index - unique: true already creates indexes

module.exports = mongoose.model("Category", categorySchema);


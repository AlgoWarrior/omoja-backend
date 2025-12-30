const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/Category");

dotenv.config();

const categories = [
  { name: "All", slug: "all", icon: "Grid", sort_order: 0 },
  { name: "Electronics", slug: "electronics", icon: "Smartphone", sort_order: 1 },
  { name: "Fashion", slug: "fashion", icon: "Shirt", sort_order: 2 },
  { name: "Home & Garden", slug: "home", icon: "Home", sort_order: 3 },
  { name: "Vehicles", slug: "vehicles", icon: "Car", sort_order: 4 },
  { name: "Services", slug: "services", icon: "Wrench", sort_order: 5 },
  { name: "Food & Agriculture", slug: "food", icon: "Apple", sort_order: 6 },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("🗑️  Cleared existing categories");

    // Insert categories
    await Category.insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();


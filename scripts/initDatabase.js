const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import all models to register them
require("../models/User");
require("../models/Post");
require("../models/Category");
require("../models/PostMedia");
require("../models/Hashtag");
require("../models/PostHashtag");
require("../models/Like");
require("../models/Comment");
require("../models/Bookmark");
require("../models/Follow");

const initDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error("❌ MONGO_URI is not defined in .env file");
      process.exit(1);
    }

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    // Sync all indexes (creates indexes if they don't exist)
    console.log("📊 Syncing database indexes...");
    await mongoose.connection.syncIndexes();
    console.log("✅ All indexes synced");

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📁 Database collections (${collections.length}):`);
    collections.forEach((col) => {
      console.log(`   - ${col.name}`);
    });

    console.log("\n✅ Database initialization complete!");
    console.log("💡 Collections will be created automatically when you insert data.");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    process.exit(1);
  }
};

initDatabase();


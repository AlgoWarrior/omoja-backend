const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error("❌ MongoDB connection failed: MONGO_URI is not defined in .env file");
      console.error("💡 Please create a .env file with: MONGO_URI=your_mongodb_connection_string");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
    
    // Ensure indexes are created
    await mongoose.connection.syncIndexes();
    console.log("✅ Database indexes synced");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("\n💡 Common fixes:");
    console.error("   1. Check your IP is whitelisted in MongoDB Atlas");
    console.error("   2. Go to: MongoDB Atlas → Network Access → Add IP Address");
    console.error("   3. Add '0.0.0.0/0' to allow all IPs (for development)");
    console.error("   4. Check MONGO_URI in .env is correct");
    console.error("\n📖 Guide: https://www.mongodb.com/docs/atlas/security-whitelist/");
    process.exit(1);
  }
};

module.exports = connectDB;

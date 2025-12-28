const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB(); // 🔥 THIS WAS LIKELY MISSING

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Omoja API running");
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

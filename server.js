const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const qrRoutes = require("./routes/qrRoutes");

const app = express();

app.use(cors());
const publicDir = path.join(__dirname, "public");
app.use(express.json({ limit: "5mb" }));

app.use("/api/qr", qrRoutes);
app.use(express.static(publicDir));
app.get("/", (req, res) => {
  res.send("QR Generator API is running");
});
app.get("*name", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

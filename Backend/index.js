const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const HOST = "192.168.54.63";
const { ConnectMongoDB } = require("./connection");
const { CheckforAuthCookie } = require("./middlewares/auth");
const userRouter = require("./routes/user");
const paymentRoutes = require("./routes/paymentRoutes");
const itemRouter = require("./routes/items");
const reviewRoutes = require("./routes/reviewRoutes"); // Import review routes

// Start the server
app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`));

// Connect to MongoDB
ConnectMongoDB("mongodb://127.0.0.1:27017/foodie")
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((err) => console.log("Error Connecting MongoDB", err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckforAuthCookie("token"));
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/geocode/", MapRouter);
app.use("/api/add-new/", itemRouter);
app.use("/api", userRouter);
app.use("/api/v1/pay", paymentRoutes);
app.use("/api/review", reviewRoutes); // Add review routes

// Test route
app.get("/test", (req, res) => {
  return res.send("Testing server...");
});
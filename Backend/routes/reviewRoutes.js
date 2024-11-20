const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");

// POST: Submit a review
router.post("/submit", async (req, res) => {
    const { email, rating, reviewText } = req.body;
  
    if (!email || !rating || !reviewText) {
      return res.status(400).json({ message: "Email, rating, and review text are required." });
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
  
    try {
      const newReview = new Review({ email, rating, reviewText });
      await newReview.save();
      return res.status(201).json({ message: "Review submitted successfully!" });
    } catch (error) {
      console.error("Error saving review:", error);
      return res.status(500).json({ message: "Failed to submit review. Try again later." });
    }
  });
  
// GET: Fetch all reviews (optional)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Failed to fetch reviews. Try again later." });
  }
});

module.exports = router;

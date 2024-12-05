// const express = require('express');
const router = express.Router();
const {
    createItem,
    updateItem,
    deleteItem,
    getTracking,
    logPreparation,
    logDelivery,
    logOrder,
    logOutForDelivery,
    logDelivered,
} = require('../controllers/trackingController');
const jwt = require("jsonwebtoken"); 

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("authHeader", authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    // Extract token from "Bearer <token>" format
    const token = authHeader.replace("Bearer ", "").trim();
  
    if (!token) {
      return res.status(401).json({ message: "Access denied. Token is missing." });
    }
  
    try {
      // Decode token and verify with the secret
      const decoded = jwt.verify(token, process.env.secret);
      req.user = decoded; // Attach user info to req.user
      console.log("Authenticated user:", decoded); // Debugging log
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  };
  

// Routes for item actions
router.post('/items', authenticateUser, createItem);
router.put('/items/:id', authenticateUser, updateItem);
router.delete('/items/:id', authenticateUser, deleteItem);
router.get('/items/:id/tracking', authenticateUser, getTracking);

// Routes for specific tracking actions
router.post('/items/:id/preparation', authenticateUser, logPreparation);
router.post('/items/:id/delivery', authenticateUser, logDelivery);
router.post('/items/:id/order', authenticateUser, logOrder);
router.post('/items/:id/out-for-delivery', authenticateUser, logOutForDelivery);
router.post('/items/:id/delivered', authenticateUser, logDelivered);

module.exports = router;
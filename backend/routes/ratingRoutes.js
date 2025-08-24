const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

// Get all ratings (with user + store)
router.get("/", ratingController.getRatings);

// Create new rating
router.post("/", ratingController.createRating);

module.exports = router;

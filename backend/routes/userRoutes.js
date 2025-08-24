const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users with stores + ratings
router.get("/", userController.getUsers);

// Get single user by ID
router.get("/:id", userController.getUserById);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateJWT } = require("../middlewares/authMiddleware");

// Signup (normal user only)
router.post("/signup", authController.signup);

// Login (all roles)
router.post("/login", authController.login);

// Update password (logged-in users)
router.put("/update-password", authenticateJWT, authController.updatePassword);

module.exports = router;

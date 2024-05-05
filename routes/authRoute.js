const express = require("express");
const {
  registerController,
  loginController,
  refreshToken,
} = require("../controllers/authController");

// router onject
const router = express.Router();

// routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshToken);

module.exports = router;

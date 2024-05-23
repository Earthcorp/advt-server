const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  checkUserController,
} = require("../controllers/authController");
const { isUser } = require("../middleware/verifyToken");

// router onject
const router = express.Router();

// routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/checkUser", isUser, checkUserController);

module.exports = router;

const express = require("express");
const {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/userController");
const { authenticate } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/:id", authenticate, getSingleUser);
router.get("/", authenticate, getAllUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);
router.get("/profile/me", authenticate, getUserProfile);

module.exports = router;

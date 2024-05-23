const express = require("express");
const {
  getUserController,
  deleteUserController,
} = require("../controllers/adminController");
const { isAdmin } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/getUser", isAdmin, getUserController);
router.delete("/delete/:id", isAdmin, deleteUserController);

module.exports = router;

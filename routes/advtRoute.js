const express = require("express");
const {
  bookingController,
  getAllBooking,
  getSingleBooking,
  deleteBooking,
} = require("../controllers/advtController");

const router = express.Router();

router.post("/newBooking", bookingController);
router.get("/booking/all", getAllBooking);
router.get("/booking/:id", getSingleBooking);
router.delete("/booking/:id", deleteBooking);

module.exports = router;

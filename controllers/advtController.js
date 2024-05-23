const Advt = require("../models/advtModel");

const bookingController = async (req, res, next) => {
  try {
    const {
      billNo,
      billDt,
      newsPaper,
      pubDt,
      edition,
      category,
      subCategory,
      size,
      netAmt,
      gst,
      gross,
      clientName,
      clientPhone,
      clientAddress,
      clientCity,
      textContent,
    } = req.body;
    const newBooking = new Advt({
      billNo,
      billDt,
      newsPaper,
      pubDt,
      edition,
      category,
      subCategory,
      size,
      netAmt,
      gst,
      gross,
      clientName,
      clientPhone,
      clientAddress,
      clientCity,
      textContent,
    });
    const savedBooking = await newBooking.save();
    res.status(201).json({
      success: true,
      message: "New booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
  next();
};

const getAllBooking = async (req, res) => {
  try {
    const advts = await Advt.find({});
    res.status(200).json({
      success: true,
      message: "Booking found",
      data: advts,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No booking found" });
  }
};

const getSingleBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const advts = await Advt.findById(bookingId);

    res.status(200).json({
      success: true,
      message: "Booking found",
      data: advts,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No booking found" });
  }
};

const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const advts = await Advt.findByIdAndDelete(bookingId);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: advts,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No booking found" });
  }
};

module.exports = {
  bookingController,
  getAllBooking,
  getSingleBooking,
  deleteBooking,
};

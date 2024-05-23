const mongoose = require("mongoose");
const { Schema } = mongoose;

const advtSchema = new Schema({
  userId: { type: String },
  billNo: { type: String },
  billDt: { type: Date },
  newsPaper: { type: String },
  pubDt: { type: Date },
  edition: { type: String },
  category: { type: String },
  subCategory: { type: String },
  size: { type: Number },
  netAmt: { type: Number },
  discount: { type: Number },
  gst: { type: Number },
  gross: { type: Number },
  clientName: { type: String },
  clientPhone: { type: Number },
  clientAddress: { type: String },
  clientCity: { type: String },
  textContent: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Advt", advtSchema);

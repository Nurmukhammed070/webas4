const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, default: "" },
    pricePerNight: { type: Number, required: true, min: 0 },
    roomsAvailable: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
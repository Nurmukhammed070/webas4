const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

function isValidDates(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  return inDate.toString() !== "Invalid Date" && outDate.toString() !== "Invalid Date" && inDate < outDate;
}

// Admin: CRUD full
async function createBooking(req, res) {
  const { hotel, checkIn, checkOut, guests, user } = req.body;

  if (!hotel || !checkIn || !checkOut || !guests || !user) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!isValidDates(checkIn, checkOut)) {
    return res.status(400).json({ message: "Invalid dates" });
  }

  const hotelDoc = await Hotel.findById(hotel);
  if (!hotelDoc) return res.status(404).json({ message: "Hotel not found" });

  const booking = await Booking.create({
    hotel,
    user,
    checkIn,
    checkOut,
    guests,
  });

  res.status(201).json(booking);
}

async function getBookings(req, res) {
  const bookings = await Booking.find()
    .populate("hotel", "name city pricePerNight")
    .populate("user", "email role")
    .sort({ createdAt: -1 });

  res.json(bookings);
}

async function getBookingById(req, res) {
  const booking = await Booking.findById(req.params.id)
    .populate("hotel", "name city pricePerNight")
    .populate("user", "email role");

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
}

async function updateBooking(req, res) {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
}

async function deleteBooking(req, res) {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ message: "Booking deleted" });
}

module.exports = { createBooking, getBookings, getBookingById, updateBooking, deleteBooking };
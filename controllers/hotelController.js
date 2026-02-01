const Hotel = require("../models/Hotel");

async function createHotel(req, res) {
  const { name, city, address, pricePerNight, roomsAvailable, description } = req.body;

  if (!name || !city || pricePerNight === undefined || roomsAvailable === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hotel = await Hotel.create({
    name,
    city,
    address: address || "",
    pricePerNight,
    roomsAvailable,
    description: description || "",
  });

  res.status(201).json(hotel);
}

async function getHotels(req, res) {
  const hotels = await Hotel.find().sort({ createdAt: -1 });
  res.json(hotels);
}

async function getHotelById(req, res) {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
}

async function updateHotel(req, res) {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
}

async function deleteHotel(req, res) {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json({ message: "Hotel deleted" });
}

module.exports = { createHotel, getHotels, getHotelById, updateHotel, deleteHotel };
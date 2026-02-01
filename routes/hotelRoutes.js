const express = require("express");
const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

// Public GET
router.get("/", getHotels);
router.get("/:id", getHotelById);

// Admin only for POST/PUT/DELETE
router.post("/", protect, requireAdmin, createHotel);
router.put("/:id", protect, requireAdmin, updateHotel);
router.delete("/:id", protect, requireAdmin, deleteHotel);

module.exports = router;
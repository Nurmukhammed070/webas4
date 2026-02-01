const express = require("express");
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

// Public GET (по условию можно оставить открытым)
router.get("/", getBookings);
router.get("/:id", getBookingById);

// Admin only
router.post("/", protect, requireAdmin, createBooking);
router.put("/:id", protect, requireAdmin, updateBooking);
router.delete("/:id", protect, requireAdmin, deleteBooking);

module.exports = router;
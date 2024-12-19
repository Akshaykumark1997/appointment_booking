const express = require("express");
const router = express.Router();
const {
  getAvailableSlots,
  bookAppointment,
} = require("../models/bookingModel");

// Get available slots for a specific date
router.get("/slots/:date", async (req, res) => {
  try {
    const availableSlots = await getAvailableSlots(req.params.date);
    res.json(availableSlots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});

// Book an appointment
router.post("/book", async (req, res) => {
  const { name, phone, date, timeSlot } = req.body;
  try {
    const success = await bookAppointment(name, phone, date, timeSlot);
    if (success) {
      res.json({ message: "Appointment booked successfully!" });
    } else {
      res.status(400).json({ error: "Slot already booked or invalid time" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;

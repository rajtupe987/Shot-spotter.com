const express = require('express');
const bookingRouter = express.Router();
const Booking = require('../models/booking.model');

// Get all bookings
bookingRouter.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Create a new booking
bookingRouter.post('/', async (req, res) => {
  try {
    const { customerName, customerContact, photographer, startTime, endTime } = req.body;

    // Create a new booking instance
    const booking = new Booking({
      customerName,
      customerContact,
      photographer,
      startTime,
      endTime,
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Failed to create booking', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});




// Delete a booking by ID
bookingRouter.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = bookingRouter;

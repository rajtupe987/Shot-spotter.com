const express = require('express');
const bookingRouter = express.Router();
const Booking = require('../models/booking.model');
// const userModel=require("../models/usermodel");

const {athorization}=require("../middleware/authorozation")
const {authenticate}=require("../middleware/authenticate")

// Create a new booking
bookingRouter.post('/',authenticate,athorization(["client"]), async (req, res) => {
  try {
    const {photographerId, customerContact, startTime, endTime } = req.body;
    // const client = req.body.client;
    //console.log(req.body)
    //decode logic
    const booking = new Booking({
      customerContact,
      client:req.body.client,
      photographer:photographerId,
      startTime: new Date(startTime),
      endTime:new Date(endTime)

    });
 console.log(booking)
    
    // Save the booking to the database
    await booking.save();

    res.status(201).send({ message: 'Booking created successfully' ,booking});
  } catch (error) {
    console.error('Failed to create booking', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});




// Delete a booking by ID
bookingRouter.delete('/:id',authenticate,athorization(["client"]), async (req, res) => {
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


// Update a booking by ID
bookingRouter.patch('/:id',authenticate,athorization(["client","photographer"]), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve bookings with the same client
bookingRouter.get('/client',authenticate,athorization(["client"]), async (req, res) => {
  try {
    const client = req.body.client;

    // Find bookings with the provided client ID
    const bookings = await Booking.find({ client });

    res.json(bookings);
  } catch (error) {
    console.error('Failed to retrieve bookings', error);
    res.status(500).json({ message: 'Failed to retrieve bookings' });
  }
});

module.exports = bookingRouter;


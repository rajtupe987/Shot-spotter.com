const express = require('express');
const bookingRouter = express.Router();
const Booking = require('../models/booking.model');
// const userModel=require("../models/usermodel")

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
    const {photographerId, customerName, customerContact,client, startTime, endTime } = req.body;

    // Check if photographer and client exist in the database
    // const photographer = await userModel.findById(photographerId);
    // if (!photographer){
    //   return res.status(400).json({ message: 'Invalid photographer or client ID', ok:false });
    // }
    // Create a new booking instance

    //decode logic
    const booking = new Booking({
      customerName,
      customerContact,
      client:req.user.id,
      photographer:photographerId,
      startTime: new Date(startTime),
      endTime:new Date(endTime)

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




//Retrieve all booking requests for a specific photographer
// bookingRouter.get('/requests/:status', async (req, res) => {
//   try {
//     // Get the logged-in photographer's ID
//     const photographerId = req.user.id;
//     // Find all booking requests for the logged-in photographer from the database
//     const bookings = await Booking.find({ photographer: photographerId, status: req.params.status }).populate('client', 'name email');
//     res.json({ ok: true, bookings });
//   } catch (err) {
//     res.status(500).send({ error: err.message, mssg: 'Server Error', ok: false });
//   }
// });



module.exports = bookingRouter;

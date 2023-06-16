const express = require('express');
const photographerRouter = express.Router();
const Photographer = require('../models/photographers');



const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  }
}


// Get all photographers
photographerRouter.get('/', async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.json(photographers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific photographer by ID
photographerRouter.get('/:id', async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);
    if (!photographer) {
      return res.status(404).json({ error: 'Photographer not found' });
    }
    res.json(photographer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new photographer
photographerRouter.post('/', async (req, res) => {
  try {
    const photographer = new Photographer(req.body);
    await photographer.save();
    res.status(201).json(photographer);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update a photographer by ID
photographerRouter.put('/:id', async (req, res) => {
  try {
    const photographer = await Photographer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!photographer) {
      return res.status(404).json({ error: 'Photographer not found' });
    }
    res.json(photographer);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a photographer by ID
photographerRouter.delete('/:id', async (req, res) => {
  try {
    const photographer = await Photographer.findByIdAndDelete(req.params.id);
    if (!photographer) {
      return res.status(404).json({ error: 'Photographer not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


photographerRouter.get('/filter', async (req, res) => {
  const { expertise, location } = req.query;

  try {
    const photographers = await Photographer.find({
      expertise: [{ $in: expertise }],
      location: [{ $in: location }]
    });

    console.log(photographers)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error filtering photographers' });
  }
});



module.exports = photographerRouter;

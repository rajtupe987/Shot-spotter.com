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
    res.status(500).json({ error: 'Internal server error', message: error.message });
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



///space...
//http://localhost:4004/book/filter?expertise=Outdoor Photography&location=Mumbai
//http://localhost:4004/book/filter?expertise=Outdoor Photography
//http://localhost:4004/book/filter?expertise=location=Mumbai


// photographerRouter.get('/filter', async (req, res) => {
//   const expertise = req.query.expertise;
//   const location = req.query.location;
 
//   try {
//     let photographers;

//     if (expertise && location) {
//       photographers = await Photographer.find({ expertise, location });
//     } else if (expertise) {
//       photographers = await Photographer.find({ expertise });
//     } else if (location) {
//       photographers = await Photographer.find({ location });
//     } else {
//       return res.status(400).json({ error: 'Missing filter parameters' });
//     }

//     res.json(photographers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error', message: error.message });
//   }
// });

// Get a specific photographer by ID
photographerRouter.get('getphotographer/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const photographer = await Photographer.findById(req.params.id);
    if (!photographer) {
      return res.status(404).json({ error: 'Photographer not found' });
    }
    res.json(photographer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});


//http://localhost:4004/book/sort/desc
//http://localhost:4004/book/sort/asc
//aggrigation...
// photographerRouter.get('/sort/:order', async (req, res) => {
//   const { order } = req.params;
//   try {
//     let photographers;
//     if (order === 'asc') {
//       photographers = await Photographer.find().sort({ price: 1 });
//     } else if (order === 'desc') {
//       photographers = await Photographer.find().sort({ price: -1 });
//     } else {
//       return res.status(400).json({ error: 'Invalid sort order' });
//     }

//     res.json(photographers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



//http://localhost:4004/book/filter/range?minPrice=50000&maxPrice=120000 
// photographerRouter.get('/filter/range', async (req, res) => {
//   const minPrice = Number(req.query.minPrice);
//   const maxPrice = Number(req.query.maxPrice);

//   try {
//       const photographers = await Photographer.find({ price: { $gte: minPrice, $lte: maxPrice } }).sort({ price: -1 });
//       res.json(photographers);
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });


// photographerRouter.get('/filter', async (req, res) => {
//   let expertise = req.query.expertise;
//   let location = req.query.location;
//   const order = req.query.order;
//   const minPrice = Number(req.query.minPrice);
//   const maxPrice = Number(req.query.maxPrice);

//   try {
//     let aggregationPipeline = [];

//     if (expertise) {
//       expertise = encodeURIComponent(expertise.replace(/\s+/g, ''));
//       aggregationPipeline.push({ $match: { expertise } });
//     }

//     if (location) {
//       location = encodeURIComponent(location.replace(/\s+/g, ''));
//       aggregationPipeline.push({ $match: { location } });
//     }

//     if (minPrice && maxPrice) {
//       aggregationPipeline.push({ $match: { price: { $gte: minPrice, $lte: maxPrice } } });
//     }

//     if (order === 'asc') {
//       aggregationPipeline.push({ $sort: { price: 1 } });
//     } else if (order === 'desc') {
//       aggregationPipeline.push({ $sort: { price: -1 } });
//     }

//     aggregationPipeline.push({ $project: { _id: 0 } });

//     const photographers = await Photographer.aggregate(aggregationPipeline);

//     res.json(photographers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error', message: error.message });
//   }
// });

photographerRouter.get('/filter', async (req, res) => {
  let expertise = req.query.expertise;
  let location = req.query.location;
  const order = req.query.order;
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);

  try {
    let aggregationPipeline = [];

    if (expertise) {
      const expertiseRegex = new RegExp(expertise, 'i');
      aggregationPipeline.push({ $match: { expertise: expertiseRegex } });
    }

    if (location) {
      const locationRegex = new RegExp(location, 'i');
      aggregationPipeline.push({ $match: { location: locationRegex } });
    }

    if (minPrice && maxPrice) {
      aggregationPipeline.push({ $match: { price: { $gte: minPrice, $lte: maxPrice } } });
    }

    if (order === 'asc') {
      aggregationPipeline.push({ $sort: { price: 1 } });
    } else if (order === 'desc') {
      aggregationPipeline.push({ $sort: { price: -1 } });
    }

    aggregationPipeline.push({ $project: { _id: 0 } });

    const photographers = await Photographer.aggregate(aggregationPipeline);

    res.json(photographers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

///////////// Route for searching photographers///////////
//http://localhost:4004/book/searchdata?search=Outdoor Photography
//serch by anyhitng name,location,expetise,profile
photographerRouter.get('/searchdata', async (req, res) => {
    const searchQuery = req.query.search;

    try {
        let query = {};

        if (searchQuery) {
            query = {
                $or: [
                    { location: { $regex: searchQuery, $options: 'i' } },
                    { expertise: { $regex: searchQuery, $options: 'i' } },
                    { profile: { $regex: searchQuery, $options: 'i' } },
                    {name: {$regex : searchQuery,$options:"i"}}
                ]
            };
        }

        // console.log(searchQuery)
         const photographers = await Photographer.find(query);
         res.json(photographers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});






module.exports = photographerRouter;

const express = require("express");

const { photographers, sequelize } = require("../models/index");
const { Op } = require('sequelize');

const photoRouter = express.Router();


// Read all photographers
//localhost:4002/api/photographers -- > normal get
//localhost:4002/api/photographers?sort=asc -->sort asc
//localhost:4002/api/photographers?sort=desc -->sort desc

photoRouter.get("/", async (req, res) => {
  const { sort } = req.query;
  
  try {
    let order = [];
    
    if (sort === "asc") {
      order.push(["price", "ASC"]);
    } else if (sort === "desc") {
      order.push(["price", "DESC"]);
    }
    
    const data = await photographers.findAll({
      order: order
    });
    
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isError: true,
      error,
    });
  }
});


//post method for photogrhphers
photoRouter.post("/", async (req, res) => {
  try {
    const data = await photographers.create({
      ...req.body,
    });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(404).json({
      isError: true,
      error,
    });
    console.log(error)
  }
});


//delete method
photoRouter.delete("/:id", async (req, res) => {
  try {
    const data = await photographers.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(404).json({
      isError: true,
      error,
    });
    console.log(error)
  }
});

//update/put method
photoRouter.put("/:id", async (req, res) => {
  try {
    const data = await photographers.upsert({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(404).json({
      isError: true,
      error,
    });
  }
});

//////////all about sorting and filtering/////////

//localhost:4002/api/photographers/search?location=New York&sort=desc

//localhost:4002/api/photographers/search?location=New York&sort=asc

//localhost:4002/api/photographers/search?location=New York

//localhost:4002/api/photographers/search?category=Portraits

photoRouter.get('/search', async (req, res) => {
  const { category, location ,sort } = req.query;
  
  try {
    let photographersData;
    let order = [];

    if (sort === "asc") {
      order.push(["price", "ASC"]);
    } else if (sort === "desc") {
      order.push(["price", "DESC"]);
    }

    if (location && category) {
      photographersData = await photographers.findAll({
        where: {
          [Op.and]: [
            sequelize.literal(`JSON_CONTAINS(location, '["${location}"]')`),
            sequelize.literal(`JSON_CONTAINS(category, '["${category}"]')`)
          ]
        },
        order: order
      });
      //console.log(photographersData)
    } else if (location) {
      photographersData = await photographers.findAll({
        where: sequelize.literal(`JSON_CONTAINS(location, '["${location}"]')`),
        order: order
      });
    } else if (category) {
      photographersData = await photographers.findAll({
        where: sequelize.literal(`JSON_CONTAINS(category, '["${category}"]')`),
        order: order
      });
    }
    
    res.status(200).json(photographersData || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching photographers.' });
  }
});


module.exports = photoRouter
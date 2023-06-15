const express=require("express");

const { photographers } = require("../models/index");
const { Op } = require('sequelize');

const photoRouter=express.Router();


// Read all photographers
photoRouter.get("/", async (req, res) => {
    try {
      const data = await photographers.findAll();
      res.status(200).json({
        isError: false,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        isError: true,
        error,
      });
    }
  });


    
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

 
  photoRouter.get('/search', async (req, res) => {
    const { location } = req.query;
  
    try {
      const photographersData = await photographers.findAll({
        where: {
          location: {
            [Op.like]: `%${location}%` // Filter by location
          }
        }
      });
  
      res.status(200).json(photographersData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching photographers.' });
    }
  });
  

  photoRouter.get('/search', async (req, res) => {
    const { category } = req.query;
  
    try {
      const photographersData = await photographers.findAll({
        where: {
          category: {
            [Op.like]: `%${category}%` // Filter by category
          }
        }
      });
      
      res.status(200).json(photographersData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching photographers.' });
    }
  });
  
  
  photoRouter.get('/search', async (req, res) => {
    const { category, location } = req.query;
  
    try {
      const photographersData = await photographers.findAll({
        where: {
          category: {
            [Op.like]: `%${category}%` // Filter by category
          },
          location: {
            [Op.like]: `%${location}%` // Filter by location
          },
          order: [
            ['price', 'ASC'] // Sort by price in ascending order
          ]
        }
      });
  
      res.status(200).json(photographersData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching photographers.' });
    }
  });
  

  

  module.exports=photoRouter
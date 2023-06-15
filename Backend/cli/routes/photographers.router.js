const express=require("express");

const { photographers } = require("../models/index");

const photoRouter=express.Router();



// Read all photographers
photoRouter.get("/all", async (req, res) => {
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


    
  photoRouter.post("/add", async (req, res) => {
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

  module.exports=photoRouter
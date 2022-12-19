const express = require("express");
const Animal = require("../Model/Animal.model");

module.exports = {
  /* NOTE -: ANIMAL CONTROLER WOULD HAVE THE MINIMUM FEATURE FOR OBVIOUS REASON */
  addInjuredAnimal: async (req, res) => {
    const addInjAnimal = await Animal.create({
      AnimalType: req.body.AnimalType,
      AnimalCondition: req.body.AnimalCondition,
      AnimalAddress: req.body.AnimalAddress,
    });
    try {
      console.log(addInjAnimal);
      return res.status(200).json(addInjAnimal);
    } catch (e) {}
  },
  getInjuredAnimalList: async (req, res) => {
    try {
      const animalList = await Animal.find();
      return res.status(200).json(animalList);
    } catch (e) {
      return res.status(500).json({
        Message: "There is no injured animal nearby",
        Error: e,
      });
    }
  },
};

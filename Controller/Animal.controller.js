const express = require("express");
const Animal = require("../Model/Animal.model");

module.exports = {
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
  getInjuredAnimal: async (req, res) => {},
};

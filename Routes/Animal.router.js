const express = require("express");
const AnimalRouter = express.Router();
const { addInjuredAnimal } = require("../Controller/Animal.controller");
AnimalRouter.post("/addInjuredAnimal", addInjuredAnimal);
module.exports = AnimalRouter;

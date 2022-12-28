const express = require("express");
const NgoRouter = express.Router();

const {
  NgoSignUp,
  NgoLogIn,
  addStrayAnimals,
  getListOfAnimals,
  addAnimalforAdoption,
} = require("../Controller/Ngo.controller");

NgoRouter.post("/ngo/signUp", NgoSignUp);
NgoRouter.post("/ngo/logIn", NgoLogIn);
NgoRouter.post("/ngo/strayList", addStrayAnimals);
NgoRouter.get("/ngo/getStrayList", getListOfAnimals);
NgoRouter.post("/ngo/addAdoptList", addAnimalforAdoption);

module.exports = NgoRouter;

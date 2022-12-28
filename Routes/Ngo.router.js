const express = require("express");
const NgoRouter = express.Router();

const {
  NgoSignUp,
  NgoLogIn,
  addStrayAnimals,
  getListOfAnimals,
} = require("../Controller/Ngo.controller");

NgoRouter.post("/ngo/signUp", NgoSignUp);
NgoRouter.post("/ngo/logIn", NgoLogIn);
NgoRouter.post("/ngo/strayList", addStrayAnimals);
NgoRouter.get("/ngo/getStrayList", getListOfAnimals);

module.exports = NgoRouter;

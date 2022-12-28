const express = require("express");
const NgoRouter = express.Router();

const {
  NgoSignUp,
  NgoLogIn,
  addStrayAnimals,
} = require("../Controller/Ngo.controller");

NgoRouter.post("/ngo/signUp", NgoSignUp);
NgoRouter.post("/ngo/logIn", NgoLogIn);
NgoRouter.post("/ngo/strayList", addStrayAnimals);

module.exports = NgoRouter;

const express = require("express");
const NgoRouter = express.Router();

const {
  NgoSignUp,
  NgoLogIn,
  addStrayAnimals,
  getListOfAnimals,
  addAnimalforAdoption,
  getVaccinatedDetails,
  getAllNgo,
  getNgoDetailsById,
} = require("../Controller/Ngo.controller");

NgoRouter.post("/ngo/signUp", NgoSignUp);
NgoRouter.post("/ngo/logIn", NgoLogIn);
NgoRouter.post("/ngo/strayList", addStrayAnimals);
NgoRouter.get("/ngo/getStrayList", getListOfAnimals);
NgoRouter.post("/ngo/addAdoptList", addAnimalforAdoption);
NgoRouter.get("/ngo/vaccDetails", getVaccinatedDetails);
NgoRouter.get("/ngo/getNgo", getAllNgo);
NgoRouter.get("/ngo/getNgoById", getNgoDetailsById);

module.exports = NgoRouter;

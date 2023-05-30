const express = require("express");
const DocterRouter = express.Router();
const {
  DocterSignUp,
  DocterLogIn,
  nearbyAnimal,
  provideAnimalHelp,
  updatePetHealthCard,
  userPetCheckup,
  vaccinateStrayAnimals,
  getDoctors,
  getDoctorsDetailsById,
} = require("../Controller/docter.controller");

DocterRouter.post("/docterSignUp", DocterSignUp);
DocterRouter.post("/docterLogIn", DocterLogIn);
DocterRouter.get("/nearByAnimal", nearbyAnimal);
DocterRouter.post("/animalHelp", provideAnimalHelp);
DocterRouter.post("/updateHealth", updatePetHealthCard);
DocterRouter.get("/getPatient", userPetCheckup);
DocterRouter.post("/vaccinateStray", vaccinateStrayAnimals);
DocterRouter.get("/getAllDoctors", getDoctors);
DocterRouter.get("/getDoctorById", getDoctorsDetailsById);
module.exports = DocterRouter;

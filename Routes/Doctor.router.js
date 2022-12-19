const express = require("express");
const DocterRouter = express.Router();
const {
  DocterSignUp,
  DocterLogIn,
  nearbyAnimal,
  provideAnimalHelp,
  updatePetHealthCard,
} = require("../Controller/docter.controller");

DocterRouter.post("/docterSignUp", DocterSignUp);
DocterRouter.post("/docterLogIn", DocterLogIn);
DocterRouter.get("/nearByAnimal", nearbyAnimal);
DocterRouter.post("/animalHelp", provideAnimalHelp);
DocterRouter.post("/updateHealth", updatePetHealthCard);
module.exports = DocterRouter;

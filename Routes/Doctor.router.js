const express = require("express");
const DocterRouter = express.Router();
const {
  DocterSignUp,
  DocterLogIn,
  nearbyAnimal,
} = require("../Controller/docter.controller");

DocterRouter.post("/docterSignUp", DocterSignUp);
DocterRouter.post("/docterLogIn", DocterLogIn);
DocterRouter.get("/nearByAnimal", nearbyAnimal);
module.exports = DocterRouter;

const express = require("express");
const UserRouter = express.Router();
const {
  SignUp,
  LogIn,
  reportInjuredAnimal,
  getNearbyAnimal,
} = require("../Controller/User.controller");

UserRouter.post("/SignUp", SignUp);
UserRouter.get("/LogIn", LogIn);
UserRouter.get("/getNearbyAnimal", getNearbyAnimal);
UserRouter.post("/reportInjuredAnimal", reportInjuredAnimal);
module.exports = UserRouter;

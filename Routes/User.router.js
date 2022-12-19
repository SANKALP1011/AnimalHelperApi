const express = require("express");
const UserRouter = express.Router();
const {
  SignUp,
  LogIn,
  reportInjuredAnimal,
  getNearbyAnimal,
  checkInjuredAnimalStatus,
  addUserPetRecord,
  updatePetSickStatus,
  chosePetDoctor,
} = require("../Controller/User.controller");

UserRouter.post("/SignUp", SignUp);
UserRouter.get("/LogIn", LogIn);
UserRouter.get("/getNearbyAnimal", getNearbyAnimal);
UserRouter.post("/reportInjuredAnimal", reportInjuredAnimal);
UserRouter.get("/injuredAnimalStatus", checkInjuredAnimalStatus);
UserRouter.post("/addPet", addUserPetRecord);
UserRouter.post("/updatePetStatus", updatePetSickStatus);
UserRouter.post("/choseDoctor", chosePetDoctor);
module.exports = UserRouter;

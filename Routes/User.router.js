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
  getPetDetails,
} = require("../Controller/User.controller");
const AuthToken = require("../Middleware/authToken.middleware");

UserRouter.post("/SignUp", SignUp);
UserRouter.get("/LogIn", LogIn);
UserRouter.get("/getNearbyAnimal", getNearbyAnimal);
UserRouter.post("/reportInjuredAnimal", reportInjuredAnimal);
UserRouter.get("/injuredAnimalStatus", checkInjuredAnimalStatus);
UserRouter.post("/addPet", addUserPetRecord);
UserRouter.get("/petDetails", getPetDetails);
UserRouter.post("/updatePetStatus", updatePetSickStatus);
UserRouter.post("/choseDoctor", chosePetDoctor);
module.exports = UserRouter;

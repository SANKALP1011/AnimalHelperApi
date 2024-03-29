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
  donateFundsToNgo,
  getDonatedNgoList,
  adoptAnimal,
  getAdoptedAnimal,
  getUserDetails,
} = require("../Controller/User.controller");
const AuthToken = require("../Middleware/authToken.middleware");

UserRouter.post("/SignUp", SignUp);
UserRouter.post("/LogIn", LogIn);
UserRouter.get("/getUserDetails", getUserDetails);
UserRouter.get("/getNearbyAnimal", getNearbyAnimal);
UserRouter.post("/reportInjuredAnimal", reportInjuredAnimal);
UserRouter.get("/injuredAnimalStatus", checkInjuredAnimalStatus);
UserRouter.post("/addPet", addUserPetRecord);
UserRouter.get("/petDetails", getPetDetails);
UserRouter.post("/updatePetStatus", updatePetSickStatus);
UserRouter.post("/choseDoctor", chosePetDoctor);
UserRouter.post("/ngoFund", donateFundsToNgo);
UserRouter.get("/donatedNgoList", getDonatedNgoList);
UserRouter.post("/adoptAnimal", adoptAnimal);
UserRouter.get("/getAdoptedAnimal", getAdoptedAnimal);
module.exports = UserRouter;

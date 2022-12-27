const express = require("express");
const NgoRouter = express.Router();

const { NgoSignUp, NgoLogIn } = require("../Controller/Ngo.controller");

NgoRouter.post("/ngo/signUp", NgoSignUp);
NgoRouter.post("/ngo/logIn", NgoLogIn);

module.exports = NgoRouter;

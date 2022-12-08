const express = require("express");
const UserRouter = express.Router();
const { SignUp, LogIn } = require("../Controller/User.controller");

UserRouter.post("/SignUp", SignUp);
UserRouter.get("/LogIn", LogIn);
module.exports = UserRouter;

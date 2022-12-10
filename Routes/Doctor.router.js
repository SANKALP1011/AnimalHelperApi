const express = require("express");
const DocterRouter = express.Router();
const {
  DocterSignUp,
  DocterLogIn,
} = require("../Controller/docter.controller");

DocterRouter.post("/docterSignUp", DocterSignUp);
DocterRouter.post("/docterLogIn", DocterLogIn);
module.exports = DocterRouter;

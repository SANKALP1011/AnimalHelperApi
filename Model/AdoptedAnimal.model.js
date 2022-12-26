const express = require("express");
const moongose = require("mongoose");

const AdoptedAnimalModel = new moongose.Schema({
  Name: {
    type: String,
    default: "",
  },
  Type: {
    type: String,
    default: "",
  },
  NgoName: {
    type: String,
    default: "",
  },
  AdopterName: {
    type: String,
    default: "",
  },
  Address: {
    type: String,
    default: "", //would pass user the loaction here
  },
  isRescued: {
    type: Boolean,
    default: false,
  },
});

module.exports = moongose.model("adoptedAnimal", AdoptedAnimalModel);

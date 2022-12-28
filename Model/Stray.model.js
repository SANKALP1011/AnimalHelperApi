const express = require("express");
const moongose = require("mongoose");

const StrayModel = new moongose.Schema({
  StrayName: {
    type: String,
    default: "",
  },
  StrType: {
    type: String,
    default: "",
  },
  isHealthy: {
    type: Boolean,
    default: false,
  },
  isVaccinated: {
    type: Boolean,
    default: false,
  },
  requiresVetCare: {
    type: Boolean,
    default: false,
  },
  CurrentDoctor: [],
  NgoDetails: [],
});

module.exports = moongose.model("stray", StrayModel);

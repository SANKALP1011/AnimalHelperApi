const express = require("express");
const moongose = require("mongoose");

const UserModel = new moongose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  City: {
    type: String,
  },
  Number: {
    type: Number,
    required: true,
  },
  InjuredAnimalNearby: [],
  animalReported: [],
  isDocter: {
    default: false,
  },
  isNgoMember: {
    default: false,
  },
  hasReportedAnimal: {
    default: false,
  },
  isReportedAnimalSaved: {
    default: true,
  },
});

module.exports = moongose.model("User", UserModel);

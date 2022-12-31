const express = require("express");
const moongose = require("mongoose");
const geocoder = require("../Middleware/geoCoder.middleware");

const NgoModal = new moongose.Schema({
  Ngoname: {
    type: String,
    default: "",
  },
  NgoPassword: {
    type: String,
    default: "",
  },
  NgoPhno: {
    type: Number,
    default: null,
  },
  StrayAnimalList: [],
  NgoAddress: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true,
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
      // required: true,
    },
    formattedAddress: String,
  },
  AnimalsForAdoption: [],
  isNgo: {
    type: Boolean,
    default: true,
  },
  VaccinatedAnimals: [],
  //pass the data of the adopted animal that are availaile for adoption
  //user can check the list and decide if they want to adopt the animal
  //once the animal is adopted we would the pass the name of the animal to the adopted animal list
  //user too woukld have the adoption attribute through which they would be abke to check the animal that is adopted
});
NgoModal.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.NgoAddress);
  this.location = {
    type: ["Point"],
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.NgoAddress = undefined;
  next();
});
module.exports = moongose.model("ngo", NgoModal);

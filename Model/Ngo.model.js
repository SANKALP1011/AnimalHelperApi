const express = require("express");
const moongose = require("mongoose");

const NgoModal = new moongose.Schema({
  Ngoname: {
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
    required: [true, "Please add your location for locating injured animal"],
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
  //pass the data of the adopted animal that are availaile for adoption
  //user can check the list and decide if they want to adopt the animal
  //once the animal is adopted we would the pass the name of the animal to the adopted animal list
  //user too woukld have the adoption attribute through which they would be abke to check the animal that is adopted
});

const express = require("express");
const mongoose = require("mongoose");

const geoCoder = require("../Middleware/geoCoder.middleware");

const DocterModel = new mongoose.Schema({
  DocterName: {
    type: String,
    required: true,
  },
  DocterEmail: {
    type: String,
    unique: true,
    required: true,
  },
  DocterPassword: {
    type: String,
  },
  DocterNumber: {
    type: Number,
    default: "",
  },
  isDocterOnline: {
    type: Boolean,
    default: false,
  },
  Address: {
    type: String,
  },
  PatientPetId: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  NearByAnimal: {
    type: Array,
    default: [],
  },
  hasDocterArrivedAtLocation: {
    type: Boolean,
    default: false,
  },
  isDocterAvailaible: {
    type: Boolean,
    default: false,
  },
  hasDocterSavedAnimal: {
    type: Boolean,
    default: false,
  },
  No_Of_Animal_Saved: {
    type: Array,
    default: [],
  },
});
DocterModel.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.Address);
  this.location = {
    type: ["Point"],
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.Address = undefined;
  next();
});

module.exports = mongoose.model("Docter", DocterModel);

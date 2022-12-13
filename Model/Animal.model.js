const express = require("express");
const moongose = require("mongoose");
const geocoder = require("../Middleware/geoCoder.middleware");

const AnimalModel = new moongose.Schema({
  AnimalType: {
    type: String,
    required: true,
  },
  AnimalCondition: {
    type: String,
    required: true,
  },
  AnimalAddress: {
    type: String,
    required: true,
  },
  AnimalLocation: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
    formattedAddress: String,
  },
  UserNamewhoReported: {
    type: String,
    default: "",
  },
  hasDocterArrived: {
    type: Boolean,
    default: false,
  },
  DocterName: {
    type: String,
    default: "",
  },
  isAnimalReported: {
    type: Boolean,
    default: false,
  },
  isCriticalMedicalCareRequired: {
    type: Boolean,
    default: false,
  },
  hasSeriousInjury: {
    type: Boolean,
    default: false,
  },
  isAnimalSaved: {
    type: Boolean,
    default: false,
  },
});
AnimalModel.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.AnimalAddress);
  this.AnimalLocation = {
    type: ["Point"],
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.AnimalAddress = undefined;
  next();
});

module.exports = moongose.model("Animal", AnimalModel);

const express = require("express");
const moongose = require("mongoose");
const geoCoder = require("../Middleware/geoCoder.middleware");

const DocterSchema = new moongose.Schema({
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
    required: true,
  },
  isDocterOnline: {
    type: Boolean,
    default: false,
  },
  DocterAddress: {
    type: String,
  },
  DocterLocation: {
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
  NearByAnimal: [],
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
    type: Number,
  },
});
DocterSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.DocterAddress);
  this.DocterLocation = {
    type: ["Point"],
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.DocterAddress = undefined;
  next();
});

module.exports = moongose.model("Docter", DocterSchema);

const express = require("express");
const moongose = require("mongoose");

const DocterSchema = new moongose.Schema({
  DocterName: {
    type: String,
  },
  DocterNumber: {
    type: Number,
    required: true,
  },
  DocterLocation: {
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
  hasDocterArrivedAtLocation: {
    default: true,
  },
  isDocterAvailaible: {
    default: true,
  },
  hasDocterSavedAnimal: {
    default: false,
  },
  No_Of_Animal_Saved: {
    type: Number,
  },
});

module.exports = moongose.model("Docter", DocterSchema);

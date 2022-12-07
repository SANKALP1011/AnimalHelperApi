const express = require("express");
const moongose = require("mongoose");

const AnimalSchema = moongose.Schema({
  AnimalType: {
    type: String,
    required: true,
  },
  AnimalCondition: {
    type: String,
    required: true,
  },
  AnimalLocation: {
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
  UserNamewhoReported: {
    type: String,
    required: true,
  },
  hasDocterArrived: {
    default: false,
  },
  isAnimalReported: {
    default: false,
  },
  isCriticalMedicalCareRequired: {
    default: false,
  },
  hasSeriousInjury: {
    default: false,
  },
  isAnimalSaved: {
    default: false,
  },
});
module.exports = moongose.model("Animal", AnimalSchema);

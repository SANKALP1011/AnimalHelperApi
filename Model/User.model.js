const express = require("express");
const moongose = require("mongoose");

const UserModel = new moongose.Schema(
  {
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
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
      },
    },
    City: {
      type: String,
      default: "",
    },
    Number: {
      type: Number,
      default: "",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    InjuredAnimalNearby: [],
    animalReported: [],
    isDocter: {
      type: Boolean,
      default: false,
    },
    isNgoMember: {
      type: Boolean,
      default: false,
    },
    hasReportedAnimal: {
      type: Boolean,
      default: false,
    },
    isReportedAnimalSaved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = moongose.model("user", UserModel);

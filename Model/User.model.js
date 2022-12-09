const express = require("express");
const moongose = require("mongoose");
const geocoder = require("../Middleware/geoCoder.middleware");

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
    Address: {
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
UserModel.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.Address);
  this.location = {
    type: ["Point"],
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.Address = undefined;
  next();
});

module.exports = moongose.model("user", UserModel);

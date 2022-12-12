const express = require("express");
const Docter = require("../Model/Docter.model");
const Animal = require("../Model/Animal.model");
const User = require("../Model/User.model");

/* Below is the functionality for calculating the distance between two points by using their latitude and longitude */
const calculateDistanceUsingLatandLong = (lat1, long1, lat2, long2) => {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(long2 - long1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  DocterSignUp: async (req, res) => {
    try {
      const NewDoctor = await Docter.create({
        DocterName: req.body.DocterName,
        DocterEmail: req.body.DocterEmail,
        DocterPassword: req.body.DocterPassword,
        DocterNumber: req.body.DocterNumber,
        DocterAddress: req.body.DocterAddress,
      });
      return res.status(200).json(NewDoctor);
    } catch (e) {
      return res.status(200).json({
        Message: e,
      });
    }
  },
  DocterLogIn: async (req, res) => {
    try {
      const { DocterEmail, DocterPassword } = req.body;
      const CurrentDoc = await Docter.findOne({ DocterEmail, DocterPassword });
      if (!CurrentDoc) {
        return res.status.json({
          Message: "Sorry , no such docter account is there in our database",
        });
      }
      console.log(CurrentDoc._id);
      const UpdateStatus = await Docter.findByIdAndUpdate(CurrentDoc._id, {
        isDocterOnline: true,
        isDocterAvailaible: true,
      });
      return res.status(200).json(UpdateStatus);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  nearbyAnimal: async (req, res) => {
    const doctorId = req.query.docId;
    const CurrentDoctor = await Docter.findById(doctorId);
    const animalList = await Animal.find();
    var data = [];
    if (animalList.length) {
      animalList.forEach(async (value) => {
        var AnimalLong = value.AnimalLocation.coordinates[0];
        var AnimalLat = value.AnimalLocation.coordinates[1];
        var doctorLong = CurrentDoctor.DocterLocation.coordinates[0];
        var doctorLat = CurrentDoctor.DocterLocation.coordinates[1];
        var dist = calculateDistanceUsingLatandLong(
          //This is hessian function that takes lat and long of two points and use it to calculate the distance between two points.
          doctorLat,
          doctorLong,
          AnimalLat,
          AnimalLong
        );
        if (dist < 5) {
          data.push(value);
          console.log(data.length);
        }
      });
    }
    await Docter.findByIdAndUpdate(doctorId, {
      NearByAnimal: data,
    });
    console.log(CurrentDoctor);
    return res.status(200).json(data);
  },
  provideAnimalHelp: async (req, res) => {},
};

const express = require("express");
const User = require("../Model/User.model");
const Animal = require("../Model/Animal.model");

module.exports = {
  SignUp: async (req, res) => {
    console.log(req.body);
    try {
      const NewUser = await User.create({
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: req.body.Password,
        Address: req.body.Address,
      });
      var long = NewUser.location.coordinates[0];
      var lat = NewUser.location.coordinates[1];
      var diff = long - lat;
      console.log(diff);
      return res.status(200).json(NewUser);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  LogIn: async (req, res) => {
    const { Email, Password } = req.body;
    const findUser = await User.findOne({ Email, Password });
    try {
      if (!findUser) {
        return res.status(500).json({
          Message:
            "This user does not exist , please try again with the new credentials",
        });
      }
      const upadtedUserStatus = await User.findByIdAndUpdate(findUser._id, {
        isOnline: true,
      });
      return res.status(200).json(upadtedUserStatus);
    } catch (e) {
      return res.status(500).json({
        Message: e,
      });
    }
  },
  getNearbyAnimal: async (req, res) => {
    //get all animal list
    //get the current user details by their id
    //get the diff between the lat and long of the animal
    //if diff is greator than 50 than don't show the animal else show the animal
    const userIdQuery = req.query.userId;
    const CurrentUser = await User.findById({ _id: userIdQuery });
    const animalList = await Animal.find();
    if (animalList) {
      for (var i = 0; i < animalList.length; i++) {
        var AnimalLong = animalList[i].AnimalLocation.coordinates[0];
        var AnimalLat = animalList[i].AnimalLocation.coordinates[1];
        var userlong = CurrentUser.location.coordinates[0];
        var userLat = CurrentUser.location.coordinates[1];
        const diffOfLong = AnimalLong - userlong;
        const diffLat = AnimalLat - userLat;
        // nested if because of the condition (should be avoided if the situation is good)
        if (diffOfLong < 0.1 && diffLat < 0.1) {
          if (
            animalList[i].AnimalLocation.coordinates[0] == AnimalLong &&
            animalList[i].AnimalLocation.coordinates[1] == AnimalLat
          ) {
            console.log([AnimalLong, AnimalLat]);
            return res.status(200).json(animalList[i]);
          }
        }
        return res.status(500).json({
          Message: "No animal nearby",
        });
      }
    } else {
      return res.status(500).json({
        Message: "There is no injured animal nearby your area",
      });
    }
  },
  reportInjuredAnimal: async (req, res) => {
    try {
      const reportedAnimal = await Animal.create({
        AnimalType: req.body.AnimalType,
        AnimalCondition: req.body.AnimalCondition,
        AnimalAddress: req.body.AnimalAddress,
        UserNamewhoReported: findUserById.UserName,
        isAnimalReported: true,
      });
      const updateUserAnimalStatus = await User.findByIdAndUpdate(userIdQuery, {
        animalReported: reportedAnimal,
        hasReportedAnimal: true,
      });
      return res.status(200).json(updateUserAnimalStatus);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};

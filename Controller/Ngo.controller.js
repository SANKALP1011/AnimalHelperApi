const express = require("express");
const Ngo = require("../Model/Ngo.model");
const Stray = require("../Model/Stray.model");
const AdoptedAnimal = require("../Model/AdoptedAnimal.model");

module.exports = {
  NgoSignUp: async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const NewNgo = await Ngo.create({
        Ngoname: req.body.Ngoname,
        NgoPassword: req.body.NgoPassword,
        NgoAddress: req.body.NgoAddress,
      });
      return res.status(200).json(NewNgo);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  NgoLogIn: async (req, res) => {
    const { Ngoname, NgoPassword } = req.body;
    const findNgo = await Ngo.findOne({ Ngoname, NgoPassword });
    try {
      if (findNgo) {
        return res.status(200).json(findNgo);
      } else {
        return res.status(500).json({
          Message:
            "Sorry, no ngo exists with those credentials. Please make sure that you login with the right credentials.",
        });
      }
    } catch (e) {
      return res.status(500).json({
        Message: e,
      });
    }
  },
  getAllNgo: async (req, res) => {
    try {
      const data = await Ngo.find();
      if (data != null) {
        return res.status(200).json(data);
      } else {
        return res.status(200).json({
          Message: "Sorry , as of now no ngo exist with our database",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getNgoDetailsById: async (req, res) => {
    const id = req.query.ngoId;
    try {
      const data = await Ngo.findById(id);
      if (data != null) {
        return res.status(200).json(data);
      } else {
        return res.status(200).json({
          Message: "Sorry , no ngo exists with that id",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  addStrayAnimals: async (req, res) => {
    const ngoId = req.query.id;
    const CurrentNgo = await Ngo.findById(ngoId);
    try {
      const NgoData = {
        NgoName: CurrentNgo.Ngoname,
        NgoPhn: CurrentNgo.NgoPhno,
        NgoLocation: CurrentNgo.location.formattedAddress,
        NgoId: CurrentNgo._id,
      };
      const StrayData = new Stray({
        StrayName: req.body.StrayName,
        StrType: req.body.StrType,
        NgoDetails: NgoData,
      });
      const stray = await StrayData.save();
      const strList = [];
      const pushData = strList.push(stray);
      console.log(strList);
      const updateStrayList = await Ngo.findByIdAndUpdate(
        ngoId,
        {
          $push: {
            StrayAnimalList: strList,
          },
        },
        { new: true }
      );
      return res.status(200).json(updateStrayList);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getListOfAnimals: async (req, res) => {
    const ngoId = req.query.id;
    try {
      const CurrentNgo = await Ngo.findById(ngoId);
      return res.status(200).json(CurrentNgo.StrayAnimalList);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  addAnimalforAdoption: async (req, res) => {
    //add animal for the adoption list
    //user could check the adoption list where all the animals details would be there along with the ngo name that is providing them for adoption
    //user would click on the adoption button and adopt the animal by going to the ngo locations
    //animal is adopted.
    const ngoId = req.query.id;
    const CurrentNgo = await Ngo.findById(ngoId);
    try {
      const animal = new AdoptedAnimal({
        Name: req.body.Name,
        Type: req.body.Type,
        NgoName: CurrentNgo.Ngoname,
      });
      const data = [];
      const addAnimal = await animal.save();
      data.push(addAnimal);
      const updateNgoData = await Ngo.findByIdAndUpdate(
        ngoId,
        {
          $push: {
            AnimalsForAdoption: data,
          },
        },
        { new: true }
      );
      return res.status(200).json(updateNgoData);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getVaccinatedDetails: async (req, res) => {
    const ngoId = req.query.id;
    const CurrentNgo = await Ngo.findById(ngoId);
    try {
      console.log(CurrentNgo.VaccinatedAnimals);
      return res.status(200).json(CurrentNgo.VaccinatedAnimals);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getAnimalAdoptionList: async (req, res) => {
    try {
      const respone = await AdoptedAnimal.find();
      return res.status(200).json(respone);
    } catch (err) {
      return err;
    }
  },
};

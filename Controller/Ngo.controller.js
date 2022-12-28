const express = require("express");
const Animal = require("../Model/Animal.model");
const User = require("../Model/User.model");
const Ngo = require("../Model/Ngo.model");
const Docter = require("../Model/Docter.model");
const Stray = require("../Model/Stray.model");

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
  addStrayAnimals: async (req, res) => {
    const data = req.body;
    console.log(data);
    const ngoId = req.query.id;
    const CurrentNgo = await Ngo.findById(ngoId);
    console.log(CurrentNgo);
    try {
      const StrayData = new Stray(data);
      const stray = await StrayData.save();
      const updateStrayList = await Ngo.findByIdAndUpdate(ngoId, {
        StrayAnimalList: stray,
      });
      return res.status(200).json(updateStrayList);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getListOfAnimals: async (req, res) => {},
  provideAnimalAdoption: async (req, res) => {},
  getFundforHelpingAnimals: async (req, res) => {},
  strayVaccinationStatus: async (req, res) => {},
};

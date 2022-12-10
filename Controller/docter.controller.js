const express = require("express");
const Docter = require("../Model/Docter.model");

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
      const CurrentDoc = await Docter.find({ DocterEmail, DocterPassword });
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
      return res.status(200).json(CurrentDoc);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};

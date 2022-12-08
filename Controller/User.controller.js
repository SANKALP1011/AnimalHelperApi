const express = require("express");
const User = require("../Model/User.model");

module.exports = {
  SignUp: async (req, res) => {
    console.log(req.body);
    const NewuUser = new User({
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: req.body.Password,
    });
    try {
      const saveUser = await NewuUser.save();
      return res.status(200).json(saveUser);
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
};

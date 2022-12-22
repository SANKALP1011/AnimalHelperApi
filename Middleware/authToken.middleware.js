const express = require("express");
const jwt = require("jsonwebtoken");

const AuthToken = (req, res, next) => {
  const token = "ANI1213";
  let tokenHeader = req.get("authorization");
  if (tokenHeader) {
    tokenHeader = tokenHeader.slice(7);
    jwt.verify(tokenHeader, token, (err, decodedToken) => {
      if (err) {
        return res.status(500).json({
          Message: err,
        });
      } else {
        req.decoded = decodedToken;
        next();
      }
    });
  } else {
    return res.status(500).json({
      Message: "You are not authenticated to access the route",
    });
  }
};
module.exports = AuthToken;

const express = require("express");
const NodeGeoCoder = require("node-geocoder");
require("dotenv").config({ path: require("find-config")(".env") });

var options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: process.env.MAPQUEST_API,
  formatter: null,
};

var geocoder = NodeGeoCoder(options);
module.exports = geocoder;

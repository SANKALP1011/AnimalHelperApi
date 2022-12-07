const express = require("express");
const app = express();
const moongose = require("mongoose");
require("dotenv").config({ path: require("find-config")(".env") });
console.log(process.env.MONGO_URI);

moongose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((e) => {
    console.log(e);
  });

app.listen("3001", (err) => {
  console.log("Server is up and running");
});

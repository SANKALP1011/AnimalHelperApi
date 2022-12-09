const express = require("express");
const app = express();
const moongose = require("mongoose");
require("dotenv").config({ path: require("find-config")(".env") });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const UserRoutes = require("./Routes/User.router");
const AnimalRoutes = require("./Routes/Animal.router");

moongose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((e) => {
    console.log(e);
  });
moongose.set("strictQuery", true);

app.get("/", (req, res) => {
  res.send("Demo message");
});
app.use(UserRoutes);
app.use(AnimalRoutes);

app.listen("3001", (err) => {
  console.log("Server is up and running");
});

const express = require("express");
const app = express();
const moongose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
require("dotenv").config({ path: require("find-config")(".env") });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const UserRoutes = require("./Routes/User.router");
const AnimalRoutes = require("./Routes/Animal.router");
const DocterRoutes = require("./Routes/Doctor.router");
const NgoRoutes = require("./Routes/Ngo.router");

moongose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((e) => {
    console.log(e);
  });
moongose.set("strictQuery", true);

app.use("/v1", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("Welcome to the animal welfare api");
});
app.use(UserRoutes);
app.use(AnimalRoutes);
app.use(DocterRoutes);
app.use(NgoRoutes);
app.listen(process.env.PORT || "3001", (err) => {
  console.log("Server is up and running");
});

// fix the bugs and start the deployment

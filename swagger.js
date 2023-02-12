const swaggerGen = require("swagger-autogen")();
const outputFile = "./swagger_output.json";

const endpointsFile = [
  "./Routes/User.router.js",
  "./Routes/Ngo.router.js",
  "./Routes/Doctor.router.js",
  "./Routes/Animal.router.js",
];

const doc = {
  info: {
    title: "Animal Welfare Api",
    version: "v1.1",
    description:
      "This is the server of the animal welfare api made for the well being of the animals.",
  },
  host: "animal-welfare-api.herokuapp.com",
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

swaggerGen(outputFile, endpointsFile, doc);

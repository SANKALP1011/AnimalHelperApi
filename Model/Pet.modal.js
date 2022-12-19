const moongose = require("mongoose");

const PetModal = new moongose.Schema({
  Petname: {
    type: String,
    required: [true, "Please provide your pet name"],
  },
  PetParent: {
    type: String,
  },
  Pettype: {
    type: String,
    required: [true, "Please provide the pet type"],
  },
  PetBreed: {
    type: String,
    required: true,
  },
  PetParentLoation: {
    type: String,
  },
  PetHealthCardData: {
    type: Array,
    default: [],
  },
  Petdoctor: {
    type: String,
    default: "",
  },
  Petage: {
    type: Number,
  },
  isPetSick: {
    type: Boolean,
    default: false,
  },
  MedicalPresecription: {
    type: Array,
    default: [],
  },
});
module.exports = moongose.model("pet", PetModal);

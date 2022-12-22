const User = require("../Model/User.model");
const Animal = require("../Model/Animal.model");
const Pet = require("../Model/Pet.modal");
const Docter = require("../Model/Docter.model");
const { sign } = require("jsonwebtoken");

/* Below is the functionality for calculating the distance between two points by using their latitude and longitude */
const calculateDistanceUsingLatandLong = (lat1, long1, lat2, long2) => {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(long2 - long1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  SignUp: async (req, res) => {
    console.log(req.body);
    try {
      const NewUser = await User.create({
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: req.body.Password,
        Address: req.body.Address,
      });
      return res.status(200).json(NewUser);
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
      const LogInToken = sign({ Password: findUser }, "ANI1213", {
        expiresIn: "24h",
      });
      const upadtedUserStatus = await User.findByIdAndUpdate(findUser._id, {
        isOnline: true,
      });
      return res.status(200).json({ upadtedUserStatus, LogInToken });
    } catch (e) {
      return res.status(500).json({
        Message: e,
      });
    }
  },
  getNearbyAnimal: async (req, res) => {
    const userIdQuery = req.query.userId;
    const CurrentUser = await User.findById(userIdQuery);
    const animalList = await Animal.find();
    var data = [];
    if (animalList.length) {
      animalList.forEach(async (value) => {
        var AnimalLong = value.AnimalLocation.coordinates[0];
        var AnimalLat = value.AnimalLocation.coordinates[1];
        var userlong = CurrentUser.location.coordinates[0];
        var userLat = CurrentUser.location.coordinates[1];
        var dist = calculateDistanceUsingLatandLong(
          //This is hessian function that takes lat and long of two points and use it to calculate the distance between two points.
          userLat,
          userlong,
          AnimalLat,
          AnimalLong
        );
        if (dist < 5) {
          data.push(value);
        }
      });
    }
    await User.findByIdAndUpdate(userIdQuery, {
      InjuredAnimalNearby: data,
    });
    return res.status(200).json(data); //Return the list of the nearby animals based on user location so that user could save them
  },
  reportInjuredAnimal: async (req, res) => {
    const userIdQuery = req.query.userId;
    const CurrentUser = await User.findById(userIdQuery);
    try {
      const reportedAnimal = await Animal.create({
        AnimalType: req.body.AnimalType,
        AnimalCondition: req.body.AnimalCondition,
        AnimalAddress: req.body.AnimalAddress,
        UserNamewhoReported: CurrentUser.UserName,
        isAnimalReported: true,
      });
      const updateUserAnimalStatus = await User.findByIdAndUpdate(userIdQuery, {
        animalReported: reportedAnimal,
        hasReportedAnimal: true,
      });
      return res.status(200).json(updateUserAnimalStatus);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  checkInjuredAnimalStatus: async (req, res) => {
    const userIdQuery = req.query.userId;
    const CurrentUser = await User.findById(userIdQuery);
    CurrentUser.animalReported.forEach((value) => {
      if (value.isAnimalReported) {
        return res.status(200).json({
          AnimalType: value.AnimalType,
          AnimalCondition: value.AnimalCondition,
          Address: value.AnimalLocation.formattedAddress,
          ReporterName: value.UserNamewhoReported,
          ReporterAdrress: CurrentUser.location.formattedAddress,
          Message:
            "The animal is reported. Waiting for the doctor to arrive at the location to help the animal",
        });
      } else if (value.hasDocterArrived && value.isAnimalSaved) {
        User.findByIdAndUpdate(userIdQuery, {
          animalReported: [],
        });
        return res.status(200).json({
          Mesaage: "Animal is saved.",
        });
      } else if (
        value.isCriticalMedicalCareRequired &&
        value.hasSeriousInjury
      ) {
        return res.status(200).json({
          Mesage:
            "Go the critical section inorder to provide the immediate help to this animal",
        });
      } else {
        return res.status(200).json({
          Message: "There is no current animal that you have reported",
        });
      }
    });
  },
  addUserPetRecord: async (req, res) => {
    const userid = req.query.id;
    const CurrentUser = await User.findById(userid);
    try {
      const pet = new Pet({
        Petname: req.body.Petname,
        Pettype: req.body.Pettype,
        PetBreed: req.body.PetBreed,
        Petage: req.body.Petage,
        PetParent: CurrentUser.UserName,
        PetParentLoation: CurrentUser.location.formattedAddress,
      });
      const newPet = await pet.save();
      const updatedPetDetails = await User.findByIdAndUpdate(userid, {
        hasPet: true,
        PetDetails: newPet,
      });
      return res.status(200).json(updatedPetDetails);
    } catch (e) {
      return res.status(500).json({
        Message: e,
      });
    }
  },
  getPetDetails: async (req, res) => {
    const userId = req.query.id;
    const CurrentUser = await User.findById(userId);
    try {
      if (CurrentUser.PetDetails) {
        CurrentUser.PetDetails.forEach(async (PetData) => {
          const petId = PetData._id.toHexString();
          const UserPet = await Pet.findById(petId);
          return res.status(200).json(UserPet);
        });
      } else {
        return res.status(200).json({
          Message: "Currently , you have'nt added any pet in our pet records.",
        });
      }
    } catch (e) {
      return res.status(500).json({
        Message: e,
      });
    }
  },
  chosePetDoctor: async (req, res) => {
    //display list of doctor availaible and show it to the user.
    //user chose the doctor
    //pass the id from th frontend to the url route when user clicks on update doctor details
    //use that id to fetch doctor details
    //update pet doctor details attribute with the doctor name chosed based on the id
    const userId = req.query.id;
    const CurrentUser = await User.findById(userId);
    const docId = req.query.did;
    try {
      const chosenDocterDetails = await Docter.findById(docId);
      CurrentUser.PetDetails.forEach(async (PetData) => {
        const petId = PetData._id.toHexString();
        const PetDoctor = await Pet.findByIdAndUpdate(petId, {
          Petdoctor: chosenDocterDetails.DocterName,
          PetDoctorId: chosenDocterDetails._id,
        });
        const updateDoctorClient = await Docter.findByIdAndUpdate(
          chosenDocterDetails._id,
          {
            PatientPetId: petId,
          }
        );
        console.log(updateDoctorClient);
        return res.status(200).json(PetDoctor);
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  updatePetSickStatus: async (req, res) => {
    // on frontend user clicks on the sick button , adds the reason why the pet might be sick , doctro who regularly checks the pet sees the sick stayus and then prescribes a medicine to the pet
    const userId = req.query.id;
    const CurrentUser = await User.findById(userId);
    try {
      CurrentUser.PetDetails.forEach(async (PetData) => {
        console.log(PetData.Petdoctor);
        const petId = PetData._id;
        if (!PetData.isPetSick) {
          const pet = await Pet.findByIdAndUpdate(petId, {
            isPetSick: true,
          });
          return res.status(200).json({
            Message:
              "You have updated your pet sickness , please wait for some time until your pet doctor " +
              PetData.Petdoctor +
              " is availaible.",
          });
        }
        if (PetData.MedicalPresecription != null) {
          await Pet.findByIdAndUpdate(petId, {
            isPetSick: false,
          });
          return res.status(200).json({
            Notify: "Your pet " + PetData.Petname + " sick status is changed.",
          });
        }
      });
    } catch (e) {
      return res.status(500).json({
        Message: "No pet details are found.",
      });
    }
  },
};

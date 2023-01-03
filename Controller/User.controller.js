const User = require("../Model/User.model");
const Animal = require("../Model/Animal.model");
const Pet = require("../Model/Pet.modal");
const Docter = require("../Model/Docter.model");
const Ngo = require("../Model/Ngo.model");
const { sign } = require("jsonwebtoken");
const PaymentGateway = require("../Middleware/payment.middleware");
const AdoptedAnimal = require("../Model/AdoptedAnimal.model");

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
        PetParentId: CurrentUser._id,
        Petage: req.body.Petage,
        PetParent: CurrentUser.UserName,
        PetParentLoation: CurrentUser.location.formattedAddress,
      });
      const data = [];
      const newPet = await pet.save();
      const pushValue = data.push(newPet);
      const updatedPetDetails = await User.findByIdAndUpdate(userid, {
        hasPet: true,
        $push: {
          PetDetails: data,
        },
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
  donateFundsToNgo: async (req, res) => {
    const userId = req.query.id;
    const ngoId = req.query.nId;
    const CurrentUser = await User.findById(userId);
    const ngo = await Ngo.findById(ngoId);
    try {
      //user would get the list of the ngo
      //user would decide the ngo where they want to provide funds (update the schema here, user would contain the lst of ngo where they have donated)
      //using id of that particular ngo would pass to the frontend using useparams
      //using id , user would provide the fund to that particular ngo account
      const userData = {
        Amount: req.body.Amount,
        Name: CurrentUser.UserName,
        Address: CurrentUser.location.formattedAddress,
      };
      const ngoData = {
        Ngoname: ngo.Ngoname,
        NgoAddress: ngo.location.formattedAddress,
        NgoPhn: ngo.NgoPhno,
        Amount: "500",
      };
      console.log(userData);
      console.log(ngoData);
      const amount = Number(userData.Amount);
      const data = [];
      data.push(ngoData);
      await PaymentGateway("Payment for the animal rescue", ngo.Ngoname, amount)
        .then(async (result) => {
          const updateDonatedNgoList = await User.findByIdAndUpdate(userId, {
            $push: {
              donatedtoNgo: data,
            },
          });
          console.log(updateDonatedNgoList);
          return res.status(200).json({
            Success:
              "Your donation of amount " +
              amount +
              " is successfull to the the ngo " +
              ngo.Ngoname +
              " . Thank you for your help.",
          });
        })
        .catch((e) => {
          return res.status(500).json(e);
        });
      //call the functin of the payment and pass the parameters
      //once the payment is done , pass the success respone
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getDonatedNgoList: async (req, res) => {
    const userId = req.query.id;
    const CurrentUser = await User.findById(userId);
    try {
      CurrentUser.donatedtoNgo.forEach((value) => {
        console.log(value);
        return res.status(200).json(value);
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  adoptAnimal: async (req, res) => {
    const userId = req.query.id;
    const aniId = req.query.nId;
    const CurrentUser = await User.findById(userId);
    const Animal = await AdoptedAnimal.findById(aniId);
    try {
      console.log(CurrentUser._id);
      const upadateAdopterId = await AdoptedAnimal.findByIdAndUpdate(aniId, {
        AdopterId: CurrentUser._id.toHexString(),
        isAdopted: true,
        AdopterName: CurrentUser.UserName,
      });
      const AnimalData = {
        Name: Animal.Name,
        NgoName: Animal.NgoName,
        Type: Animal.Type,
        AdopoterId: Animal.AdopterId,
      };
      console.log(AnimalData);
      const data = [];
      data.push(AnimalData);
      const updateUserAdoptedArray = await User.findByIdAndUpdate(userId, {
        $push: {
          AdoptedAnimal: data,
        },
      });
      console.log(updateUserAdoptedArray);
      return await res.status(200).json(CurrentUser.AdoptedAnimal);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getAdoptedAnimal: async (req, res) => {
    const userId = req.query.id;
    const CurrentUser = await User.findById(userId);
    try {
      return res.status(200).json(CurrentUser.AdoptedAnimal);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};

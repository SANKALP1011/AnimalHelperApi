const User = require("../Model/User.model");
const Animal = require("../Model/Animal.model");

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
      var long = NewUser.location.coordinates[0];
      var lat = NewUser.location.coordinates[1];
      var diff = long - lat;
      console.log(diff);
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
      console.log(findUser._id);
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
};

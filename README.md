# AnimalHelperApi
- 🚧  WORK IN PROGRESS  🚧 !!!
- This is the animal helper api where user could find the nearby injured animals by using location and provide help to them , keep track of their pet health status and various other features. Ngo would have also have the functionality to keep track of the well being stary animals and get donation from the user so that they could provide the help to the those voiceless creatures. Doctor would also have various functionalities of saving the animal and keeping track of the animal status.

# Location Functionality
- As we are going to find the nearby animals , doctors and ngo , we have to get the real time locations of the user once they registers on the app.
- In order to get this done , we are going the get the lovcaion of the entities and then convert the location into the latitude and longitude with the help of the geocoder module.
- Once we get the latitude and longitude of point A and point B , we are going to run the hessian function over the lat and long of the both the points and use it to find the distance between two points.
- If distance < 5 km , we are going show the animal , doctor or the ngo to the user.

# Postman Test 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24017825-a959f473-483a-4ddd-bfac-094d0297720e?action=collection%2Ffork&collection-url=entityId%3D24017825-a959f473-483a-4ddd-bfac-094d0297720e%26entityType%3Dcollection%26workspaceId%3Df2b12af0-a49e-4840-9374-8ddb87c32cc7)

# Framework
  - Node and express for the backend
# Database
  - MongoDB as the database
# Deployment 
  - Heroku for the deployment

# Functionalities 
  # USER 

- SignUp
- LogIn
- getNearbyAnimal
- reportInjuredAnimal
- checkInjuredAnimalStatus
- addUserPetRecord
- getPetDetails
- chosePetDoctor
- updatePetSickStatus
- donateFundsToNgo
- getDonatedNgoList
- adoptAnimal
- getAdoptedAnimal

# NGO 

- NgoSignUp
- NgoLogIn
- addStrayAnimals
- getListOfAnimals
- addAnimalforAdoption
- getVaccinatedDetails

# DOCTOR 

- DocterSignUp
- DocterLogIn
- nearbyAnimal
- provideAnimalHelp
- updatePetHealthCard
- userPetCheckup
- vaccinateStrayAnimals

# ANIMAL 

- addInjuredAnimal
- getInjuredAnimalList

# Routes 
 - USER 
``` javascript
UserRouter.post("/SignUp", SignUp);
UserRouter.get("/LogIn", LogIn);
UserRouter.get("/getNearbyAnimal", getNearbyAnimal);
UserRouter.post("/reportInjuredAnimal", reportInjuredAnimal);
UserRouter.get("/injuredAnimalStatus", checkInjuredAnimalStatus);
UserRouter.post("/addPet", addUserPetRecord);
UserRouter.get("/petDetails", getPetDetails);
UserRouter.post("/updatePetStatus", updatePetSickStatus);
UserRouter.post("/choseDoctor", chosePetDoctor);
UserRouter.post("/ngoFund", donateFundsToNgo);
UserRouter.get("/donatedNgoList", getDonatedNgoList);
UserRouter.post("/adoptAnimal", adoptAnimal);
UserRouter.get("/getAdoptedAnimal", getAdoptedAnimal);

```
 - DOCTOR
  ``` javascript
DocterRouter.post("/docterSignUp", DocterSignUp);
DocterRouter.post("/docterLogIn", DocterLogIn);
DocterRouter.get("/nearByAnimal", nearbyAnimal);
DocterRouter.post("/animalHelp", provideAnimalHelp);
DocterRouter.post("/updateHealth", updatePetHealthCard);
DocterRouter.get("/getPatient", userPetCheckup);
DocterRouter.post("/vaccinateStray", vaccinateStrayAnimals);
  ```
 - NGO
 ``` javascript
 NgoRouter.post("/ngo/signUp", NgoSignUp);
NgoRouter.post("/ngo/logIn", NgoLogIn);
NgoRouter.post("/ngo/strayList", addStrayAnimals);
NgoRouter.get("/ngo/getStrayList", getListOfAnimals);
NgoRouter.post("/ngo/addAdoptList", addAnimalforAdoption);
NgoRouter.get("/ngo/vaccDetails", getVaccinatedDetails);
 ```

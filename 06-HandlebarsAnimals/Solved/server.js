var express = require("express");

var app = express();
var port = process.env.port || 3000;

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var animals = [
  {
    animalType: "dog",
    pet: true,
    fierceness: 4
  }, {
    animalType: "cat",
    pet: true,
    fierceness: 10
  }, {
    animalType: "giraffe",
    pet: false,
    fierceness: 4
  }, {
    animalType: "zebra",
    pet: false,
    fierceness: 8
  }, {
    animalType: "lion",
    pet: false,
    fierceness: 10
  }
];

app.get("/dog", function(req, res) {
  // Handlebars requires an object to be sent to the dog handlebars file.
  // Lucky for us, animals[0] is an object!

  // 1. send the dog object from the animals array to the dog handlebars file.
  res.render("dog", animals[0]);
});

app.get("/all-pets", function(req, res) {
  // Handlebars requires an object to be sent to the index handlebars file.

  // 2. Loop through the animals, and send those that are pets to the index handlebars file.
  var data = {
    anims: []
  };

  for (var i = 0; i < animals.length; i += 1) {
    // Get the current animal.
    var currentAnimal = animals[i];

    // Check if this animal is a pet.
    if (currentAnimal.pet) {
      // If so, push it into our data.anims array.
      data.anims.push(currentAnimal);
    }
  }

  res.render("index", data);
});

app.get("/all-none-pets", function(req, res) {
  // Handlebars requires an object to be sent to the index handlebars file.

  // 3. Loop through the animals, and send those that are not pets to the index handlebars file.
  var data = {
    anims: []
  };

  for (var i = 0; i < animals.length; i += 1) {
    // Get the current animal.
    var currentAnimal = animals[i];

    // Check if this animal is a pet.
    if (!currentAnimal.pet) {
      // If not, push it into our data.anims array.
      data.anims.push(currentAnimal);
    }
  }
  res.render("test", data);
});

app.get("/fiercest", function(req, res) {

  var gelData = {
    anims: []
  };

  for (var i = 0; i < animals.length; i += 1) {
    // Get the current animal.
    var currentAnimal = animals[i];
    console.log(currentAnimal.fierceness);
    //Check if this animal is a pet.
    if (currentAnimal.fierceness == 10) {
      
      gelData.anims.push(currentAnimal);
    }
  }
  res.render("test", gelData);
});

app.listen(port, function (){
  console.log("listening on port: ", port);
});

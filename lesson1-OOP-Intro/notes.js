let cat = {
  name: "Fluffy",

  makeNoise() {
    console.log("Meow!");
  },
};

let dog = {
  name: "Max",

  makeNoise() {
    console.log("Woof!");
  },
};

let peter = {
  name: "peter",
  pets: [],
};

peter.pets.push(cat);
peter.pets.push(dog);

// console.log(peter);

function Car(make, fuelLevel, engineOn) {
  this.make = make;
  this.fuelLevel = fuelLevel;
  this.engineOn = engineOn;

  this.drive = function () {
    this.fuelLevel -= 0.1;
  };

  this.startEngine = function () {
    this.engineOn = true;
  };

  this.stopEngine = function () {
    this.engineOn = false;
  };

  this.refuel = function (percent) {
    if (this.fuelLevel + percent / 100 <= 1) {
      this.fuelLevel += percent / 100;
    } else {
      this.fuelLevel = 1;
    }
  };
}

let raceCar1 = new Car("BMW", 0.5, false);

// console.log(raceCar1);

// Think that it wants me to return an object, not create a new
// object here. So lets do that methodology as well.

function createCar(make, fuelLevel, engineOn) {
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    drive() {
      this.fuelLevel -= 0.1;
    },

    startEngine() {
      this.engineOn = true;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if (this.fuelLevel + percent / 100 <= 1) {
        this.fuelLevel += percent / 100;
      } else {
        this.fuelLevel = 1;
      }
    },
  };
}

let bmw = createCar("BMW", 0.5, false);
let ferrari = createCar("Ferrari", 0.7, true);
let jaguar = createCar("Jaguar", 0.4, false);

jaguar.drive();

console.log(jaguar);

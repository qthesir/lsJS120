/*
This exercise re-examines exercise 3 from the previous chapter. In that exercise, you wrote a class hierarchy to 
represent vehicles of various types. In this exercise, we'll rewrite that solution using the constructor/prototype pattern.

Using the constructor/prototype pattern, create some types that represent vehicles, including cars, boats, and planes as 
specific kinds of vehicles. All vehicles should be able to accelerate and decelerate. Cars should be able to honk, 
boats should be able to drop anchor, and planes should be able to take off and land. Test your code.
*/

function Vehicle(color, weight) {
  this.color = color;
  this.weight = weight;
}

Vehicle.prototype.accelerate = function () {
  return `This ${this.weight} lb ${this.constructor.name} is Accelerating`;
};

Vehicle.prototype.decelerate = function () {
  return `This ${this.weight} lb ${this.constructor.name} is Decelerating`;
};

function Car(color, weight, licenseNumber) {
  Vehicle.call(this, color, weight);
  this.licenseNumber = licenseNumber;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.honk = function () {
  return `Beep beep`;
};

function Boat(color, weight, homePort) {
  Vehicle.call(this, color, weight);
  homePort = homePort;
}
Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.dropAnchor = function () {
  return `Dropping anchor`;
};

function Plane(color, weight, airline) {
  Vehicle.call(this, color, weight);
  this.airline = airline;
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.takeOff = function () {
  return `Taking off`;
};
Plane.prototype.land = function () {
  return `Landing`;
};

let car = new Car("Red", 3300, "BOXEATR");
let boat = new Boat("Blue", 14000, "Boston");
let plane = new Plane("Silver", 35000, "Delta");

console.log(car.accelerate());
console.log(car.decelerate());
console.log(car.honk());
console.log(boat.color);
console.log(boat.dropAnchor());
console.log(plane.color);
console.log(plane.takeOff());
console.log(plane.land());

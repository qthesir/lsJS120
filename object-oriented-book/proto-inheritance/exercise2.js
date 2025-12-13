/*
This exercise re-examines exercise 3 from the previous chapter. In that exercise, you wrote a class hierarchy to 
represent vehicles of various types. In this exercise, we'll rewrite that solution using the constructor/prototype pattern.

Using the constructor/prototype pattern, create some types that represent vehicles, including cars, boats, and planes as 
specific kinds of vehicles. All vehicles should be able to accelerate and decelerate. Cars should be able to honk, 
boats should be able to drop anchor, and planes should be able to take off and land. Test your code.
*/

function Vehicle(name) {
  this.name = name;
}

Vehicle.prototype.accelerate = function () {
  return `This ${this.name} ${this.constructor.name} is Accelerating`;
};

Vehicle.prototype.decelerate = function () {
  return `This ${this.name} ${this.constructor.name} is Decelerating`;
};

function Car(name) {
  Vehicle.call(this, name);
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.honk = function () {
  return `Beep beep`;
};

function Boat() {}
Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.dropAnchor = function () {
  return `Dropping anchor`;
};

function Plane() {}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.takeOff = function () {
  return `Taking off`;
};
Plane.prototype.land = function () {
  return `Landing`;
};

let car = new Car("Jerry");
let boat = new Boat();
let plane = new Plane();

console.log(car.accelerate());
console.log(car.decelerate());
console.log(car.honk());
console.log(boat.dropAnchor());
console.log(plane.takeOff());
console.log(plane.land());

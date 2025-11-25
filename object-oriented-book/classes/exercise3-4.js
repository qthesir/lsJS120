class Vehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }

  accelerate() {
    console.log(
      `This ${Object.getPrototypeOf(this).constructor.name} is speeding up`
    );
  }

  decelerate() {
    console.log(
      `This ${Object.getPrototypeOf(this).constructor.name} is slowing down`
    );
  }
}

class Car extends Vehicle {
  constructor(color, weight, licenseNumber) {
    super(color, weight);
    this.licenseNumber = licenseNumber;
  }

  honk() {
    console.log("Beep beep");
  }
}

class Boat extends Vehicle {
  constructor(color, weight, homePort) {
    super(color, weight);
    this.homePort = homePort;
  }

  dropAnchor() {
    console.log("Dropping anchor!");
  }
}

class Plane extends Vehicle {
  constructor(color, weight, airline) {
    super(color, weight);
    this.airline = airline;
  }

  takeOff() {
    console.log("Preparing to take off");
  }

  land() {
    console.log("Preparing to land");
  }
}

const car = new Car("red", 3500, "BOXEATR");
const boat = new Boat("brown", 12000, "San Francisco");
const plane = new Plane("silver", 50000, "Delta");

console.log(car);
car.accelerate();
car.decelerate();
car.honk();
console.log("");
console.log(boat);
boat.accelerate();
boat.decelerate();
boat.dropAnchor();
console.log("");
console.log(plane);
plane.accelerate();
plane.decelerate();
plane.takeOff();
plane.land();

/*
Exercise 4

Using the solution to the previous exercise, demonstrate that cars and boats are both instance objects of the Vehicle class, 
that cars are instance objects of the Car class, but boats are not instance objects of the Car class.
*/

console.log(car instanceof Vehicle);
console.log(boat instanceof Vehicle);

console.log(Object.getPrototypeOf(Object.getPrototypeOf(car)).constructor.name);

console.log(car instanceof Car);
console.log(boat instanceof Car);

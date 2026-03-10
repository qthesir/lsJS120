class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  static NUMBER_OF_WHEELS = 4;
  constructor(make, model) {
    super(make, model, Car.NUMBER_OF_WHEELS);
  }
}

class Motorcycle extends Vehicle {
  static NUMBER_OF_WHEELS = 2;
  constructor(make, model) {
    super(make, model, Motorcycle.NUMBER_OF_WHEELS);
  }
}

class Truck extends Vehicle {
  static NUMBER_OF_WHEELS = 6;
  constructor(make, model, payload) {
    super(make, model, Truck.NUMBER_OF_WHEELS);
    this.payload = payload;
  }
}

let car = new Car("Toyota", "Camry");

console.log(car.getWheels());
console.log(car.info());

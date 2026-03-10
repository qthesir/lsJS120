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

/*
Does it make sense to write a getWheels method in the vehicle class? Yes. In my implementation,
I've used getWheels in the vehicle class and instead have wheels as state variables, which are 
held as static methods on the class and passed as constructor variables. If you wanted to maintain
the current approach by using a hard coded number in the method, it could make sense if vehicles
have, say, a default number of wheels as 4. Many vehicles have 4 wheels. SO you only overwrite the
value for wheels that dont. 
*/
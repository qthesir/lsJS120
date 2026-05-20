const towMixin = {
  tow() {
    return "I can tow a trailer!";
  }
}

class Truck {
  constructor() {
    Object.assign(this, towMixin);
  }
}

class Car {}

let truck = new Truck(2002);
console.log(truck.year);
console.log(truck.tow());

let car = new Car(2015);
console.log(car.year);
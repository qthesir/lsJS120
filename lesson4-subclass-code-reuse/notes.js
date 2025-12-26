let carPrototype = {
  start() {
    this.started = true;
  },

  stop() {
    this.started = false;
  },

  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  },
};

let car1 = Object.create(carPrototype);
car1.init("Toyota", "Camry", 2016);

console.log(car1);

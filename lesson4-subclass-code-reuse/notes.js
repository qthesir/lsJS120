// OLOO (Objects Linking to Other Objects)

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
    return this
  },
};

let car1 = Object.create(carPrototype).init("Toyota", "Camry", 2016);

console.log(car1);

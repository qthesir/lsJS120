function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;

  return console.log("Hi");
}

let car = new Car("honda", "accord", "2015");

console.log(Car());

let civicArgs = {
  make: "Honda",
  model: "Civic",
  year: "2015",
  started: false,
};

function Car2(args) {
  Object.assign(this, args);
  this.drive = function () {
    this.started = true;
  };
}

let car2 = new Car2(civicArgs);

console.log(car2);

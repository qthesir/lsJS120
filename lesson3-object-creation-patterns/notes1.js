function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;

  return console.log("Hi");
}

let car = new Car("honda", "accord", "2015");

console.log(Car());

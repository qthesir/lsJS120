/*
This exercise re-examines exercise 1 from the previous chapter. In that exercise, you wrote a class to 
instantiate smartphone objects. In this exercise, we'll rewrite that solution using the 
constructor/prototype pattern.

Using the constructor/prototype pattern, create a type that represents smartphones. Each smartphone should have a 
brand, model, and release year. Add methods that display the smartphone's information and check its 
battery level. Create objects that represent the following two smartphones:

Brand	Model	Release Year
Apple	iPhone 12	2020
Samsung	Galaxy S21	2021


*/

function Smartphone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;
  this.battery = 100;
}

Smartphone.prototype.displayInformation = function () {
  console.log(`${this.brand} ${this.model} ${this.releaseYear}`);
};

Smartphone.prototype.checkBattery = function () {
  console.log(`Battery level: ${this.battery}`);
};

let iPhone = new Smartphone("Apple", "iPhone 12", "2020");
let samsung = new Smartphone("Samsung", "Galaxy S21", "2021");

iPhone.displayInformation()
iPhone.checkBattery()
samsung.displayInformation()
samsung.checkBattery()

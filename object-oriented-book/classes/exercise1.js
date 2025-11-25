/*
This exercise re-examines exercise 2 from the previous chapter. In that exercise, you wrote an object 
factory to instantiate objects that represent smartphones. In this exercise, we'll rewrite that 
factory using a class.

Write a class that can be used to instantiate objects that represent smartphones. Each smartphone 
should have a brand, model, and release year. Add methods to check the battery level and to 
display the smartphone's information. Create objects that represent the following 2 smartphones:

Brand	Model	Release Year
Apple	iPhone 12	2020
Samsung	Galaxy S21	2021

*/

class Smartphone {
  constructor(brand, model, releaseYear) {
    this.brand = brand;
    this.model = model;
    this.releaseYear = releaseYear;
    this.batteryLevel = 100;
  }

  displayInformation() {
    console.log(`${this.releaseYear} ${this.brand} ${this.model}`);
  }

  checkBattery() {
    console.log(
      `${this.brand} ${this.model} battery remaining: ${this.batteryLevel}%`
    );
  }
}

const iphone12 = new Smartphone("Apple", "iPhone 12", 2020);
const galaxyS21 = new Smartphone("Samsung", "Galaxy S21", 2021);

iphone12.displayInformation();
iphone12.checkBattery();

galaxyS21.displayInformation();
galaxyS21.checkBattery();

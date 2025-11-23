/*
This exercise re-examines exercise 4 from the previous chapter. In that exercise, you wrote a 
constructor function to instantiate smartphone objects. In this exercise, we'll 
rewrite that constructor as an object factory.

Write a factory function that creates objects that represent smartphones. 
Each smartphone should have a brand, model, and release year. Add methods to check 
the battery level and to display the smartphones's information. Create objects that 
represent the following two smartphones:

Brand	Model	Release Year
Apple	iPhone 12	2020
Samsung	Galaxy S21	2021

*/

function createSmartphone(brand, model, releaseYear) {
  return {
    brand,
    model,
    releaseYear,
    battery: 100,

    displayInformation() {
      return `This is an ${this.brand} ${this.model}, released ${this.releaseYear}.`;
    },

    checkBattery() {
      return `${this.brand} ${this.model} has ${this.battery}% battery remaining.`;
    },
  };
}

let iphone12 = createSmartphone("Apple", "iPhone 12", 2020);
let galaxyS21 = createSmartphone("Samsung", "Galaxy S21", 2021);

console.log(iphone12.displayInformation());
console.log(galaxyS21.displayInformation());
console.log(iphone12.checkBattery());

function Smartphone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;

  this.batteryLevelInPercent = 100;

  this.checkBatteryLevel = function () {
    return `Battery has ${this.batteryLevelInPercent}% remaining`;
  };

  this.displayInformation = function () {
    return `Brand: ${this.brand}\nModel: ${this.model}\nRelease Year: ${this.releaseYear}`;
  };
}

let apple = new Smartphone("Apple", "iPhone 12", 2020);
let samsung = new Smartphone("Samsung", "Galaxy S21", 2021);

let batteryStatusApple = apple.checkBatteryLevel();
let samsungInformation = samsung.displayInformation();

console.log({ batteryStatusApple, samsungInformation });
console.log(samsungInformation)

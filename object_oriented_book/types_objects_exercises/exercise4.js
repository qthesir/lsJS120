function SmartPhone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;

  this.batteryLevelInPercent = 100;

  this.checkBatteryLevel = function () {
    console.log(`Battery has ${this.batteryLevelInPercent}% remaining`);
  };

  this.displayInformation = function () {
    console.log(
      `Brand: ${this.brand}\nModel: ${this.model}\nRelease Year: ${this.releaseYear}`
    );
  };
}

let apple = new SmartPhone("Apple", "iPhone 12", 2020);
let samsung = new SmartPhone("Samsung", "Galaxy S21", 2021);

apple.checkBatteryLevel();
samsung.displayInformation();

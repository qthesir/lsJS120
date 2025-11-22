const util = require("util");

let cocao = {
  animalType: "cat",
  name: "Cocoa",

  purr: function () {
    console.log("Purr");
  },

  info: function () {
    console.log(`My name is ${this.name}. I am a ${this.animalType}.`);
  },
};

cocao.purr();
cocao.info();

let bankAccount = {
  accountNumber: "1234567890",
  balance: 10234.56,
  accountType: "checking",
  name: "Jane Doe",
  address: "2246 NW 12th Ave, Portland, Oregon",
  phone: "456-334-1221",

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return amount;
    } else {
      return 0;
    }
  },

  deposit: function (amount) {
    this.balance += amount;
  },
};

let cat = {
  move() {
    console.log("The cat is walking");
  },
};

let planet = {
  move() {
    console.log("The planet is revolving around the Sun");
  },
};

for (let item of [cat, planet]) {
  item.move();
}

class Plant {
  photosynthesize() {
    console.log(`This ${this.constructor.name} is photosynthesizing`);
  }
  growRoots() {
    console.log(`This ${this.constructor.name} is growing roots`);
  }
}

class Tree extends Plant {
  growFruit() {
    console.log(`This ${this.constructor.name} is growing fruit`);
  }
}

class Flower extends Plant {
  bloom() {
    console.log(`This ${this.constructor.name} is blooming`);
  }
}

class Grass extends Plant {}

let tree = new Tree();
tree.photosynthesize();
tree.growFruit();
let flower = new Flower();
flower.photosynthesize();
flower.bloom();
let grass = new Grass();
grass.photosynthesize();
grass.growRoots();

console.log(Object.getPrototypeOf(Grass.prototype));
console.log(Plant.prototype);
console.log("Grass prototype:", Grass.prototype);
console.log(Plant.__proto__);
console.log(Grass.__proto__);
console.log(Grass.prototype.photosynthesize());

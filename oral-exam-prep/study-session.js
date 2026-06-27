// "use strict";

// function Dog(name) {
//   this.name = name
// }
// Dog.prototype.bark = function() {
//   console.log('Woof!')
// }

// let fido = Dog('Fido')
// fido.bark();
// console.log(fido instanceof Dog) // true

// let square = {
//   length: 5,
//   area() {
//     return this.length * this.length;
//   }
// }
// console.log(square.area()); // 25

// function createPerson(name, favoriteFood) {
//   return {
//     name,
//     favoriteFood,
//     introduce() {
//       console.log(
//         `Hi, my name is ${this.name}, and my favorite food is ${this.favoriteFood}!`
//       );
//     },
//   };
// }

// let person = createPerson("Gerald", "Tacos");

// person.introduce();

// function Person(name, favoriteFood) {
//   this.name = name;
//   this.favoriteFood = favoriteFood;
// }

// Person.prototype.introduce = function () {
//   console.log(
//     `Hi, my name is ${this.name}, and my favorite food is ${this.favoriteFood}!`
//   );
// };

// let person = new Person("Gerlald", "Tacos");

// person.introduce()

// Object.create()

// Object.assign()

// Object.setPrototypeOf()
/*
Brush up on Object.create() and Object.assign(). How do I set a prototype? Oh,
// Object.setPrototypeOf()
// */

// let sally = {
//   name: "Sally",
// };

// function greet() {
//   const printGreeting = () => {
//     console.log(`${this.name} says hello.`);
//   }

//   printGreeting();
// }

// greet.call(sally);

// let sally = {
//   name: "Sally",
// };

// function greet() {
//   function printGreeting() {
//     console.log(`${this.name} says hello.`);
//   }

//   printGreeting.call(this);
// }

// greet.call(sally);

// let sally = {
//   name: "Sally",
// };

// function greet() {
//   let self = this
//   function printGreeting() {
//     console.log(`${self.name} says hello.`);
//   }

//   printGreeting();
// }

// greet.call(sally);

// let cat = {
//   name: "Gerald",
//   breed: "Berman",

//   meow() {
//     console.log("Meow!");
//   },
//   sayHello() {
//     console.log(`Hi, my name is ${this.name}!`);
//   },
// };

// let dog = {
//   name: "Dalmation"
// }

// let greet = cat.sayHello

// greet.call(dog)

// let takesPictures = {
//   takePicture() {
//     console.log('Taking a picture')
//   }
// }

// class Computer {
//   connect() {
//     return `I connected to the internet!`;
//   }
// }

// class Phone extends Computer {}
// Object.assign(Phone.prototype, takesPictures)

// class Camera {}
// Object.assign(Camera.prototype, takesPictures)

// class Polaroid {}
// Object.assign(Polaroid.prototype, takesPictures)

// let phone = new Phone()
// let camera = new Camera()
// let polaroid = new Polaroid()

// phone.takePicture()
// camera.takePicture()
// polaroid.takePicture()

// function printType() {
//   console.log(this.type);
// }

// let velociraptor = {
//   type: "velociraptor",
//   raptorType: function () {
//     printType.call(velociraptor);
//   },
// };

// let spinosaurus = {
//   type: "spinosaurus",
//   spinoType: printType,
// };

// velociraptor.raptorType();

// class Lamp {
//   constructor(type) {
//     this.type = type;
//   }
//   describe() {
//     return `This is a ${this.type} lamp.`;
//   }
// }

// class DeskLamp extends Lamp {
//   constructor(numBulbs, shadeType) {
//     super("desk");
//     this.numBulbs = numBulbs;
//     this.shadeType = shadeType;
//   }

//   describe() {
//     console.log(
//       `${super.describe()} It has ${this.numBulbs} bulbs and a ${
//         this.shadeType
//       } shade.`
//     );
//   }
// }

// const deskLamp = new DeskLamp(2, "frilled");
// deskLamp.describe();

/*
super keywords... Need to remember this for class syntax. 
*/

// let mammal = {
//   growFur() {
//     console.log('I am growing fur!')
//   }
// }

// let dog = Object.create(mammal)

// let swims = {
//   swim() {
//     console.log("I am swimming!")
//   }
// }

// Object.assign(dog, swims)

// dog.growFur()
// dog.swim()

let smashes = {
  smash() {
    console.log("smashing");
  },
};
let powered = {
  isPoweredOn: false,
  togglePower() {
    this.isPoweredOn = !this.isPoweredOn;
  },
};

class Tool {
  constructor(name, productNumber) {
    this.name = name;
    this.productNumber = productNumber;
    this.isInStock = true;
  }

  markOutOfStock() {
    this.isInStock = false;
  }

  markInStock() {
    this.isInStock = true;
  }
}

class Drill extends Tool {
  makeHole() {
    console.log("making a hole");
  }
}

class ManualDrill extends Drill {}

class PowerDrill extends Drill {}
Object.assign(PowerDrill.prototype, powered);

class Wrench extends Tool {
  rotate() {
    console.log("rotating");
  }
}
Object.assign(Wrench.prototype, smashes);

class Hammer extends Tool {
  pry() {
    console.log("prying");
  }
}
Object.assign(Hammer.prototype, smashes);

class HardWareStore {
  constructor() {
    this.productCatalog = [];
  }

  addItemToCatalog(product) {
    this.productCatalog.push(product);
  }

  markSoldOut(product) {
    product.markOutOfStock();
  }

  markInStock(product) {
    product.markInStock();
  }

  printInStockItems() {
    let inStockItems = this.productCatalog.filter((product) => {
      return product.isInStock;
    });

    console.log("Items in stock:");
    inStockItems.forEach((product) => console.log(`- ${product.name}`));
  }
}

let hardwareStore = new HardWareStore();
let hammer = new Hammer("Hammer", "1");
let manualDrill = new ManualDrill("Manual Drill", "2");
let powerDrill = new PowerDrill("Power Drill", "3");
let wrench = new Wrench("Wrench", "4");

hardwareStore.addItemToCatalog(hammer);
hardwareStore.addItemToCatalog(manualDrill);
hardwareStore.addItemToCatalog(powerDrill);
hardwareStore.addItemToCatalog(wrench);

hardwareStore.printInStockItems();
hardwareStore.markSoldOut(hammer);
hardwareStore.markSoldOut(manualDrill);
hardwareStore.printInStockItems();

console.log(powerDrill.isPoweredOn === false);
powerDrill.togglePower();
console.log(powerDrill.isPoweredOn === true);

/*

Nouns 
- Power tools
  - togglePower
- Tools
  - product number
  - Name
  - in stock or sold out 
- Manual Tools
- Wrenches
  - Smash
  - Rotate
- Hammers
  - Pry
  - Smash
- Manual Drills
- Power Drills
    - togglePower 
- Hardware Store
- Inventory

Verbs
- Smash
- Pry
- Rotate
- togglePower

Multiple inheritance is where a class inherits from more than one immediate superclass. 
Not like an inheritance chain, but directly from the same superclass. You cannot 
do multiple inheritance directly in javascript. The way you do it in problem domains
that require it 
*/

/*
Object.assign is a static method on the object constructor function that takes two parameters: one parameter, the target, and the second 
parameter, an object who's properties and values will be copied to the target object. It mutates the target object and returns undefined.
This is commonly a way that mixins are used to modify constructor functions, to assign them abilities that aren't necessarily an
"is-a" relationship.

Object.create is a static method on the object constructor funciton that takes one parameter, an object, and returns a new 
object that has the object passed in as a parameter set to its interal (object) prototype. 
*/

// let hibernatingMammal = {
//   hibernate() {
//     console.log("I am hibernating")
//   }
// }

// let bear = Object.create(hibernatingMammal)

// let swims = {
//   swim(){
//     console.log("I am swimming");
//   }
// }

// Object.assign(bear, swims)

// bear.hibernate()
// bear.swim()

// class Lamp {
//   constructor(type) {
//     this.type = type;
//   }
//   describe() {
//     return `This is a ${this.type} lamp.`;
//   }
// }

// class DeskLamp extends Lamp {
//   constructor(numBulbs, shadeType) {
//     super("Desk");
//     this.numBulbs = numBulbs;
//     this.shadeType = shadeType;
//   }

//   describe() {
//     console.log(
//       `${super.describe()}. It has ${this.numBulbs} bulbs and a ${
//         this.shadeType
//       } shade.`
//     );
//   }
// }

// const deskLamp = new DeskLamp(2, "frilled");
// deskLamp.describe();

// function Cat(name) {
//   this.name = name

// }

// Cat.prototype.speak = function() {
//   console.log(`${this.name} says meow!`);
// }

// Cat.about = function () {
//   console.log("Cats are awesome!")
// }

// let kitty = new Cat("Kitty");

// kitty.speak();
// Cat.about();

function createCar(make, model, year) {
  return {
    make: make,
    model: model,
    year: year,

    introduce() {
      console.log(`This is a ${this.year} ${this.make} ${this.model}`)
    }
  }
}

const car1 = createCar("Toyota", "Corolla", 1998);
const car2 = createCar("Ford", "Mustang", 2020);

car1.introduce(); // This is a 1998 Toyota Corolla.
car2.introduce(); // This is a 2020 - Ford Mustang.

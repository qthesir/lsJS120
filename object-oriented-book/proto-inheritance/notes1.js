class Animal {
  constructor(type) {
    this.type = type;
  }

  eat() {
    console.log("I am eating");
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super();
    this.name = name;
    this.color = color;
  }

  whoAmI() {
    console.log(
      `My name is ${this.name} and I am a ${this.color} ${this.constructor.name}`
    );
  }
}

let cheddar = new Cat("Cheddar", "Ginger");
cheddar.whoAmI();

let cheddarProto = Object.getPrototypeOf(cheddar);
let cheddarProto2 = Object.getPrototypeOf(cheddarProto);
console.log(Object.getOwnPropertyNames(cheddarProto));
console.log(Object.getOwnPropertyNames(cheddarProto2));
console.log(Object.getPrototypeOf(Cat));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(Cat)));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(Animal)));
console.log(Object.getOwnPropertyNames(Object.prototype));
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(Animal)) === Object.prototype
);
console.log(Cat.prototype instanceof Animal);

console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype);

// The class prototypes (not Cat.prototype, but Cat.getPrototypeOf) seem to inherit from the class
// constructor itself, whereas the Cat.prototype is the chain of whats specifically inherited by the
// instance, although the prototype of "Cat" in the above scenario seems to be of type Animal. Yes...
// Thats correct. The object prototype on the instance Cheddar is, in fact, an instanceof Animal.



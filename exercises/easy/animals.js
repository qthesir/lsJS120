class Animal {
  constructor(name, age, status, legs, species) {
    this.name = name;
    this.age = age;
    this.status = status;
    this.legs = legs;
    this.species = species;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, status, 4, "Cat");
  }

  introduce() {
    return `${super.introduce()} Meow meow!`
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, status, 4, "dog");
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}. Woof woof!`;
  }
}

let cat = new Cat("Pepe", 2, "happy");

let dog = new Dog("Gerald", 2, "playing", "Q");

console.log(cat.introduce());
console.log(dog.introduce());
console.log(dog.greetMaster());


/* Alternative implementation that I thought was interesting and wanted to note: 

introduce() {
    return Animal.prototype.introduce.call(this) + " Meow Meow!";
  }

*/
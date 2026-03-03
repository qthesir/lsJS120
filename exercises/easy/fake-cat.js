class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwwww`;
  }
}

let realCat = new Cat("Mellon");

let fakeCat = Object.create(Cat.prototype)

console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name); // logs undefined
console.log(fakeCat.speaks()); // logs undefined says meowwww.

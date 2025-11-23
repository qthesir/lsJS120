/*
Given the objects in the book, create an object factory that eliminates code duplication.
*/

function createFruit(name, color) {
  return {
    name,
    color,

    isRipe() {
      return `This ${this.name} is ripe.`;
    },

    describe() {
      return `This ${this.name} is ${this.color}.`;
    },
  };
}

let apple = createFruit("Apple", "Red");
let banana = createFruit("Bannana", "Yellow");
let blackberry = createFruit("Blackberry", "Black");

console.log(apple.isRipe());
console.log(apple.describe());

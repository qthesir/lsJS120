class Animal {}
class Cat extends Animal {}

let catInstance = new Cat();
let catProto = Object.getPrototypeOf(catInstance);

console.log(catProto === Cat.prototype); // true
let myProto = {
  meow() {
    console.log("Meow!");
  },
};

Object.setPrototypeOf(catInstance, myProto);

catProto = Object.getPrototypeOf(catInstance);

console.log(catProto === Cat.prototype); // False
console.log(catProto === myProto); // True
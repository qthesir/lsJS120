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

console.log(Object.getOwnPropertyNames(Function.prototype));
console.log(Object.getPrototypeOf(Animal) === Function.prototype);
console.log(Object.getPrototypeOf(Cat) === Animal);

// Interesting.... Arrow functions do not have function prototypes. They inherity 
// from the object prototype.

/*
Clarification: As we've seen, Object.getPrototypeOf returns the object prototype of an object. 
In this case, the object is a function, and the function's object prototype is Function.prototype. 
That happens to be a function prototype, but it is not the function prototype for foo.
 The function prototype, which would be referenced by foo.prototype if it existed, 
 is undefined since foo doesn't have a prototype property.
*/
function Dog(name, breed, weight) {
  // deleted Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function () {
  console.log(this.weight > 20 ? "Woof!" : "Yip!");
};

let maxi = new Dog("Maxi", "German Shepherd", 32);
maxi.bark(); // 'Woof!'

let biggie = new Dog("Biggie", "Whippet", 9);
biggie.bark(); // 'Yip!'

console.log(Dog.prototype.constructor.name);
console.log(biggie.constructor.name);
console.log(Object.getOwnPropertyNames(biggie));

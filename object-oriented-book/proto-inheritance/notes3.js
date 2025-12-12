function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(`${this.name} is eating.`);
};

function Mammal(name, hasFur) {
  // extends Animal
  // super(name) - we need to simulate super()
  Animal.call(this, name);
  this.hasFur = hasFur;
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

Mammal.prototype.sleep = function () {
  console.log(`${this.name} is sleeping.`);
};

function Dog(name, hasFur, breed) {
  // extends Mammal
  // super(name, hasFur) - we need to simulate super()
  Mammal.call(this, name, hasFur);
  this.breed = breed;
}

Dog.prototype = Object.create(Mammal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} the ${this.breed} is barking.`);
};

let myDog = new Dog("Rex", true, "German Shepherd");
myDog.eat(); // Rex is eating.
myDog.sleep(); // Rex is sleeping.
myDog.bark(); // Rex the German Shepherd is barking.

console.log(myDog instanceof Dog);
for (let i in myDog) {
  console.log(i);
}

/*
When you use the call method, which is on the function prototype, you're explicitly passing in an execution context.
Execution context would ordinarily be implicit via the object you're calling the method on, i.e. myDog.eat() calls 
eat on the myDog object, with myDog as its this. 
*/

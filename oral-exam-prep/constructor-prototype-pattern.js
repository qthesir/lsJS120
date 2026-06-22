function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(`${this.name} is eating`);
};

function Mammal(name, hasFur) {
  Animal.call(this, name);
  this.hasFur = hasFur;
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.sleep = function () {
  console.log(`${this.name} is sleeping`);
};

function Dog(name, hasFur, breed) {
  Mammal.call(this, name, hasFur)
  this.breed = breed;
}

Dog.prototype = Object.create(Mammal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  console.log(`${this.name} the ${this.breed} is barking`);
};

let rex = new Dog("Rex", true, "Dalmation");
console.log(rex instanceof Mammal);
console.log(Object.getPrototypeOf(rex) === Dog.prototype);
console.log(Dog.prototype instanceof Mammal);

rex.eat()
rex.sleep()
rex.bark()
console.log(rex.hasFur)

/*
Ah, the reason why instantiating an object without the new keyword is dangerous
(unless class syntax is used, which enforces it), is because the constructor function
will run without the new object set as its execution context. Instead, the constructor
will run with the global (node) or window (browser) objects as its execution context, 
and potentially overwrite values in the global scope. This is a nasty thing to debug. 

Have to remember, in the prototype / constructor pattern, only call the inherited function
once. Not animal, then its arg, then mammal, and its arg, just mammal and its two args,
because mammal runs its own Animal 

To recap, there are three significant steps here to have a subtype inherit from a supertype when using the constructor/prototype pattern:

Replace the function prototype for each subtype's constructor. To do that, use Object.create with an argument referencing the supertype's function prototype, and assign it to the subtype constructor's prototype property.
Set the subtype's prototype.constructor property to the subtype's constructor function.
In the subtype's constructor, call the supertype's constructor using Function.prototype.call. You should pass this as the first argument to call followed by the arguments for the supertype's constructor.
*/

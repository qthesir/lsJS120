function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`)
}

function Mammal (name, hasFur) {
  Animal.call(this, name)
  this.hasFur = hasFur
}

Mammal.prototype = Object.create(Animal.prototype)
Mammal.prototype.constructor = Mammal
Mammal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping`)
}

function Dog (name, hasFur, breed) {
  Animal.call(this, name)
  Mammal.call(this, hasFur)
  this.breed = breed
}

Dog.prototype = Object.create(Mammal.prototype)
Dog.prototype.constructor = Dog
Dog.prototype.bark = function() {
  console.log(`${this.name} the ${this.breed} is barking`)
}

let rex = new Dog('Rex', true, 'Dalmation')
console.log(rex instanceof Mammal)
console.log(Object.getPrototypeOf(rex) === Dog.prototype)
console.log(Dog.prototype instanceof Mammal)
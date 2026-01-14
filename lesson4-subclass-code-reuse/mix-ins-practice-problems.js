/* 
If we have a Car class and a Truck class, how can you use the Speed object as a 
mix-in to make them goFast? How can you check whether your Car or Truck can now 
go fast?
*/

const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  },
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Car.prototype = Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Truck.prototype = Object.assign(Truck.prototype, Speed);

let car = new Car
let truck = new Truck 

car.goFast()
truck.goFast()
car.goSlow()
truck.goVerySlow()

console.log('goFast' in car)
console.log('goFast' in truck) 
console.log('goFast' in Car.prototype)
console.log('goFast' in Truck.prototype)

// Trying to use my brain to come up with the pattern. Having trouble rembembering the pattern....
// Is it Object.create?

/*
In the last question, we used a mix-in named Speed that contained a goFast method. We 
included the mix-in in the Car class and then called the goFast method from an instance of the Car class. 
You may have noticed that the string printed when we call goFast includes the name of the type of vehicle 
we are using. How is that done?
*/

console.log(Object.getOwnPropertyNames(car))

/*
When a new class or constructor function is defined and the prototype property is not overwritten, the 
prototype will include a property called constructor, which returns the class or constructor function when
referenced. The class or constructor has a property called name, and that name contains a string of the 
variable name of the function. When the goFast method is called on an instance of car, this.constructor
will go up to the function prototype (car's prototype) to get the value of the constructor, which is the 
constructor function or class. Then, chaining the .name property returns the name of the function variable,
which in this case is Car, which is the value logged to the console.

Aside - how do you add an own method to a class or function and what was the name of that again? Cant 
remember.
*/
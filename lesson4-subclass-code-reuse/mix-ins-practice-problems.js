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

console.log(Object.getOwnPropertyNames(Car))

/*

*/
const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed)

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed)

let car = new Car() 
let truck = new Truck() 

car.goFast()
truck.goFast()

console.log('goFast' in car)
console.log('goFast' in truck)

/*
The way that the type of constructor was accessed by this.constructor.name, is that 
this referes to the object instance. The object instances, car or truck, do not have
a property called constructor, so JavaScript starts looking up its prototype chain
for constructor. car, for instance, inherits from Car.prototype, which has a property 
.constructor, which references the constructor function Car. Thus, this.constructor.name
referes to the .name property on the Car constructor function, which is equal to the 
constructor function's name, Car.  
*/
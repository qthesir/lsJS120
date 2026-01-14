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

let car = new Car();
let truck = new Truck();

car.goFast();
truck.goFast();
car.goSlow();
truck.goVerySlow();

console.log("goFast" in car);
console.log("goFast" in truck);
console.log("goFast" in Car.prototype);
console.log("goFast" in Truck.prototype);

// Trying to use my brain to come up with the pattern. Having trouble rembembering the pattern....
// Is it Object.create?

/*
2. In the last question, we used a mix-in named Speed that contained a goFast method. We 
included the mix-in in the Car class and then called the goFast method from an instance of the Car class. 
You may have noticed that the string printed when we call goFast includes the name of the type of vehicle 
we are using. How is that done?
*/

console.log(Object.getOwnPropertyNames(car));

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

STATIC method. And you use the static keyword in front of the function to define a static method. Very simple.
*/

/*
3. Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named 
Auto and Motorcycle to represent automobiles and motorcycles. After they noticed that the information and 
calculations performed was common to both vehicle types, they decided to break out the commonality into a 
separate class named WheeledVehicle. Their code, thus far, looks like this:
*/

const WheeledVehicle = {
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  },

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  },
};

class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
}

class Auto extends Vehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super(50, 25.0);
    this.tires = [30, 30, 32, 32];
  }
}

Object.assign(Auto.prototype, WheeledVehicle);

class Motorcycle extends Vehicle {
  constructor() {
    // array represents tire pressure for two tires
    super(80, 8.0);
    this.tires = [20, 20];
  }
}

Object.assign(Motorcycle.prototype, WheeledVehicle);

class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

let catamaran = new Catamaran(4, 1, 10, 40);
let motorcycle = new Motorcycle();
console.log(catamaran.hullCount);
console.log(motorcycle.tirePressure(1));
/*
This new class doesn't fit well with our existing class hierarchy: Catamarans don't have tires, and aren't 
wheeled vehicles. However, we still want to share the code for tracking fuel efficiency and range. 
Modify the class definitions and move code into a mix-in, as needed, to share code between the 
Catamaran and the wheeled vehicle classes.
*/

/*
Hm... Well, for the mix-in, I understand how to share the functions.

Thats what I did. I shared functions. But I wasn't able to easily create properties... Could I somehow extend this? 
How can I extend the class in order to accomodate the properties? I only know how to mix in functions... 

Hm. The LS solution is different than my solution, and I don't really like the way that LS did it. Each of these things 
is a vehicle, and every vehicle uses gasoline. There are wheeled vehicles and aquatic vehicles, similar to flying birds and 
swimming birds. If there were a special set of functions for the aquatic vehicles, then we would add a mix-in for those 
aquatic vehicles. In the LS solution, if aquatic vehicles had a separate set of functions, you'd have to create a whole new class. 
Well, on further reflection, this case is different than the flying birds case, because in the flying birds case, there were 
birds that could both swim and fly. This is not the case with this example, where, for most conceivable consumer cases, there will
not be a vehicle that is both a boat and wheeled (military is a different story). It still feels cleaner to do it the way I did. 

Thoughts?

... Got a really good LS bot response from that prompt. Very nice response. 

Key thing here, that I now understand about the LS bot solution: The LS bot solution is extracting a specific set of shared 
*behavior* that exists outside the class. For 
*/
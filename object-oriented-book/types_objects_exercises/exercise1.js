/*
1. Create an object that represents a Cessna 152 aircraft. The aircraft 
should include information that shows its fuel capacity of 24.5 gallons 
and a cruising speed of 111 knots. The aircraft should be able to take off and land.

Identify the state and behavior items in this object.
*/

function Aircraft(name) {
  this.name = name;

  this.fuelCapacity = 24.5;

  this.cruisingSpeed = 111;

  this.takeOff = function () {
    console.log("WHOOOOSH");
  };

  this.land = function () {
    console.log("Coming in for a landing");
  };
}

let cessna152 = new Aircraft("Cessna 152");

console.log(cessna152.name);
console.log(cessna152.fuelCapacity);
console.log(cessna152.cruisingSpeed);

cessna152.takeOff();
cessna152.land();

// alternative

let Aircraft_2 = {
  takeOff: function() {
    console.log("WHOOOOSH");
  },
  land: function() {
    console.log("coming in for a landing");
  },
};

let cessna152_2 = Object.assign({}, Aircraft_2);

cessna152_2.name = "Cessna 152";
cessna152_2.fuelCapacity = "24.5 gallons";
cessna152_2.cruisingSpeed = "111 knots";

console.log(cessna152_2)
cessna152_2.takeOff()
cessna152_2.land()

/* 
The state on this object is the information about the aircraft - that is, its name, fuel capacity, and 
cruising speed. The objects behavior are the two methods, takeOff and land. 

The object behavior are actions it can perform. Be explicit about this. taking off and landing are both 
actions the object can perform, and are encapsulated in methods. Sometimes, the actions / behaviors of the object
modify the actions it can perform. 
*/
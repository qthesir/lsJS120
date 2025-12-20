/*
1. What does the following code log to the console? Try to answer without running the code. 
Can you explain why the code produces the output it does?
*/

// let RECTANGLE = {
//   area: function () {
//     return this.width * this.height;
//   },
//   perimeter: function () {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

/*
The above code is going to log NaN in both line 24 and line 25. Inside the Rectangle constructor function, when the 
property this.area and this.perimeter are set on line 18 and line 19, respectively, the method .area and .perimeter
are called on the RECTANGLE object, which means that the function is run with RECTANGLE as its execution context. 
Therefore, this inside of perimeter and area will be the RECTANGLE object which do not have width or height properties, 
so this.width and this.height will both evaluate to undefined. When the mathematical operator + or * evaluates with 
undefined or another non-numerical data type as one of its operands, it evaluates to NaN. This is why 24 and 25 evaluate to NaN. 
*/

/*
2. How would you fix the code in problem 1?
*/

let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);

/*
Simplest solution is to use .call to pass the current objects this to the execution context. You could also 
accept width and height as parameters to the functions, but I think .call is cleaner. 
*/

/*
3. Write a constructor function called Circle that takes a radius as an argument. You should be 
able to call an area method on any objects created by the constructor to get the circle's area. 
Test your implementation with the following code:
*/

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return this.radius ** 2 * Math.PI;
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty("area")); // => false

/*
4. What will the following code log to the console and why? 
*/

// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// console.log(ninja.swingSword());

/*
The above code will log 'true', as you would expect. When the method swingSword is added to the 
Ninja.prototype property on line 97, this means that the ninja instance object defined on line 95 
will also be able to access swingSword, because its prototype references the object 
Ninja.prototype. However, if Ninja.prototype were set to a new object, then the prototype 
link would be broken, and any updates to the Ninja.prototype would not be reflected in ninja. 
*/

/*
5. What will the following code output and why? Try to answer without running the code.
*/

// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

/*
In this case, the console will log a type error, saying "ninja.swingSword is not a function" or something along
those lines. This is because Ninja.prototype is set to a brand new object on line 121. ninja, declared and
initialized on line 119, references the original Ninja.prototype object. When Ninja.prototype is initialized 
to a new object, the reference between the ninja instance object and the Ninja function prototype is broken. 
*/

/*
6. Implement the method described in the comments below:
*/

function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`


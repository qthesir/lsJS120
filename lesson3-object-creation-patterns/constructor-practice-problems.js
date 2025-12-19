/*
1. What naming convention separates constructor functions from other functions?

Consturctor functions use PascalCase instead of camelCase. That is, the first letter is capitalized.
*/

/*
2. What happens if you run the following code? Why? 
*/

// function Lizard() {
//   this.scamper = function() {
//     console.log("I'm scampering!");
//   };
// }

// let lizzy = Lizard();
// lizzy.scamper(); // ?

/*
If the following code is run without strict mode, it will return a TypeError. On line 17, Lizard is
called without the new keyword, and will return undefined, which is assigned to the variable lizzy. 
On line 18, when the .scamper() method is called on lizzy, the program will throw a TypeError 
because lizzy is undefined. 

In strict mode, the program would throw a TypeError on line 17, because 'this' inside the function 
Lizard would be set to undefined instead of the global object. 
*/

/*
3. Alter the code above so that it produces the desired output
*/

function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // ?
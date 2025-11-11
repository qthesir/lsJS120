/*
How do you create an object that doesn't have a prototype? How can you determine whether an 
object has a prototype?
*/

// The way you create an object that doesn't have a prototype is as follows:

let foo = { a: 1 };
Object.setPrototypeOf(foo, null);

// Another way:

let bar = Object.create(null);

// And the way that you tell if it doesn't have a prototype:
console.log(Object.getPrototypeOf(foo) === null);
console.log(Object.getPrototypeOf(foo) === null);

/*
I can explicitly set the prototype with Object.setPrototypeOf to null to ensure it doesn't have a 
prototype. The way I can check is to see if the prototype of an object is equal to null, as opposed
to another object or the Object.prototype default prototype. 

*/

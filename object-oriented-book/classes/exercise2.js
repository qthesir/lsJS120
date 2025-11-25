/*
If you have a Dog class and an object assigned to a variable named boo, how can you tell 
whether the object is an instance of the Dog class?
*/

class Dog {}

const boo = new Dog();

console.log(boo instanceof Dog); // true
console.log(Object.getPrototypeOf(boo).constructor.name); // Dog
console.log(boo); // Dog {}

/*
There are two ways, both of which are illustrated above. You can either test to see if dog is an instance of Dog with 
dog instanceof Dog. Or, you can check to see if the name of the constructor on the prototype of dog is equal to Dog.

As the LS solution pointed out, another way is to simply log the object. When you log the object, it should have 
the name of the type of object in front of it. I.e., Dog {}
*/

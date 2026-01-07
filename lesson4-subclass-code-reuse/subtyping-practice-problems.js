// Consider the following code:

function Greeting() {}

Greeting.prototype.greet = function (message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function () {
  this.greet("Hello!");
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function () {
  this.greet("Goodbye");
};

// What happens in each of the following cases? Try to answer without running the code.

// Case 1

let hello = new Hello();
hello.hi();

/*
The above code will print 'Hello!' to the console. hello is an instance of the Hello constructor,
which inherits from the Greeting constructor. When the hi() method is called on hello, the hi function
calls the .greet function on this (which is hello) with 'Hello!' passed as a parameter. The method greet
then logs the word 'Hello' to the console. 
*/

// Case 2

// let hello2 = new Hello();
// hello2.bye();

/*
The above code will throw a TypeError, because the .bye() method is only available on instances of the
Goodbye constructor function, and the hello2 is an instance of the Hello constructor function. When .bye() is
called on hello2, JavaScript will search the prototype chain for .bye() and find nothing. 
*/

// Case 3

let hello3 = new Hello();
hello3.greet();

/*
The above code will log undefined to the console. .greet() is a method of Greeting, and Hello is a subclass of 
Greeting. Therefore, instances of Hello will be able to access to .greet() method on the prototype of the 
Hello function prototype, which is hello3's prototype. The .greet() method takes message as a parameter, 
and since no parameter is passed, message will be undefined, so undefined is logged to the console. 
*/

// Case 4

let hello4 = new Hello();
hello4.greet('Goodbye');

/*
The above code will log "Goodbye" to the console. In this case, in contrast to case 3, 'Goodbye' is being passed as
a parameter to greet (as opposed to no parameter), and will be logged to the console. 
*/ 

// Case 5 

Hello.hi();

/*
The above will return a TypeError, as the property access .hi will return undefined, because the Hello 
constructor function has no method hi. The method hi is on the function prototype of Hello, not on the Hello
constructor itself. 
*/



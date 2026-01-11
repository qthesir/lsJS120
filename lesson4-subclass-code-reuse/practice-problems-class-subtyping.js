// 1. Suppose we have the following classes:

class Game {
  play() {
    return "Start the game!";
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }

  play() {
    return "Eyes down";
  }
}

let bingo = new Bingo();

console.log(bingo.play());

/*
What would happen if we added a play method to the Bingo class, keeping in mind that 
there is already a method of this name in the Game class from which the Bingo class 
inherits? Explain your answer. What do we call it when we define a method like this?
*/

/* 
If we add a "play" method to the Bingo class, the play method on the bingo class will
take precedence over the play method on the game class when play is called on an instance
of Bingo. That is, when Javascript is going up the protoype chain to find the method, 
it will stop at the first play property it sees, which will be on  the Bingo class 
function prototype rather than Game.  

As for the name of this... I can't quite remember. Its not shadowing. Its not overwriting.
Its some other term that I've forgotten.  

Here's what it is: When a subclass redfines a method that a superclass has already 
defined, we call this "method overriding."
*/

/*
Let's practice creating a class hierarchy.

Create a class named Greeting that has a single method named greet. The method should 
take a string argument, and it should print that argument to the console.

Now, create two more classes that inherit from Greeting: one named Hello, and the 
other Goodbye. The Hello class should have a hi method that takes no arguments and
logs "Hello". The Goodbye class should have a bye method that logs "Goodbye". Use 
the greet method from the Greeting class when implementing Hello and Goodbye; 
don't call console.log from either Hello or Goodbye.
*/

class Greeting {
  greet(message) {
    console.log(message);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}

let hello = new Hello();
let goodbye = new Goodbye();

hello.hi();
goodbye.bye();

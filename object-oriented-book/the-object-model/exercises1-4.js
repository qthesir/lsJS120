/*
EXERCISE 1: 

Consider an application that manages different types of animals, such as dogs, cats, and birds. Each animal can eat, 
sleep, make sounds, etc., but they each do so in different ways.

Which of the concepts discussed in this chapter most closely describes the features of the scenario described above?
*/

/*
The concept illustrated here most closely resembles that of inheritance. The subclass dogs, cats, and birds inherit a
set of like behaviors from a superclass, Animals. All animals sleep, make sounds, and eat. 

Apparently, I got this wrong. I suspected I may have. This actually more closely resembles polymorphism, as apparently, each
behavior is different enough that they are specific to that animal, and are not shared. I guess I was envisioning a 
shared method that used this to access their individualistic properties. In any case, you could call the same method on 
each animal with the same reference, but they would do different things. 
*/

/*
EXERCISE 2

Consider an application that uses and manipulates objects that represent automobiles. Each automobile has a make, model, year, 
and methods that provide the ability to start, drive, and park the vehicle. All automobiles share the same set of methods, 
but the make, model, and year will vary between automobiles.

Which of the concepts discussed in this chapter most closely describes the features of the scenario described above?

*/

/*
The above represents Encapsulation. You are bundling the state/properties of the automobile (make, model, year) and behaviors/methods 
(start, drive, and park) into the same entity (automobile). 

Slight clarification, based on the answer key: Each automobile has different state, but they all share behaviors. This is 
kind of strange, as they all have the same types of state... Hmmm. 

It may be more accurate to say that the automobiles share a state "shape" and methods. 

"Encapsulation: define a type with a stable public interface (methods) and a consistent state shape, 
then create instances that hold their own state values while reusing the same behaviors. Optionally, 
restrict direct access to state (e.g., private fields in modern JS) to protect invariants."

*/

/*
EXERCISE 3

Given the application described in the previous exercise, which items are part of an automobile's state? Which items provide 
its behavior?
*/

/*

State:
- Make
- Model
- Year

Behaviors: 
- Start
- Drive
- Park

*/

/*
EXERCISE 4
Consider an application that manages a collection of living things, including plants and animals. Plants include trees and flowers, 
while animals include mammals and birds.

Which of the concepts discussed in this chapter most closely describes the features of the scenario described above?
*/

/*
This example is most closely related to inheritance. The subclass of trees and flowers inherit state and behavior from the 
superclass of plants, and the subclass of mammals and birds inherits from the superclass of animals. We could also say that
the 'types" trees and flower inherit from the 'type' plants. 
*/ 
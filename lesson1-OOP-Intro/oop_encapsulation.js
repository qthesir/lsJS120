/*
1. In your own words, what is object oriented programming?

Object Oriented Programming is a programming paradigm that uses objects to organize a program. 
Objects encapsulate state and behavior into a single entity, which makes it easier to reason about
and maintain. 

2. Describe some advantages and disadvantages of OOP
A significant advantage to OOP is that it allows you to encapsulate related data (state) and 
behavior into different entities, which makes it easier to reason about the relationships of
those entities to create a program, since the implementation details of those entities are 
abstracted away. Another, related advantage is that you can define specific ways that users
or other parts of the program interact with an object to manage its state with public interfaces,
although it is a little more difficult to do this in JavaScript compared to other languages. 
A third advantage is that it makes code easier to maintain, because the discoverability of 
your code is much higher, given data and behaviors are related to a similar entity (you don't 
need to go hunting in your code for a specific method, for example, because that method will
be related to the same object as the data you're working with).

Final advantage (which I forgot to add) is that OOP reduces dependencies. I'm not sure
exactly how thats accomplished, but I figure we will learn more. 

(perhaps not with the EMCA script 2022 release) 

A disadvantage of OOP is that it will typically make the program larger and
less efficient compared to procedural programming - 
it often takes more compute, memory, and lines of code. However, the advantages almost always
outweight the disadvantages. 

3. Encapsulation refers to combining related data (state) and behaviors into the same entity. 
In the context of OOP, that would be encapsulating state and behaviors into an object. 

More specifically: In javascript, this is grouping related properties and methods into a 
single object. 

4. Encapsulation in JavaScript differs slightly from other languages because it lacks a native
way to set up a public interface. JavaScript also uses prototypal inheritance instead of 
class-based inheretance, which has implications for the way data and methods are encapsulated
in to objects. 

"An object should only expose the methods and properties that other objects need to use 
the encapsulated object."
*/
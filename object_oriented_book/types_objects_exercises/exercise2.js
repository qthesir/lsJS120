/*
Write a simple constructor function that creates objects that represent books. Each book should 
have a title, author, and the year published. Create objects that represent the following books:
Title	| Author	| Year Published
Neuromancer	| William Gibson | 1984
Doomsday Book	| Connie Willis |	1992

When you are done, identify the type of the objects created, the constructor function, and 
the instance objects.

*/

function Book(title, author, yearPublished) {
  this.title = title;

  this.author = author;

  this.yearPublished = yearPublished;
}

let neuromancer = new Book("Neuromancer", "William Gibson", 1984);
let doomsdayBook = new Book("Doomsday Book", "Connie Willis", 1992);

console.log(neuromancer);
console.log(doomsdayBook instanceof Book);
console.log(typeof Book)


/*
The constructor function is the function 'Book', which takes on the identity of 
a constructor when the this keyword is used. The variables neuromancer and doomsdayBook are 
instance objects. The 'type' of the object created is a "Book" type, as defined by the 
constructor function. 

*/
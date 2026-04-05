/*

The method franchise.allMovies is supposed to return the following array:

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]


Explain why this method will not return the desired object. 
Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
*/

let franchise = {
  name: "How to Train Your Dragon",
  allMovies: function () {
    return [1, 2, 3].map(function (number) {
      return this.name + " " + number;
    });
  },
};

/*
The reason why this will not work is because, although the allMovies method will run with the franchise object as 
execution context, the function passed into the .map array method runs with the global scope, rather 
than the function scope (it does not inherit the scope from the surrounding function). 

The solution to this problem is to use an arrow function instead of a regular function. Arrow functions
inherit the surrounding function context. 
*/

let franchiseFixed = {
  name: "How to Train Your Dragon",
  allMovies: function () {
    return [1, 2, 3].map((number) => {
      return this.name + " " + number;
    });
  },
};

console.log(franchiseFixed.allMovies());

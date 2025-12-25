/*
1. What do we mean when we say that classes are first-class values?
*/

/*
Classes are first class values because they are constructor functions, which are functions, which are objects. In JavaScript, 
functions can be taken as parameters to other functions and also be return values. They can also be assigned to variables, 
and used anywhere where a value is expected. First-class values means that they are able to be used as you would any other 
JavaScript value.
*/

/*
2. Consider the following class declaration: 
*/

class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}

console.log(Object.getOwnPropertyNames(Television));
console.log(Object.getOwnPropertyNames(Television.prototype));

/*
What does the static modifier do? How would we call the method manufacturer?

A static method is a method that lives on the constructor function. That is, when the class is defined, 
the manufacturer method is an own property of the constructor. Manufacturer would be accessed by callint
Television.manufacturer().
*/

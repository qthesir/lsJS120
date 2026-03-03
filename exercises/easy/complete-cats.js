class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Pet {
  constructor(name, age, furColor) {
    super(name, age)
    this.furColor = furColor
  }

  info() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.furColor} fur.`
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

/* 
Further exploration: 

We would be able to omit the constructor method if the Cat class had no own properties, 
and inherited all its properties from the Pet class, because JavaScript will run 
constructor with super under the hood with all ofthe parameters from the superclass 
passed in. The one potential issue of modifying this is that not all pets may have relevant
colors, although all things surely have a color. The info method, at least, would
have to be unique to cat, since the info method refers to cat and its fur specifically
and not all pets are cats or have fur. 

If a pet happens to not have a relevant color, you could simply not pass in color to the 
constructor and leave it as undefined for that particular pet. 
*/


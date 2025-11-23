class Cat {
  constructor(name, color, age) {
    (this.name = name), (this.color = color), (this.age = age);
  }

  speak() {
    console.log(`Meow. I am ${this.name}.`);
    console.log(`I am a ${this.age}-year-old ${this.color} cat.`);
  }
}

let cocoa = new Cat("Cocoa", "black", 5);
let leo = new Cat("Leo", "orange", 3);

cocoa.speak();
leo.speak();
console.log(cocoa);
console.log(leo);

console.log(cocoa instanceof Cat);

let cocoa2 = new Cat("Cocoa", "brown", 2);
console.log(cocoa2);

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area() {
    return this.height * this.width;
  }
}

const myRectangle = new Rectangle(10, 5);
console.log(myRectangle.area());

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
    this.side = side;
  }
}

let mySquare = new Square(5);
console.log(mySquare);

for (let i in mySquare) {
  console.log(i);
}

for (let key of Object.keys(mySquare)) {
  console.log(mySquare.hasOwnProperty(key));
}

class Square2 extends Square {
  constructor(side) {
    super(side);
  }
}

let mySquare2 = new Square2(5);

class Parent {
  whatMethod() {
    console.log("In the parent method");
  }
}

class Child extends Parent {
  whatMethod() {
    console.log("In the child method");
    super.whatMethod();
    console.log("Back in the child method");
  }
}

let child = new Child();
child.whatMethod();

console.log(mySquare instanceof Square);
console.log(mySquare instanceof Rectangle);

console.log(myRectangle instanceof Square);
console.log(myRectangle instanceof Rectangle);

console.log(Object.getPrototypeOf(mySquare) === Square.prototype);
console.log(Object.getPrototypeOf(mySquare) === Rectangle.prototype);
console.log(Object.getPrototypeOf(mySquare).constructor.name);

console.log(Square.prototype instanceof Rectangle);

console.log(Object.getPrototypeOf(mySquare2));

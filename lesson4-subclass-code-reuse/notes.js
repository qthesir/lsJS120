// OLOO (Objects Linking to Other Objects)

let carPrototype = {
  start() {
    this.started = true;
  },

  stop() {
    this.started = false;
  },

  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return this;
  },
};

let car1 = Object.create(carPrototype).init("Toyota", "Camry", 2016);

console.log(car1);

//

class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return `[Rectangle ${this.length} x ${this.width}]`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  toString() {
    return `[Square ${this.length} x ${this.width}]`;
  }
}

let rectangle = new Rectangle(5, 10);

let square = new Square(5);

console.log(rectangle.toString());
console.log(square.toString());

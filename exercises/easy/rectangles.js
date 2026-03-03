

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width
  }

  getLength() {
    return this.length
  }

  getArea() {
    return this.length * this.width 
  }
}

let rect = new Rectangle(4, 5) 

console.log(rect.getWidth())
console.log(rect.getLength())
console.log(rect.getArea())
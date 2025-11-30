class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.width = width;
    this.#height = height;
  }

  set width(width) {
    if (typeof width !== "number" || width <= 0) {
      throw new RangeError("width must be greater than 0");
    } else {
      this.#width = width;
    }
  }

  set height(height) {
    if (typeof height !== "number" || height <= 0) {
      throw new RangeError("height must be greater than 0");
    } else {
      this.#height = height;
    }
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get area() {
    return this.#width * this.#height;
  }
}

let rect = new Rectangle(10, 5);
console.log(rect.area);

rect.width = 20;
console.log(rect.area);

rect.height = 12;
console.log(rect.area);

try {
  rect.width = 0;
} catch (e) {
  console.log(e);
}

try {
  rect.height = -10;
} catch (e) {
  console.log(e);
}

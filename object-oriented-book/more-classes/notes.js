class Foo {
  #data;
  #initializedData = 43;

  constructor(value) {
    this.#data = value;
  }

  show() {
    console.log(this.#data, this.#initializedData);
  }
}

let foo = new Foo(42)

foo.show()

class Student {
  #name;
  #track;

  constructor(firstName, lastName, track) {
    this.#name = [firstName, lastName]
    this.#track = track
  }

  name() {
    return this.#name
  }

  track() {
    return this.#track
  }
}

let student = new Student('Nichola', 'Tesla', 'Rocketry')

console.log(`${student.name().join(" ")} ${student.track()}`)
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

  #revealStudentId() {
    let studentId = database.getStudentId(this.#name)
    console.log(studentId.idNumber)
  }
}

let student = new Student('Nichola', 'Tesla', 'Rocketry')

console.log(`${student.name().join(" ")} ${student.track()}`)

class MyClass {
  myPublic() {
    return this.#myPrivate()
  }

  #myPrivate() {
    console.log('This is a private method')
  }
}

let fooA = new MyClass()

fooA.myPublic()
// fooA.#myPrivate()

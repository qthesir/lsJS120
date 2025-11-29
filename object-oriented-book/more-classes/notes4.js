class Student {
  constructor(name) {
    this.name = name;
  }
}

class GraduateStudent extends Student {
  static counter = 0;
  static displayCounter() {
    console.log("Graduate Student count: ", this.counter);
  }
  constructor(name) {
    super(name);
    this.constructor.counter += 1;
  }
}
class UndergraduateStudent extends Student {
  static counter = 0;
  static displayCounter() {
    console.log("Undergraduate Student count: ", this.counter);
  }
  constructor(name) {
    super(name);
    this.constructor.counter += 1;
  }
}

let ken = new GraduateStudent("Ken");
let gerald = new UndergraduateStudent("Gerald");

GraduateStudent.displayCounter();
UndergraduateStudent.displayCounter();

// Solution 2

class Student2 {
  static #counts = new Map();

  constructor(name) {
    this.name = name;
    let ctor = this.constructor;
    let currentCount = Student2.#counts.get(ctor) ?? 0;
    Student2.#counts.set(ctor, currentCount + 1);
  }

  static count() {
    return Student2.#counts.get(this) ?? 0;
  }

  static totalCount() {
    let total = 0;
    for (const n of Student2.#counts.values()) {
      total += n;
    }
    return total;
  }
}

class GraduateStudent2 extends Student2 {
  constructor(name) {
    super(name);
  }
}
class UndergraduateStudent2 extends Student2 {
  constructor(name) {
    super(name);
  }
}

let ken2 = new GraduateStudent2("Ken");
let gerald2 = new UndergraduateStudent2("Gerald");

Student2.count();
Student2.totalCount();

// Can you make static fields and methods private?

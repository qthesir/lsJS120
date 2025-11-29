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

class Student2 {
  constructor(name) {
    this.name = name;
  }
  static counter = {
    UndergraduateStudents: 0,
    GraduateStudents: 0,
  };

  static displayCounter() {
    console.log(
      "Undergraduate Student count: ",
      Student2.counter.UndergraduateStudents
    );
    console.log("Graduate Student count: ", Student2.counter.GraduateStudents);
  }
}

class GraduateStudent2 extends Student2 {

  constructor(name) {
    super(name);
    Student2.counter.GraduateStudents += 1;
  }
}
class UndergraduateStudent2 extends Student2 {

  constructor(name) {
    super(name);
    Student2.counter.UndergraduateStudents += 1;
  }
}

let ken2 = new GraduateStudent2("Ken");
let gerald2 = new UndergraduateStudent2("Gerald");

Student2.displayCounter();

// Can you make static fields and methods private?

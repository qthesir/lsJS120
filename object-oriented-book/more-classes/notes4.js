class Student {
  constructor(name) {
    this.name = name;
  }
}

class GraduateStudent extends Student {
  static counter = 0;
  static displayCounter() {
    console.log("Graduate Student count: ", GraduateStudent.counter);
  }
  constructor(name) {
    super(name);
    GraduateStudent.counter += 1;
  }
}
class UndergraduateStudent extends Student {
  static counter = 0;
  static displayCounter() {
    console.log("Undergraduate Student count: ", UndergraduateStudent.counter);
  }
  constructor(name) {
    super(name);
    UndergraduateStudent.counter += 1;
  }
}

let ken = new GraduateStudent("Ken");
let gerald = new UndergraduateStudent("Gerald");

GraduateStudent.displayCounter();
UndergraduateStudent.displayCounter();

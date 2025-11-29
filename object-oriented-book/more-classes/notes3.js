/*

*/

class MyClass {
  static myField = "this is a static field";

  constructor() {
    console.log(MyClass.myField);
  }
}

console.log(MyClass.myField);

const instance = new MyClass();

class Student {
  static counter = 0;

  constructor(name) {
    this.name = name;
    Student.counter += 1;
  }

  static showCounter() {
    console.log(`we have created ${Student.counter} students!`);
  }

  instanceMethod() {
    console.log("This is an instance method");
  }
}

console.log(Student.counter);

let ken = new Student("Ken");
console.log(Student.counter);
console.log(Student.showCounter());
ken.instanceMethod();


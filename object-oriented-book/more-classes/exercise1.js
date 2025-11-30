class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.age = age; // Have to call the setter here rather than reference the private field
    // directly. Otherwise, the validation wont run.
  }

  showAge() {
    console.log(this.#age);
  }

  set age(age) {
    if (typeof age === "number" && age > 0) {
      this.#age = age;
    } else {
      throw new RangeError("Age must be positive");
    }
  }
}

let person = new Person("John", 30);

person.showAge();
person.age = 31;
person.showAge();

try {
  person.age = -5;
  person.showAge(); // -5
} catch (e) {
  // The following line should run, but won't

  console.log("RangeError: Age must be positive");
}

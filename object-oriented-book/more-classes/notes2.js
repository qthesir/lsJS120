class Student {
  constructor(firstName, lastName, track) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.track = track;
  }

  get name() {
    return [this.firstName, this.lastName];
  }
}

let student = new Student("Kay", "Oakley", "JavaScript");
console.log(`${student.name.join(" ")} ${student.track}`);
// Kay Oakley JavaScript

let teacher = {
  firstName: "Alan",
  lastName: "Stone",
  _students: ["Pete", "brian", "andrea"],

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  get students() {
    return [...this._students];
  },
};

console.log(teacher.fullName);

console.log(teacher.students);

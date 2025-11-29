class Student {
  #firstName;
  #lastName;
  #track;

  constructor(firstName, lastName, track) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.track = track;
  }

  get name() {
    return [this.firstName, this.lastName];
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get track() {
    return this.#track;
  }

  set track(newTrack) {
    switch (newTrack) {
      case "JavaScript":
      case "Python":
      case "Ruby":
        this.#track = newTrack;
        break;
      default:
        throw new Error(`Invalid track: '${newTrack}`);
    }
  }
}

let student = new Student("Kay", "Oakley", "JavaScript");
console.log(`${student.name.join(" ")} ${student.track}`);
student.track = "Ruby";
console.log(`${student.firstName} ${student.lastName} ${student.track}`);
// Kay Oakley JavaScript

let student2 = new Student("Bill", "WIsner", "Python");
console.log(`${student2.name.join(" ")} ${student2.track}`);
student2.track = "JavaScript";
console.log(`${student2.firstName} ${student2.lastName} ${student2.track}`);

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

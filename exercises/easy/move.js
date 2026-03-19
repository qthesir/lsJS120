// class MammalWithlegs {
//   constructor(name) {
//     this.name = name;
//   }

//   walk() {
//     return `${this.name} ${this.gait()} forward`;
//   }
// }

// class Person extends MammalWithlegs {
//   gait() {
//     return "strolls";
//   }
// }

// class Cat extends MammalWithlegs {
//   gait() {
//     return "saunters";
//   }
// }

// class Cheetah extends MammalWithlegs {
//   gait() {
//     return "runs";
//   }
// }

const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

Object.assign(Person.prototype, walkers);

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

Object.assign(Cat.prototype, walkers);

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

Object.assign(Cheetah.prototype, walkers);

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"

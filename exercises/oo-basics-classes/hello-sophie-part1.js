class Cat {
  constructor(name) {
    this.name = name;
    this.greeting();
  }

  greeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat("Sophie");

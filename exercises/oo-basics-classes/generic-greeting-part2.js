class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log("Hello! I am a cat!");
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();

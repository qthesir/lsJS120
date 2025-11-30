class Cat {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  whoAmI() {
    console.log(
      `My name is ${this.name} and I am a ${this.color} ${this.constructor.name}`
    );
  }
}

let cheddar = new Cat("Cheddar", "Ginger");
cheddar.whoAmI();

let cheddarProto = Object.getPrototypeOf(cheddar);
console.log(Object.getOwnPropertyNames(cheddarProto));

function createCat(name, color, age) {
  return {
    name,
    color,
    age,

    speak() {
      console.log(`Meow. I am ${this.name}.`);
      console.log(`I am a ${this.age}-year-old ${this.color} cat.`);
    },
  };
}

let cocoa = createCat("Cocoa", "black", 5);
let leo = createCat("Leo", "orange", 3);

cocoa.speak();
leo.speak();

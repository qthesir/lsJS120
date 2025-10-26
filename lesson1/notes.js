let cat = {
  name: "Fluffy",

  makeNoise() {
    console.log("Meow!");
  },
};

let dog = {
  name: "Max",

  makeNoise() {
    console.log("Woof!");
  },
};

let peter = {
  name: "peter",
  pets: [],
};

peter.pets.push(cat);
peter.pets.push(dog);

console.log(peter);


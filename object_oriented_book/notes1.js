function CatOne(name) {
  this.name = name;

  this.purr = function () {
    console.log("purr");
  };

  this.speak = function () {
    console.log("meow");
  };
}

let butterscotch = new CatOne("Butterscotch");

console.log(butterscotch.name);
butterscotch.purr();
butterscotch.speak();

let student = {
  name: "Margaret",
  age: "25",

  pass: function pass() {
    console.log(`${this.name} has passed the class!`);
  },

  fail() {
    console.log(`unfortunately, ${this.name} has failed`);
  },
};

student.fail();

student.pass();

let Cat = {
  purr() {
    console.log("purrrr");
  },

  speak() {
    console.log("meow");
  },
};

let cheddar = Object.assign({}, Cat);

cheddar.name = "cheddar";
cheddar.age = 15;
cheddar.gender = "male";

cheddar.purr()
cheddar.speak()
// let a = { foo: 1, bar: 2 };

// let b = {};

// b.what = "so";

// Object.setPrototypeOf(b, a);

// console.log(Object.getPrototypeOf(b));

// a.foo = 42;

// console.log(b.foo);

// console.log(Object.getPrototypeOf(b));

// console.log(Object.getPrototypeOf(a));

// for (let i in b) {
//   if (b.hasOwnProperty(i)) console.log(i);
// }

// function Foo() {
//   this.bar = "qux";
// }

// let newFoo = new Foo();
// let otherFoo = new Foo();

// console.log(Object.getPrototypeOf(Foo), Foo.prototype);

// console.log(Object.getPrototypeOf(Foo) === Foo.prototype);
// console.log(Object.getPrototypeOf(Foo.prototype) === Object.prototype);
// console.log(Foo.prototype);
// Foo.prototype.newProp = "goodbye";
// console.log(newFoo.newProp);
// console.log(otherFoo.newProp);
// Foo.prototype.newProp = "hello";
// console.log(Foo);
// console.log(newFoo.newProp, newFoo.bar);
// console.log(otherFoo.newProp, otherFoo.bar);
// console.log(Object.getPrototypeOf(Foo));

// let a = {
//   foo: 1,
// };

// let b = {
//   bar: 2,
// };

// Object.setPrototypeOf(b, a);

// let c = Object.create(b);

// console.log(c.foo);
// c.foo = 42;
// console.log(c.foo);
// console.log(a.foo);
// console.log(c);
// console.log(a);
// console.log(a.isPrototypeOf(b))

// function createGreeter(language) {
//   switch (language) {
//     case 'en':
//       return (name) => console.log(`Hello, ${name}!`);
//     case 'es':
//       return (name) => console.log(`Hola, ${name}!`);
//     case 'fr':
//       return (name) => console.log(`Bonjour, ${name}!`);
//   }
// }

// let greeterEs = createGreeter('es');
// greeterEs('John'); // logs 'Hola!'
// greeterEs('Gerald'); // logs 'Hola!'
// greeterEs('Tom'); // logs 'Hola!'

// let greeterEn = createGreeter('en');
// greeterEn('Carl'); // logs 'Hello!'

// let obj = {
//   a: 1,
//   b: 2
// }

// function sumAB() {
//   console.log(this.a + this.b)
// }

// obj.sumAB = sumAB.bind(obj)

// let obj2 = {
//   a: 3,
//   b: 4
// }

// obj2.sumAB = obj.sumAB

// obj.sumAB()

// obj2.sumAB.call(obj2)

// let obj = {
//   a: "hello",
//   b: "world",
//   foo: function () {
//     let self = this;

//     function bar() {
//       console.log(self.a + " " + self.b);
//     }

//     bar.call(this);
//   },
// };

// obj.foo(); // => hello world

// let obj = {
//   a: 5,
//   b: { a: this.a },
//   foo: () => {
//     console.log(this.a);
//   },
// };

// obj.foo(); // => undefined
// console.log(obj.b.a);

// let obj = {
//   a: "hello",
//   b: "world",
//   foo: function () {
//     let a = "hi";

//     let b = "there";
//     let bar = () => {
//       console.log(this.a + " " + this.b);
//       console.log("lexical proof: " + a + " " + b);
//     };

//     // some code
//     bar();

//     // some more code
//     bar();

//     // still more code
//   },
// };

// let obj2 = {
//   a: "This is obj2",
// };

// obj.foo();
// // => hello world
// // => hello world

// let newFoo = obj.foo;

// newFoo();

// obj.foo.call(obj2);

// let objOuter = {
//   a: "bye",
// };

// function hello() {
//   let obj = {
//     a: 5,
//     b: {
//       a: "hi",
//       foo: () => {
//         console.log(this.a);
//       },
//     },

//     foo: () => {
//       console.log(this.a);
//     },
//   };

//   obj.foo();
//   obj.b.foo();
// }

// hello.call(objOuter);

// // obj.foo(); // => undefined

// // obj.b.foo();

let obj = {
  a: "hello",
  b: "world",
  foo: function () {
    [1, 2, 3].forEach((number) => {
      console.log(String(number) + " " + this.a + " " + this.b);
    });
  },
};

obj.foo();

/*
I see... changing the example in the LS curiculum to use an arrow function as a function expression is 
basically the same as defining the arrow function with "let" before it is passed into the function. 
The arrow function, therefore, inherits its execution context from foo when its called on obj. THis 
(no pun intended) is why arrow funcs are used in this situation.

I suppose this is what happens when you pass in a function expression as a callback. 

*/

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined

let func = () => {
  console.log(this.a);
};

obj = {
  a: "hello",
};

func.call(obj);

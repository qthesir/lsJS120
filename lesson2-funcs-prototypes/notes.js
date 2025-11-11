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

function createGreeter(language) {
  switch (language) {
    case 'en':
      return (name) => console.log(`Hello, ${name}!`);
    case 'es':
      return (name) => console.log(`Hola, ${name}!`);
    case 'fr':
      return (name) => console.log(`Bonjour, ${name}!`);
  }
}

let greeterEs = createGreeter('es');
greeterEs('John'); // logs 'Hola!'
greeterEs('Gerald'); // logs 'Hola!'
greeterEs('Tom'); // logs 'Hola!'

let greeterEn = createGreeter('en');
greeterEn('Carl'); // logs 'Hello!'


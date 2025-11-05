let a = { foo: 1, bar: 2 };

let b = {};

Object.setPrototypeOf(b, a);

console.log(Object.getPrototypeOf(b));

a.foo = 42;

console.log(b.foo);

console.log(Object.getPrototypeOf(b));

console.log(Object.getPrototypeOf(a))
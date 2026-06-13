function Map(arr, func) {
  let mappedValues = [];

  for (let i = 0; i < arr.length; i++) {
    let ele = arr[i];
    mappedValues[i] = func(ele);
  }

  return mappedValues;
}

let testArr = [1, 2, 3];

console.log(Map(testArr, (num) => num * num));

function compose(f, g) {
  return (x) => f(g(x));
}

let testNum = 10;

const square = (num) => num * num;
const divideByTwo = (num) => num / 2;

let compoundFunc = compose(divideByTwo, square);

console.log(compoundFunc(testNum));

function createGreeter(language) {
  switch (language) {
    case "en":
      return (name) => console.log(`Hello, ${name}`);
    case "es":
      return (name) => console.log(`Hola, ${name}`);
    case "fr":
      return (name) => console.log(`Bonjour, ${name}`);
  }
}

let greeterEs = createGreeter("fr");
greeterEs("John");

/* The benefit of doing things this way is that you separate configuration from usage.
You configure once (which language you want) and then supply the changing data later. 

This becomes more useful when the initial configuration becomes more complex. For
example, the AgentFactory. 
*/
global.foo = 1;
let foobar = 2;
console.log(global.foo);
console.log(foobar);

let foo = "outer";

function test() {
  let foo = "inner";
  console.log(foo);
}

test(); // "inner"
console.log(foo);

let baz = {
  bar() {
    console.log("this is the object:", this);
  },
};

baz.bar();

let haz = baz.bar;

haz();

class Cat {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  whoAmI() {
    console.log("hi, I am ", this.name);
  }
}

console.log(Object.getOwnPropertyNames(Cat.prototype))

let cheddar = new Cat('Cheddar', 'blue')
console.log(Object.getPrototypeOf(cheddar) === Cat.prototype)
console.log(Object.getPrototypeOf(Cat) === Function.prototype)


console.log(Object.getOwnPropertyNames(Function.prototype))

/*
Have to remember that functions have function prototypes. 

When new Cat() creates an instance, the instances internal Prototype (object prototype)
is set to the object currently referenced by Cat.prototype. 
*/

let proto = {
  hi() {
    console.log('hi')
  }
}
let objInherited = Object.create(proto)

objInherited.hi()
console.log(Object.getPrototypeOf(objInherited) === proto)

console.log(Cat.prototype.constructor === Cat)

proto.prototype = {}
proto.prototype.constructor = Cat

Object.setPrototypeOf(objInherited, Cat.prototype)
console.log(objInherited instanceof Cat)
console.log(cheddar instanceof Cat)

/*
Need to study: 
- Constructor / Prototype pattern
- instanceof
*/

let x = 'hello'

function sayHi() {
  console.log(x)
  let x = 'hi'
}

sayHi()

/*
This is actually quite interesting, the above example. The reason for the temporal
dead zone, is to ensure that, if you try to access a scoped variable, it will know
that variable is defined later in the scope, and will throw an error instead of 
logging the value of the variable defined in the outer scope. This makes it easier to
reason about. And this is why you don't just take the variable into consideration 
when that specific line of code runes - its because then, you would log that x in the
outer scope, and it would be harder to tell if there was an error or not. 

As for why you do this for function declarations and not vars, the function declarations can
be known at runtime, whereas a vairable may contain a value that depends on runtime execution,
so it cannot be deterministically hoisted. 
 
Errors most often exist at the boundary.
*/


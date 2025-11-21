let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment();
  },
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a); // should be 0

// What will the value of foo.a be after this code runs?

/*
foo.a will be be equal to 0. While the method incrementA is called with the appropriate execution context, foo,
its inner function, increment(), is called without foo as an execution context. Therefore, increment's 
execution context is implicitly the global object. It might even throw an error with this.a. No... 
when you attempt to increment an undefined, or not previously defined, property, it will return NaN, since
you are technically doing this.a + 1, and undefined + 1 is NaN. 

Here's a fix:
*/

let foo2 = {
  a: 0,
  incrementA: function () {
    let increment = () => {
      this.a += 1;
    };

    increment();
  },
};

foo2.incrementA();
foo2.incrementA();
foo2.incrementA();

console.log(foo2.a); // should be 3

// Here's another using the self = this pattern
let foo3 = {
  a: 0,
  incrementA: function () {
    self = this;
    function increment() {
      self.a += 1;
    }

    increment();
  },
};

foo3.incrementA();
foo3.incrementA();
foo3.incrementA();

console.log(foo3.a); // should be 3

// Here's another using bind
let foo4 = {
  a: 0,
  incrementA: function () {
    let increment = function increment() {
      this.a += 1;
    }.bind(foo4);

    increment();
  },
};

foo4.incrementA();
foo4.incrementA();
foo4.incrementA();

console.log(foo4.a); // should be 3

// Here's another using call
let foo5 = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment.call(foo5);
  },
};

foo5.incrementA();
foo5.incrementA();
foo5.incrementA();

console.log(foo5.a); // should be 3

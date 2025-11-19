let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a) // should be 0
console.log(global)

// What will the value of foo.a be after this code runs?

/*
foo.a will be be equal to 0. While the method incrementA is called with the appropriate execution context, foo,
its inner function, increment(), is called without foo as an execution context. Therefore, increment's 
execution context is implicitly the global object. It might even throw an error with this.a. No... 
when you attempt to increment an undefined, or not previously defined, property, it will return NaN, since
you are technically doing this.a + 1, and undefined + 1 is NaN. 
*/
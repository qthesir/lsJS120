/*
What will the following code output?

*/

let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());

/*
The first console.log statement on line 17 will return NaN, since it implicitly has the 
global scope as the execution context and a and b will be undefined. Bar, which is assigned to the 
return value of the bind method called on the function foo, will return 5, because the execution 
context was permanently set to obj.

*/
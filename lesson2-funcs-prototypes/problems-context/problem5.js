/*
Take a look at the following code snippet. Use call to invoke the add method but with foo 
as execution context. What will this return?
*/

let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

console.log(bar.add.call(foo))

/*
The above will return 3, which is the sum of the values of the properties a and b on the foo object. 
This is because, even though the method is being called on bar, we are explicitly setting the 
function context to foo. The explicit context set by the call method overrules the implicit context
of bar if the method was called without the call method. 
*/
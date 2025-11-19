/*
What will the following code log to the console? Explain why it logs that value. Try to answer 
without running the code.
*/

let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);

/*
The above code will return 4. On line 8, the property foo on the object qux is being re-assigned 
to 2. This means that qux.foo will now evaluate to 2. Since qux is baz's prototype, and there 
is no foo property on baz, baz.foo will evaluate to the value of foo on qux (farther up the
prototype chain), which is also 2. 2 + 2 is 4.


*/
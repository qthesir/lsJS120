/*
What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.
*/

let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);

/*
3 will be logged to the console. When the property baz.foo is assigned 2 on line 7, javascript considers
the property .foo that is accessed to be baz's own property, not the property of qux; and when
baz.foo is evaluated on line 9, it thus returns 2. The foo on qux, however, is left unchanged, because, 
to reiterate, the assignment of baz.foo only affects baz's own property and not any of the properties
on baz's prototype chain. Therefore, qux.foo will evaluate to to 1, and the result logged will be
2 + 1 = 3.

*/

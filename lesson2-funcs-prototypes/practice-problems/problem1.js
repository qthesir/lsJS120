/*
What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.
*/

let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);

/*
The above code is going to log 2 to the console. On line six, the variable baz is declared and assigned to the
object created using Object.create with the object qux passed in as a parameter, meaning qux is assigned as the 
prototype of baz. On line 7, qux.foo will evaluate to 1 because foo is qux's own property, and baz.foo will evaluate 
to one because qux is baz's prototype, and baz does not have an own property named 'foo' that would take precedence
over the property 'foo' on qux. Thus, baz.foo + qux.foo will result in 2. 

*/

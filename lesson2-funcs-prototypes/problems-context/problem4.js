/*
What built-in methods have we learned about that we can use to specify a function's execution 
context explicitly?
*/

/*
The two built in methods we learned about are call and apply. Call and apply are built-in methods 
on a javascript function, or function object. Call takes one parameter for the object to use for 
execution context, and the arguments for the function (separated by commas, as many as needed). 
Apply takes two parameters: the object to use for the execution context, and an array of arugments.
However, since ES6 and the release of the spread syntax, apply is rarely used, since, if you do have
an array of arguments, you can simply spread them into call. 

*/
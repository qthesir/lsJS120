/* 
What will the following code output? Try to determine the results without running the code.
*/ 

function func() {
  return this;
}

let context = func();

console.log(context);

/*
The global object will be logged to the console. This is because, on line 9, the variable context is
being declared and assigned to the return value of func, defined on line 5. The return value
of func is this. Since .apply or .call are not used to set explicit context, and func is 
not being called as a method on an object, the execution context is implicitly the global context.
Thus, context will be assigned the value of the global object, which is what is logged to the
console. 

Its important to note that, in a browser, this would be the 'window' object. In node, its 'global'.


*/
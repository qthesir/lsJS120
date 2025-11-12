/*
What will the following code output? Explain the difference, if any, between this output and 
that of problem 1.
*/

let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);

/*
In this case, func is defined as a property on obj, and called with the object.method() syntax on 
line 12. The execution context when .func() is called on line 12 is therefore implicitly the 
object, which means the return value of obj.func() will be obj. Therefore, obj is logged to the 
console. 

This is different than the previous problem. Since the previous problem's function wasn't called
as a method, its context was the global object, not an object defined in the program. 

*/
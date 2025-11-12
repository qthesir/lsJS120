/*
What will the following log to the console?
*/

let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);

/*
It will log a new function which has the functionality of foo that is permanently bound to obj. 
The .bind function does not return the return value of the original function, like call and 
apply. Instead, it returns a new function that has all the functionality of the function its 
called on, but with a permanent context as dictated by the first argument. 

Well, actually, I'm mistaken slightly here. There will be nothing logged. There is no 
console.log statement, so the new function thats returned wont be logged to the console. 
*/



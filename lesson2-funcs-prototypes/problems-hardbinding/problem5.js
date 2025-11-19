/*
What will the code output?
*/

let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);



/*

"Amazebulous" will be logged to the console. Bar is set to the return value of foo.bind(obj) on 
line 16, which is a new function with foo's functionality with obj set as the permanent execution
context. bar.call(otherObj) will not return the execution context of otherObj, as is implied by
the .call method, because the bound function will always execute in the execution context it was 
bound to. 

Other, simpler way of saying this: the function bar, called on line 18, is permanently bound to 
obj on line 16. Once a functions execution context has been set with bind, it cannot be 
changed, even with call and apply. Therefore, this code will log "Amzebulous" to the console. 
*/
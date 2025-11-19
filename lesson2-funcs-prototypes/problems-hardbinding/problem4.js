/*
What will the below code log to the console?
*/

let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();


/*
line 20 will log 'JavaScript makes sense!' to the console. This is because, on line 17, the 
function bar is assigned to the bound version of the foo function, which has its ex. context set
to the object positivity. Therefore, even though the method is assigned to a property on the 
negativity object and called as a method on the negativity object, the explicit ex. context 
applied by the bind method overrules the implicit execution context of the method call. 

*/
/*
The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? 
If there is a difference between the actual and desired output, explain the difference.
*/

let turk = {
  firstName: "Christopher",
  lastName: "Turk",
  occupation: "Surgeon",
  getDescription() {
    return (
      this.firstName + " " + this.lastName + " is a " + this.occupation + "."
    );
  },
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);

/*
The above code is going to return 'undefined undefined is a undefined.' The reason for this is The following: When getDescription is passed 
into logReturnVal on line 21, it is set the the parameter func in logReturnVal, shown on line 16. func() is called on line 17, and without
specifying an explicit execution context, the function call func() implicitly uses the logReturnVal execution context, which, implicitly, 
is the global scope, as no execution context is explicitly specified on line 21. Func() will return undefined for all the 
references to this. Hence, when returnVal is logged to the console on line 18, it will be 'undefined undefined is a undefined.'

Hm... THe above actually isn't quite right. Only arrow functions seem to inherit execution context. Other types of functions, however,
are entirely dependent on how they are called. 
We can fix it by:
*/

let turk2 = {
  firstName: "Christopher",
  lastName: "Turk",
  occupation: "Surgeon",
  getDescription() {
    return (
      this.firstName + " " + this.lastName + " is a " + this.occupation + "."
    );
  },
};

function logReturnVal2(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal2(turk2.getDescription, turk2);

/*

*/

let turk3 = {
  firstName: "Christopher",
  lastName: "Turk",
  occupation: "Surgeon",
  getDescription() {
    return (
      this.firstName + " " + this.lastName + " is a " + this.occupation + "."
    );
  },
};

function logReturnVal3(func) {
  let returnVal = func();
  console.log(returnVal);
}

let getTurkDescription = turk3.getDescription.bind(turk3);

logReturnVal3(getTurkDescription);

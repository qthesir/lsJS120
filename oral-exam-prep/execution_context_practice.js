// function func() {
//   return this;
// }

// let context = func();

// console.log(context);

/*
The following code is going to output the global object to the console. On line 5, 
the variable context
is assigned to the return value of func(), which runs with the global object as context. When a
function runs without an explicit context, the context is implicit, and without being 
affiliated implicitly with an object, it will run with the global object as its context. 
Therefore, func's this will be the global object when it runs on line 5 and its return value
will therefore be the global object, which is set to the variable 'context'. The value
of the variable context, the global object, is then logged to the console on line 7. 
*/

// let obj = {
//   func: function() {
//     return this;
//   },
// };

// let context = obj.func();

// console.log(context);

/*
In this case, the value logged to the console will be the object assigned to the 
variable obj. This is because, on line 26, the function func is invoked as a method on
the variable obj. This means that func runs with obj as its implicit execution context,
so this, which is the return value of func, will be set to the object refenced by obj, 
which is then assigned to the variable context. The variable context is then logged 
to the console on line 28. 

"As a method invocation, it recieves an implicit execution context that refers to the 
object used to invoke it"
*/

// message = 'Hello from the global scope!';

// function deliverMessage() {
//   console.log(this.message);
// }

// deliverMessage();

// let foo = {
//   message: 'Hello from the function scope!',
// };

// foo.deliverMessage = deliverMessage;

// foo.deliverMessage();

/*
The function invocation on line 48 will log "Hello from the global scope" to the 
console. This is because the variable 'message' is not declared with let, const, or
var, only assigned. In the case a variable is assigned but not declared, JavaScript 
treats the variable as a property on the global scope. Thus, when deliverMessage is invoked
on line 48, where it runs with the global object as its execution context, this.message 
will equal the value assigned to the message property on the global scope, which is 
"Hello from the global scope."

Line 56 will log "Hello from the function scope!" the function deliverMessage is set to 
the property of foo deliverMessage on line 54. On line 56, the function deliverMessage is
invoked as a method on the object foo, meaning that deliverMessage runs with foo as 
its implicit context. Thus, this.message in this case is equal to the value assigned 
to the message property on the foo object, and "Hello from the function scope!" will 
be logged to the console. 

In sum, the output will be "Hello from the global scope" on one line, followed by 
"Hello from the function scope!" on the subsequent line. 
*/

/*
What built-in methods have we learned about that can specify a functions execution 
context exactly?  

.call(this, args), allows you to specify a specific object as execution context. 
.apply(this, [arg1, arg2, arg3...]) allows you to specify a specific object as exectution 
context and then add multiple arguments in an array. However, .call is mostly used because 
if you want to pass in an array of arguments you can simply use the spreader syntax like so:
[...args]
.bind(this), which sets a functions execution context permanently (or unless bind is used again)
to a specific object, and whenever it is invoked, it will run with the object set as its 
context. 

These methods are built into the function Object prototype, meaning all functions can
call them as methods. 

Ok, small correction here, particularly with the function prototype: When a new function 
is defined, it is as if you are creating a new function from a function constructor, i.e., its
created with the Function constructor function. Therefore, every function object's internal 
prototype is set to Function's function prototype Function.prototype, which have the 
built in methods .call, .bind, and .apply. 

*/

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = {
//    a: 'abc',
//    b: 'def',
//    add: function() {
//      return this.a + this.b;
//    },
// };

// console.log(bar.add.call(foo))

/* 
bar.add.call(foo) will return 3. the .call method on line 115 explicitly sets the 
add methods execution context to foo when it runs, even though its implicit context without
call is bar. This means that this.a will be 1 and this.b will be 2.  

*/

// let obj = {
//   message: 'JavaScript',
// };

// function foo() {
//   console.log(this.message);
// }

// foo.bind(obj);

/*
Nothing will be logged to the console, because foo.bind(obj) is not calling foo,
its returning a new function with obj bound as its context. 
*/

// let obj = {
//   a: 2,
//   b: 3,
// };

// function foo() {
//   return this.a + this.b;
// }

// let bar = foo.bind(obj);

// console.log(foo());
// console.log(bar());

/*
Line 150 will log NaN to the console and line 151 will log 5 to the console.
The invocation of foo will use the global object as its execution context, an a and 
b are undefined on the global object, and undefined + undefined is NaN. the 
bar function's execution context is bound to obj on line 148, and thus, will have 
obj as its this, so this.a = 2 and this.b = 3. The resulting return value is 5. 

*/

// let positivity = {
//   message: 'JavaScript makes sense!',
// };

// let negativity = {
//   message: 'JavaScript makes no sense!',
// };

// function foo() {
//   console.log(this.message);
// }

// let bar = foo.bind(positivity);

// negativity.logMessage = bar;
// negativity.logMessage();

/*
"JavaScript makes sense!" will log to the console. This is because, when the method 
bind is invoked on the functio foo, the bound function returned by the .bind 
method call is bound permanently to the object positivity. So when bar is assigned to 
the property logMessage on the negativity object, its execution context is still 
set to positivity, so when the method logMessage() is called on line 177, its 
going to use positivity as its execution context even though the method is invoked 
on negativity.   
*/


// let obj = {
//   a: 'Amazebulous!',
// };
// let otherObj = {
//   a: "That's not a real word!",
// };

// function foo() {
//   console.log(this.a);
// }

// let bar = foo.bind(obj);

// bar.call(otherObj);

/*

"Amazebulous!" will be logged to this console. bar is permanently bound to obj on 
line 201. Even though bar is called with the .call method with otherObj passed as a 
parameter for its execution context, the bound function will still use the original 
object it was bound to as its execution context. 
*/

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(context, func) {
//   let returnVal = func.call(context);
//   console.log(returnVal);
// }

// logReturnVal(turk, turk.getDescription);

/*
The above code will return undefined undefined is a undefined. This is because, 
when turk.getDescription is passed into logReturnVal as a parameter, its value 
is assigned to the parameter func. When func is called on line 224, it runs with the 
global scope as its execution context because it is no longer called as a  method on 
the object turk. Thus, returnVal will have all of its properties, this.firstname etc, return 
values from the global object, which are undefined. 
*/


let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

let getTurkDescription = turk.getDescription.bind(turk)

logReturnVal(getTurkDescription);



// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     let self = this
//     this.titles.forEach(function(title) {
//       console.log(self.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

/*
The above code will log undefined: Arena, undefined: Daggerfall, etc, because 
while list.Games will run with TESgames as its execution context, the function passed
into forEach will run with its implied execution context, which is the global object. 
Thus, the title passed into the callback will log the right title, because listGames is
called with TESgames as the execution context. But this.seriesTitle, which is referencing 
a property on this inside of the callback function passed into forEach, will log undefined, 
because this is the global object and the global object has no property called seriesTitle. 

In conclusion, no, it will not produce the desired output. 

Using let self = this as a solution basically allows the function this to obey lexical
scoping rules instead of function execution context rules. Arrow functions do this automatically, 
however. 
*/

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();


// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach((title) => {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

// let foo = {
//   a: 0,
//   incrementA: function() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// console.log(foo.a)

/*
The value of foo.a will still be 0, because the increment function loses the execution
context of incrementA. This will refer to the global object. Thus, foo.a isn't 
modified by increment; its value will remain 0. 
*/

// let foo = {
//   a: 0,
//   incrementA: function() {
//     const increment = () => {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();


let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a)


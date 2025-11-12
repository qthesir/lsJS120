/*
Write a function that searches the prototype chain of an object for a given property and assigns 
it a new value. If the property does not exist in any of the prototype objects, the function 
should do nothing. The following code should work as shown:
*/

// fooC -> fooB -> fooA -> Object.prototype -> null

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

/*
PEDAC

Notes & Reflection

This would be an excellent opportunity to do something recursive... Search the 
prototype chain until there are no more prototypes to search. Or until the 
return value = Object.prototype. OR until the prototypeOf equals the name of 
the property being searched for, in which case, you can return that value and 
pass it back up the callstack.

*/

function assignProperty2(obj, prop, value) {
  if (obj.hasOwnProperty(prop)) {
    obj[prop] = value;
    return undefined;
  } else if (Object.getPrototypeOf(obj) === null) {
    return undefined;
  } else {
    return assignProperty2(Object.getPrototypeOf(obj), prop, value);
  }
}

function assignProperty(obj, prop, value) {
  while (true) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = value;
      break;
    } else if (Object.getPrototypeOf(obj) === null) {
      break;
    }
    obj = Object.getPrototypeOf(obj);
  }

  return undefined;
}

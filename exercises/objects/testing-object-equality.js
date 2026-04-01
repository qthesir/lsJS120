function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  return valuesTheSame(obj1, obj2) && keysTheSame(obj1, obj2);
}

function keysTheSame(obj1, obj2) {
  let sortedObj1Keys = Object.getOwnPropertyNames(obj1).sort();
  let sortedObj2Keys = Object.getOwnPropertyNames(obj2).sort();

  if (sortedObj1Keys.length !== sortedObj2Keys.length) {
    return false;
  }

  return sortedObj1Keys.every((key, index) => {
    return key === sortedObj2Keys[index];
  });
}

function valuesTheSame(obj1, obj2) {
  return Object.getOwnPropertyNames(obj1).every((key) => {
    const bothNonNullObjects =
      typeof obj1[key] === "object" &&
      typeof obj2[key] === "object" &&
      obj1[key] !== null &&
      obj2[key] !== null;

    if (bothNonNullObjects) {
      return objectsEqual(obj1[key], obj2[key]);
    }

    return obj1[key] === obj2[key];
  });
}

console.log(objectsEqual({ a: "foo" }, { a: "foo" })); // true
console.log(objectsEqual({ a: "foo", b: "bar" }, { a: "foo" })); // false
console.log(objectsEqual({ a: "foo", b: "bar" }, { b: "bar", a: "foo" })); // true
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({ a: "foo", b: undefined }, { a: "foo", c: 1 })); // false
console.log(
  objectsEqual(
    { a: { a: "foo", b: undefined } },
    { a: { a: "foo", b: undefined } }
  )
); // false

console.log(
  objectsEqual(
    { a: { a: "foo", b: undefined } },
    { a: { a: "foo", b: undefined }, b: 1 }
  )
); // false

/*
Ok this is a little trickier than I expected... Lets think about this. The issue I'm having is 
the last edge case. I could brute force this to see if they have sorted keys... Oh... Just 
got it I think. I have to verify that both objects values are equal, and also that those
keys are own properties of that object. Lets try that
*/

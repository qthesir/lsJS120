function objectsEqual(obj1, obj2) {
  return Object.keys(obj1).every((key) => {
    return obj1[key] === obj2[key] && obj2.hasOwnProperty(key);
  });
}

console.log(objectsEqual({ a: "foo" }, { a: "foo" })); // true
console.log(objectsEqual({ a: "foo", b: "bar" }, { a: "foo" })); // false
console.log(objectsEqual({ a: "foo", b: "bar" }, { b: "bar", a: "foo" })); // true
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({ a: "foo", b: undefined }, { a: "foo", c: 1 })); // false

/*
Ok this is a little trickier than I expected... Lets think about this. The issue I'm having is 
the last edge case. I could brute force this to see if they have sorted keys... Oh... Just 
got it I think. I have to verify that both objects values are equal, and also that those
keys are own properties of that object. Lets try that
*/

function myFilter(array, func, thisArg) {
  let result = [];

  if (arguments.length >= 3) {
    func = func.bind(thisArg);
  }

  array.forEach(function (value) {
    if (func(value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

let result = myFilter(
  [2, 1, 3, 4, 5, 6, 9, 12],
  function (val) {
    return this.allowedValues.indexOf(val) >= 0;
  },
  filter
); // returns [5, 6, 9]

console.log(result);

// I'm trying to refresh myself on function context... If I remember correctly, the filter of thisArg takes
// an argument for the current function context, because functions run based on the way that they are called,
// not based on scope. So if you call filter on an array... Hmmm. I'm trying to think of a real example where you
// would run into this, but I cannot remember. Because when you filter an array, you are almost always doing .filter
// on an array... Or maybe... Its referring to the function. Ah. Thats it. If you do an array method, but
// then you pass in a method from an object, then you're going to want the thisArg, so that the function
// or method on that object is calling the right object. Thats why you usually want to use arrow functions.

// See that? Little boot up period, period of cluelessness, and I'm locked in.

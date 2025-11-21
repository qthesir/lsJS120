// (function (number1, number2) {
//   return number1 + number2;
// });

// console.log(sum(3, 4));

let logResult = function(func) {
  let result = func();
  console.log(result);
  return result;
};

let foo = function() {
  let self = {
    name: 'Ya',
    age: 42
  };
  let sue = {
    name: 'Sue Perkins',
    age: 37,
    myAge() {
      return `${self.name} is ${self.age} years old`;
    },
  };
  logResult(sue.myAge);
};

foo();
// Expected output: Sue Perkins is 37 years old.



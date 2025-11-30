class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static substract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      throw new RangeError("Division by 0");
    } else {
      return a / b;
    }
  }
}

console.log(MathUtils.add(5, 3));
console.log(MathUtils.substract(10, 4));
console.log(MathUtils.multiply(6, 7)); // 42
console.log(MathUtils.divide(20, 5)); // 4
console.log(MathUtils.divide(10, 0)); // RangeError: Division by zero

/*
To note here: This is how the actual "Math" class in javascript works. Its a class with static utilities 
defined on top of it. Which is why you don't import a variable, but instead capitalize "M" in math and
call the method directly on top of it. 
*/

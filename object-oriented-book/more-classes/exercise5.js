class MathUtils {
  static add(number1, number2) {
    return number1 + number2;
  }

  static substract(number1, number2) {
    return number1 - number2;
  }

  static multiply(number1, number2) {
    return number1 * number2;
  }

  static divide(number1, number2) {
    if (number2 === 0) {
      throw new RangeError("Division by 0");
    } else {
      return number1 / number2;
    }
  }
}

console.log(MathUtils.add(5, 3));
console.log(MathUtils.substract(5, 3));
console.log(MathUtils.multiply(6, 7)); // 42
console.log(MathUtils.divide(20, 5)); // 4
console.log(MathUtils.divide(10, 0)); // RangeError: Division by zero

/*
To note here: This is how the actual "Math" class in javascript works. Its a class with static utilities 
defined on top of it. Which is why you don't import a variable, but instead capitalize "M" in math and
call the method directly on top of it. 
*/

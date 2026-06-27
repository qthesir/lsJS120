// class Person {
//   #name;
//   #age;

//   constructor(name, age) {
//     this.#name = name;
//     this.#age = age;
//   }

//   set age(newAge) {
//     if (typeof newAge !== "number" || newAge < 0) {
//       throw new RangeError("Age must be positive");
//     }
//     this.#age = newAge;
//   }

//   showAge() {
//     console.log(this.#age);
//   }
// }

// let person = new Person("John", 30);
// person.showAge(); // 30
// person.age = 31;
// person.showAge(); // 31

// try {
//   // This line should raise a RangeError,
//   // but does not.
//   person.age = -5;
//   person.showAge(); // -5
// } catch (e) {
//   // The following line should run, but won't
//   console.log("RangeError: Age must be positive");
// }

// person.age = "f";

// class Book {
//   #title;
//   #author;
//   #year;

//   constructor(title, author, year) {
//     this.#title = title;
//     this.#author = author;
//     this.year = year;
//   }

//   set year(year) {
//     if (typeof(year) !== "number" || year < 1900) {
//       throw new RangeError("Invalid Year");
//     }

//     this.#year = year
//   }

//   get title() {
//     return this.#title;
//   }

//   get author() {
//     return this.#author;
//   }

//   get year() {
//     return this.#year
//   }
// }

// let book = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
// console.log(book.title); // The Great Gatsby
// console.log(book.author); // F. Scott Fitzgerald
// console.log(book.year); // 1925

// book.year = 1932; // Changing year
// console.log(book.year); // 1932

// try {
//   book.year = 1825;
// } catch (e) {
//   console.log(e); // RangeError: Invalid year
// }

// try {
//   let book2 = new Book("A Tale of Two Cities", "Charles Dickens", 1859);
// } catch (e) {
//   console.log(e); // RangeError: Invalid year
// }

// class BankAccount {
//   #balance = 0;

//   #checkBalance() {
//     console.log(`Current balance: ${this.#balance}`);
//   }

//   deposit(depositAmount) {
//     if (depositAmount < 0) {
//       throw new RangeError("Deposit must be greater than 0");
//     }
//     this.#balance += depositAmount;
//     this.#checkBalance();
//   }

//   withdraw(withdrawalAmount) {
//     if (this.#balance < withdrawalAmount) {
//       throw new RangeError("Insufficient Funds");
//     }
//     this.#balance -= withdrawalAmount;
//     this.#checkBalance();
//   }
// }

// let account = new BankAccount();
// account.deposit(100);
// account.withdraw(50);
// account.withdraw(100); // RangeError: Insufficient funds

// class Rectangle {
//   #height;
//   #width;
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   set width(width) {
//     if (width <= 0) {
//       throw new RangeError("Width must be positive");
//     }
//     this.#width = width;
//   }

//   set height(height) {
//     if (height <= 0) {
//       throw new RangeError("Height must be positive");
//     }

//     this.#height = height;
//   }

//   get width() {
//     return this.#width;
//   }

//   get height() {
//     return this.#height;
//   }

//   get area() {
//     return this.width * this.height
//   }
// }

// let rect = new Rectangle(10, 5);
// console.log(rect.area); // 50

// rect.width = 20;
// console.log(rect.area); // 100

// rect.height = 12;
// console.log(rect.area); // 240

// try {
//   rect.width = 0;
// } catch (e) {
//   console.log(e); // RangeError: width must be positive
// }

// try {
//   rect.height = -10;
// } catch (e) {
//   console.log(e); // RangeError: height must be positive
// }

class MathUtils {
  static add(num1, num2) {
    return num1 + num2
  }

  static subtract(num1, num2) {
    return num1 - num2
  }

  static multiply(num1, num2) {
    return num1 * num2
  }

  static divide(num1, num2) {
    if(num2 === 0) {
      throw new RangeError('Division By 0')
    }
    return num1 / num2
  }
}

console.log(MathUtils.add(5, 3));       // 8
console.log(MathUtils.subtract(10, 4)); // 6
console.log(MathUtils.multiply(6, 7));  // 42
console.log(MathUtils.divide(20, 5));   // 4
console.log(MathUtils.divide(10, 0));   // RangeError: Division by zero

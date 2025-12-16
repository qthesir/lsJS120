/* 1. Suppose we want to use code to keep track of products in our hardware store's inventory.
A first stab might look something like this:
*/

let scissorsId = 0;
let scissorsName = "Scissors";
let scissorsStock = 8;
let scissorsPrice = 10;

let drillId = 1;
let drillName = "Cordless Drill";
let drillStock = 15;
let drillPrice = 45;

/*
This code presents a number of problems, however. What if we want to add another kind of drill? 
Given what we've learned about object orientation in the previous assignment, 
how could we use objects to organize these two groups of data?
*/

/*
We could use a factory function to create a "product" with 4 attributes - id, name, stock, and price - and use that 
function to create a scissor product and a drill product, given the attributes on both types of products are the same. 

Down the line, we could also have the function auto increment the id, or auto-generate it, each time a new product is 
created, so that you can ensure all ids will be unique, and there's no room for programmer / user error of the function. 

Here's the revised code:
*/

// First attempt, jumped the gun

// function createProduct(id, name, stock, price) {
//   return {
//     id,
//     name,
//     stock,
//     price,
//   };
// }

// let scissors = createProduct(0, "Scissors", 8, 10);
// let drill = createProduct(1, "Cordless Drill", 15, 45);

// Old code

// let scissors = {
//   id: 0,
//   name: "Scissors",
//   stock: 8,
//   price: 10,
//   setPrice(newPrice) {
//     if (newPrice < 0) {
//       throw new Error("The new price must be greater than 0");
//     }

//     this.price = newPrice;
//   },
//   describeProduct() {
//     prompt(`Id: ${this.id}`);
//     prompt(`Product: ${this.name}`);
//     prompt(`Price: $${this.price}`);
//     prompt(`Stock: ${this.stock}`);
//   },
// };

// let drill = {
//   id: 0,
//   name: "Cordless Drill",
//   stock: 15,
//   price: 45,
//   setPrice(newPrice) {
//     if (newPrice < 0) {
//       throw new Error("The new price must be greater than 0");
//     }

//     this.price = newPrice;
//   },
//   describeProduct() {
//     prompt(`Id: ${this.id}`);
//     prompt(`Product: ${this.name}`);
//     prompt(`Price: $${this.price}`);
//     prompt(`Stock: ${this.stock}`);
//   },
// };

function prompt(message) {
  console.log(`=> ${message}`);
}

function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

    setPrice(newPrice) {
      if (newPrice < 0) {
        throw new Error("The new price must be greater than 0");
      }
      this.price = newPrice;
    },

    describeProduct() {
      prompt(`Id: ${this.id}`);
      prompt(`Product: ${this.name}`);
      prompt(`Price: $${this.price}`);
      prompt(`Stock: ${this.stock}`);
    },
  };
}

let scissors = createProduct(0, "Scissors", 8, 10);
let drill = createProduct(1, "Cordless Drill", 15, 45);
let pencil = createProduct(2, "Pencil", 25, 1);
let screwdriver = createProduct(3, "Screwdriver", 7, 7);
let hammer = createProduct(4, "Hammer", 4, 20);

// Guess I jumped the gun. Solution had it create two object literals instead of writing the function to generate
// the objects, but I think I didn't need to do this.

/*
2. Our new organization also makes it easier to write functions dealing with the products, 
because we can now take advantage of conventions in the objects' data. Create a function 
that takes one of our product objects as an argument, and sets the object's price to a 
non-negative number of our choosing, passed in as a second argument. If the new price 
is negative, let the user know that the new price is invalid.

3. Add the functions as methods to the two individual objects

4. Create a factory function for the two objects

5. Create new objects with the factory function you just created.
*/

function setPrice(product, newPrice) {
  if (newPrice < 0) {
    throw new Error("The new price must be greater than 0");
  }

  product.price = newPrice;
}

function describeProduct(product) {
  prompt(`Id: ${product.id}`);
  prompt(`Product: ${product.name}`);
  prompt(`Price: $${product.price}`);
  prompt(`Stock: ${product.stock}`);
}

scissors.describeProduct();
scissors.setPrice(5);
scissors.describeProduct();


/*
1. What are two disadvantages to working with factory functions?
- Each object created by the factory function must have a copy of all methods. This takes up extra memory. This is 
in contrast to other methods, like classes or inheriting methods from a prototype, where the method is called further
up the prototype chain for two related objects. 
- On a related point, object factories cannot easily establish class inheritance patterns. Its difficult to create
parent / child relationships. 
*/

/*
2. Rewrite the following code to use object-literal syntax to generate the returned object:
*/

function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}

function makeObj2() {
  return {
    propA: 10,
    propB: 20,
  };
}

/*
3. In this problem and the remaining problems, we'll build a simple invoice processing program. 
To get you started, here's the code to process a single invoice:

To process multiple invoices, we need a factory method that we can use to create invoices. 
The requirements for the factory function are as follows:

- It returns an invoice object, with phone and internet properties, and a total method.
- The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
- The function takes an object argument whose attributes override the default values.
*/

function createInvoice(phone = 3000, internet = 5500) {
  return {
    phone,
    internet,

    total() {
      return phone + internet;
    },
  };
}

function invoiceTotal(invoices) {
  
}

let invoice = createInvoice();

console.log(invoice.total());

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

Aside: Requirements aren't totally clear here. Does the function take an object argument, and then override the whole
object, or just the values specified in the object?

Based on the output of the program, it seems like the problem wants only to override the values inside of the object,
not the original. Code below solves this problem. 
*/

function createInvoice(invoiceValues = {}) {
  return {
    phone: invoiceValues.phone ?? 3000,
    internet: invoiceValues.internet ?? 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      payments.forEach(this.addPayment, this);
    },

    paymentTotal() {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue() {
      return this.total() - this.paymentTotal();
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let i = 0; i < invoices.length; i++) {
    total += invoices[i].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(
  createInvoice({
    phone: 1000,
    internet: 4500,
  })
);

console.log(invoiceTotal(invoices)); // => 31000

/*
4. Now we can build a factory function to create payments. The function can take 
an object argument in one of 3 forms:

Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
Payment for both services, e.g., { internet: 2000, phone: 1000 }.
Payment with just an amount property, e.g., { amount: 2000 }.
The function should return an object that has the amount paid for each service 
and a total method that returns the payment total. If the amount property is not present in the argument, 
it should return the sum of the phone and internet service charges; 
if the amount property is present, return the value of that property.

Your function should work with the following code:
*/
function createPayment(payment = {}) {
  return {
    internet: payment.internet ?? 0,
    phone: payment.phone ?? 0,
    amount: payment.amount ?? null,

    total() {
      return this.amount ? this.amount : this.internet + this.phone;
    },
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => {
    return sum + payment.total();
  }, 0);
}

let payments = [];

payments.push(createPayment());
payments.push(createPayment({ internet: 6500 }));
payments.push(createPayment({ phone: 2000 }));
payments.push(createPayment({ phone: 1000, internet: 4500 }));
payments.push(createPayment({ amount: 10000 }));

console.log(paymentTotal(payments)); // => 24000

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);

console.log(invoice.amountDue());

/*
5. Update the createInvoice function so that it can add payment(s) to invoices. Use the 
following code as a guideline:



*/

// Quick lesson here: The null coaelscing will only go to the default option if the evaluated value is
// undefined or null. With the case of the || operator, it will short circuit if the value is falsy,
// which includes "", 0, false. In the above case, 0 is valid if the user puts that in there, so it
// is necessary to use null coalescing to check if the property is present instead of the
// || short circuit.

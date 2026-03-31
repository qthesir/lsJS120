let item = {
  name: "Foo",
  description: "Fusce consequat dui est, semper.",
  price: 50,
  quantity: 100,
  discount: function (percent) {
    let discount = this.price * (percent / 100);
    let discountedPrice = this.price - discount;

    return discountedPrice;
  },
};

console.log(item.discount(20)); // should return 40

console.log(item.discount(50)); // should return 25

console.log(item.discount(25)); // should return 37.5

/*
Reason code was buggy was because the price on the object was being decremented, rather than
a temporary variable created by the function. Each call was mutating the object property price. 
*/
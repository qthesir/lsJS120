/*
1. What does the following code log to the console? Try to answer without running the code. 
Can you explain why the code produces the output it does?
*/

let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);

/*
The above code is going to log NaN in both line 24 and line 25. Inside the Rectangle constructor function, when the 
property this.area and this.perimeter are set on line 18 and line 19, respectively, the method .area and .perimeter
are called on the RECTANGLE object, which means that the function is run with RECTANGLE as its execution context. 
Therefore, this inside of perimeter and area will be the RECTANGLE object which do not have width or height properties, 
so this.width and this.height will both evaluate to undefined. When the operand + or * encounters undefined or another 
non-numerical data type, it evaluates to NaN. This is why 24 and 25 evaluate to NaN. 
*/


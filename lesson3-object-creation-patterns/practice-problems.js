/*
1. What are two disadvantages to working with factory functions?
- Each object created by the factory function must have a copy of all methods. This takes up extra memory. This is 
in contrast to other methods, like classes or inheriting methods from a prototype, where the method is called further
up the prototype chain for two related objects. 
- On a related point, object factories cannot easily establish class inheritance patterns. Its difficult to create
parent / child relationships. 
*/

/*
Rewrite the following code to use object-literal syntax to generate the returned object:
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

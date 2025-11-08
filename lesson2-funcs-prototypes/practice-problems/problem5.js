// for (let property in foo) {
//   console.log(`${property}: ${foo[property]}`);
// }

// Object.keys(foo).forEach((property) => {
//   console.log(`${property}: ${foo[property]}`);
// });

/*
If foo is an arbitrary object, will these loops always log the same results to the console? Explain 
why they do or do not. If they don't always log the same information, show an example of when the
results differ.
*/

/*
No, they won't log the same information. The reason being is because Object.keys only iterates 
over an objects own properties, whereas for/in iterates over all of objects properties, including
those of their prototype. 

For instance: 
*/

let bar = { prop1: 1 };
let qux = { prop2: 2 };
Object.setPrototypeOf(qux, bar);

console.log("For/in")
for (let property in qux) {
  console.log(`${property}: ${qux[property]}`);
}

console.log('Keys:')

Object.keys(qux).forEach((property) => {
  console.log(`${property}: ${qux[property]}`);
});

/*
In the above example, we have two objects: bar and qux, with properties prop1 and prop2 respectively.
bar is qux's prototype. When iterating over the properties of qux with a for/in loop, both prop2
AND prop 1 are logged to the console, since for/in iterates over all the objects properties, 
not just their own properties. On the loop using Object.keys() on the other hand, only qux's property
prop 2 is logged in the console. 

*/
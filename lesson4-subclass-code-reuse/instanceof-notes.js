function Animal() {}

function Cat() {}

Cat.prototype = Object.create(Animal.prototype)

let cat = new Cat()

console.log(Animal.prototype instanceof Animal)
console.log(cat instanceof Animal)

/*
Ok, I think I understand this now. Instanceof is checking to see if any of the objects in the instances 
(left hand operand) prototype chain are equal to the object reference of the constructor's (right hand operand)
function prototype (constructor.prototype). This now makes perfect sense. And writing Object.create(Animal.prototype)
is kinda equivalent to new Animal(). I did not think that one through hard enough. 
*/
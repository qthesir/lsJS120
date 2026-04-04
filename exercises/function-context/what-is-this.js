let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

/*
I think Rick Sanchez will be logged on line 7, but I'm not totally sure. I'm not sure what this.firstName 
+ this.lastName exactly represents in the code. I know that those values evaluate to something, should I
think of this just like a function? This.fullName isn't really a function. Its a property, accessing a 
computed value. Maybe fullName "closes" over those values when the object is created? That would make more
sense. That this.firstName + this.lastName is evaluated before the object is created. Now if I try to 
change firstName or lastName, then my guess would be that fullName would remain the same and not change. 

That doesn't change my answer to the question, however.

Ok, I was wrong. It logged NaN. Why? Thats doing undefined + undefined. I guess, since its 
technically evaluating in the global scope, like a function wasn't defined on the student, then
its pulling its this from the global scope. I don't know how + works vs a regular function. 

Oh... maybe its like, its a property... so its doing person.fullName, whatever the expression is,
basically in line in the console.log. So its doing this.firstName + this.lastName inside of the 
global scope. That makes sense.

Ok... So whats really happening, is the expression is being evaluated immediately when the 
object is created, and this is referencing whatever function scope its in, which, in this case, 
is the global scope. 
*/
/*
What will the following code output?
*/

message = "Hello from the global scope!";

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: "Hello from the function scope!",
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();

/*
The first time deliverMessage() is called, on line 11, it will output the value of message on line 5. 
This is because when message is assigned on line 5, it is done so without a variable declaration 
statement (var, let, or const). Without a declaration statement, JavaScript assigns the variable to 
the global object. The implicit execution context of deliverMessage() on line 11 is the global 
object, and this.message is logged to the console, which means deliverMessage, in this case,
is accessing the message property on the global object, which will be equal to the value of 
message assigned on line 5. 

The second time deliverMessage is called, on line 19, the value of the message on line 14,
inside the foo object, will be logged. This is because deliverMessage is assigned as a 
property on foo and called as a method on line 19. Therefore, the implicit execution of 
this will be obj, and obj.message is the value of message assigned on line 14. 



*/

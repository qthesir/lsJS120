/*
What will the following code log? 
*/

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());

/*
The first console log statement will log "ByeBye", since thats the return value of the static version of the 
method dupData, and static methods are called on the constructor. The second line will log "HelloHello". 
This is because the other variation of dupData is an instance method, and thing is an instance of Something.
*/
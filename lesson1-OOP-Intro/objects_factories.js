/*

Create three objects that represent the three books shown above. The method for the 
"Get Description" behavior should return a string like the following:

"Me Talk Pretty One Day was written by David Sedaris."

*/

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}. I ${
        this.read ? "have" : "haven't"
      } read it.`;
    },

    readBook() {
      this.read = true;
    },
  };
}

let mythos = createBook("Mythos", "Stephen Fry");
let meTalkPrettyOneDay = createBook(
  "Me Talk Pretty One Day",
  "David Sedaris",
  false
);
let auntsArentGentlement = createBook(
  "Aunts aren't Gentleman",
  "PG Wodehouse",
  true
);

console.log(mythos.getDescription());
mythos.readBook();
console.log(mythos.getDescription());

/*
2. Think about the code you wrote for problem #1. Is there any unnecessary code? 
Does it have duplication?

In my case, I created the objects using an object factory, rather than object literals, like 
the LS solution did. In my case, I am not repeating any code. The LS solution, however, with the 
three individual objects, has repeated the getDescription function 3 times. 

*/

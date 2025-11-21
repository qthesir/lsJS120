function Album(title, artist, releaseYear) {
  this.title = title;
  this.artist = artist;
  this.releaseYear = releaseYear;
}

let thriller = new Album("Thriller", "Michael Jackson", 1982);
let theDarkSideOfTheMoon = new Album(
  "The Dark Side of the Moon",
  "Pink Floyd",
  1973
);

console.log(thriller);
console.log(theDarkSideOfTheMoon);

/*
The constructor function is the function "Album", which becomes a constructor when the 'new' 
operator is used and the this keyword is used inside the function. The instance objects are
the variables thriller and theDarkSideOfTheMoon, which are instantiated with the constructor Album.
These objects are of type Album, as defined by the constructor function. 

*/
/* 
Orchestrate a wedding that includes Chefs, decoradors, and musicians. There should be a
function on wedding that tells all of those entities to prepare their respective roles 
for the celebration. Don't worry about the implementation - just the OOO structure. 
*/

class Chef {
  prepare(wedding) {
    this.prepareFood(wedding.food);
  }

  prepareFood(food) {
    console.log(`Preparing ${food}`);
  }
}

class Musician {
  prepare(wedding) {
    this.prepareMusic(wedding.songs);
  }
  prepareMusic(songs) {
    console.log(`Preparing ${songs}`);
  }
}

class Decorator {
  prepare(wedding) {
    this.prepareDecorations(wedding.decorations);
  }

  prepareDecorations(decorations) {
    console.log(`Preparing ${decorations}`);
  }
}

class Wedding {
  constructor(food, songs, decorations) {
    this.food = food;
    this.songs = songs;
    this.decorations = decorations;
  }

  preparations(preparers) {
    preparers.forEach(
      function (preparer) {
        preparer.prepare(this);
      }.bind(this)
    );
  }
}

let chef = new Chef();
let musician = new Musician();
let decorator = new Decorator();
let wedding = new Wedding("chicken", "piano", "balloons");

let preparers = [chef, musician, decorator];

wedding.preparations(preparers);

let whatever = {}

console.log(whatever.prepare())
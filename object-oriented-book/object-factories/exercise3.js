/*
Create an object factory that returns objects representing musical instruments. 
Each instrument should have a name and a type. Users of these objects should be 
able to play the instrument and show its type. Use the factory function to create 
three instruments:

A cello is a string instrument.
A flute is a wind instrument.
A drum is a percussion instrument.

*/

function createInstrument(name, type) {
  return {
    name,
    type,

    play() {
      console.log(`We are playing a tune on this ${this.name}.`);
    },

    showType() {
      console.log(`This ${this.name} is a ${this.type} instrument.`);
    },
  };
}

let cello = createInstrument("cello", "string");
cello.play();
cello.showType();

let flute = createInstrument("flute", "wind");
flute.play();
flute.showType();

let drum = createInstrument("drum", "percussion");
drum.play();
drum.showType();

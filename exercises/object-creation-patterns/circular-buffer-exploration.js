class CircularBuffer {
  static EMPTY_VALUE = null;
  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.buffer = Array();
  }

  put(value) {
    this.buffer.push(value);
    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }
  }

  get() {
    if (this.buffer.every((val) => val === CircularBuffer.EMPTY_VALUE))
      return null;
    return this.buffer.shift();
  }
}

let buffer = new CircularBuffer(3);
console.log(buffer.get() === null);

buffer.put(1);
buffer.put(2);
console.log(buffer.get() === 1);

buffer.put(3);
buffer.put(4);
console.log(buffer.get() === 2);

buffer.put(5);
buffer.put(6);
buffer.put(7);
console.log(buffer);
console.log(buffer.get() === 5);
console.log(buffer);
console.log(buffer.get() === 6);
console.log(buffer.get() === 7);
console.log(buffer.get() === null);

let anotherbuffer = new CircularBuffer(4);
console.log(anotherbuffer.get() === null);

anotherbuffer.put(1);
anotherbuffer.put(2);
console.log(anotherbuffer.get() === 1);

anotherbuffer.put(3);
anotherbuffer.put(4);
console.log(anotherbuffer.get() === 2);

anotherbuffer.put(5);
anotherbuffer.put(6);
anotherbuffer.put(7);
console.log(anotherbuffer.get() === 4);
console.log(anotherbuffer.get() === 5);
console.log(anotherbuffer.get() === 6);
console.log(anotherbuffer.get() === 7);
console.log(anotherbuffer.get() === null);

/*
Ok, so, when else does this buffer work? How can I do this? So, I could have an array, with 3 slots,
or an object, with 3 slots. When I put an item in the array, it could have a counter that moves to
the next slot to add something in. Removing something would remove it from the next slot to add something in,
but then this, after removing more than one item, would start causing problems. 

Another way of approaching this: How would I make a circle in general? How do I make something loop 
around until it reaches the end, and then start over again? I'm thinking of degrees... 365, then 364, 363,
etc. Then 0, 1, 2. How was I making a circle in the past? I think that this principle will be helpful. 

It doesn't have anything to do with whether or not its full. Its just, 1, 2, 3, 1 ,2, 3... For adding.

For removing, its whatever is populated, starting at the slot behind the next number. So, if its 3, 
the program checks 2, then it checks 1, and if there's nothing, it says "nothing to remove" and removes
nothing. If it hits a number in one of those slots, it will remove it. Hmmm....

Put is a little more complicated... What do I need to do? I need to check the buffer immediately 
behind it, and immediately in front of it in order. 

Hmmm... adding an index to each value seems to be making this excessively complicated. I actually do not have 
to do that. The only information I need, is which object was added that was the oldest. You can use the same circular 
reasoning that you're using for the add index, and apply it to the index that is being removed. 
*/

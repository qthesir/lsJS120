const TESgames = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ": " + title);
    });
  },
};

TESgames.listGames();

/*
Will the code produce the following output? Why or why not? 

The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
*/

/*
No. The above code will output 'undefined: Arena', 'undefined: Daggerfall', 'undefined: Marrowind'... etc. 
The reason for this is because listGames is called with TESgames as the context. this.titles will properly
reference the titles property on TESgames, since listGames has TESgames as an execution context, and thus the 
title parameter in the callback function passed into forEach will be the appropriate title. However,
the callback function does not have TESgames as its context, because it is not explicitly set, 
so when the callback invokes this.seriesTitle, it will reference the global object, which will return 
undefined.

Here is some code that fixes the problem:
*/
// Here is a solution that uses the self = this pattern:

const TESgames2 = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    let self = this;
    this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ": " + title);
    });
  },
};

TESgames2.listGames();

// thisArg to forEach fix

const TESgames3 = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ": " + title);
    }, TESgames3);
  },
};

TESgames3.listGames();

// Arrow function pattern:

const TESgames4 = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ": " + title);
    });
  },
};

TESgames4.listGames();

// Above, the function expression has been replaced with an arrow function, which will inherit listGames
// execution context. An alternative would be to pass in thisArg to forEach as TESgames2. You could also
// bind the function to TESgames2.

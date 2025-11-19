const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
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

Here is a fix:
*/

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
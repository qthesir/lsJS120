let franchise = {
  name: "How to Train Your Dragon",
  allMovies: function () {
    return [1, 2, 3].map(function (number) {
      return this.name + " " + number;
    });
  },
};

let franchise2 = {
  name: "How to Train Your Dragon",
  allMovies: function () {
    let concatMovieTitle = function (number) {
      return this.name + " " + number;
    }.bind(this);

    return [1, 2, 3].map(concatMovieTitle);
  },
};

console.log(franchise2.allMovies());

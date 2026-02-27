let readline = require("readline-sync");

function Square(marker = Square.UNUSED_SQUARE) {
  this.marker = marker;
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

Square.prototype.setMarker = function (marker) {
  this.marker = marker;
};
Square.prototype.isUnused = function () {
  return this.marker === Square.UNUSED_SQUARE;
};
Square.prototype.getMarker = function () {
  return this.marker;
};
Square.prototype.toString = function () {
  return this.marker;
};

function Board() {
  this.squares = {};

  for (let counter = 1; counter <= 9; counter++) {
    this.squares[counter] = new Square();
  }
}

Board.prototype.countMarkersFor = function (player, keys) {
  let markers = keys.filter((key) => {
    debugger;
    return this.squares[key].getMarker() === player.getMarker();
  });

  return markers.length;
};
Board.prototype.markSquareAt = function (key, marker) {
  this.squares[key].setMarker(marker);
};
Board.prototype.getOpenSquares = function () {
  let keys = Object.keys(this.squares);
  return keys.filter((key) => this.squares[key].isUnused());
};
Board.prototype.isFull = function () {
  let unusedSquares = this.getOpenSquares();
  return unusedSquares.length === 0;
};
Board.prototype.display = function () {
  console.log("");
  console.log(`     |     |`);
  console.log(
    `  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`
  );
  console.log(`     |     |`);
  console.log("-----+-----+-----");
  console.log(`     |     |`);
  console.log(
    `  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`
  );
  console.log(`     |     |`);
  console.log("-----+-----+-----");
  console.log(`     |     |`);
  console.log(
    `  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`
  );
  console.log(`     |     |`);
  console.log("");
};
Board.prototype.displayWithClear = function () {
  console.clear();
  console.log("");
  console.log("");
  this.display();
};

function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function () {
  return this.marker;
};

function Human() {
  Player.call(this, Square.HUMAN_MARKER);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_MARKER);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  ["1", "2", "3"], // top row of board
  ["4", "5", "6"], // center row of board
  ["7", "8", "9"], // bottom row of board
  ["1", "4", "7"], // left column of board
  ["2", "5", "8"], // middle column of board
  ["3", "6", "9"], // right column of board
  ["1", "5", "9"], // diagonal: top-left to bottom-right
  ["3", "5", "7"], // diagonal: bottom-left to top-right
];

TTTGame.prototype.play = function () {
  this.displayWelcomeMessage();

  this.board.display();

  while (true) {
    this.humanMoves();
    if (this.gameOver()) break;

    this.computerMoves();
    if (this.gameOver()) break;

    this.board.displayWithClear();
  }

  this.board.displayWithClear();
  this.displayResults();
  this.displayGoodbyeMessage();
};
TTTGame.prototype.displayWelcomeMessage = function () {
  console.clear();
  console.log("Welcome to Tic Tac Toe!");
  console.log("");
};
TTTGame.prototype.humanMoves = function () {
  let choice;
  let validChoices = this.board.getOpenSquares();

  const joinOr = (squares, delimeter = ",", finalWord = "or") => {
    if (squares.length === 1) return String(squares[0]);

    let string = String(squares[0] + delimeter + " ");

    for (let counter = 1; counter < squares.length; counter++) {
      if (counter === squares.length - 2) {
        string += String(squares[counter]) + delimeter + " " + finalWord + " ";
      } else if (counter === squares.length - 1) {
        string += String(squares[counter]);
      } else {
        string += String(squares[counter]) + delimeter + " ";
      }
    }

    return string;
  };

  /*
    Notes here

    The problem is asking for a function that accepts an array, a delimiter, and a final word as arguments in order to 
    display the tic tac toe board with a custom delimeter and include a final word. This would be a complete string as 
    a return value. Man... Having some trouble remembering how to do this. 

    I guess I could use a reduce to construct the new string, going through each of the values individually, and then using 
    the final word prior to the last value. I could also join the strings together, and then add the string at the end.

    I could successive build the string. That is, I could create an algorithm that builds a string with each number in the 
    array. With the first value, it will just use the number. With the succeeding values, it will add the number plus the delimeter and a space. 
    With the second to last value, it will include the delimiter AND the final word. 

    Lets try that.

  */

  const prompt = `Choose a square (${joinOr(validChoices)}): `;

  while (true) {
    choice = readline.question(prompt);

    if (validChoices.includes(choice)) break;

    console.log("Sorry, that's not a valid choice.");
    console.log("");
  }
  this.board.markSquareAt(choice, this.human.getMarker());
};
TTTGame.prototype.computerMoves = function () {
  let validChoices = this.board.getOpenSquares();
  let choice;

  do {
    choice = Math.ceil(Math.random() * 9).toString();
  } while (!validChoices.includes(choice));

  this.board.markSquareAt(choice, this.computer.getMarker());
};
TTTGame.prototype.displayResults = function () {
  if (this.isWinner(this.human)) {
    console.log("Congratulations, you won!");
  } else if (this.isWinner(this.computer)) {
    console.log("I won! I won! Take that, human!");
  } else {
    console.log("Its a tie! No one won.");
  }
};
TTTGame.prototype.displayGoodbyeMessage = function () {
  console.log("Thanks for playing Tic Tac Toe! Goodbye!");
};
TTTGame.prototype.gameOver = function () {
  return this.board.isFull() || this.someoneWon();
};
TTTGame.prototype.someoneWon = function () {
  return this.isWinner(this.human) || this.isWinner(this.computer);
};
TTTGame.prototype.isWinner = function (player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(
    (row) => this.board.countMarkersFor(player, row) === 3
  );
};

let game = new TTTGame();
game.play();

/*
Just want to make a small note for my review: the .prototype property on the constructor function has an object that  
contains the methods that are inherited by the objects created by that constructor.
*/ 
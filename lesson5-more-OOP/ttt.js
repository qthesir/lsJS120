let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  toString() {
    return this.marker;
  }
}

class Board {
  constructor() {
    // STUBS
    // We need a way to model the 3x3 grid
    // What data type should we use. An array? An Object?
    // What should the data structure store? Strings, nubmer, square objects?
    // Perhaps the board can store rows, which stores squares, which stores markers.

    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[counter] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  getOpenSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter((key) => this.squares[key].isUnused());
  }

  display() {
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
  }
}

class Row {
  constructor() {
    // Need some way to identify a row of 3 squares (to see if won)
    // But what about diagonal wins?
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  Mark() {
    // We need a way to mark the board with this player's marker.
    // How do we access the board?
  }

  Play() {
    // We need a way for each player to play the game
    // Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    // STUB
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // SPIKE

    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  humanMoves() {
    console.log("human moves");

    let choice;
    let validChoices = this.board.getOpenSquares();
    const prompt = `Choose a square (${validChoices.join(", ")}): `;

    while (true) {
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.getOpenSquares();
    let choice;

    while (true) {
      choice = ToString(Math.ceil(Math.random() * 9));
      if (validChoices.includes(choice)) break;
    }
    
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayResults() {}

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  gameOver() {
    return false;
  }
}

let game = new TTTGame();
game.play();

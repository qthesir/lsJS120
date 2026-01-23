class Board {
  constructor() {
    // STUBS
    // We need a way to model the 3x3 grid
    // What data type should we use. An array? An Object?
    // What should the data structure store? Strings, nubmer, square objects?
    // Perhaps the board can store rows, which stores squares, which stores markers.
  }
}

class Square {
  constructor() {
    // Need a way to track this squares marker
  }
}

class Row {
  constructor() {
    // Need some way to identify a row of 3 squares (to see if won)
    // But what about diagonal wins?
  }
}

class Marker {
  constructor() {
    // Represents a players "piece" (X or O) on the board
  }
}

class Player {
  constructor() {
    // maybe marker to keep track of this players symbol
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
  constructor() {}
}

class Computer extends Player {
  constructor() {}
}

class TTTGame {
  constructor() {
    // STUB
    // Need a board and two players
  }

  play() {
    // SPIKE

    this.displayWelcomeMessage();

    while (true) {
      this.displayBoard();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;

      break;
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayBoard() {
    console.log("");
    console.log(`     |     |     `)
    console.log(`  O  |     |  O  `)
    console.log(`     |     |     `)
    console.log('-----+-----+-----')
    console.log(`     |     |     `)
    console.log(`     |  X  |     `)
    console.log(`     |     |     `)
    console.log('-----+-----+-----')
    console.log(`     |     |     `)
    console.log(`  X  |     |  X  `)
    console.log(`     |     |     `)
  }

  firstPlayerMoves() {
    // STUB
    // The first player makes a move
  }

  secondPlayerMoves() {
    // STUB
    // The second player makes a move
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

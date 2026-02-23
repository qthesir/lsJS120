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

  getMarker() {
    return this.marker;
  }

  toString() {
    return this.marker;
  }
}

class Board {
  static NUM_BOARD_SQUARES = 9;
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= Board.NUM_BOARD_SQUARES; counter++) {
      this.squares[counter] = new Square();
    }
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter((key) => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter((key) => this.isUnusedSquare(key));
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  getOpportunitySquare(player, row) {
    if (this.countMarkersFor(player, row) === 2) {
      let index = row.findIndex((key) => this.isUnusedSquare(key));
      if (index >= 0) return row[index];
    }

    return undefined;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  isFull() {
    let unusedSquares = this.unusedSquares();
    return unusedSquares.length === 0;
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

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  incrementScore() {
    this.score += 1;
  }

  getScore() {
    return this.score;
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
  static FIRST_MATCH_HUMAN_GOES_FIRST = true;
  static CENTER_SQUARE_INDEX = 5;
  static MATCH_GOAL = 3;
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"], // top row of board
    ["4", "5", "6"], // center row of board
    ["7", "8", "9"], // bottom row of board
    ["1", "4", "7"], // left column of board
    ["2", "5", "8"], // middle column of board
    ["3", "6", "9"], // right column of board
    ["1", "5", "9"], // diagonal: top-left to bottom-right
    ["3", "5", "7"], // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  displayMatchScore() {
    console.log("");
    console.log(`Your score is: ${this.human.getScore()}`);
    console.log(`Computer's score is: ${this.computer.getScore()}`);
  }

  displayMatchResults() {
    console.log("");
    console.log("----------Final Score----------");
    this.displayMatchScore();
    if (this.isMatchWinner(this.human)) {
      console.log("Congratulations! You're the grand champion.");
    } else if (this.isMatchWinner(this.computer)) {
      console.log("Computer is the grand champion!");
    } else {
      console.log("Match incomplete. No one is the grand champion.");
    }
  }

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.MATCH_GOAL;
  }

  isMatchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
    console.log(`First player to ${TTTGame.MATCH_GOAL} games wins the match!`);
    let humanGoesFirst = TTTGame.FIRST_MATCH_HUMAN_GOES_FIRST;
    while (true) {
      this.playOneGame(humanGoesFirst);
      this.updateMatchScore();
      this.displayMatchScore();
      if (this.isMatchOver()) break;
      if (!this.playAgain()) break;
      humanGoesFirst = !humanGoesFirst;
    }

    this.displayMatchResults();
  }

  playOneGame(humanGoesFirst) {
    this.board.reset();
    this.board.display();
    while (true) {
      if (humanGoesFirst) {
        this.board.displayWithClear();
        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();
        if (this.gameOver()) break;
      } else {
        this.computerMoves();
        if (this.gameOver()) break;

        this.board.displayWithClear();

        this.humanMoves();
        if (this.gameOver()) break;
      }
    }
    this.board.displayWithClear();
    this.displayResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  humanMoves() {
    let choice;
    let validChoices = this.board.unusedSquares();

    const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;

    while (true) {
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  static joinOr(squares, delimeter = ",", finalWord = "or") {
    if (squares.length === 1) return String(squares[0]);
    if (squares.length === 2)
      return String(squares[0] + " " + finalWord + " " + squares[1]);

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
  }

  computerMoves() {
    let choice =
      this.offensiveComputerMove() ||
      this.defensiveComputerMove() ||
      this.pickCenterSquare() ||
      this.pickRandomSquare();

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  pickCenterSquare() {
    return this.board.isUnusedSquare(TTTGame.CENTER_SQUARE_INDEX)
      ? TTTGame.CENTER_SQUARE_INDEX
      : null;
  }

  pickRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      choice = Math.ceil(Math.random() * 9).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  offensiveComputerMove() {
    return this.findCriticalSquare(this.computer);
  }

  defensiveComputerMove() {
    return this.findCriticalSquare(this.human);
  }

  findCriticalSquare(player) {
    for (let i = 0; i < TTTGame.POSSIBLE_WINNING_ROWS.length; i++) {
      let row = TTTGame.POSSIBLE_WINNING_ROWS[i];
      let opportunitySquare = this.board.getOpportunitySquare(player, row);
      if (opportunitySquare) return opportunitySquare;
    }

    return null;
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("Congratulations, you won!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("Its a tie! No one won.");
    }
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(
      (row) => this.board.countMarkersFor(player, row) === 3
    );
  }

  playAgain() {
    let answer;
    let validAnswers = ["y", "n"];

    const prompt = "Play again (y/n)? ";

    while (true) {
      answer = readline.question(prompt).toLowerCase();

      if (validAnswers.includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
    }

    console.clear();
    return answer === "y";
  }
}

let game = new TTTGame();
game.play();

// Playing again also needs to reset the games state
// Computer needs to be able to detect a threat. That is, a situation where its about to lose the game.
// How would it do that? Well, at a basic level, if it has two out of the 3 required for any given winning
// strategy, then it needs to fill in that 4th square. It needs to do this every time it takes a turn. I
// suppose this would be in the computer turn logic. We could have a "calculate move" function that lives on the
// computer object. It also needs to be able to use the board... So the function will take the board as an
// argument. So the computer move is still dealing with the orchestration, which is where the board object
// is located. But do I just put in this whole board object to the computer, and then use its methods from there?
// Because the board object has the methods. I do kind of need them, yes, because i need to return the value of countMarkersFor
// I would also need the human player object. But I could also pass the return value of count markers for, and then just use
// the static value on TTTGame, which has possible winning rows as a static value. You could use the specific logic of
// counting the number of squares in each row, like the isWinner function does. But you need to return the specific
// square, thats the goal. Maybe, what I do, is I create a function that returns the open squares of a particular row.
// Or I just get the squares of the entire board (for the player), loop through the winning rows, and see if any of the
// rows have 2 / 3. If they do (i could also remove that element for each one I find), then return the element.
/*

Lets start over. What do I need in order to make an AI defense strategy? 

- Take each winning strategy
- Cycle through each winning stragegy
- See if the two out of the three winning squares are occupied by enemy positions.
- IF a position is identified, the computer should move to block it
- IF a position is not identified, then the computer should make a move at random. 

I could use the "getMarkersAt" function in order to determine if there are two markers or not. 

The more I read my code, the more I become familiar with it, but damn I do not like what I just wrote. It isn't intuitive. Not
one bit. Fuck. I need to write a better solution. Or maybe I just use the LS solution. 

Why was this so difficult? I really don't know. 

I suppose I could abstract the function for the computer selecting an opportunity portion. 

I'm trying to understand the difference between the LS solutuion and my solution. Our solutions are actually pretty 
damn similar, which is kind of crazy, but the main difference is the atRiskSquare function. I used the get opportunity square 
instead, which is a board method that takes the player and the row in question and returns an opportunity. The element of my
solution that I prefer over the LS solution is that mine will also work for finding the opportunity square for the 
offensive move. But perhaps its cleaner / easier to read if you just separate the two? 

What I do like is the addition of the isUnusedSquare method to the board object. This is more clear than what i was doing before.

I also like the flow of logic in the computers move.

Ok, so human going first vs. computer... 

Few options here. First is a switch. Goes true / false. Depending on whether the switch is on or off, 
we can change who goes first in the loop.

Could also keep track of the total number of turns taken. If the turn is even, human goes first. If odd, computer goes first.

And then how to actually swap the pattern? I think control flow is a pretty simple solution here. You could say "human goes first",
and that could be your switch. You can set that switch to a different initial value, as a static variable, which would allow you 
to say who goes first in general. Thinkt his is the best solutoi

*/

/*
Step 1: Write a textual description of the problem or exercise 

Rock paper scissors is a two player game where each of the players simultaneously makes a selection
between 3 options: Rock, paper, and scissors. The relationship between the options determines the
winner:

1. Rock beats scissors
2. Paper beats rock
3. Scissors beats paper
4. If both players select the same option, its a tie, and no one wins. 

In this particular case, one player is a human / user and the other is a computer. The player
makes their move, and then the computer makes its move. Neither player has any knowledge
of the other players move (in person, its done at the same time). 

Once both the player and the computer make their move, a winner is determined, and the
player is notified of the result. 

Nouns
  Options
    Rock
    Paper
    Scissors
  Computer
  Player
  Game
  Rule

Verbs
  Make a move
  Determine winner
  
Options
  Rock
  Paper
  Scissors

Computer
  Make a move
    Options

Player 
  Make a move
    Options

Game 
  Determine winner
    Options
    Rules

Here's how LS has organized it:

Nouns: player, move rule
Verbs: choose, compare

Player
  - Choose
Move
Rule

?? 
  - Compare

Aside: This is a great example of trying to explain something in text, vs. intuitively 
understanding that thing in the physical world. It is so different. This is actually 
kind of hard to describe! 

*/

const rlsync = require("readline-sync");

function createPlayer(moves) {
  return {
    moves,
    currentMove: null,
    score: 0,

    incrementScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },
  };
}

function createComputer(moves) {
  let playerObject = createPlayer(moves);

  let computerObject = {
    choose() {
      let randomIndex = Math.floor(
        Math.random() * this.moves.availableMoves.length
      );
      this.currentMove = this.moves.availableMoves[randomIndex];
      this.moves.updateMoves("computer", this.currentMove);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman(moves) {
  let playerObject = createPlayer(moves);

  let humanObject = {
    choose() {
      let choice;
      while (true) {
        console.log(
          `Choose one of the following options: ${this.moves.availableMoves
            .slice(0, this.moves.availableMoves.length - 1)
            .join(", ")}, or ${
            this.moves.availableMoves[this.moves.availableMoves.length - 1]
          }: `
        );
        choice = rlsync.question();
        if (this.moves.availableMoves.includes(choice)) break;
        console.log("Sorry, invalid choice");
      }

      this.currentMove = choice;
      this.moves.updateMoves("human", this.currentMove);
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createMoves() {
  return {
    availableMoves: ["rock", "paper", "scissors", "spock", "lizard"],
    moveHistory: { human: [], computer: [], winner: [] },

    updateMoves(player, currentMove) {
      if (player === "human") {
        this.moveHistory.human.push(currentMove);
      } else if (player === "computer") {
        this.moveHistory.computer.push(currentMove);
      }
    },

    updateWinner(winner) {
      if (winner === "human") {
        this.moveHistory.winner.push("human");
      } else if (winner === "computer") {
        this.moveHistory.winner.push("computer");
      } else if (winner === "tie") {
        this.moveHistory.winner.push("tie");
      }
    },

    resetMoves() {
      this.moveHistory.human = [];
      this.moveHistory.computer = [];
    },

    displayMoves() {
      function addPadding(str, standardLength) {
        let paddedStr = str;
        while (paddedStr.length < standardLength) {
          paddedStr = paddedStr + " ";
        }
        return paddedStr;
      }
      console.log(`           |  Human   | Computer | Winner  `);
      console.log("-----------|----------|----------|---------");
      this.moveHistory.human.forEach((_, index) => {
        console.log(
          `Round ${addPadding(String(index + 1) + ":", 3)}  |  ${addPadding(
            this.moveHistory.human[index],
            8
          )}|  ${addPadding(this.moveHistory.computer[index], 8)}|  ${
            this.moveHistory.winner[index]
          }`
        );
      });
    },
  };
}

function createRules(human, computer) {
  return {
    human,
    computer,
    winningOutcomes: {
      rock: ["scissors", "lizard"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      spock: ["rock", "scissors"],
      lizard: ["paper", "spock"],
    },

    determineWinner() {
      if (
        this.winningOutcomes[this.human.currentMove].includes(
          this.computer.currentMove
        )
      ) {
        return "human";
      } else if (
        this.winningOutcomes[this.computer.currentMove].includes(
          this.human.currentMove
        )
      ) {
        return "computer";
      } else {
        return "tie";
      }
    },
  };
}

function createScore(human, computer) {
  return {
    human,
    computer,

    addPoint(winner) {
      if (winner === "human") {
        this.human.incrementScore();
      } else if (winner === "computer") {
        this.computer.incrementScore();
      }
    },

    resetScores() {
      this.human.resetScore();
      this.computer.resetScore();
    },

    pickRoundWinner() {
      if (this.human.score >= 5) {
        return "human";
      } else if (this.computer.score >= 5) {
        return "computer";
      } else {
        return "no winner";
      }
    },

    displayScore() {
      console.log(
        `Your score: ${this.human.score}\nComputer's Score: ${this.computer.score}`
      );
    },

    displayGrandWinner() {
      console.log("------Final Score-------");
      console.log(`You: ${this.human.score}`);
      console.log(`Computer: ${this.computer.score}`);
      console.log("------------------------");
      if (this.pickRoundWinner() === "human") {
        console.log("Congratulations! You're the reining champion!");
      } else if (this.pickRoundWinner() === "computer") {
        console.log("Computer is the reining champion!");
      }
    },
  };
}

function createRPSGame() {
  const moves = createMoves();
  const human = createHuman(moves);
  const computer = createComputer(moves);
  const score = createScore(human, computer);
  const rules = createRules(human, computer);

  return {
    moves: moves,
    human: human,
    computer: computer,
    score: score,
    rules: rules,

    displayWelcomeMessage() {
      console.log("Welcome to Rock, Paper, Scissors!");
    },

    displayGoodbyeMessage() {
      console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
    },

    displayWinner(winner) {
      console.log(`You chose ${this.human.currentMove}`);
      console.log(`Computer chose ${this.computer.currentMove}`);
      if (winner === "tie") {
        console.log("Its a tie!");
      } else {
        console.log("human" === winner ? "You win!" : "Computer wins!");
      }
    },

    playAgain() {
      console.log("Would you like to play again? (y/n)");
      let answer = rlsync.question();
      return answer.toLowerCase()[0] === "y";
    },

    play() {
      this.displayWelcomeMessage();
      while (true) {
        this.score.resetScores();
        while (true) {
          this.human.choose();
          this.computer.choose();

          let winner = this.rules.determineWinner();
          this.score.addPoint(winner);
          this.moves.updateWinner(winner);

          this.displayWinner(winner);
          this.score.displayScore();
          this.moves.displayMoves();
          if (this.score.pickRoundWinner() !== "no winner") break;
        }
        this.score.displayGrandWinner();
        if (!this.playAgain()) break;
      }
      this.displayGoodbyeMessage();
    },
  };
}

RPSGame = createRPSGame();

RPSGame.play();

/*
Notes and reflection

I'm currently contemplating where I could put a potential 'score' state variable, or object. My initial instinct is to 
put the score and associate it with the player. Add an attribute to the player. Then check the score of all players 
to see which of the players has at least 5 points, at which point, that player will be declared a winer. The 
function which checks to see if there is a winner will check to see if the score on any player is a winner. There will
be two nested loops in the 'play' function, one for the playagain, and one for the best of 5. There will also need 
to be a new function, displayGrandWinner. Lets update the control flow first and see if there are any clues as to what other options
I could use for a score. 

Options so far:

- Score on the player object, with a separate function on the RPSGame
- Score as an object, that contained the two players scores, and a function to check whether one of the scores has reached
5 and which one. 

Looking at the two main options: Associating the score with the player feels more intuitive, since
that is, in fact, the players score. However, it does force you to add more logic into the
application engine compared to managing the score entirely in its own object. If the 
score is in its own object, then you can increment, reset, compare, and pick a winner, all 
in the same object. This keeps things pretty tidy. 

Oof, but, upon implementation, the updating the score gets pretty messy... it looks like
I'd have to update the score in an outside function anyway, depending on who won. 


*/

/*
PEDAC: Historical Moves

Problem
What I need to do, is use a list of historical data to update the probability weighting 
of each move for the computer, and then make a move based on the weighting. This splits into
two main functions:

1. Apply rule and update probability weightings for each move accordingly
2. Make a move based on the weighting (update choose()). This is the easy part. 

The weights will be stored in state on the computer object. The rules, also no the 
computer object (as "strategies"). Rules should be checked every round. If a rule applies,
then the computer will update the weighting accordingly. 

The principle thing being acted on is a weight - so there could conceivably be a general option
for any rule. But, lets keep it simple and just write rules for the first function.

- If the computer loses after playing a certain move, reduce the probability of making that move again 
by 50%
- If the computer wins after playing a certain move, increase the probability of making that move again 
by 50%

Problem
Write a function that takes a set of rules; an object with a history of moves for the computer,
human, and the outcome of the round; and returns updated weights 


*/

/*
Notes

I could do this one of several ways: The first way that I could do it is have the rule fire. Have a 
switch statement which contains the conditions for each rule. if the condition returns true, then you 
execute the logic 
*/

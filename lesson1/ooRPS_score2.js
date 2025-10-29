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

function createPlayer() {
  return {
    availableMoves: createMove(),
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

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let randomIndex = Math.floor(
        Math.random() * this.availableMoves.moves.length
      );
      this.currentMove = this.availableMoves.moves[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      while (true) {
        console.log(
          "Choose one of the following options: rock, paper, or scissors: "
        );
        choice = rlsync.question();
        if (this.availableMoves.moves.includes(choice)) break;
        console.log("Sorry, invalid choice");
      }

      this.currentMove = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createMove() {
  return {
    moves: ["rock", "paper", "scissors", "spock", "lizard"],
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
      if(winningOutcomes[this.human.currentMove].includes(this.computer.currentMove)){
        return 'human'
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
  const human = createHuman();
  const computer = createComputer();
  const score = createScore(human, computer);

  return {
    human: human,
    computer: computer,
    score: score,

    displayWelcomeMessage() {
      console.log("Welcome to Rock, Paper, Scissors!");
    },

    displayGoodbyeMessage() {
      console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
    },

    compare() {
      if (
        this.human.currentMove === "rock" &&
        this.computer.currentMove === "scissors"
      ) {
        return "human";
      } else if (
        this.human.currentMove === "scissors" &&
        this.computer.currentMove === "paper"
      ) {
        return "human";
      } else if (
        this.human.currentMove === "paper" &&
        this.computer.currentMove === "rock"
      ) {
        return "human";
      } else if (
        this.computer.currentMove === "rock" &&
        this.human.currentMove === "scissors"
      ) {
        return "computer";
      } else if (
        this.computer.currentMove === "scissors" &&
        this.human.currentMove === "paper"
      ) {
        return "computer";
      } else if (
        this.computer.currentMove === "paper" &&
        this.human.currentMove === "rock"
      ) {
        return "computer";
      } else {
        return "tie";
      }
    },

    displayWinner() {
      console.log(`You chose ${this.human.currentMove}`);
      console.log(`Computer chose ${this.computer.currentMove}`);
      let winner = this.compare();
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
          this.displayWinner();
          this.score.addPoint(this.compare());
          this.score.displayScore();
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

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
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createMoves() {
  return {
    availableMoves: ["rock", "paper", "scissors", "spock", "lizard"],
    moveHistory: [],

    updateMoveHistory(human, computer, winner) {
      let movesThisRound = {
        human: human.currentMove,
        computer: computer.currentMove,
        winner: winner,
      };
      this.moveHistory.push(movesThisRound);
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
      this.moveHistory.forEach(({ computer, human, winner }, index) => {
        console.log(
          `Round ${addPadding(String(index + 1) + ":", 3)}  |  ${addPadding(
            human,
            8
          )}|  ${addPadding(computer, 8)}|  ${winner}`
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
          this.moves.updateMoveHistory(human, computer, winner);

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

// RPSGame.play();

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

New Properties (on computer object):
- historicalMoves
- Analysis
- Weights
- Rules? 

New Methods (on computer object):
  Update Strategy
    - Update Analysis
    - Update Weights
      - According to a rule, which is on another object (maybe)
      - Decrement weight (accepts the move to decrement and the amount, in percentage)

PEDAC: Update Analysis

Problem
Accept an array historicalMoves that contains an object at each index with 3 properties - human, computer, 
and winner - with the human property containing the humans move at that round, computer containing the 
computers move, and the winner containing the winner of the round. The function should return an object 
which contains two properties: humanWinRate and computerWinRate. Each of these contain an object 
with properties of all of the moves in the move history that were used by that player, and the value of
those properties should be the proportion, in whole number percentage terms, of how often the human or 
computer won with that selection. In the event of a tie, the selection should not count toward a 
win or loss. 

// Examples 
Input: [{human: 'rock', computer: 'paper', winner: 'computer'}, 
{human: 'paper', computer: 'rock', winner: 'human'}]

Output:
  humanWinRate: {rock: 0, paper: 100}
  computerWinRate: {rock: 100, paper: 0}

Input: []
Output:
  humanWinRate: {}
  computerWinRate: {}

Input: [{human: 'scissors', computer: 'paper', winner: 'human'}, 
{human: 'paper', computer: 'rock', winner: 'human'},
{human: 'paper', computer 'lizard', winner: 'computer'}]

Output: 
  humanWinRate: {scissors: 100, paper: 50}
  computerWinRate {paper: 0, rock: 0, lizard: 100}

Input: [{human: 'scissors', computer: 'scissors', winner: 'tie'}, 
{human: 'paper', computer: 'rock', winner: 'human'}]
Output:
  humanWinRate: {paper: 100}
  computerWinRate {rock: 0}


Shoot... What do I do if the computer has made a move, but the human hasn't? Maybe two different objects,
one for the computer, and one for the human, would be more appropriate? I don't know... I think 
human win rate, and computerWinRate, are more intuitive. They could each be on the analysis object.
Which one should I pick? Fuck. I mean, I at least need to use a {human:, computer:} because how 
do I know which is which if there is only 1 value? 

human win rate: {rock: 0, paper: 100}

Yes this is better. 

Ok, so now that I have this more or less concrete...

Requirements: 

- Accept an array of moves and outcomes as an argument
- Return an object for the computer and human that contains the win rates for each of the RPS options 
- If the move is not in the array of moves, do not add it to the output object. 
- If the outcome of a round is a tie in the array of moves, do not consider the moves for the win percentage on the output object              
- The win rates on the output object should be in whole percentage terms
- The win rate is calculated by dividing the wins for a particular move by the total number of rounds
with a particular move, and multiplying it by 100

Data Structures
Intermediate: Thinking through this: In order to calculate the win rate for each of the possible moves, I need to sum the 
total number of valid rounds for that move (i.e., the rounds that are not ties) and then the total number of rounds that
are wins, and divide the total wins by total rounds for the given move. I can iterate through the move history by filtering
out the ties and filtering on the specific move in question, then I can filter on wins. Divide the length of the wins by the 
length of the array of the specific moves. 

I can probably do this whole thing with a reduce on the list of all moves.

Algorithm
Accept a history of moves and available moves as an argument. For each available move, find the total number of times 
that move was used for non-tie games, and the total number of times the player won those games. Divide the winning games by
total games, and add the value to the available moves on the output object. Repeat this process for both the human and computer.
Add their moves to a single output object, on their respective properties humanWinRate and computerWinRate. Return the object
to the caller.

Step by Step
- Accept history of moves and available moves
- let output = {humanWinRate: {}, computerWinRate: {}}
- For each available move:
  - Filter the move history to exclude ties
  - SET total to the length of the filtered array
  - Filter the move history to include only wins
  - SET the number of winning games to the filtered array
  - SET winRatio to winningGames / total * 100
  - SET output.humanWinRate[availableMove] = winRatio
- Repeat for the computer
- Return the object to the caller

*/

let moveHistory = [
  { human: "rock", computer: "paper", winner: "computer" },
  { human: "paper", computer: "rock", winner: "human" },
  { human: "scissors", computer: "scissors", winner: "tie" },
];
let availableMoves = ["rock", "paper", "scissors", "spock", "lizard"];
let output = {
  humanWinRate: { rock: 0, paper: 100 },
  computerWinRate: { rock: 0, paper: 100 },
};

function getWinRatios(moveHistory, availableMoves) {
  function getPlayerWinRatio(moveHistoryNoTies, move, player) {
    let totalMoves = 0;
    let winningMoves = 0;
    for (round of moveHistoryNoTies) {
      if (round[player] === move) totalMoves++;
      if (round[player] === move && round.winner === player) winningMoves++;
    }

    if (totalMoves === 0) return undefined;

    return (winningMoves / totalMoves) * 100;
  }

  let winRates = {
    humanWinRate: {},
    computerWinRate: {},
  };

  let moveHistoryNoTies = moveHistory.filter((round) => round.winner !== "tie");

  availableMoves.forEach((move) => {
    let winRatioHuman = getPlayerWinRatio(moveHistoryNoTies, move, "human");
    let winRatioComputer = getPlayerWinRatio(
      moveHistoryNoTies,
      move,
      "computer"
    );
    if (winRatioHuman !== undefined)
      winRates["humanWinRate"][move] = winRatioHuman;
    if (winRatioComputer !== undefined)
      winRates["computerWinRate"][move] = winRatioComputer;
  });

  return winRates;
}

console.log(getWinRatios(moveHistory, availableMoves));

/*
Update Weights
According to the analysis produced in the previous function, 

*/
/*
Notes

I could do this one of several ways: The first way that I could do it is have the rule fire. Have a 
switch statement which contains the conditions for each rule. if the condition returns true, then you 
execute the logic. If it doesn't, then don't execute the logic. You could encapsulate all of this into 
a function called "updateStrategy", which both finds the rule and then updates the weights according to
the rule triggered.

Maybe I should try to let doing this in a sophisticated way go. Its just an exercise, there is no benefit,
the evolutionarily stable strategy is to just choose a random move. 

Update Strategy
  - Runs after the winner is determined and history is updated
  - Uses the most recent moves / winner in the move history to update the analysis
  - With the Analysis, update the weights

So its:

New Properties (on computer object):
- historicalMoves
- Analysis
- Weights
- Rules? 

New Methods (on computer object):
  Update Strategy
    - Update Analysis
    - Update Weights
      - According to a rule, which is on another object (maybe)

Then, as a component of choosing a move, I will choose the move based on the weights, instead of a 
random index. 

Hmmmm. But what of multiple rules? Well, I could fire each rule sequentially. First rule that triggers,
make the weight adjustment. Second rule that triggers, make another adjustment. But you'd want to keep
the relative weights the same. So any adjustment to a given weight would need to be evenly distributed to
the other weights. Which is actually relatively simple, now that I'm thinking through it more clearly. 

In absence of a historical presence for that move, the should outcome default to 50 / 50? Or should I 
just leave it blank, and not check it for rule evaluation? Gut says latter. This is an easy thing to change
later. 

****Archive***** 

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

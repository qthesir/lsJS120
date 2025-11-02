const rlsync = require("readline-sync");

function createPlayer(moves) {
  return {
    moves,
    currentMove: null,
    score: 0,

    getCurrentMove() {
      return this.currentMove;
    },

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
    winRatios: {
      humanWinRate: {},
      computerWinRate: {},
    },
    moveWeights: { rock: 20, paper: 20, scissors: 20, spock: 20, lizard: 20 },

    choose() {
      function selectNextMove(moveWeights) {
        let randomValue = Math.random() * 100;
        let prevValue = 0;
        let currentValue = 0;
        for (const move of Object.keys(moveWeights)) {
          currentValue += moveWeights[move];
          if (prevValue <= randomValue && randomValue < currentValue) {
            return move;
          }
          prevValue = currentValue;
        }

        throw new Error("An error has occurred");
      }

      this.currentMove = selectNextMove(this.moveWeights);
    },

    updateWinRatios() {
      function getPlayerWinRatio(moveHistoryNoTies, move, player) {
        let totalMoves = 0;
        let winningMoves = 0;
        for (const round of moveHistoryNoTies) {
          if (round[player] === move) totalMoves++;
          if (round[player] === move && round.winner === player) winningMoves++;
        }

        if (totalMoves === 0) return undefined;

        return (winningMoves / totalMoves) * 100;
      }

      let moveHistoryNoTies = this.moves
        .getMoveHistory()
        .filter((round) => round.winner !== "tie");

      this.moves.getAvailableMoves().forEach((move) => {
        let winRatioHuman = getPlayerWinRatio(moveHistoryNoTies, move, "human");
        let winRatioComputer = getPlayerWinRatio(
          moveHistoryNoTies,
          move,
          "computer"
        );
        if (winRatioHuman !== undefined)
          this.winRatios["humanWinRate"][move] = winRatioHuman;
        if (winRatioComputer !== undefined)
          this.winRatios["computerWinRate"][move] = winRatioComputer;
      });

      return undefined;
    },

    updateWeights(moveToUpdate, percentChange) {
      let netChange = this.moveWeights[moveToUpdate] * (percentChange / 100);
      if (
        this.moveWeights[moveToUpdate] + netChange >= 50 ||
        this.moveWeights[moveToUpdate] + netChange <= 5
      )
        return undefined;
      this.moveWeights[moveToUpdate] =
        this.moveWeights[moveToUpdate] + netChange;
      for (const move of Object.keys(this.moveWeights)) {
        if (move !== moveToUpdate) {
          this.moveWeights[move] = this.moveWeights[move] - netChange / 4;
        }
      }

      return undefined;
    },

    updateComputerStrategy() {
      this.updateWinRatios();
      // Implement dynamic changes here. Iterate through all moves.
      if (this.winRatios.computerWinRate["rock"] > 60) {
        this.updateWeights("rock", 50);
      }
      if (this.winRatios.computerWinRate["rock"] < 40) {
        this.updateWeights("rock", -50);
      }
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
          `Choose one of the following options: ${this.moves
            .getAvailableMoves()
            .slice(0, this.moves.getAvailableMoves().length - 1)
            .join(", ")}, or ${
            this.moves.getAvailableMoves()[
              this.moves.getAvailableMoves().length - 1
            ]
          }: `
        );
        choice = rlsync.question();
        if (this.moves.getAvailableMoves().includes(choice)) break;
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

    getAvailableMoves() {
      return [...this.availableMoves];
    },

    getMoveHistory() {
      return this.moveHistory.reduce(
        (clone, move) => clone.push({ ...move }),
        []
      );
    },

    updateMoveHistory(human, computer, winner) {
      let movesThisRound = {
        human: human.getCurrentMove(),
        computer: computer.getCurrentMove(),
        winner: winner,
      };
      this.moveHistory.push(movesThisRound);
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

    pickWinner() {
      if (
        this.winningOutcomes[this.human.getCurrentMove()].includes(
          this.computer.getCurrentMove()
        )
      ) {
        return "human";
      } else if (
        this.winningOutcomes[this.computer.getCurrentMove()].includes(
          this.human.getCurrentMove()
        )
      ) {
        return "computer";
      } else {
        return "tie";
      }
    },
  };
}

function createRoundManager(human, computer) {
  return {
    human,
    computer,
    maxRoundScore: 5,

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
      if (this.human.score >= this.maxRoundScore) {
        return "human";
      } else if (this.computer.score >= this.maxRoundScore) {
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

    displayRoundWinner() {
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
  const roundManager = createRoundManager(human, computer);
  const rules = createRules(human, computer);

  return {
    moves: moves,
    human: human,
    computer: computer,
    roundManager: roundManager,
    rules: rules,

    displayWelcomeMessage() {
      console.log("Welcome to Rock, Paper, Scissors!");
    },

    displayGoodbyeMessage() {
      console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
    },

    displayWinner(winner) {
      console.log(`You chose ${this.human.getCurrentMove()}`);
      console.log(`Computer chose ${this.computer.getCurrentMove()}`);
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
        this.roundManager.resetScores();
        while (true) {
          this.computer.updateComputerStrategy();
          this.human.choose();
          this.computer.choose();

          let winner = this.rules.pickWinner();
          this.roundManager.addPoint(winner);
          this.moves.updateMoveHistory(human, computer, winner);

          this.displayWinner(winner);
          this.roundManager.displayScore();
          this.moves.displayMoves();
          if (this.roundManager.pickRoundWinner() !== "no winner") break;
        }
        this.roundManager.displayRoundWinner();
        if (!this.playAgain()) break;
      }
      this.displayGoodbyeMessage();
    },
  };
}

const RPSGame = createRPSGame();

RPSGame.play();

/* 
Improvement steps:
- Add getters for shared values
- Iterate through all moves and apply the rule you've set for each of them.
- Update UX

*/

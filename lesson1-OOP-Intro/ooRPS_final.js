const rlsync = require("readline-sync");

function createPlayer(moves) {
  return {
    moves,
    currentMove: undefined,
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
      this.moveWeights[moveToUpdate] =
        this.moveWeights[moveToUpdate] + netChange;
      for (const move of Object.keys(this.moveWeights)) {
        if (move !== moveToUpdate) {
          this.moveWeights[move] = this.moveWeights[move] - netChange / 4;
        }
      }

      return undefined;
    },

    resetComputerStrategy() {
      this.moveWeights = {
        rock: 20,
        paper: 20,
        scissors: 20,
        spock: 20,
        lizard: 20,
      };
    },

    updateComputerStrategy() {
      this.updateWinRatios();

      for (const move of this.moves.getAvailableMoves()) {
        if (this.winRatios.computerWinRate[move] > 60) {
          this.updateWeights(move, 50);
        }
        if (this.winRatios.computerWinRate[move] < 40) {
          this.updateWeights(move, -50);
        }
      }

      if (
        Object.values(this.moveWeights).some(
          (value) => !!(value <= 5 || value >= 60)
        )
      ) {
        this.resetComputerStrategy();
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
        console.log("");
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
        switch (choice[0]) {
          case "r":
            choice = "rock";
            break;
          case "p":
            choice = "paper";
            break;
          case "l":
            choice = "lizard";
            break;
          default:
            choice = choice;
        }

        switch (choice.slice(0, 2)) {
          case "sc":
            choice = "scissors";
            break;
          case "sp":
            choice = "spock";
            break;
          default:
            choice = choice;
        }

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
    movesToDisplay: 5,

    getAvailableMoves() {
      return [...this.availableMoves];
    },

    getMoveHistory() {
      return this.moveHistory.map((move) => ({ ...move }));
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
      let startingIndex =
        this.moveHistory.length <= this.movesToDisplay
          ? 0
          : this.moveHistory.length - this.movesToDisplay;
      console.log("");
      console.log(`           |  Human   | Computer | Winner  `);
      console.log("-----------|----------|----------|---------");
      this.moveHistory
        .slice(startingIndex, this.moveHistory.length)
        .forEach(({ computer, human, winner }, index) => {
          console.log(
            `Round ${addPadding(
              String(index + startingIndex + 1) + ":",
              3
            )}  |  ${addPadding(human, 8)}|  ${addPadding(
              computer,
              8
            )}|  ${winner}`
          );
        });
    },
  };
}

function createGameManager(human, computer) {
  return {
    human,
    computer,
    maxRoundScore: 5,
    currentRoundWinner: undefined,
    winningOutcomes: {
      rock: ["scissors", "lizard"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      spock: ["rock", "scissors"],
      lizard: ["paper", "spock"],
    },

    getCurrentRoundWinner() {
      return this.currentRoundWinner;
    },

    updateRoundWinner() {
      if (
        this.winningOutcomes[this.human.getCurrentMove()].includes(
          this.computer.getCurrentMove()
        )
      ) {
        this.currentRoundWinner = "human";
      } else if (
        this.winningOutcomes[this.computer.getCurrentMove()].includes(
          this.human.getCurrentMove()
        )
      ) {
        this.currentRoundWinner = "computer";
      } else {
        this.currentRoundWinner = "tie";
      }
    },

    pickGrandWinner() {
      if (this.human.score >= this.maxRoundScore) {
        return "human";
      } else if (this.computer.score >= this.maxRoundScore) {
        return "computer";
      } else {
        return "no winner";
      }
    },

    addPoint() {
      const winner = this.currentRoundWinner;
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

    displayScore() {
      console.log("");
      console.log(
        `Your score: ${this.human.score}\nComputer's Score: ${this.computer.score}`
      );
    },

    displayRoundWinner() {
      const winner = this.currentRoundWinner;
      console.log("");
      console.log(`You chose ${this.human.getCurrentMove()}`);
      console.log(`Computer chose ${this.computer.getCurrentMove()}`);
      if (winner === "tie") {
        console.log("Its a tie!");
      } else {
        console.log("human" === winner ? "You win!" : "Computer wins!");
      }
    },

    displayGrandWinner() {
      console.log("");
      console.log("------Final Score-------");
      console.log(`You: ${this.human.score}`);
      console.log(`Computer: ${this.computer.score}`);
      console.log("------------------------");
      if (this.pickGrandWinner() === "human") {
        console.log("Congratulations! You're the reining champion!");
      } else if (this.pickGrandWinner() === "computer") {
        console.log("Computer is the reining champion!");
      }
    },
  };
}

function createRPSGame() {
  const moves = createMoves();
  const human = createHuman(moves);
  const computer = createComputer(moves);
  const gameManager = createGameManager(human, computer);

  return {
    moves: moves,
    human: human,
    computer: computer,
    gameManager: gameManager,

    displayWelcomeMessage() {
      console.clear();
      console.log(
        "------------Welcome to Rock, Paper, Scissors, Spock, Lizard!------------"
      );
      console.log("");
      console.log("Rules: ");
      console.log("- Rock crushes scissors and lizard");
      console.log("- Paper beats rock and spock");
      console.log("- Scissors cuts paper and decapitates lizard");
      console.log("- Spock vaporizes rock and scissors");
      console.log("- Lizard eats paper and spock");
      console.log("");
      console.log("The first to 5 points wins!");
    },

    displayGoodbyeMessage() {
      console.log("");
      console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
    },

    playAgain() {
      console.log("");
      console.log("Would you like to play again? (y/n)");
      let answer = rlsync.question();
      return answer.toLowerCase()[0] === "y";
    },

    play() {
      this.displayWelcomeMessage();
      while (true) {
        this.gameManager.resetScores();
        while (true) {
          this.computer.updateComputerStrategy();
          this.human.choose();
          this.computer.choose();
          this.gameManager.updateRoundWinner();

          this.gameManager.addPoint();
          this.moves.updateMoveHistory(
            human,
            computer,
            this.gameManager.getCurrentRoundWinner()
          );

          this.gameManager.displayRoundWinner();
          this.gameManager.displayScore();
          this.moves.displayMoves();
          if (this.gameManager.pickGrandWinner() !== "no winner") break;
        }
        this.gameManager.displayGrandWinner();
        if (!this.playAgain()) break;
      }
      this.displayGoodbyeMessage();
    },
  };
}

const RPSGame = createRPSGame();

RPSGame.play();

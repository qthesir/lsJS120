let readline = require("readline-sync");

class Deck {
  constructor() {
    this.suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    this.ranks = [
      "Ace",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    this.resetDeck();
  }

  deal(participant) {
    let randomIndex = Math.floor(Math.random() * this.cards.length);
    let card = this.cards.splice(randomIndex, 1)[0];

    participant.hand.push(card);
  }

  resetDeck() {
    let cards = [];
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        cards.push(new Card(suit, rank));
      });
    });

    this.cards = this.shuffleDeck(cards);
  }

  shuffleDeck(deck) {
    let shuffledDeck = [];
    while (deck.length > 0) {
      let randomIndex = Math.floor(Math.random() * deck.length);
      shuffledDeck.push(deck.splice(randomIndex, 1)[0]);
    }

    return shuffledDeck;
  }
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }

  getRank() {
    return this.rank;
  }
}

class Participant {
  static CARD_TO_SCORE = {
    Ace: 11,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
  };

  constructor() {
    this.hand = [];
  }

  isBust() {
    return this.calculatePoints() > 21;
  }

  calculatePoints() {
    let score = this.hand.reduce((score, card) => {
      score = score + Participant.CARD_TO_SCORE[card.rank];
      return score;
    }, 0);

    let numAces = this.hand.filter((card) => card.rank === "Ace").length;
    for (let i = 0; i < numAces; i++) {
      if (score <= 21) break;
      score = score - 10;
    }

    return score;
  }

  resetHand() {
    this.hand = [];
  }

  showCards(hidden = false) {
    hidden
      ? console.log(
          `${this.constructor.name} has ${this.hand[0]} and a hidden card`
        )
      : console.log(`${this.constructor.name} has ${this.hand.join(", ")}`);
  }

  displayPoints() {
    console.log(`${this.constructor.name} points: ${this.calculatePoints()}`);
  }
}

class Player extends Participant {
  static STARTING_BANKROLL = 5;
  static REWARD_FOR_WINNING = 1;
  static COST_FOR_LOSING = 1;

  constructor() {
    super();
    this.bankroll = Player.STARTING_BANKROLL;
  }

  incrementBankroll() {
    this.bankroll += Player.REWARD_FOR_WINNING;
  }

  decrementBankroll() {
    this.bankroll -= Player.COST_FOR_LOSING;
  }

  getBankroll() {
    return this.bankroll;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }
}

class TwentyOneGame {
  static STARTING_CARDS_IN_HAND = 2;
  static BUST_THRESHOLD = 21;
  static DEALER_HIT_THRESHOLD = 17;
  static BANKROLL_TO_WIN = 10;
  static BANKROLL_TO_LOSE = 0;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();
      this.handleBankroll();
      this.displayBankroll();

      this.deck.resetDeck();
      this.player.resetHand();
      this.dealer.resetHand();

      if (
        !this.playAgain() ||
        this.player.getBankroll >= TwentyOneGame.BANKROLL_TO_WIN ||
        this.player.getBankroll === TwentyOneGame.BANKROLL_TO_LOSE
      )
        break;
    }

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.dealCards();
    this.player.showCards();
    this.dealer.showCards(true);

    this.playerTurn();
    if (!this.player.isBust()) this.dealerTurn();
    this.displayWinner();
  }

  playAgain() {
    let answer;
    while (true) {
      answer = readline.question("Would you like to play again? y or n: ");

      if (["y", "n"].includes(answer)) break;

      console.log("Invalid response");
    }

    return answer === "y";
  }

  displayWelcomeMessage() {
    console.log(" ");
    console.log("Welcome to Twenty-One!");
    console.log(
      "You have $5. If you win, you make $1. If you lose, you lose $1. $10 means you win. $0 means you lose. Good luck!"
    );
    console.log(" ");
  }

  displayGoodbyeMessage() {
    console.log("");
    console.log("Thanks for playing. Goodbye!");
  }

  displayWinner() {
    console.log("");
    let dealerPoints = this.dealer.calculatePoints();
    let playerPoints = this.player.calculatePoints();

    if (dealerPoints > TwentyOneGame.BUST_THRESHOLD) {
      console.log("Dealer busted. You win!");
    } else if (playerPoints > TwentyOneGame.BUST_THRESHOLD) {
      console.log("You busted. Dealer wins.");
    } else if (playerPoints > dealerPoints) {
      console.log("You have the most points. You win!");
    } else if (dealerPoints > playerPoints) {
      console.log("Dealer has the most points. Dealer wins!");
    }
  }

  displayBankroll() {
    console.log("");
    console.log(`You have ${this.player.getBankroll()} dollars.`);
  }

  handleBankroll() {
    let dealerPoints = this.dealer.calculatePoints();
    let playerPoints = this.player.calculatePoints();

    if (dealerPoints > TwentyOneGame.BUST_THRESHOLD) {
      return this.player.incrementBankroll();
    } else if (playerPoints > TwentyOneGame.BUST_THRESHOLD) {
      return this.player.decrementBankroll();
    } else if (playerPoints > dealerPoints) {
      return this.player.incrementBankroll();
    } else if (dealerPoints > playerPoints) {
      return this.dealer.decrementBankroll();
    }
  }

  dealCards() {
    for (let i = 0; i < TwentyOneGame.STARTING_CARDS_IN_HAND; i++) {
      this.deck.deal(this.player);
      this.deck.deal(this.dealer);
    }
  }

  playerTurn() {
    console.log("");
    console.log("It's your turn");

    while (true) {
      this.player.showCards();
      this.player.displayPoints();
      let answer;

      while (true) {
        answer = readline.question("Please choose whether to hit or stay: ");

        if (["hit", "stay"].includes(answer)) break;
      }

      if (answer === "hit") {
        this.deck.deal(this.player);
      }

      if (this.player.isBust() || answer === "stay") break;
    }
  }

  dealerTurn() {
    console.log("");
    console.log("Dealers Turn");

    while (true) {
      this.dealer.showCards();
      this.dealer.displayPoints();

      if (this.dealer.calculatePoints() < TwentyOneGame.DEALER_HIT_THRESHOLD) {
        this.deck.deal(this.dealer);
      } else {
        break;
      }
    }
  }
}

let game = new TwentyOneGame();

game.play();

/*
The whole purpose of objects is to encapsulate state and behavior.
State is data, behavior are methods, encapsulation brings them
together in a coherent object framework. Objects have 
inheritance. 

Need to think about how to address the computers hidden card.
How do I know to reveal the card vs to only show part
of the hand? 

Question: I've encountered a situation, with the deal method, where I can either return a card from the deck, and set it equal to the 
participant in the parent function, or mutate the participant object passed to the method. What should I do here? 

Maybe I'll just leave it alone for now, focus on the twentyOneGame function, and then determine what will make the most sense. Thats why
you start at the top level...

Every time a player is dealt a card, it increases their points. How do I ensure that each deal increases the players points as well? I need to 
tightly couple these two behaviors. 

Actually... We probably do not want to keep track of points separately, because how many points the player has will depend on 
whether or not the players Ace will bust them or not. So the points are dynamic depending on the hand. So they should be 
dynamically calculated based on the hand. There should not be a separate state for points - they should be derived from
the hand state. 
*/

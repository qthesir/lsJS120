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

  displayHand(hidden = false) {
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
  constructor() {
    super();
    this.bankroll = 5;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  playOneGame() {
    this.displayWelcomeMessage();
    this.dealFirstCards();
    this.player.displayHand();
    this.dealer.displayHand(true);

    this.playerTurn();
    if (!this.player.isBust()) this.dealerTurn();
    this.displayWinner();
  }

  displayWelcomeMessage() {
    console.log(" ");
    console.log("Welcome to Twenty-One!");
    console.log(" ");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing. Goodbye!");
  }

  displayWinner() {}

  dealFirstCards() {
    for (let i = 0; i < 2; i++) {
      this.deck.deal(this.player);
      this.deck.deal(this.dealer);
    }
  }

  playerTurn() {
    console.log("It's your turn");

    while (true) {
      this.player.displayHand();
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
    console.log("Dealers Turn");

    while (true) {
      this.dealer.displayHand();
      this.dealer.displayPoints();

      if (this.dealer.calculatePoints() > 17) {
        this.deck.deal(this.dealer);
      }

      if (this.dealer.isBust()) break;
    }
  }
}

let game = new TwentyOneGame();

game.playOneGame();

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
